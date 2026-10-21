# ACG型・Nullable・Validation詳細設計（承認済み仕様の転記整理）

> 出典：[Phase 2.6](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md) 2.6.6〜2.6.8（原典561〜923行）。**設計仕様**であり、ACG実装済み・検証済みとは判定しない。2.6.9〜2.6.14の全詳細や他原典との双方向監査は別途必要。

## ACG-TYPE-001〜006：Nullable共通型（2.6.6・2026-10-16承認）

1. **ACG-TYPE-001**：Bruceの`src/global.d.ts`に`type Nullable<T> = T | null;`を定義する。
2. **ACG-TYPE-002**：`global.d.ts`はモジュール化せず、`import`と`export`を記述しない。
3. **ACG-TYPE-003**：Bruceの型表記とACG生成物で`A | null`を原則`Nullable<A>`へ統一する。対象はプロパティ・引数・戻り値・変数・`FormControl<Nullable<A>>`等。数値・真偽・Uint8Array・Enumにも適用する。
4. **ACG-TYPE-004**：ACGは`Nullable`のimportを生成しない。
5. **ACG-TYPE-005**：生成済みTSファイルの手修正は禁止。ACGの型生成処理を修正する。
6. **ACG-TYPE-006**：`Nullable<T>`は型エイリアスにすぎずnullチェックは引き続き必要。`undefined`は含めない。

## ACG-TYPE-007〜012：TypeScriptTypeEnum（2.6.7・2026-10-16承認）

7. **ACG-TYPE-007**：既存`TypeScriptPrimitiveTypeEnum`を`TypeScriptTypeEnum`へ改名する。UI専用の別型Enumは作らない。
8. **ACG-TYPE-008**：型分類は`STRING`、`NUMBER`、`BOOLEAN`、`UINT8ARRAY`、`ENUM`の5種。
9. **ACG-TYPE-009**：`DATE`と`DATE_TIME`を型分類から削除する。日付・日時はTS上の`string`として扱い、画面設計書の「形式」で区別する。
10. **ACG-TYPE-010**：`ENUM`の実際のTS型名は画面設計書の「Enum型」列で指定されたクラス名から解決し、型分類Enumに固定型名を持たせない。
11. **ACG-TYPE-011**：ACG内のDAO/UI DTOの旧DATE/DATE_TIME分岐を見直し、日付/日時の形式Enumを追加する。生成済みファイルは直接修正しない。
12. **ACG-TYPE-012**：ACGの現行パッケージは`io.github.soracity.alfred`。旧`com.github.soracity.alfred`を現行コードの修正対象として扱わない。

## ACG-VALID-001：型別許可組合せ（2.6.8・2026-10-16承認）

「指定可」は任意指定、「必須」は必ず指定、「—」は禁止。

| 型 | Enum型 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数最小/最大 | 数値最小/最大 | 正規表現 |
|---|---|---|---|---|---|---|---|---|
| 文字列 | — | — | — | — | — | — | — | — |
| 文字列 | — | Unicode | — | 指定可 | — | 指定可 | — | — |
| 文字列 | — | ASCII | 半角数字 | 指定可 | — | 指定可 | — | — |
| 文字列 | — | ASCII | 半角英数字 | 指定可 | — | 指定可 | — | — |
| 文字列 | — | ASCII | 半角英数字記号 | 指定可 | — | 指定可 | — | — |
| 文字列 | — | ASCII | 正規表現 | 指定可 | — | 指定可 | — | 必須 |
| 文字列 | — | — | 日付 | 指定可 | — | — | — | — |
| 文字列 | — | — | 日時 | 指定可 | — | — | — | — |
| 数値 | — | — | — | 指定可 | — | — | 指定可 | — |
| 真偽 | — | — | — | — | 指定可 | — | — | — |
| Enum | 必須 | — | — | 指定可 | — | — | — | — |

## ACG-VALID-002〜009：許可・禁止・例外（2.6.8）

- **ACG-VALID-002**：文字列・文字種なし・形式なしの場合はValidationなし。必須、文字数、正規表現を含め他のValidation指定を許可しない。
- **ACG-VALID-003**：Unicode文字列は形式なし。指定可能なのは必須と文字数最小/最大のみ。
- **ACG-VALID-004**：ASCII文字列は形式指定必須（半角数字・半角英数字・半角英数字記号・正規表現）。形式が正規表現のときだけ正規表現列を必須とする。
- **ACG-VALID-005**：日付・日時は文字列＋形式として表す。文字種・文字数・数値範囲・正規表現を指定しない。表示形式はロケールで決める。
- **ACG-VALID-006**：日付・日時の入力形式は入力Componentが保証する。ACGは専用形式Validatorを生成せず、画面設計書の必須指定がある場合のみFormControl必須Validatorを生成する。
- **ACG-VALID-007**：「半角英数字記号」は半角スペースを含む印字可能ASCIIを許す。ただし必須文字列がスペースのみならNG、trim後空文字で判定する。例：`abc def`は許可、`   `は必須NG。
- **ACG-VALID-008**：表にない組合せはACGが例外を発生させ、コード生成を停止する。推測して補正しない（Fail Fast）。
- **ACG-VALID-009**：「無効状態」「デフォルト」はこのValidation組合せ表とは別責務であり、表に含めない。

### ACG-VALID-008の禁止例（原典準拠）

```text
文字列 / 文字種なし / 形式なし / 必須あり → Exception
文字列 / ASCII / 形式なし → Exception
文字列 / Unicode / 半角数字 → Exception
文字列 / ASCII / 日付 → Exception
数値 / ASCII → Exception
真偽 / 通常の必須指定あり → Exception
Enum / Enum型指定なし → Exception
```

## 実装・検証への引継ぎ

- ACGで生成する`Nullable<T>`の参照と、Angularの型検査を実測する。
- 旧TypeScript型Enumの全参照、DAO生成・UI DTO生成の変更を確認する。
- 型別許可表の各行と禁止例を単体テスト化し、日付/日時はComponent側の入力保証と合わせて検証する。
- **現状は設計転記のみ**。ACG実装・自動テスト・全件双方向監査は未実施。
