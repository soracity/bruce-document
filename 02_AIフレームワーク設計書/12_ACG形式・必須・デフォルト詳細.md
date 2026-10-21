# ACG形式・必須・デフォルト詳細設計

> 出典：[Phase 2.6](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md) 2.6.9〜2.6.11（925〜1275行）。2026-10-16承認済み設計の整理。実装・検証済みではない。全件監査合格を意味しない。

## ACG-FORMAT-001〜005：形式チェック（2.6.9）

- **ACG-FORMAT-001**：画面設計書の形式は「半角数字」「半角英数字」「半角英数字記号」「正規表現」「日付」「日時」の6種類。
- **ACG-FORMAT-002**：文字種ASCIIのとき形式は前4種類のいずれかを必須指定し、形式未指定は許さない。
- **ACG-FORMAT-003**：日付・日時は型=文字列、文字種未指定、形式=日付または日時。表示形式はロケールに応じて決め、固定しない。
- **ACG-FORMAT-004**：半角英数字記号は印字可能ASCII（半角スペース〜`~`）を許可する。スペースだけの入力の必須判定は形式チェックの責務ではない。
- **ACG-FORMAT-005**：より限定した入力規則は形式=正規表現を使い、画面設計書の正規表現列で指定する。

## ACG-REQUIRED-001〜004：必須判定（2.6.10）

- **ACG-REQUIRED-001**：文字列必須は`null`、空文字、空白だけの値をNGとする。文字列にtrimを適用した結果が空なら必須エラー。値そのものをtrimして書き換えるという仕様ではない。
- **ACG-REQUIRED-002**：Angular標準`Validators.required`は空白だけの文字列を必須NGにしないため、文字列必須にはtrim対応Validatorを使う。共通Validatorの具体的クラス名・メソッド名は実装設計で決定する。
- **ACG-REQUIRED-003**：数値とEnumの必須は`Validators.required`相当、真偽の`必須(真偽)`は`Validators.requiredTrue`相当を生成する。
- **ACG-REQUIRED-004**：形式チェックでは半角スペースを許し、必須チェックでスペースのみをNGとする。例：`abc def`はOK、`   `は必須NG。

## ACG-DEFAULT-001：型別の初期値（2.6.11）

画面設計書のデフォルト列`-`は「未指定」を意味する。型別初期値は次のとおり。

| 型・形式 | デフォルト列 | FormControl初期値 |
|---|---|---|
| 文字列 | `-` | `''` |
| 文字列 | 任意文字列 | 指定文字列 |
| 数値 | `-` | `null` |
| 数値 | 数値 | 指定数値 |
| 真偽 | `-` | `false` |
| 真偽 | `true` | `true` |
| 真偽 | `false` | `false` |
| Enum | `-` | `null` |
| Enum | コード値 | `Enum型.toEnum('コード値')` |
| 文字列＋日付 | `-` | `''` |
| 文字列＋日付 | `SYSTEM_DATE` | `AppDateUtil.getSysDateIso8601()` |
| 文字列＋日時 | `-` | `''` |
| 文字列＋日時 | `SYSTEM_DATETIME` | `AppDateUtil.getSysDateTimeUtcIso8601()` |

## ACG-DEFAULT-002〜008：初期値の禁止・例外

- **ACG-DEFAULT-002**：Enumコード値は対応するEnum型の`toEnum('コード値')`で解決し、文字列コードをそのままFormControlへ渡さない。
- **ACG-DEFAULT-003**：必須指定があってもデフォルト未指定ならACGは値を推測・補完しない。未入力の初期状態を許容し、Validationでエラーになり得る。
- **ACG-DEFAULT-004**：`SYSTEM_DATE`は形式=日付にのみ使用し`AppDateUtil.getSysDateIso8601()`を生成する（例`2026-10-16`）。`形式=日付`自体は原則非推奨の既存方針を維持。
- **ACG-DEFAULT-005**：`SYSTEM_DATETIME`は形式=日時にのみ使用し`AppDateUtil.getSysDateTimeUtcIso8601()`を生成する。UTC ISO 8601形式（例`2026-10-16T06:24:00.000Z`）。
- **ACG-DEFAULT-006**：`AppDateUtil`は`src/app/brf9000/brf9017-utils/app-date.util.ts`の既存実装を使用。ACG独自の日付時刻取得処理は作らず、予約語を文字列リテラルとしてFormControlに設定しない。
- **ACG-DEFAULT-007**：予約語と形式の不一致（例：日付＋SYSTEM_DATETIME、日時＋SYSTEM_DATE、日付/日時以外＋いずれかの予約語）は例外を発生させコード生成を停止する（Fail Fast）。自動補正しない。
- **ACG-DEFAULT-008**：`createDateTime`、`updateDateTime`、`deleteDateTime`等を項目物理名から推測して特別扱いしない。初期値は必ず画面設計書のデフォルト指定に従う。

## テスト観点・残件

1. 形式6種の許可パターンと不許可パターン、正規表現の必須列、半角スペースの扱い。
2. 文字列の空白のみ、数値0、真偽false、Enum未指定時の必須判定。
3. デフォルト表の全行、予約語の正常系・不一致の異常系、特定項目名による特別扱いがないこと。
4. Phase 2.6.12〜2.6.14の詳細展開、および原典→設計書／設計書→原典の原子仕様全件監査。

**現状**：設計反映済み（本節）、実装未確認、検証未実施、全件監査未完了。
