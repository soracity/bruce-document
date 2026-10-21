# UI Form DTO・表示用DTO・ACG 詳細設計

## FORM-01 UI Form DTO

UI Form DTOはACGが生成する@Injectable()のclass。FormGroupを継承しない。型付きFormGroupをreadonlyプロパティとして直接保持し、宣言時に初期化する。別のFormGroup定義classやフォームfactoryを新設しない。業務メソッドを持たせない。

```ts
@Injectable()
export class SampleFormDto {
  readonly formGroup = new FormGroup({
    title: new FormControl<string>(
      {value:'',disabled:false},
      {nonNullable:true,validators:[AppInputValidators.requiredTrim]}
    ),
    amount: new FormControl<Nullable<number>>(
      {value:null,disabled:false},
      {nonNullable:false,validators:[Validators.min(0)]}
    ),
    accepted: new FormControl<boolean>(
      {value:false,disabled:false},
      {nonNullable:true,validators:[Validators.requiredTrue]}
    ),
    matchType: new FormControl<Nullable<AppCodeMatchTypeEnum>>(
      {value:AppCodeMatchTypeEnum.toEnum('0'),disabled:false},
      {nonNullable:false,validators:[Validators.required]}
    )
  });
}
```

上のSampleFormDtoは生成形の契約例。画面用の実体は画面定義から生成する。readonlyはFormGroup参照の差替えを防ぎ、control値の編集を禁止しない。number/Enumのresetはnull、nonNullableなstring/booleanは初期値へresetする。必須指定を初期値補完の理由にしない。

## FORM-02 画面単位DIと接続

```ts
@Component({
  selector:'app-sample',
  providers:[SampleFormDto],
  imports:[ItemStackLayoutComponent,LayoutItemComponent,TextboxComponent],
  templateUrl:'./sample.component.html'
})
export class SampleComponent {
  readonly dto = inject(SampleFormDto);
}
```

```html
@let ctrls = dto.formGroup.controls;
<app-item-stack-layout>
  <app-layout-item>
    <app-textbox [control]="ctrls.title" />
  </app-layout-item>
</app-item-stack-layout>
```

UI Form DTOにprovidedIn:rootを生成しない。Componentのprovidersを必ず登録する。テストでも各画面インスタンスで別FormGroupを持つことを検証する。TS側のcontrols短縮aliasは廃止し、HTMLの@letだけを使う。

## FORM-03 値の境界変換

`FormControl<Nullable<Enum>>.value`はEnumインスタンスまたはnull。コード文字列はさらに.valueで取得する。`control.value`一回だけでコード文字列が得られると記述しない。既にEnumであるUI内部値へ毎回toEnumを適用しない。

```ts
const selected = this.dto.formGroup.controls.matchType.value;
if (selected === null) {
  this.dto.formGroup.controls.matchType.markAsTouched();
  return;
}
const code: string = selected.value;
// codeを、アプリで定義済みのApplication Request DTOへ設定する。
```

逆方向：ApplicationのコードがnullならUIもnull、コード文字列なら`AppCodeMatchTypeEnum.toEnum(code)`で変換してpatchValueする。不正コードはtoEnumがthrowし、初期値へ推測補正しない。ロード異常として画面側の既存異常経路へ渡す。UI DTO→Application DTOのMapper/Converter/Assembler Class/Service/Utilは作らない。変換は画面Component内で明示する。

Enum.FALSEオブジェクトをbooleanとして評価しない。`value===null`と`value===SomeEnum.TRUE/FALSE`を区別する。型アサーションでEnum→string不整合や不明なApplication DTOを隠さない。

## FORM-04 検索条件と明細

検索条件は独立UI Form DTO/FormGroup。表示専用結果はACG生成の1行typeの配列。編集明細はFormArray<FormGroup<...>>。1画面に複数FormGroupが存在してよい。画面全体を包むだけの親DTOを新設しない。同じ入力にReactive FormsとngModelを併用しない。

