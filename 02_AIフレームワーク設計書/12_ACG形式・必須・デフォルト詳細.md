# 形式・必須・デフォルト値の実装設計

## FORMAT-01 全形式とValidator

| 文字種/形式 | 生成するValidator | 未入力時 |
|---|---|---|
| なし/なし | なし | 制約なし |
| Unicode/なし | 指定したrequiredTrim、minLength/maxLength | 必須未指定なら空を許容 |
| ASCII/半角数字 | Validators.pattern('^[0-9]+$') | pattern自体は空を許容 |
| ASCII/半角英数字 | Validators.pattern('^[A-Za-z0-9]+$') | 同上 |
| ASCII/半角英数字記号 | Validators.pattern('^[ -~]+$') | 同上 |
| ASCII/正規表現 | 指定regexのValidators.pattern。ASCII文字種の保証も検査 | 必須とは分離 |
| なし/日付・日時 | 専用形式Validatorを生成しない | 必須指定時のみrequiredTrim |

半角英数字記号はU+0020〜U+007E、半角スペースを含む。タブ・改行・全角文字はこの形式で許可しない。UnicodeはASCIIを禁止する意味ではなく、Unicode専用のパターンを生成しない。

正規表現列はJavaScript正規表現のsourceを文字列として受ける。`/.../g`のようなRegExpオブジェクトのJavaScript式をevalしない。先頭/末尾アンカーを指定していない場合の挙動はAngular Validators.pattern(string)に従う。ASCII/正規表現の文字種保証はAppInputValidators.asciiで0x00〜0x7f外を拒否し、regexと併用する。形式だけを調整してUnicode入力へ拡張しない。

## FORMAT-02 AppInputValidators

配置：`src/app/brf9000/brf9017-utils/app-input-validators.ts`。状態なしstatic Class、private constructor。HTML/CSS・DIなし。

```ts
static requiredTrim(control: AbstractControl): ValidationErrors | null {
  const value: unknown = control.value;
  if (value === null || value === undefined) return {required:true};
  if (typeof value !== 'string') return {stringType:true};
  return value.trim().length === 0 ? {required:true} : null;
}
static ascii(control: AbstractControl): ValidationErrors | null {
  const value: unknown = control.value;
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string') return {stringType:true};
  return /^[\x00-\x7F]*$/.test(value) ? null : {ascii:true};
}
```

requiredTrimは値自体を書き換えない。trim対象はJavaScriptのString.trimが扱う空白。文字列の必須と形式の責務を分離する。数値/EnumのrequiredはValidators.required、真偽の必須(真偽)はValidators.requiredTrue。

| 値 | 文字列必須 | 数値必須 | 真偽必須 |
|---|---|---|---|
| null | NG | NG | NG |
| '' | NG | 型不正 | 型不正 |
| ' ' / '   ' | NG | 型不正 | 型不正 |
| 'abc' / 'abc def' | OK | 型不正 | 型不正 |
| 0 | 型不正 | OK | 型不正 |
| false | 型不正 | 型不正 | NG |
| true | 型不正 | 型不正 | OK |

## FORMAT-03 Validatorの生成順と範囲

1. 文字種/形式Validator（ある場合）。
2. 型別の必須Validator（指定時）。
3. minLength/min、maxLength/max（指定時）。

日付・日時で上記1を生成しない。文字列形式なし/文字種なしは全Validationなし。必須〇以外の不正チェック記号をfalse扱いして通さない。

文字数は既存Angular Validators.minLength/maxLengthの契約を利用する。JavaScript文字列lengthでありUTF-16単位。日本語「あ」は1、サロゲートペアの絵文字は2となる。書記素単位の独自カウントへ勝手に変更しない。空の任意項目にminLengthだけを指定しても、必須と同義にしない。

範囲`10`：文字列はmaxLength(10)だけ、数値はmin(0)/max(10)。`3/-`はmin側のみ、`-/10`はmax側のみ、`-`は両方なし。0の最大値も正しく生成する。

## DEFAULT-01 全初期値の表

| 型/形式 | デフォルト列 | 型と初期値 | nonNullable |
|---|---|---|---|
| 文字列一般 | - | string / '' | true |
| 文字列一般 | 任意文字列 | string / 指定文字列 | true |
| 数値 | - | Nullable<number> / null | false |
| 数値 | 数値 | Nullable<number> / 指定数値 | false |
| 真偽 | - | boolean / false | true |
| 真偽 | true | boolean / true | true |
| 真偽 | false | boolean / false | true |
| Enum | - | Nullable<対象Enum> / null | false |
| Enum | コード値 | Nullable<対象Enum> / 対象Enum.toEnum('コード') | false |
| 文字列/日付 | - | string / '' | true |
| 文字列/日付 | SYSTEM_DATE | string / AppDateUtil.getSysDateIso8601() | true |
| 文字列/日時 | - | string / '' | true |
| 文字列/日時 | SYSTEM_DATETIME | string / AppDateUtil.getSysDateTimeUtcIso8601() | true |

