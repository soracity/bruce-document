# 静的検査器・ACGの実装補完

06・07・11・12章の公開契約に対する実装詳細。既存のAngular／TypeScript／ACG依存版とモデルを使用し、アプリソースの更新・CI稼働・再生成テストの実施とは区別する。

## TOOL-01 BuildContextとTypeScript Program

06章のWorkspaceResolver.resolveは同期関数で、設定不正を`Result<BuildContext>`の失敗として返し、cliが終了2へ変換する。以後のTemplate診断と混ぜて正常Contextを捏造しない。

| 内部関数 | 型／引数／戻り値 |
|---|---|
| parseArguments | argv:readonly string[]→Result<BuildOptions> |
| readWorkspace | root:string→Result<AngularWorkspace>。angular.jsonをJSONC解析、projects/options/configurationsの型も検査 |
| candidateProjects | workspace→readonly string[]。application、build target、対応builderで絞る。configuration検査はproject決定後 |
| resolveBuildOptions | workspace,project,configuration→{tsConfig:string,fileReplacements:readonly {replace:string,with:string}[]} |
| normalizeReplacements | root,entries→ReadonlyMap<string,string>。絶対化・正規化・存在確認。重複replace・循環・同一replaceへの異なるwithは設定エラー |
| createProgram | context:BuildContext→Result<ts.Program>。追加rootや未選択構成を混ぜない |
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
// collectConfigurations(item:TmplAstElement):Result<LayoutConfiguration[]>
// readSpan(node:TmplAstElement):Result<LayoutChild>
// validateConfiguration(items:LayoutConfiguration):Diagnostic[]
// decimalTotal(raws:readonly string[]):{equals100:boolean,actual:string}
```

findItemsはElementのchildren、Ifの各branch、Forのchildren／empty、その他解析可能Blockの子へ走査を継続する。外側Itemで反復禁止を検出しても、その内部の別Itemを検査し忘れない。各ItemのcollectConfigurationsだけが「論理兄弟」境界を扱う。

collectConfigurationsはng-containerの不正Spanを先に008へ記録してから再帰展開して表示要素を収集し、(A)通常要素＋独立したelseなしIf群なら一つの全表示構成、(B)通常要素＋一つの排他If連鎖なら明示branchごとの構成を返す。各If branchは展開後一要素。条件のネスト、複数排他連鎖の組合せ、明示空branch、兄弟For、Template／Content等はLAY-03の診断とする。@letやコメント・空白は幅項目にしない。別のComponent内部へ兄弟展開を進めない。

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

## ACGIMPL-02 JavaScript検証ブリッジの全境界

配置はio.github.soracity.alfred.generator.validation.AcgJavaScriptValidationBridge。内部Java record BridgeConfig(Path nodeExecutable,Path typescriptModulePath,Duration timeout,int maxOutputBytes)。constructor(BridgeConfig)は全Pathを絶対化、nodeが実行可能、typescriptModulePathが読める実ファイル、timeout>0、maxOutputBytes>0を検査。推奨実行構成はtimeout=30秒、maxOutputBytes=1048576（内部保護値で画面仕様ではない）。既存ACG起動構成からnodePathと対象Bruce/node_modules/typescript/lib/typescript.jsを渡す。PATH依存やオンラインインストールへ黙ってfallbackしない。

public validateRegex(List<RegexInput>):void、validateSyntax(List<SourceInfo>):voidを維持。RegexInput(String file,String physicalName,String source)は全String必須、regex sourceは空を形式条件で別検査。SyntaxInputはSourceInfo.sourcePackage()/sourceFileName()/Source()から{file,source}へ写す。ファイル名だけで重複しないようpackageとrelative filenameを結合した識別子をfileとする。Source()は大文字Sの既存アクセサー。

JSONはGson 2.13.2を使用し、文字列連結しない。AlfredCodeGenerator/build.gradle.ktsへimplementation("com.google.code.gson:gson:2.13.2")を追加する内部依存設計とし、既存配置済みと偽らない。Gson.toJsonでrequest出力、JsonParser.parseString/JsonObjectでresponseを型・必須field検査する。共通request={version:1,mode:'regex'|'syntax',typescriptModulePath:string,items:[...]}。regex item={file,physicalName,source}、syntax item={file,source}。Nodeはversion/modeと全必須フィールド型を検査し、不正要求はstderrに理由を1行、終了2。成功stdout={ok:true}、定義不正stdout={ok:false,index:number,message:string}、正常プロトコルはいずれも終了0。indexは0以上items.length未満。stdoutに他ログを混ぜない。

リソース/validation/validate-ui-values.mjsをgetResourceAsStreamで読み、専用temp directoryへcopyする。存在しなければAcgSystemException。ProcessBuilder(List.of(nodeExecutable,scriptPath))、shellなし、UTF-8 JSONをstdinへ書きclose。stdout/stderrはExecutorServiceの2 taskで同時に読み、各maxOutputBytesを超えたらプロセスを終了してシステム例外。waitFor(timeout)がfalseならdestroy→短い終了猶予→destroyForcibly、task.cancel。InterruptedExceptionはdestroyForcibly→interruptフラグを戻す→AcgSystemException。finallyでstream close、task終了、executor shutdownNow、script/tempを削除。削除失敗は主例外のsuppressedへ添付し、検証成功を捏造しない。

終了非0/timeout/壊れたJSON/余分なstdout/不正index/欠落fieldはAcgSystemException。ok=falseは元定義のfile/physicalName/列/値/messageを持つAcgRuntimeException。最初の定義不正で終了し、SourceInfoの書込みへ進めない。

Node scriptはimport {createRequire} from 'node:module'、import {pathToFileURL} from 'node:url'。const require=createRequire(import.meta.url)、const ts=require(absoluteTypescriptModulePath)で対象のCommonJS TypeScriptをロードする（ESM default exportを推測しない）。regexはnew RegExp(source)、TSはts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS)のparseDiagnosticsを検査。createSourceFileの型検査ではないことを明記する。sourceをeval/Function/importで実行しない。regexは入力文字列への.testを行わず構文だけ確認する。例外をcatchしfirst indexでok=false。stdin read/JSON/モジュールロード障害は終了2。

## ACGIMPL-03 Enum定義書・型生成の完成形

AppUiColorEnum定義は02_COMPONENTに置き、定数11値は02章と一致。現行定義書にはACGが必要とする「列挙種別」チェック欄が欠けていたため、一般列挙型一つを選択する欄を補う。物理名・色の意味は変えない。出力ファイル名は既存定義のapp-ui-color-enum.tsを使い、参照importも同じ物理名へ統一する。パッケージ文字列は既存形式の単一backslash区切り。

文字表示Enumは既存CODE分類とapp-code-text-overflow-mode.enum.tsを保持。4値・単一Input・WRAP既定を変更しない。旧AppComponentTableCellBackgroundEnumは承認履歴として残すが、現行生成対象から外す。

生成対象の選択はACGの入力列挙段階で`AcgSourceSelector.select(root:Path,candidates:List<Path>,excluded:List<Path>):List<Path>`を通す。正規化済み相対パスの完全一致で旧専用背景Enumの一件を除外し、同名文字列の部分一致で他のEnumを消さない。excludedは生成実行の定義リストに固定記録。既存の全件走査で旧定義と新定義を二重生成しない。旧ファイル自体を削除したと報告しない。

AcgEnumSpecCodeGeneratorは既存のprivate constructor／public readonly name,value／static readonly各定数／values／valueOf／toEnum／toStringを生成する。一般Enumの色へCode Brandを無断付与せず、CODE Enumは既存Symbol実体Brandを保持する。表示type生成は全プロパティreadonly、配列wrapper／Injectable／FormGroupなし。Brand不要の表示DTOにBrandを追加しない。

## RELEASE-01 証跡の生成・保存・取得

04章のCIは公式build成功後にtools/create-build-evidence.mjsを実行する。成果物tarのSHAと、upload-artifactが作るZIP archiveのSHAを区別する。署名・Store公開を実行する指示ではない。

```ts
type BuildEvidence={
 commit:string;project:string;configuration:string;runId:string;runAttempt:number;
 artifactId:string;archiveSha256:string;artifactSha256:string;lockfileSha256:string;
 layout:'success';angular:'success';designCommit:string;acgCommit:string;
};
type ReleaseManifest=BuildEvidence;
type Requested={commit:string;project:string;configuration:string;artifactSha256:string};
// createBundle(outputDir:string,bundleFile:string):Promise<{artifactSha256:string}>
// createBuildEvidence(options:BuildEvidenceOptions):Promise<BuildEvidence>
// fetchVerifiedRun(repository:string,runId:string,attempt:number,token:string):Promise<BuildEvidence>
// assertReleaseEvidence(manifest:ReleaseManifest,requested:Requested,verifiedRun:BuildEvidence):void
```

createBundleは選択builder options.outputPath（stringまたはbase/browser形式）を解決し、browser成果物ディレクトリを専用dist.tarへまとめる。workspace外や不存在を拒否。Node spawnの引数配列でtarを実行し、失敗時は証跡を作らない。bundleの実bytesをnode:crypto SHA-256で計算。lockfileSha256はcheckoutしたpackage-lock.jsonの実bytes。designCommit/acgCommitは管理済みtools/release-inputs.jsonの40桁SHAから読み、未設定なら失敗する。

build成功→bundle作成→bundleだけをbruce-bundle-SHA-RUN-ATTEMPT名でupload-artifact→返却artifact-id/artifact-digestをcreateBuildEvidenceへ渡す→evidence.json生成→bruce-evidence-SHA-RUN-ATTEMPT名で別artifactへupload。evidenceが参照するのは先行するbundle artifactなので自己参照digestにならない。archiveSha256はupload-artifactのZIP digest、artifactSha256は中のdist.tarのdigest。

createBuildEvidenceのoptionsはworkspaceRoot/outputDir/bundleFile/outFile/project/configuration/commit/runId/runAttempt/artifactId/archiveSha256。commit/runId/attemptはCI提供のGITHUB_*環境から、project/configは同じbuild引数から取得。任意のsuccess文字列だけで成功を宣言せず、build stepのsuccess分岐からだけ呼ぶ。出力は専用temp fileへUTF-8 JSON→renameで置換。例外時は古い成功証跡を同じ実行のものとして残さない。

公開側は要求runId/attemptを明示し、actions:readのtokenでGET /repos/{repository}/actions/runs/{runId}、同attemptのjobs、run artifactsを取得する。run.head_sha=要求SHA、status=completed、conclusion=success、configured workflow path=.github/workflows/bruce-build.yml、job layout-and-angular conclusion=successを要求。別attemptのjobや直近成功を代用しない。ページングを最後まで読み、同じ名前が0/複数なら失敗。

evidence artifactをダウンロードしschemaを検査、bundle artifactのid/expired/workflow_run.head_shaをAPI結果と照合する。GET /repos/{repository}/actions/artifacts/{id}/zipの302をHTTPSで追跡して取得し、ZIPのSHA-256をAPI digestのsha256:接頭辞除去後/manifest.archiveSha256と比較。archive内は期待するdist.tarだけを読み、absolute/.. pathやsymlinkを展開しない。dist.tar bytesのSHAをrequested/manifest.artifactSha256と比較。失効/認証/404/不正schema/不一致は非0で停止し、ネットワーク障害を成功へしない。

verifiedRunはAPIから確認したrun/job/artifactと、同じtrusted workflowが作ったevidenceから構成する。assertReleaseEvidenceはcommit/project/configuration/artifactSha256をrequested/manifest/runの三者一致、runId/attempt/artifactId/archiveSha256/lockfileSha256/designCommit/acgCommitをmanifest/run一致とする。SHA40桁、digest64桁、IDs十進非空、attempt正整数、layout/angular成功を検査。HTTP tokenはログ/JSONへ出さない。最後に確認済みbundleとmanifestだけを配布側へ渡す。native署名や配布先は別のアプリ設計のまま。

一次資料：[GitHub artifact REST](https://docs.github.com/en/rest/actions/artifacts)、[upload-artifact v4](https://github.com/actions/upload-artifact/tree/v4)。API artifact digestと中身のtar digestを同一と仮定しない。

## 検証

T-CHECK-26：templateなし空Componentを正常解析し、同名HTMLの推測探索なし。T-ACG-21：Node未配置／不正JS regex／TS構文不正で既存出力を更新しない。T-ACG-22：AppUiColorEnumの一般列挙型・11値・出力名・旧専用Enum除外を生成対象で確認。T-CI-05：SHA一致でも別project／別configuration／別artifactなら公開を拒否。記載は実装後の試験仕様であり、ACG／Angular／CIの実行結果ではない。

## TOOL-05 内部型と全終了経路

06章のResult<T>を全失敗可能APIへ統一し、Array同士のunionで成功/失敗を判別しない。ConfigurationFailureというthrow/返却混在型は使用しない。

```ts
type AngularWorkspace={projects:Record<string,WorkspaceProject>};
type WorkspaceProject={projectType:string;architect?:{build?:BuildTarget};targets?:{build?:BuildTarget}};
type BuildTarget={builder:string;options:Record<string,unknown>;configurations:Record<string,Record<string,unknown>>};
type ResolvedOptions={tsConfig:string;fileReplacements:readonly {replace:string;with:string}[]};
type LayoutChild={node:TmplAstElement;span?:{raw:string;value:number}};
type LayoutConfiguration=readonly LayoutChild[];
// parseArguments(argv:readonly string[]):Result<BuildOptions>
// readWorkspace(root:string):Result<AngularWorkspace>
// candidateProjects(ws:AngularWorkspace):readonly string[]
// resolveBuildOptions(ws:AngularWorkspace,project:string,config:string):Result<ResolvedOptions>
// normalizeReplacements(root:string,entries:ResolvedOptions['fileReplacements']):Result<ReadonlyMap<string,string>>
// createProgram(context:BuildContext):Result<ts.Program>
// collect(context:BuildContext,program:ts.Program):{components:ComponentSource[];diagnostics:Diagnostic[]}
// extract(component:ComponentSource):Result<TemplateSource>
// parse(source:TemplateSource):Result<ParsedTemplate>
// findItems(nodes:readonly TmplAstNode[]):readonly TmplAstElement[]
// collectConfigurations(item:TmplAstElement):Result<LayoutConfiguration[]>
// readSpan(node:TmplAstElement):Result<LayoutChild>
// validateConfiguration(items:LayoutConfiguration):Diagnostic[]
```

project候補はapplicationかつbuild可能な対応builderを持つ全件を先に数える。configの有無で候補を減らして複数projectの明示要求を迂回しない。project確定後にconfigを検査する（不正なら003）。architect/targets両方が競合定義なら004。BuildContextのrootNames/replacementsはresolve済みだけを渡す。

checkLayoutはcreateProgram失敗ならdiagnosticsを返す。collectはComponentごとのmetadata診断を記録し他Component継続。各extract失敗は次Component、parse失敗は次template、collectConfigurations失敗は次Item、値/混在違反は派生合計を抑止。I/O障害が当該templateの読込みに限定されればTEMPLATE-002、workspace/Program作成を継続不能ならCONFIG-001/INTERNAL-001とする。想定外throwは最上位catchでINTERNAL-001を1件追加しstderrに英語で出力。診断codeにCONFIG/INTERNALを含むなら2、他診断あり1、0件0。wrapperは0件時だけngを起動し、child error/signal/非0は失敗。成功証跡の生成まで進めない。

findItemsは公式ASTのElement.children、IfBlock.branches[].children、ForLoopBlock.children/empty.children、SwitchBlock.cases[].children、DeferredBlock.children/placeholder/loading/errorのchildrenを探索。兄弟規則未定義のblockでも内側の独立Item探索は継続する。Componentの内部を別templateへ追いかけて重複列挙しない。

十進合計はraw数値リテラルを文字列として係数BigInt/scaleへ分解し、maxScale=max(0,...scale)に揃える。正/有限数の検査と厳密合計を別々にする。00/0x等の表記はAngular/TS number literalが許容しても十進正規表現に一致しなければ003。巨大桁で資源上限を超えた場合はINTERNAL-001（検査不能）で停止し、違反なしへ丸めない。

## ACGIMPL-04 入力metadataと既存モデルAPI

AcgUiSpecDtoはtitleList、summary、dtoType、dtoName、dtoPackage、dtoItemListの既存record。metadataは画面設計書L1、概要L2「１．概要」、DTO各項目L4「（１）DTO種別」「（２）DTO名称」「（３）DTOパッケージ」「（４）DTO項目定義」から取得。dtoTypeのチェックはDtoMemberTypeEnum.UI_FORM_DTO一つ、dtoNameはDataModelNameEnum.PHYSICAL_NAME/FILE_NAME/LOGICAL_NAMEから取得し、欠落/複数を拒否。UI生成器へ他のDTO種別を黙って渡さない。

classNameはTypeScript scannerでidentifierとして検査し、予約語・文法不正は生成前に拒否。filenameは単一basename（.ts必須、absolute/../区切り含む値は不可）。dtoPackageは既存単一backslash区切りの相対package。各segmentが空/./..なら拒否、OS出力root外へ解決しない。入力の論理名/summaryはコメント出力時に*/を* /へ無害化し、コメントから任意TSを挿入させない。16項目表のない入力やnull dtoItemListは不正（空リストは意図した空FormGroupとして許可）。

AcgClassModel.builder().className(name).isInjectable(true).providedInRoot(false).addImport(module,names...)、setClassCommentList(List<String>)、addField(AcgFieldModel)、build()を使用。isInjectableがprovidedInRootの既定を同時設定するため、必ずこの呼出し順でfalseを上書きする。AcgFieldModelはcommentList/scope/fieldName/readonly/isStatic/initializerの既存constructorを使用し、formGroupはreadonly=true/isStatic=false。AcgValueNewModel(className,List<AcgValueModelIF>)、AcgValueObjectModel(List<AcgValueObjectPropertyModel>)、AcgValueArrayModel、Boolean/Number/Null/String/Referenceの既存モデルを組み合わせる。createClassModelは引数なしでspecFile/uiSpecを読むためgenerateはインスタンスを同時共有しない。

AcgClassCodeGenerator.generateByClassModel(model):Stringの後でbridge.validateSyntax、SourceInfo(String sourcePackage,Path sourceFileName,String Source)を返す。アクセサーはsourcePackage()/sourceFileName()/Source()。書込みは既存出力制御だけ。既存DAOはisInjectable(true)のroot既定を維持し、UI改修で全呼出しを非rootへ変えない。既存Builder/getterの再実装を新たな公開APIとしない。

## ACGIMPL-05 物理名キー・出力の安全性

項目physicalNameはnull/空/空白だけ/重複を生成前に拒否。業務上のcamelCase等の命名制約は追加しない。全object propertyの出力をcomputed string keyに統一し、例として`['name']:...`、`['a-b']:...`を出す。一般objectモデルでも`__proto__:...`や単なる引用符の__proto__ keyはprototype setterになるため使用しない。UI項目の__proto__自体は次の構造予約名として拒否する。AcgClassCodeGenerator.appendObjectValueはescapeTsString(propertyName)の前後へ[ ]を付けてから:を出力。通常項目名でも出力規則を切り替えない。文字列escapeの定義は本章ACGIMPL-01。

TypeScriptの型推論はcomputed literal keyを保持する。画面の@let ctrlsは維持し、非identifier名はctrls['a-b']等で参照、FormGroup.getは区切り付き文字列でなくget(['a.b'])を使用する。Angular既存controls実装が同名のhasOwnPropertyメソッドへ依存するため、加えてFormGroup.value/getRawValueの通常object accumulatorが__proto__をown値として保持できないため、hasOwnPropertyと__proto__の2キーはframeworkの構造予約名として定義エラー（業務命名制約ではない）。constructor/a-b等の安全なown keyは生成後Object.hasOwnとFormGroup.controls/getの操作で確認する。

AcgSourceSelectorは正規化済みroot相対パス完全一致の除外だけを使い、旧専用色Enumの定義pathを実行リストへ明記する。root外候補はシステムエラー、除外候補は履歴に記録。生成先も正規化してroot内を要求する。検証完了前に既存ファイルを置換せず、全SourceInfoをtempへ書き終えてから出力制御が置換する。部分出力を正常終了にしない。

構造予約名の一次根拠：[Angular 21 FormGroup.contains/_reduceValue](https://github.com/angular/angular/blob/21.0.0/packages/forms/src/model/form_group.ts)。この2名を拒否するのは入力の欠落やprototype変更を防ぐ生成境界であり、業務名の自由な制限ではない。