```ts
// ACG生成形。表示用DTOはclass/interfaceで新設しない。
export type SampleRowDto = {
  readonly id: string;
  readonly title: string;
  readonly amount: Nullable<number>;
};
// 画面Componentが配列を保持する。
resultList: SampleRowDto[] = [];
```

検索後は同じComponentが生存する間メモリに保持し、破棄後の自動永続化を新設しない。行変更は新オブジェクトで置換する。readonlyはTypeScript上の制約でありObject.freezeを勝手に追加しない。表示DTOの型は画面側で手書きせず既存データモデル設計書→ACG type生成を再利用する。

## FORM-05 Validation境界

FormControlはrequired、文字数、形式、画面入力だけで完結する範囲を保持する。日付/日時の入力形式はDateComponentが保証し、ACGは専用日付Validatorを生成しない。Domainは業務意味・状態の整合性を保証する。同じ業務アルゴリズムをUIとDomainへ二重実装しない。一方、入力利便性の検査を置いたことを理由にDomain保証を削除しない。

ApplicationへFormGroup/FormControl/Angular Validatorを渡さない。入力エラー時の保存可否・遷移は各アプリのユースケース設計で決め、共通UIへ埋め込まない。

## ACG-01 解析・生成の構造

対象は`io.github.soracity.alfred`。旧`com.github...`を改修しない。画面UI生成はHTMLを生成しない。

| 実装対象 | 主要プロパティ・API | 契約/フロー |
|---|---|---|
| AcgUiSpecParser | parse対象のPath→AcgUiSpecDto | Markdown注釈解析。16列の位置固定 |
| AcgUiSpecDto | DTO種別/名称/パッケージ/項目一覧 | UI Form classの入力定義 |
| AcgUiSpecListDto | 16個のString record属性 | 型/文字種/形式/範囲を解釈、列条件検査 |
| AcgUiSourceGenerator | specFile:Path、uiSpec:AcgUiSpecDto、classCodeGenerator | generate(Path,AcgUiSpecDto):List<SourceInfo> |
| AcgClassModel | className/imports/fields/methods/isInjectable/providedInRoot | classの言語表現。業務仕様を推測しない |
| AcgClassCodeGenerator | generateByClassModel(AcgClassModel):String | import→コメント→decorator→class→field/method |
| AcgDataModelSpecParser/Dto | type種別/名称/パッケージ/プロパティ | 表示用値DTOの入力 |
| AcgDataModelSourceGenerator | generate(Path,SpecDto):List<SourceInfo> | typeモデルを作り既存type生成器へ渡す |
| AcgDataModel | name/brand/properties | TsProperty(comment,name,type,readonly) |
| AcgDataModelCodeGenerator | generateByDataModel(AcgDataModel):String | readonly付きexport typeを出力 |
| AcgEnumSpecCodeGenerator | generate(Path,EnumSpecDto):List<SourceInfo> | 列挙型設計書から既存Enum形式を出力 |

SourceInfoは既存record SourceInfo(String sourcePackage,Path sourceFileName,String Source)。アクセサーはsourcePackage()/sourceFileName()/Source()。入力metadata・Builder呼出し順・全依存APIは29章ACGIMPL-04を正本とする。ソースの書込みは既存ACGの出力制御が担当し、UI生成器内で勝手に別ディレクトリへ書かない。

## ACG-02 16列の完全定義

| 0始まり列 | record属性 | 見出し |
|---|---|---|
| 0 | no | No |
| 1 | group | グループ |
| 2 | logicalName | 論理名 |
| 3 | physicalName | 物理名 |
| 4 | type | 型 |
| 5 | enumType | Enum型 |
| 6 | disabled | 無効状態 |
| 7 | characterType | 文字種 |
| 8 | checkFormat | 形式 |
| 9 | checkRequired | 必須 |
| 10 | checkRequiredBoolean | 必須(真偽) |
| 11 | checkLengthRange | 文字数(最小/最大) |
| 12 | checkNumberRange | 数値(最小/最大) |
| 13 | checkRegex | 正規表現 |
| 14 | defaultValue | デフォルト |
| 15 | memo | 備考 |