必須〇＋デフォルト-は未入力状態から開始する。ACGがEnum先頭値・数値0・現在日時を推測補完しない。createDateTime/updateDateTime/deleteDateTimeも項目名から特別扱いしない。

`-`は未指定の予約値であり、この列形式で文字列リテラル'-'を表すエスケープ規約は定義されていない。必要が生じた場合は別設計とし、空値と取り違えて生成しない。

## DEFAULT-02 予約語とFail Fast

| 型/形式＋指定 | 結果 |
|---|---|
| 文字列/日付＋SYSTEM_DATE | AppDateUtil.getSysDateIso8601() |
| 文字列/日時＋SYSTEM_DATETIME | AppDateUtil.getSysDateTimeUtcIso8601() |
| 日付＋SYSTEM_DATETIME | Exception |
| 日時＋SYSTEM_DATE | Exception |
| 日付/日時以外＋いずれか予約語 | Exception |
| 日付＋2026-10-16 | Exception |
| 日時＋2026-10-16T06:24:00.000Z | Exception |
| 日付/日時＋- | '' |

日付/日時は-または対応予約語のみ。一般文字列の「任意文字列可」の例外。予約語文字列をそのままFormControlへ渡さない。

AppDateUtilは既存`src/app/brf9000/brf9017-utils/app-date.util.ts`。getSysDateIso8601():stringは端末システム日付のYYYY-MM-DD、getSysDateTimeUtcIso8601():stringはnew Date().toISOString()。ACG生成時点の日時を定数として埋め込まず、DTOインスタンス生成時のメソッド呼出しを出力する。独自の日付取得コードをACGに作らない。

## DEFAULT-03 文字列・数値・Enumの出力

| 処理 | 具体契約 |
|---|---|
| TS文字列エスケープ | 単引用符、backslash、CR/LF、U+2028/U+2029をエスケープ。元の値をtrim/大文字化しない |
| 正規表現文字列 | regexのbackslashと引用符をTS文字列として二重化。Markdownのパイプescapeを値に残さない |
| 数値 | 数値として解釈不能/非有限はException。負数のデフォルトと非負の範囲列は別契約 |
| 真偽 | true/falseのみ。TRUE/1等へ自動変換しない |
| Enumコード | 文字列としてエスケープしてtoEnumへ渡す。数値0の見た目でも文字列'0' |
| Enum不正コード | toEnumの不明値例外。先頭Enumへのフォールバック禁止 |
| 無効状態 | 〇→{disabled:true}、-→false。Validation表と独立 |

不正正規表現は生成検証でJavaScriptパターンとして確認し、JavaのPatternで代用しない。JavaとJSの正規表現仕様を同じとみなさない。生成後のTS/Angularテストでパターンの構文と期待入力を確認する。生成物の構文が不正なまま既存正常ファイルを上書きしない。

## DEFAULT-04 生成例

```ts
readonly formGroup = new FormGroup({
  code: new FormControl<string>(
    {value:'',disabled:true},
    {nonNullable:true,validators:[Validators.pattern('^[0-9]+$'),Validators.maxLength(6)]}
  ),
  requiredText: new FormControl<string>(
    {value:'',disabled:false},
    {nonNullable:true,validators:[AppInputValidators.requiredTrim]}
  ),
  currentDateTime: new FormControl<string>(
    {value:AppDateUtil.getSysDateTimeUtcIso8601(),disabled:false},
    {nonNullable:true,validators:[]}
  ),
  optionalNumber: new FormControl<Nullable<number>>(
    {value:null,disabled:false},
    {nonNullable:false,validators:[]}
  )
});
```

必要なモジュールだけimportし、同じ識別子を重複出力しない。Nullableはimportしない。サンプルのFormGroup自体を手修正するのではなく、設計書と生成器を変更する。

## DEFAULT-05 試験

T-ACG-01〜20により、許可表全11行・禁止列・必須の空白・数値0・真偽false・Enum null・デフォルト全13行・予約語不一致・引用符/backslash/改行・import重複・再生成一致を検証する。既存Javaテストの存在と今回実行した試験は区別する。
