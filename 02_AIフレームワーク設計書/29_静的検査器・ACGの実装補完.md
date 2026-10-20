# 静的検査器・ACGの実装補完

06・07・11・12章の公開契約に対する実装詳細。既存のAngular／TypeScript／ACG依存版とモデルを使用し、アプリソースの更新・CI稼働・再生成テストの実施とは区別する。

## TOOL-01 BuildContextとTypeScript Program

06章のWorkspaceResolver.resolveは同期関数で、設定不正を`ConfigurationFailure`（diagnostics:Diagnostic[]）で返すかthrowし、cliが終了2へ変換する。以後のTemplate診断と混ぜて正常Contextを捏造しない。

| 内部関数 | 型／引数／戻り値 |
|---|---|
| parseArguments | argv:readonly string[]→BuildOptionsまたはConfigurationFailure |
| readWorkspace | root:string→AngularWorkspace。angular.jsonをJSONC解析、projects/options/configurationsの型も検査 |
| candidateProjects | workspace,configuration:string→readonly string[]。application、build target、対応builder、選択configuration存在で絞る |
| resolveBuildOptions | workspace,project,configuration→{tsConfig:string,fileReplacements:readonly {replace:string,with:string}[]} |
| normalizeReplacements | root,entries→ReadonlyMap<string,string>。絶対化・正規化・存在確認。重複replace・循環・同一replaceへの異なるwithは設定エラー |
| createProgram | context:BuildContext→ts.Program。追加rootや未選択構成を混ぜない |
| isOwnSource | path:string,context→boolean。realpathがworkspace内で、成果物／依存除外に一致しないこと |

CompilerHostはreadFile／fileExists／getSourceFileの参照パスをreplacement表で解決する。rootNamesも置換し、resolveModuleNamesではts.resolveModuleNameで解決したresolvedFileNameへ同じ置換を適用して返す。SourceFile.fileNameは置換**実体**のパスとする。HTMLのtemplateUrl解決基準もその実体。原本と置換後を二つの別Componentとして同時列挙しない。

fileReplacementsを含む選択optionsはAngularと同じ浅い上書き順（build.options→選択configuration）で確定し、配列を独自に連結しない。複数構成のカンマ指定は06章の未対応診断。Projectと構成を二回別々に推測しない。tsconfig由来のrootNames／import先を使い、無関係なsrc全件走査でComponentを増やさない。

ComponentCollectorは`ts.canHaveDecorators`／`ts.getDecorators`、TypeChecker.getSymbolAtLocation／getAliasedSymbolで@angular/coreのComponentを追跡する。namespace.Componentも同じsymbolを確認。metadataは直接ObjectLiteralExpression。spread／computed propertyでtemplateの有無が静的に確定しなければTEMPLATE-001。直接metadataにtemplateもtemplateUrlもない場合は空テンプレートとして解析し、勝手に同名HTMLを探さない。Angularの通常ビルドが許容する空Componentを検査器が誤って「HTML不存在」と扱わない。

## TOOL-02 Inline抽出の正確なrange

引用符・バッククォートを含むTSソース全体をparseTemplateへ渡す。rangeはリテラルの`getStart(sourceFile)+1`から`getEnd()-1`まで、開始行列はそのstartPosのgetLineAndCharacterOfPositionから取得する。Angularがrange／escapedStringを処理するため、cooked textとraw textの位置を独自に足し合わせない。

```ts
const startPos = literal.getStart(sourceFile) + 1;
const endPos = literal.getEnd() - 1;
const p = sourceFile.getLineAndCharacterOfPosition(startPos);
const parsed = parseTemplate(sourceFile.text, sourceFile.fileName, {
  range: {startPos, endPos, startLine:p.line, startCol:p.character},
  escapedString:true,
  preserveWhitespaces:true,
  preserveLineEndings:true,
  collectCommentNodes:true,
});
```

外部HTMLはfile全体を読みrangeなし／escapedStringなし。Diagnosticの行列はParseSourceSpan.startのline／colを1始まりへ変換する。TS参照エラーは該当PropertyAssignmentまたはliteralのTS位置。parseTemplate.errorsは構文失敗なので当該templateのLayout規則を続けず、別ファイルを継続する。

