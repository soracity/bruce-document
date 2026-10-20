# 型・Nullable・Brand・Validation許可表 詳細設計

## TYPE-01 Nullableの定義・適用

`src/global.d.ts`はscriptとして次を定義し、トップレベルimport/exportを記述しない。

```ts
type Nullable<T> = T | null;
```

プロパティ・引数・戻り値・変数・FormControl・ACG生成物でnull許容はNullable<T>へ統一する。undefinedは含めない。これは型エイリアスでありnullチェックを不要にしない。ACGはNullable用importを出力しない。

現行global.d.tsはEnum interfaceをimportしてdeclare global/exportを持つ。グローバル値/eventKey型は別の`src/app-component-types.d.ts`へ分離し、そちらだけをmodule+declare globalにする。Nullable専用global.d.tsをscriptに戻し、既存の値/eventKeyの機能を失わない。

```ts
// app-component-types.d.ts
import type { AppCodeEnumIf } from './app/brf9000/brf9011-enum/code/app-code.enum-if';
declare global {
  type AppComponentValueType = string | number | boolean | AppCodeEnumIf;
  type AppComponentEventKeyType = AppComponentValueType;
}
export {};
```

FormControlのTとeventKeyの型は独立。stringだけに限定して既存Radioの対応を壊さず、Button/Toggle等の既存string契約を無断で全変更しない。

## TYPE-02 TypeScriptTypeEnum

共通型分類をTypeScriptPrimitiveTypeEnumからTypeScriptTypeEnumへ改名。UI専用の別型分類を追加しない。現行packageはio.github.soracity.alfred.markdown.mdenum。

| 定数 | 設計書の値 | 通常TS型 | UI Form型 |
|---|---|---|---|
| STRING | 文字列 | string | string |
| NUMBER | 数値 | Nullable<number> | Nullable<number> |
| BOOLEAN | 真偽 | Nullable<boolean>（既存値DTO契約） | boolean |
| UINT8ARRAY | バイナリ | Nullable<Uint8Array> | 使用不可、例外 |
| ENUM | Enum | 固定型なし | Nullable<Enum型列の実型> |

DATE/DATE_TIMEを型分類へ戻さない。日付・日時は文字列＋形式。getTsPrimitiveType()でENUMが要求された場合はAcgRuntimeException。固定のany/object/stringへ置き換えない。Enum実型はEnum型列を解釈できる生成器が解決する。

## TYPE-03 Brand

Bruce全体でBrandを使用する場合は**Symbolの実体Brand**を標準とする。declareだけのBrandや通常文字列__brandを標準にしない。Enum以外へ無条件にBrandを増やす指示ではない。

```ts
export const APP_CODE_ENUM_BRAND = Symbol('AppCodeEnumIf');
export interface AppCodeEnumIf {
  readonly [APP_CODE_ENUM_BRAND]: true;
  readonly name: string;
  readonly value: string;
}
// ACG生成Enum class
readonly [APP_CODE_ENUM_BRAND] = true;
```

実行時識別、AI/手動実装の統一、通常JSONに混入しないことが理由。Enumのvalues()は定義されたインスタンス一覧、valueOf(name)・toEnum(code)は一致インスタンス、不明値はError。toStringはnameでありCSS値とは限らない。EnumをJSONから復元する際はtoEnumで正規インスタンスへ戻す。

Enum以外のBrand用Symbolの配置・型ガード・ACG対応は必要が生じた時の別設計。表示readonly typeには今回不要なBrandを新設しない。旧データモデル生成器のdeclare Brandは「対応済み」と誤記しない。

## VALID-01 型別の全許可組合せ

「可」は任意指定、「必須」は列指定必須、「—」は指定不可。文字列の各行は別の許可パターン。表にない組合せは生成前にException。

| 型 | Enum型 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数 | 数値範囲 | 正規表現 |
|---|---|---|---|---|---|---|---|---|
| 文字列 | — | — | — | — | — | — | — | — |
| 文字列 | — | Unicode | — | 可 | — | 可 | — | — |
| 文字列 | — | ASCII | 半角数字 | 可 | — | 可 | — | — |
| 文字列 | — | ASCII | 半角英数字 | 可 | — | 可 | — | — |
| 文字列 | — | ASCII | 半角英数字記号 | 可 | — | 可 | — | — |
| 文字列 | — | ASCII | 正規表現 | 可 | — | 可 | — | 必須 |
| 文字列 | — | — | 日付 | 可 | — | — | — | — |
| 文字列 | — | — | 日時 | 可 | — | — | — | — |
| 数値 | — | — | — | 可 | — | — | 可 | — |
| 真偽 | — | — | — | — | 可 | — | — | — |
| Enum | 必須 | — | — | 可 | — | — | — | — |

