# LayoutManager・ビルド前静的検査 詳細設計

## LAY-01 LayoutItem / ItemStackLayout

| 対象 | 公開API | 所有する状態 |
|---|---|---|
| ItemStackLayoutComponent / app-item-stack-layout | Input/Outputなし、ng-content | なし。行を縦積みし既存gap-4を適用 |
| LayoutItemComponent / app-layout-item | Input/Outputなし、ng-content | 実体要素一覧、Resize/MutationObserver、必要幅通知購読、rAF番号、最終配分結果 |
| LayoutSpanDirective / [appLayoutSpan] | appLayoutSpan:number、Outputなし | ホスト要素、指定された重み |

ItemStackLayout HTMLは`<div class="bruce-item-stack"><ng-content /></div>`。CSSはdisplay:flex、flex-direction:column、gap:1rem。LayoutItem HTMLは`<div class="bruce-layout-items"><ng-content /></div>`。CSSはdisplay:flex、flex-wrap:wrap、gap:0.5rem、min-width:0、width:100%。画面外周padding・業務状態を持たない。

元の兄弟が全てspan未指定なら重み1で均等配分する。明示する場合は全て数値リテラルで合計100。spanはCSSの幅%ではない。利用可能幅から同一行のgapを引いて重みで割る。`70% + 30% + gap`の実装は禁止。

LayoutSpanDirectiveは内部CSS変数`--bruce-layout-weight`へ重みを反映する。未計測時のgrow/basisはLayoutItemの内部CSSがこの値から設定し、計測後はLayoutItemが外側flexを所有する。Directiveの変更検知が計測後のflex-basisを上書きしない。未指定要素は重み1。不正な0・負数・非有限値を1へ補正しない。`ngOnChanges`またはSignal effectで正の有限数を検査し、違反は`BRUCE_SPAN_VALUE`をthrowする。実行時に表示中の合計100は検査しない。条件付き非表示で100未満になるのは正常である。

## LAY-02 条件と表示項目の規則

**LayoutItem直下の単独@ifは許可される。** 既存設計書の一律禁止は2.2.4の2026-10-19明示承認と不整合であったため訂正する。ng-containerで包む義務はない。

| 形 | 静的検査の構成 | 実行時 |
|---|---|---|
| 通常兄弟のみ | その兄弟全体 | 表示兄弟へ配分 |
| @elseなしの単独@if | 条件成立時を含む全表示構成 | 非表示になれば残存比率を維持 |
| 真に独立した複数@if | 全条件が成立した構成 | falseの組合せごとに合計100を要求しない |
| 単一@if/@else if/@else | 共通兄弟＋各排他分岐を別々に検査 | 異なる分岐を同時合算しない |
| @elseのない排他連鎖 | 明示されている分岐を検査 | 全不成立なら残る項目へ配分 |
| ng-container | 自身は数えず再帰展開 | DOMを生成しない |
| @forでLayoutItem内の兄弟を増減 | 禁止。ng-containerで包んでも禁止 | Item全体を反復する |
| 静的に項目0件 | エラー | — |
| 条件で実行時に表示0件 | 宣言時構成を検査 | 正常。子の幅は0件、例外を投げない |
| 空白・改行・コメント | 項目数に含めない | — |
| 直接文字/直接補間 | エラー。span等の要素で包む | — |
| 通常HTML要素・Component | 各1項目。内部の子まで兄弟として展開しない | 各ホストの幅を配分 |

排他的な条件を独立@ifで書かない。条件式の意味上の排他性・独立性を検査器が完全推論する機能は作らない。人間レビューでも確認する。

```html
<app-layout-item>
  <app-textbox [control]="ctrls.name" [appLayoutSpan]="50" />
  @if (showDate) {
    <app-date [control]="ctrls.date" [appLayoutSpan]="30" />
  }
  @if (showMemo) {
    <app-textbox [control]="ctrls.memo" [appLayoutSpan]="20" />
  }
</app-layout-item>
```

全表示50+30+20=100。showMemo=falseなら50:30→62.5:37.5。両条件falseなら残る1項目が100%。70+20=90は不正であり再配分で正当化しない。

```html
@for (row of rows; track row.id) {
  <app-layout-item>
    <span [appLayoutSpan]="60">{{ row.name }}</span>
    <app-button [appLayoutSpan]="40" label="選択" />
  </app-layout-item>
}
```

## LAY-03 未承認の特殊構造の境界

ネストした@if、複数要素を返す分岐、複数の排他連鎖の組合せ、明示的な空分岐、@switch/@defer、ng-template/ngTemplateOutletやng-contentで兄弟が決まる構造、LayoutItem内の@forの例外は包括承認されていない。検査器は正常扱いで読み飛ばさず`BRUCE-LAYOUT-009`で「検査規則未定義」と報告する。今回の実装では拒否を確定動作とし、許可を勝手に一般化しない。将来の例外追加は18章の対象外境界に従う別変更である。