確認した公式契約：Angular 21.0.0 [template.ts](https://github.com/angular/angular/blob/21.0.0/packages/compiler/src/render3/view/template.ts)、TypeScript 5.9.2 [commandLineParser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/commandLineParser.ts)。実アプリlockfileで解決される版が別の場合は同じfixtureを実行し互換性を確認する。最新版への自動更新は行わない。

## TOOL-03 構成収集とspan検査の関数

```ts
type LayoutChild = {node:TmplAstElement, span?:{raw:string,value:number}};
type LayoutConfiguration = readonly LayoutChild[];
// findItems(nodes:readonly TmplAstNode[]):readonly TmplAstElement[]
// collectConfigurations(item:TmplAstElement):LayoutConfiguration[] | Diagnostic[]
// readSpan(node:TmplAstElement):LayoutChild | Diagnostic[]
// validateConfiguration(items:LayoutConfiguration):Diagnostic[]
// decimalTotal(raws:readonly string[]):{equals100:boolean,actual:string}
```

findItemsはElementのchildren、Ifの各branch、Forのchildren／empty、その他解析可能Blockの子へ走査を継続する。外側Itemで反復禁止を検出しても、その内部の別Itemを検査し忘れない。各ItemのcollectConfigurationsだけが「論理兄弟」境界を扱う。

collectConfigurationsはng-containerを再帰展開して表示要素を収集し、(A)通常要素＋独立したelseなしIf群なら一つの全表示構成、(B)通常要素＋一つの排他If連鎖なら明示branchごとの構成を返す。各If branchは展開後一要素。条件のネスト、複数排他連鎖の組合せ、明示空branch、兄弟For、Template／Content等はLAY-03の診断とする。@letやコメント・空白は幅項目にしない。別のComponent内部へ兄弟展開を進めない。

readSpanは属性名／BoundAttribute名を確認。appLayoutSpanの文字列属性、attr.appLayoutSpan等による代用は拒否。式はASTWithSource.astがLiteralPrimitiveでvalueがnumber／正／有限であることを確認。rawはバインディング式の元表記を取得。数値リテラル以外をNumberへ変換して通さない。

decimalTotalは十進表記`digits[.digits][e±digits]`／`.digits[e±digits]`を係数と10の桁へ分解する。例えば1e2→係数1・桁-2、33.33→3333・桁2。各値を最大桁へBigIntでそろえて加算し、100×10^最大桁と比較。端の不要な0を除いたactualを作る。IEEE numberの近似で99.99999999999999を100と認める許容誤差は導入しない。pxレイアウト計算は別にnumberで行う。

validateConfigurationは値診断→指定混在→合計の順。値不正／混在なら不明な合計の派生エラーを出さず、その元エラーを報告する。静的0件は別診断。独立Ifのfalse構成、末尾elseなしの仮想空branchに100を再要求しない。

## TOOL-04 CLI・wrapper・診断の終了処理

cli.mjsは`process.exitCode = await main(process.argv.slice(2))`として、診断の書込み前にprocess.exitでログを切り捨てない。設定／内部失敗は終了2、ルール／template違反は1、成功0。英語診断は標準エラー、成功時は`Layout validation passed.`を標準出力へ一度出す。stderrに日本語補足を混ぜない。

sortAndFormatはnormalized path→line→column→codeの比較。完全同一診断のkeyはfile／line／column／code／message／expected／actual。メッセージが違う診断をまとめて消さない。設定エラー位置が不明なら1:1、読める設定の実位置があればそちらを使う。最終行に総エラー数を示す。

bruce-build.mjsはresolve→checkLayout→diagnostics出力→0件ならAngular CLI起動。childのerror eventも失敗とし、closeでcode===0かつsignal===nullの場合だけ成功。SIGINT等で中断した際も失敗とし、残った子processを継続させない。子の終了codeがnumberならその値、signal終了なら非0（1）を返す。shell:false、引数配列を使用する。

## ACGIMPL-01 値解析と生成の順序

AcgUiSourceGenerator.generate(Path,AcgUiSpecDto)は、specFile/uiSpecを保持→16列構造確認→物理名重複確認→各行の型／文字種／形式／禁止列／範囲／無効状態／デフォルトを順に検証→JavaScript形式チェック→AcgClassModel作成→TS構文チェック→List<SourceInfo>返却の順。最初の定義不正でException。既存正常出力を部分的に書き換えてから検証しない。

AcgUiSpecListDtoの16 record属性は07章ACG-02で全定義済み。型getTypeScriptTypeEnum、getCharacterTypeEnum、getFormatEnum、getMinLength／getMaxLength／getMinNumber／getMaxNumber、static getMinMaxSplitの戻り値は11章。内部`isEmptyMark(String):boolean`は既存互換としてnull／空文字／trim後'-'を未指定扱いする。正本の入力には'-'を明示する。一般文字列defaultは元の値を保持し、文字の前後空白を値ごとtrimしない。

11許可パターンは11章VALID-01を宣言的な許可集合として実装し、項目名ごとのifを追加しない。必須／必須(真偽)／無効状態のマーカーは'〇'／'-'だけを正本仕様として受理する。既存空欄互換を残す場合は正規化の同じisEmptyMarkに集約し、誤った'○'／'TRUE'を勝手に承認済み記法へ広げない。範囲は既存Integer解析の互換仕様であり、値そのものの負数／小数まで禁止するものではない。

### 初期値・Validator・import

createInitialValue(Item)は12章の13パターン。数値defaultは十進正規表現`[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?`で表記を確認→Double.parseDouble→isFinite→AcgValueNumberModel。NaN／Infinity／Java専用16進浮動小数点表記を受理しない。真偽は小文字true/falseのみ。Enumは末尾Enumのクラス名・importを解決し、toEnumへ文字列コードを渡す。

createValidatorsは形式→必須→最小→最大。ASCII regexにはAppInputValidators.asciiとValidators.pattern(指定source)の両方を追加。半角数字／英数字／英数字記号は12章固定pattern。UnicodeにASCII制約を入れない。string必須はrequiredTrim、number／Enumはrequired、boolean真必須はrequiredTrue。date／datetimeは必須だけを生成する。

importsはFormGroup／FormControlを常に、Validators／AppInputValidators／AppDateUtil／Enum型は使用がある場合だけ追加。Nullable importなし。重複は(module,name)で除外する。formGroup Fieldはreadonly=trueで宣言時new FormGroup(controls)。文字列／booleanはnonNullable=true、number／Enumはfalse。disabledは{value,disabled}のvalueと分離する。

escapeTsString(String):Stringは単引用符を外側に使い、'→\\'、backslash→\\\\、CR／LF／TAB／BS／FFを各escapeへ、その他U+0000〜001Fと2028／2029は\\uXXXXへ変換。元値のtrim／大文字化をしない。正規表現sourceも同じ文字列escapeを通し、JavaのPatternでJavaScript文法を判定しない。

## ACGIMPL-02 JavaScript検証ブリッジ

既存ACGのJava側だけでJavaScript正規表現・TS文字列escapeを保証したことにしない。内部クラス`AcgJavaScriptValidationBridge`を`io.github.soracity.alfred.generator.validation`へ置く。公開APIは`validateRegex(List<RegexInput>):void`／`validateSyntax(List<SourceInfo>):void`。RegexInputは{file,physicalName,source}。ユーザーの画面／DTOへこのクラスを公開しない。

実行環境は対象BruceのNodeと同じ互換版、および対象Bruceのtypescript依存。nodeExecutable／typescriptModulePathをACG実行環境で明示解決し、存在しなければACG実行前提不足のAcgSystemException。黙ってregex検査を飛ばさない。新しいオンラインサービスを呼び出さない。

JavaはProcessBuilderの引数配列でリソース`validation/validate-ui-values.mjs`を起動し、UTF-8のJSONをstdinへ送る。stdoutはJSON応答だけ、stderrは実行障害。リクエストは`{mode:"regex",items:[{file,physicalName,source}]}`または`{mode:"syntax",typescriptModulePath,items:[{file,source}]}`。SourceInfoの出力パスをfile、生成テキストをsourceへ写す。indexは0始まり。Java側はmodeごとに必要フィールドを検査してから送る。JSONの文字列を実行コードとして連結しない。正常応答は`{ok:true}`、不正は`{ok:false,index,message}`。非0終了／壊れた応答／中断はシステム例外。stdout／stderrは別スレッドで同時回収し、pipe満杯でwaitForが停止しない。NodeはJSON.parse後のmode／配列／文字列型を検証し、不正要求はstderr＋終了2とする。最初の不正indexから項目名・型・列・値・理由を付けて定義例外にする。

Nodeのregexモードは各sourceについて`new RegExp(source)`するだけで、正規表現をevalしない。TS syntaxモードは指定されたtypescriptモジュールからcreateSourceFile（ScriptKind.TS、ScriptTarget.Latest）を使いparseDiagnosticsを確認する。構文診断は生成文字列の問題としてSourceInfoを返す前に停止。importの実在／型互換は生成先アプリの型検査で別確認し、構文合格を型検査合格と報告しない。

プロセスのstdin終了、stdout／stderr回収、waitFor、割込み時destroyForcibly、抽出した一時scriptファイルのfinally削除を所有する。同じ生成実行中の検証は一つのプロセスへまとめてよいが、終了済みプロセスを別実行の状態として共有しない。

## ACGIMPL-03 Enum定義書・型生成の完成形

AppUiColorEnum定義は02_COMPONENTに置き、定数11値は02章と一致。現行定義書にはACGが必要とする「列挙種別」チェック欄が欠けていたため、一般列挙型一つを選択する欄を補う。物理名・色の意味は変えない。出力ファイル名は既存定義のapp-ui-color-enum.tsを使い、参照importも同じ物理名へ統一する。パッケージ文字列は既存形式の単一backslash区切り。

文字表示Enumは既存CODE分類とapp-code-text-overflow-mode.enum.tsを保持。4値・単一Input・WRAP既定を変更しない。旧AppComponentTableCellBackgroundEnumは承認履歴として残すが、現行生成対象から外す。

生成対象の選択はACGの入力列挙段階で`AcgSourceSelector.select(root:Path,candidates:List<Path>,excluded:List<Path>):List<Path>`を通す。正規化済み相対パスの完全一致で旧専用背景Enumの一件を除外し、同名文字列の部分一致で他のEnumを消さない。excludedは生成実行の定義リストに固定記録。既存の全件走査で旧定義と新定義を二重生成しない。旧ファイル自体を削除したと報告しない。

AcgEnumSpecCodeGeneratorは既存のprivate constructor／public readonly name,value／static readonly各定数／values／valueOf／toEnum／toStringを生成する。一般Enumの色へCode Brandを無断付与せず、CODE Enumは既存Symbol実体Brandを保持する。表示type生成は全プロパティreadonly、配列wrapper／Injectable／FormGroupなし。Brand不要の表示DTOにBrandを追加しない。

## RELEASE-01 公開ゲートのデータ契約

04章のCI・公開連携を具体化する。これは公開を実施する指示ではない。

```ts
type BuildEvidence = {
  commit:string; project:string; configuration:string;
  runId:string; layout:'success'; angular:'success';
  lockfileSha256:string; artifactSha256:string;
};
type ReleaseManifest = BuildEvidence & {
  designCommit:string; acgCommit:string;
  nativeEvidence?:{platform:'android'|'ios';result:'success';artifactSha256:string}[];
};
// assertReleaseEvidence(manifest:ReleaseManifest, requested:{commit:string,project:string,
//   configuration:string,artifactSha256:string}, verifiedRun:BuildEvidence):void
```

assertReleaseEvidenceはrequested／manifest／verifiedRunのcommit／project／configuration／artifact digestを比較し、manifestとverifiedRunのrunId／lockfileSha256を比較し、layout／angularがともにsuccessかを検証。不一致・未実施・欠落は明示エラー。commit/designCommit/acgCommitは40桁hex、digestは64桁hex、project/configuration/runIdは非空文字列として実行時も検査する。branchの「直近成功」を別SHAへ流用しない。CIログの手書きsuccess文字列だけでverifiedRunを作らず、実際のCI run／job結果を取得して検証する。BuildEvidenceはビルド終了後の成功経路だけで作る。

ネイティブ成果物を正式配布する場合の署名／ストア処理はアプリ配布設計の責務。Angular成功をnative成功へ置き換えない。Node/npm／workflowサービス／配布先／実行担当の実運用設定を、本文の具体案が存在するだけで設定済みにしない。

## 検証

T-CHECK-26：templateなし空Componentを正常解析し、同名HTMLの推測探索なし。T-ACG-21：Node未配置／不正JS regex／TS構文不正で既存出力を更新しない。T-ACG-22：AppUiColorEnumの一般列挙型・11値・出力名・旧専用Enum除外を生成対象で確認。T-CI-05：SHA一致でも別project／別configuration／別artifactなら公開を拒否。記載は実装後の試験仕様であり、ACG／Angular／CIの実行結果ではない。