文字列/文字種なし/形式なしはValidationなし。必須だけの追加も不可。UnicodeはUnicode判定用パターンを生成せず、ASCII限定をしない意味。ASCIIは形式必須で、印字可能ASCIIの空白許可と必須trim判定を分離する。

日付・日時は文字種・文字数・数値範囲・正規表現なし。ACGは必須だけ生成でき、入力形式はDateComponentが担う。無効状態・デフォルトはこの許可表と別に検査する。

## VALID-02 不許可組合せの全基準例

| 入力 | 期待する不正理由 |
|---|---|
| 文字列/文字種なし/形式なし/必須〇 | Validationなし行へ制約を追加した |
| 文字列/ASCII/形式なし | ASCII形式必須 |
| 文字列/Unicode/半角数字 | Unicodeに形式指定不可 |
| 文字列/ASCII/日付 | 日付の文字種はなし |
| 文字列/日時/文字数1/20 | 日時に文字数不可 |
| 数値/ASCII | 数値に文字種不可 |
| 数値/文字数1/3 | 数値は数値範囲のみ |
| 真偽/必須〇 | 真偽は必須(真偽)のみ |
| Enum/Enum型なし | 実型必須 |
| Enum/文字数あり | Enumは通常必須以外不可 |
| 型!=Enum/Enum型あり | 非EnumにEnum型不可 |
| 正規表現形式/regexなし | regex列必須 |
| 形式!=正規表現/regexあり | regex列指定不可 |
| 最小>最大 | 範囲の逆転 |
| UI型=バイナリ/日付/日時 | UIの型分類外 |

〇はU+3007、未指定は`-`。他のチェック記号を推測受理しない。現在ACGに残る空欄/null許容のisEmptyMarkは入力互換の観察事実。正本設計書では`-`を明示する。通常文字列のデフォルト値の空白をtrimして値自体を書き換えない。

## VALID-03 範囲の解析

`AcgUiSpecListDto.getMinMaxSplit(value:String):Integer[2]`。文字数/数値範囲で共通利用。以下の既存サンプル規則を維持する。

| 指定 | min | max |
|---|---|---|
| - | なし | なし |
| 10 | 0 | 10 |
| 3/10 | 3 | 10 |
| -/10 | なし | 10 |
| 3/- | 3 | なし |
| 10/10 | 10 | 10 |

整数・非負、端の空白は解析上除去。空の片側、3/4/5、-/−、最小>最大、Integer範囲外、負数はAcgSystemException。-/-は範囲指定がない`-`へ自動補正せず不正。値DTOの一般的な負数を禁止する意味ではなく、この既存画面範囲列の契約である。将来負数/小数範囲を要求する場合は別設計。

文字数min=0は冗長なminLength(0)を生成しない。数値min=0はmin(0)を生成する。Validator生成順と値検証は12章。

## VALID-04 日付・日時の意味

日時は実際の瞬間をUTC ISO 8601で保持し、表示時に端末のタイムゾーン/ロケールへ変換する。例2026-10-16T06:24:00.000Z。暦日YYYY-MM-DDはタイムゾーン変換を行わない。日付形式は互換/明確な暦日用途に限定し非推奨。予定/出来事の瞬間に日付だけを使用しない。

日付表示をyyyy/MM/ddやMM/dd/yyyyで固定しない。ja-JP/en-US/en-GBの差は表示の責務。13章のDateの具体的入力とDSTの未決を、単なる文字列型の話で隠さない。

## VALID-05 例外と試験

AcgRuntimeExceptionは定義の型/組合せ/デフォルト不正、AcgSystemExceptionは範囲解析等の既存checkedエラー、IOExceptionはI/O。少なくともファイル、物理名、型、Enum型、文字種、不正列、値、理由を含める。Fail Fastで生成を止め、禁止列を無視して生成しない。

テスト：T-ACG-01〜20、T-FORM-03/04、T-DATE-01〜07。HTML/CSSはこの型/生成検査にはない。