対応可能な基準構造はLAY-02の原典具体例。ng-containerの階層数には上限を設けず展開する。展開後の構造が未承認形になった場合に限って上記診断とする。通常の要素内部にある@forは兄弟数を変えないため、この禁止に含めない。その内部に別LayoutItemがあれば、そのItem自体を独立検査する。

## CHECK-01 検査器の実装単位

| ファイル/クラス | 公開メソッドと型 | 処理・副作用 |
|---|---|---|
| cli.mjs | main(argv:string[]):Promise<number> | CLI解析、検査、英語診断、終了コード |
| workspace.mjs / WorkspaceResolver | resolve(options:BuildOptions):Result<BuildContext> | angular.json/tsconfigと選択対象を確定 |
| components.mjs / ComponentCollector | collect(context:BuildContext):ComponentSource[] | TS Programの自作@Componentを列挙 |
| templates.mjs / TemplateExtractor | extract(component):Result<TemplateSource> | 直接リテラル/外部ファイル読込、位置情報 |
| parser.mjs / AngularTemplateParser | parse(source):Result<ParsedTemplate> | 公式parseTemplateを呼ぶ |
| layout-rule.mjs / LayoutRuleChecker | check(parsed,source):Diagnostic[] | Item・span・分岐・禁止構造 |
| diagnostic.mjs / DiagnosticReporter | sortAndFormat(items):string | 重複排除、安定順序、英語表示 |
| index.mjs | checkLayout(context):Promise<Diagnostic[]> | 上記を順に実行。DOM/アプリ起動なし |

JavaScript ESMを使い、Nodeから実行する。TypeScript Compiler APIは依存先のtypescriptをimportする。Angular compilerはアプリのlockfileと同じバージョンを利用し、検査器だけ別の最新版を導入しない。

```ts
type Result<T> = {ok:true;value:T} | {ok:false;diagnostics:Diagnostic[]};
type ParsedTemplate = {nodes:readonly TmplAstNode[]};
type BuildOptions = { project?: string; configuration: string };
type BuildContext = {
  workspaceRoot: string; project: string; configuration: string;
  tsconfigPath: string; compilerOptions: ts.CompilerOptions;
  rootNames: string[]; replacements: ReadonlyMap<string,string>;
};
type ComponentSource = {
  sourceFile: ts.SourceFile; decorator: ts.Decorator;
  className: string; metadata: ts.ObjectLiteralExpression;
};
type TemplateSource = {
  file: string; ownerFile: string; component: string;
  content: string; inline: boolean;
  range?: {startPos:number;endPos:number;startLine:number;startCol:number};
};
type Diagnostic = {
  code:string; file:string; line:number; column:number;
  message:string; component?:string; expected?:string; actual?:string;
};
```

## CHECK-02 ビルド設定とComponent列挙

1. wrapperが引数を一度だけ解釈し、project/configurationを固定する。configuration省略はproduction。--project NAME/--project=NAME、--configuration NAME/--configuration=NAMEの両記法を受ける。位置引数、空文字、重複指定（両記法の重複も含む）、未知引数は設定エラー。npmの区切り--はnpm側で除去される前提で、wrapperへ来た未知の単独--を無視しない。
2. angular.jsonはTypeScriptのparseConfigFileTextToJson等でコメント/末尾カンマを含む設定JSONとして解析し、解析エラーを設定診断にする。通常JSON.parseで有効な設定を誤拒否しない。projectsのうち、applicationで対応build targetを持つ全候補を得る。configurationはproject選択後に検査する。実測対象builderは`@angular/build:application`。未対応builderを推測して通さない。
3. project省略で候補1件のみ自動選択。0件・複数件は診断し中止。複数候補の診断には候補名を辞書順に列挙する。明示projectが不在/ビルド不可/構成不在なら対象名と不正理由を示して中止。利用可能なproject/configuration名を取得できる場合は診断の参考情報として列挙する。他名へフォールバックしない。
4. build.optionsへ選択configurationのoptionsを重ね、tsConfigとfileReplacementsを確定する。複数configurationのカンマ指定は現在の公式入口で受け付けず、必要時に別設計する。
5. `ts.readConfigFile`と`ts.parseJsonConfigFileContent`でextends/include/exclude/filesを解決する。読込・解析エラーを収集する。
6. `ts.createCompilerHost`/`ts.createProgram`を作成。rootNamesとimport解決にfileReplacementsを同じマップで適用する。replacementの実体ファイル名をComponentSourceへ記録し、templateUrlはその実体ディレクトリを基準にする。
7. Program.getSourceFiles()から自作ソースを列挙。node_modules、dist、out-tsc、.angularの成果物・宣言ファイルを除外。テスト除外は選択tsconfigを尊重する。src以下を一律globして対象を増やさない。
8. TypeCheckerで@angular/coreのComponentを解決する。import alias・namespace importも同じsymbolへ解決する。名前がComponentというだけの別関数を認識しない。
9. `ts.getDecorators`で@Componentを特定し、直接ObjectLiteralのmetadataからtemplate/templateUrlを抽出する。spread/変数によるmetadataで静的確定できない場合は解決エラー。任意コードをevalしない。