旧14列互換・ヘッダー名フォールバックを追加しない。表中のパイプのエスケープをMarkdown解析器で扱い、単純split('|')で正規表現列を壊さない。不正列数はコード生成前にエラー。既存サンプルのサーブ順等はアプリ固有項目であり、生成器に専用分岐を作らない。

## ACG-03 AcgUiSourceGeneratorのメソッド

| メソッド | 引数→戻り値 | 内容 |
|---|---|---|
| generate | Path,AcgUiSpecDto→List<SourceInfo> | 全項目検証→モデル生成→TS生成→出力情報 |
| validateUiSpec | SpecDto→void | validateItemを順番に実行。最初の不正で例外 |
| validateItem | Item→void | 11章の型別全許可表・12章の初期値制約を検査 |
| createClassModel | なし→AcgClassModel | Injectable/Componentスコープ、imports、readonly formGroup |
| createFormControlList | SpecDto→AcgValueObjectModel | 各項目の型/初期値/disabled/nonNullable/validatorsを作る |
| createFormControlType | Item→String | 文字列string、数値Nullable<number>、真偽boolean、Enum Nullable<実型> |
| isNonNullable | Item→boolean | 文字列/真偽true、数値/Enum false。バイナリはUI不可 |
| createValidators | Item→List<AcgValueModelIF> | 12章の順序と全マッピング |
| createInitialValue | Item→AcgValueModelIF | 12章の全初期値表 |
| createEnumImportPath | String→String | 末尾Enum必須→末尾除去→kebab-case→code/配下の.enum |
| usesAppDateUtil | Item→boolean | 対応予約語の時だけtrue |
| invalid | Item,column,value,reason→AcgRuntimeException | 元ファイル/項目/不正列と理由を含む診断 |

Enum import基準は既存画面サンプルに従い`@approot/app/brf9000/brf9011-enum/code/`。例AppCodeMatchTypeEnum→app-code-match-type.enum。importの同一モジュール・同一識別子は重複排除する。共通色EnumはComponentのスタイル入力としてcomponent配下から使い、UI FormのコードEnum import規則と混同しない。別パッケージEnumをForm値に新規採用する場合は定義形式も含め別の設計変更として扱う。

## ACG-04 Injectable・readonly・type

AcgClassModelはisInjectableとprovidedInRootを分離する。isInjectable=true/providedInRoot=false→@Injectable()、true/true→@Injectable({providedIn:'root'})。falseならdecoratorなし。UI Form DTOは前者、既存root DAO等は後者。UI生成のために全DAOを画面スコープへ変更しない。

表示typeは全プロパティreadonly=trueでモデルを作る。既存AcgDataModelSourceGeneratorがその指定を行っていることをソースで確認した。表示DTOに不要なBrandを追加しない。Brand使用時の標準は11章。既存type生成器のdeclare Brand出力は標準方針との差分として15章へ記録し、表示DTOへの新規流用をしない。

## ACG-05 異常処理・再生成

metadata・全項目・JS regex・生成TS構文の検証を終えてから出力ファイルを置換する。physicalNameは29章のcomputed string keyで出力し、__proto__を通常own controlとして維持する。失敗した定義の中途半端なTSを既存正常ファイルへ上書きしない。Exceptionは物理名・型・Enum型・文字種・不正列・値・理由を含む。静的検査器の全件収集とACGのFail Fastを混同しない。

再生成比較では、生成日時/元ファイルmtime等の可変ヘッダーだけを比較から分離し、型・import・初期値・Validator・readonly・decorator・プロパティ順は一致させる。生成物直接修正を正本にせず、定義/解析器/モデル/生成器/テストを直す。

テスト：T-FORM-01〜08、T-ACG-01〜20。HTML/CSSはこの生成器の出力対象ではない。画面HTMLは01/06/13章に従って手書きまたはAIが実装する。

実装補完：[29章](29_静的検査器・ACGの実装補完.md)にJavaScript検証ブリッジ、Enum定義入力の必須メタデータ、旧専用Enumの除外を記す。