現在のアプリのAngular project名は`feature-20251212`。package.json.nameやGitブランチ名をproject名へ流用しない。

## CHECK-03 テンプレート抽出と位置

templateUrlはStringLiteral直接指定のみ。Componentの実体ファイルの親ディレクトリから解決し、workspace内の自作ファイルを読込む。不存在・不読・外部URLは解決診断。templateとtemplateUrlの同時指定はエラー。

templateはStringLiteralまたはNoSubstitutionTemplateLiteralのみ。TemplateExpressionの`${...}`はエラー。`{{ value }}`はAngular構文として許可し、Item直下の場合だけ別規則で拒否する。

外部HTMLはファイル全文を`parseTemplate(content,path,{preserveWhitespaces:true,preserveLineEndings:true,collectCommentNodes:true})`へ渡す。inlineは**TSファイル全文**とリテラル内部のrangeを渡し、`escapedString:true`にする。引用符を除くstartPos/endPos、開始行列はTSのgetLineAndCharacterOfPositionから得る。単にリテラルのcooked textへ開始行を足す方式は、改行エスケープ時に位置がずれるため採用しない。

parseTemplateのerrorsがあれば当該テンプレートの規則検査は実施せず、全解析エラーを収集して次ファイルへ進む。他のテンプレートは継続する。回復不能なI/O/プロセス障害では続行を保証せず、内部エラーを記録して失敗する。

APIはAngular 21.0.0の公式ソース`packages/compiler/src/render3/view/template.ts`のParseTemplateOptions/parseTemplateとr3_ast.tsを確認した。実装時はlockfileの実バージョンで同契約をテストする。

## CHECK-04 AST規則アルゴリズム

全ASTを走査してapp-layout-itemを見つける。各Itemの「幅を配る論理兄弟」を別関数で収集する。

| AST | 収集時の処理 |
|---|---|
| TmplAstElement(通常) | 1項目として追加。内部を兄弟へ平坦化しない |
| TmplAstElement(ng-container) | Span付与を先に検査して拒否し、childrenを再帰展開 |
| TmplAstIfBlock | LAY-02/03に従い基準構成を作る |
| TmplAstForLoopBlock | 論理兄弟境界なら禁止診断 |
| TmplAstText | trim後空なら無視、他は直接文字診断 |
| TmplAstBoundText | 直接補間診断 |
| TmplAstLetDeclaration/コメント | DOM項目として数えない |
| TmplAstTemplate/Content/未知Block | 兄弟が静的確定しない特殊構造診断 |

全省略の構成は均等割り。全明示なら各spanを解析して合計100を確認。混在なら混在診断。値不正/混在に起因して合計が定義できない構成に、誤った派生合計エラーを重ねない。別のItem・ファイルの検査は続ける。

属性`appLayoutSpan="70"`は文字列なので禁止。BoundAttributeの式がLiteralPrimitiveのnumberであり、正の有限数であることを確認。変数、演算、関数、文字列、配列、補間、attr/styleバインディングでの代用は許可しない。数値文字列をNumber変換して許可しない。

十進小数の合計判定はIEEE浮動小数誤差へ依存しない。リテラルの十進表記を係数BigIntと10の指数へ分解し、共通桁へ整数化して100と比較する。例33.33+33.33+33.34は100、33.33×3は99.99。表示幅のpx演算にはnumberを使用する。

独立@ifのfalse状態は基準構成列挙に追加しない。排他の各明示分岐は別の基準構成とし、共通兄弟をそれぞれ含める。ng-containerの展開後もこの区別を保持する。

## CHECK-05 診断と終了

| コード | 意味 |
|---|---|
| BRUCE-CONFIG-001 | workspace/tsconfig読込・解析不能 |
| BRUCE-CONFIG-002 | project候補0/複数/不正 |
| BRUCE-CONFIG-003 | configuration不在/不正 |
| BRUCE-CONFIG-004 | 未対応builder/引数/設定 |
| BRUCE-TEMPLATE-001 | metadata/templateの静的解決不能 |
| BRUCE-TEMPLATE-002 | 外部HTML読込不能 |
| BRUCE-TEMPLATE-003 | inlineのTS式展開 |
| BRUCE-TEMPLATE-004 | Angular構文解析エラー |
| BRUCE-LAYOUT-001 | span合計100違反 |
| BRUCE-LAYOUT-002 | 明示/省略混在 |
| BRUCE-LAYOUT-003 | 数値リテラル以外/非正数/非有限数 |
| BRUCE-LAYOUT-004 | 論理兄弟を反復する@for |
| BRUCE-LAYOUT-005 | 静的0項目 |
| BRUCE-LAYOUT-006 | 直接文字 |
| BRUCE-LAYOUT-007 | 直接Angular補間 |
| BRUCE-LAYOUT-008 | spanの不正な付与先/指定方法 |
| BRUCE-LAYOUT-009 | 未定義の特殊構造。未承認の許可を追加しない |
| BRUCE-INTERNAL-001 | 検査器内部障害 |

コード番号は今回の実装詳細であり、以前の例示番号の正式承認を得たと主張しない。各診断にfile・1始まりline/column・messageを必須とする。値が表せる場合はexpected/actual、特定できる場合はcomponentを付ける。英語のみ。標準エラーへ出力し、パス→行→列→コードの安定順。設定診断のfileはangular.json/対象tsconfig/読込不能な対象ファイル、CLI引数不正は起動wrapperのパスを示す。設定内の該当位置が取得できない時はline=1/column=1を使い、実際に特定できた行だと偽らない。file/位置/code/内容が同じ診断のみ重複排除し、異なる違反を件数制限で隠さない。

```text
ERROR BRUCE-LAYOUT-001 src/app/sample/sample.component.html:12:3
Component: LayoutItem
Rule: Explicit LayoutSpan total must be 100.
Expected: 100
Actual: 90
Total: 1 error. Angular build was not started.
```

終了0＝違反なし、1＝設計/テンプレート違反、2＝設定/内部障害。複数種別があれば2を優先。1件以上の診断で後続ng buildを実行しない。

## CHECK-06 公式npm入口とCI

```json
{
  "scripts": {
    "check:layout": "node tools/bruce-layout/cli.mjs",
    "build": "node tools/bruce-build.mjs",
    "build:production": "node tools/bruce-build.mjs --configuration production",
    "build:development": "node tools/bruce-build.mjs --configuration development"
  }
}
```

例：`npm run build -- --project feature-20251212 --configuration production`。wrapperはresolveのokを判定し、成功時のBuildContextだけを一度checkLayoutへ渡す。失敗ResultにContextを捏造しない。診断0件の場合だけ、同じproject/configurationでAngular CLIを子プロセス起動する。`spawn(process.execPath,[ngJs,'build',project,'--configuration',configuration],{shell:false,stdio:'inherit'})`を使用し、引数をシェル文字列へ連結しない。ngJsはアプリ依存の`@angular/cli/bin/ng.js`を解決する。Angularの終了コード・signal終了も失敗へ伝える。

直接npx ng buildは専用検査を回避できる。技術的禁止を達成したと表示せず、正式成果物は04章のCI合格ゲートで守る。Push時にアプリCIで公式入口を起動し、正式公開は同じコミットの検査・Angularビルド合格を必須とする。Android/iOSのネイティブビルド・署名合格とは別。

テスト：T-CHECK-01〜25、T-LAY-01〜12、T-CI-01〜04。内部Class/CLIにHTML/CSSはない。実行時の必要幅と行分割は05章。

補助API確認：TypeScript 5.9.2の[公式commandLineParser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/commandLineParser.ts#L2243)でparseConfigFileTextToJson(fileName,jsonText)がparseJsonTextを使い{config,error}を返すことを確認した。返却errorがあれば設定を正常扱いしない。AngularのParseTemplateOptions確認と同様、実装時はアプリlockfileの実バージョンで検証する。

実装補完：[29章](29_静的検査器・ACGの実装補完.md)にProgram、fileReplacements、inline range、全内部関数、終了処理を記す。

## CHECK-07 Span付与先と実行時の一致

ng-container/ng-template/ng-contentおよびTmplAstTemplateのattributes/inputsにappLayoutSpanがあれば、透明展開・特殊構造処理より先にBRUCE-LAYOUT-008を報告する。attr.appLayoutSpan/style.*による代用も008。Spanを透明展開の途中で消失させない。付与先が通常Elementで値が不正なら003。

LayoutSpanDirectiveはElementRef.nativeElement instanceof HTMLElementと独立したboxを検査する。comment/Text/ng-container/templateはBRUCE_SPAN_HOSTで停止。display:noneの通常HTMLElementは非表示として保留し、display:contentsが確定した要素は幅を配れないため停止する。Directiveは自身のCSS変数だけを所有し、元の値/priorityを保持、現値が自分の最終値の場合だけdestroyで復元する。

全内部型と0/1/2へ至る分岐は29章TOOL-05を正本とする。CLIにHTML/CSSはない。
