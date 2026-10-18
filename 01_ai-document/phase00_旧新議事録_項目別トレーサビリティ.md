# 旧議事録→新工程別議事録：項目単位・双方向トレーサビリティ

> 作成日：2026-10-18 ／ 対象：`soracity/bruce-document`  
> **監査途中の作業表**。旧議事録の全文保管との一致だけでは完成と判定しない。原文内の文／表／コード／箇条書きを小単位に分け、対応先本文を機械的に照合。機械一致しない箇所は**要再確認**であり、自動的に欠落・矛盾と断定しない。
> **承認状態**：「承認済み」は旧原典に明示された場合のみ付与。後日の変更がある場合は最新のユーザー承認を優先。旧議事録は不変、ソースコードは変更しない。

## 項目対応表（ACG：2.6.6〜2.6.9）

| 旧議事録／行 | 設計事項・例・禁止・理由等（抜粋） | 原典での状態 | 新議事録／工程ID | 照合 | 対応 |
|---|---|---|---|---|---|
| [L8-L8](議事録バックアップ/phase2_Nullable型_決定.md#L8-L8) | Bruceでは、TypeScriptで `null` を許容する型を表現する際、`A \| null` を直接記述せず、共通型エイリアス `Nullable&lt;T>` を使用する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L12](議事録バックアップ/phase2_Nullable型_決定.md#L10-L12) | ```ts type Nullable&lt;T> = T \| null; ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L14-L14](議事録バックアップ/phase2_Nullable型_決定.md#L14-L14) | 以下は同じ型を表す。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L16-L18](議事録バックアップ/phase2_Nullable型_決定.md#L16-L18) | ```ts AppCodeMatchStatusEnum \| null ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L20-L22](議事録バックアップ/phase2_Nullable型_決定.md#L20-L22) | ```ts Nullable&lt;AppCodeMatchStatusEnum> ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L24-L24](議事録バックアップ/phase2_Nullable型_決定.md#L24-L24) | `Nullable&lt;T>` は型表記を統一するための型エイリアスであり、TypeScript上のnull許容の意味や型安全性は変更しない。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L28-L28](議事録バックアップ/phase2_Nullable型_決定.md#L28-L28) | Bruceの `src/global.d.ts` に以下を定義する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L30-L32](議事録バックアップ/phase2_Nullable型_決定.md#L30-L32) | ```ts type Nullable&lt;T> = T \| null; ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L34-L34](議事録バックアップ/phase2_Nullable型_決定.md#L34-L34) | `global.d.ts` はモジュール化せず、`import` / `export` を記述しない。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L36-L36](議事録バックアップ/phase2_Nullable型_決定.md#L36-L36) | これにより、Bruce配下のTypeScriptソースでは `Nullable&lt;T>` をimportせずに使用可能とする。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L40-L40](議事録バックアップ/phase2_Nullable型_決定.md#L40-L40) | BruceおよびACG生成ソースでは、null許容型を原則以下の形式で表現する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L42-L46](議事録バックアップ/phase2_Nullable型_決定.md#L42-L46) | ```text A \| null ↓ Nullable&lt;A> ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L48-L48](議事録バックアップ/phase2_Nullable型_決定.md#L48-L48) | 対象例： | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L50-L55](議事録バックアップ/phase2_Nullable型_決定.md#L50-L55) | ```ts Nullable&lt;number> Nullable&lt;boolean> Nullable&lt;Uint8Array> Nullable&lt;AppCodeMatchStatusEnum> ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L57-L57](議事録バックアップ/phase2_Nullable型_決定.md#L57-L57) | FormControlでも同様とする。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L59-L61](議事録バックアップ/phase2_Nullable型_決定.md#L59-L61) | ```ts FormControl&lt;Nullable&lt;AppCodeMatchStatusEnum>> ``` | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L63-L63](議事録バックアップ/phase2_Nullable型_決定.md#L63-L63) | メソッド引数・戻り値・変数・プロパティなど、型として `A \| null` を表現する箇所でも `Nullable&lt;A>` を使用する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L67-L67](議事録バックアップ/phase2_Nullable型_決定.md#L67-L67) | ACGが生成するTypeScriptコードでは、null許容型を `A \| null` ではなく `Nullable&lt;A>` として生成する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L69-L69](議事録バックアップ/phase2_Nullable型_決定.md#L69-L69) | `Nullable&lt;T>` はBruceのグローバル型であるため、ACGは `Nullable` 用のimportを生成しない。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L71-L71](議事録バックアップ/phase2_Nullable型_決定.md#L71-L71) | 生成済みファイルを直接修正せず、ACG本体の型生成処理を修正する。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L75-L75](議事録バックアップ/phase2_Nullable型_決定.md#L75-L75) | `Nullable&lt;T>` は `T \| null` の別名であり、nullそのものを禁止・除去する仕組みではない。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L77-L77](議事録バックアップ/phase2_Nullable型_決定.md#L77-L77) | そのため、nullが存在し得る箇所では従来どおりnullチェックまたは型の絞り込みが必要となる。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L79-L79](議事録バックアップ/phase2_Nullable型_決定.md#L79-L79) | また、`undefined` は `Nullable&lt;T>` の対象外とする。 | 設計承認済み（旧原典） | [2.6.6](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L8-L8) | 既存の `TypeScriptPrimitiveTypeEnum` は、実際には画面設計書・DAO設計・列挙型設計・データモデル設計などで「TypeScript上の型分類」を表す共通Enumとして利用されている。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L10](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L10-L10) | 名称中の `Primitive` は実際の責務に対して狭すぎるため、以下のように名称変更する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L16](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L12-L16) | ```text TypeScriptPrimitiveTypeEnum ↓ TypeScriptTypeEnum ``` | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L20-L20](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L20-L20) | `TypeScriptTypeEnum` では、TypeScript上の型として意味のある分類のみを持つ。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L22-L28](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L22-L28) | ```text STRING NUMBER BOOLEAN UINT8ARRAY ENUM ``` | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L30-L30](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L30-L30) | `DATE` / `DATE_TIME` はTypeScript上では `string` であり、`STRING` と型として区別する意味がないため削除する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L32-L32](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L32-L32) | 日付・日時という意味は、画面設計書では `型` ではなく `形式` で表現する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L34-L37](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L34-L37) | ```text 型=文字列 / 形式=日付 型=文字列 / 形式=日時 ``` | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L41-L41](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L41-L41) | 画面設計書の `型` 列で `Enum` を指定可能にするため、同Enumへ `ENUM` を追加する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L43-L43](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L43-L43) | `ENUM` の具体的なTypeScript型名は、画面設計書の `Enum型` 列で指定されたクラス名を使用するため、`TypeScriptTypeEnum` 自体で固定のTypeScript型名を持つ前提にはしない。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L47-L47](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L47-L47) | 今回の改修で以下を実施する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L49-L49](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L49-L49) | - `TypeScriptPrimitiveTypeEnum` を `TypeScriptTypeEnum` へリネームする | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L50-L50](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L50-L50) | - `ENUM` を追加する | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L51-L51](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L51-L51) | - `DATE` を削除する | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L52-L52](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L52-L52) | - `DATE_TIME` を削除する | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L53-L53](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L53-L53) | - DAO生成などで `DATE` / `DATE_TIME` を直接判定している箇所を削除し、文字列は `STRING` として扱う | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L54-L54](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L54-L54) | - UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L55-L55](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L55-L55) | - 画面設計書の形式Enumに `日付` / `日時` を追加する | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L57-L57](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L57-L57) | 自動生成ファイルを直接修正せず、ACG本体の参照箇所を修正する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L61-L61](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L61-L61) | UI専用の別型Enumは新設せず、既存の型分類Enumを汎用名称へリネームして拡張する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L65-L65](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L65-L65) | ACGの現行パッケージは `io.github.soracity.alfred` とする。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L67-L67](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md#L67-L67) | `com.github.soracity.alfred` は旧パッケージとして扱い、今後の設計検討・コード調査・修正対象・コード例から除外する。 | 設計承認済み（旧原典） | [2.6.7](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L8-L8) | 画面設計書のDTO項目定義について、型ごとの指定可能パターンを以下の表で正式化する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L10](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L10-L10) | `指定可` は任意指定、`必須` は指定必須、`-` は指定不可を表す。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L24](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L12-L24) | \| 型 \| Enum型 \| 文字種 \| 形式 \| 必須 \| 必須(真偽) \| 文字数(最小/最大) \| 数値(最小/最大) \| 正規表現 \| \|---\|---\|---\|---\|---\|---\|-- | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L30-L30](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L30-L30) | 文字列項目にValidationを行わない場合は、以下の組み合わせを許可する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L32-L34](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L32-L34) | ```text 型=文字列 / 文字種=- / 形式=- ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L36-L36](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L36-L36) | このパターンでは、文字種・形式を含めてValidationを生成しない。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L38-L38](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L38-L38) | 以下はすべて `-` とする。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L40-L46](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L40-L46) | ```text 必須 必須(真偽) 文字数(最小/最大) 数値(最小/最大) 正規表現 ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L48-L48](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L48-L48) | プログラム側で生成・設定する値など、画面入力値としてValidationする必要がない文字列に使用する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L52-L52](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L52-L52) | Unicode文字列は、`形式=-` とする。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L54-L54](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L54-L54) | 指定可能なのは以下のみ。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L56-L59](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L56-L59) | ```text 必須 文字数(最小/最大) ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L63-L63](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L63-L63) | ASCII文字列は、`形式=-` を許可しない。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L65-L65](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L65-L65) | 必ず以下のいずれかを指定する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L67-L72](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L67-L72) | ```text 半角数字 半角英数字 半角英数字記号 正規表現 ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L74-L74](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L74-L74) | `形式=正規表現` の場合のみ、`正規表現` 列を必須指定する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L78-L78](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L78-L78) | 日付・日時はTypeScript上の型ではなく形式として扱う。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L80-L83](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L80-L83) | ```text 型=文字列 / 文字種=- / 形式=日付 型=文字列 / 文字種=- / 形式=日時 ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L85-L85](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L85-L85) | 日付・日時の場合、文字種・文字数・数値範囲・正規表現は指定しない。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L87-L87](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L87-L87) | 表示形式は画面設計書に固定記述せず、ロケールに応じて決定する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L91-L91](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L91-L91) | `形式=日付` / `形式=日時` の値が正しい日付・日時形式であることは、日付・日時入力コンポーネント側で保証する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L93-L93](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L93-L93) | ACGは、日付・日時専用の形式ValidatorをFormControlへ生成しない。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L95-L95](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L95-L95) | FormControl側でACGが生成するValidationは、画面設計書で `必須=〇` が指定された場合の必須チェックのみとする。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L97-L113](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L97-L113) | ```text 形式=日付 / 必須=- → 日付形式Validatorは生成しない → 必須Validatorも生成しない  形式=日付 / 必須=〇 → 日付形式Validatorは生成しない → 必須Validatorのみ生 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L115-L115](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L115-L115) | 責務は以下のように分離する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L117-L126](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L117-L126) | ```text 日付・日時の入力形式保証 → 日付・日時入力コンポーネント  未入力チェック → FormControl Validation  ACG → 画面設計書の必須指定に従い必須Validationのみ生成 ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L130-L130](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L130-L130) | `半角英数字記号` は、半角スペースを含む印字可能ASCII文字を許可する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L132-L132](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L132-L132) | 例： | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L134-L139](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L134-L139) | ```text masahiro ariji ABC-123 test_user abc@example.com ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L141-L141](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L141-L141) | 半角スペースを含むこと自体は許可する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L143-L143](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L143-L143) | ただし、文字列項目で `必須=〇` の場合、スペースのみの値は必須チェックNGとする。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L145-L150](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L145-L150) | ```text " "      → NG "   "    → NG "abc"    → OK "abc def"→ OK ``` | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L152-L152](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L152-L152) | 必須判定は形式チェックとは分離し、trim後に空文字となる値をNGとする。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L156-L156](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L156-L156) | ACGは、上表に存在しない組み合わせを不正な画面設計書として扱い、コード生成を停止する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L158-L158](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L158-L158) | 例： | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L160-L181](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L160-L181) | ```text 型=文字列 / 文字種=- / 形式=- / 必須=〇 → Exception  型=文字列 / 文字種=ASCII / 形式=- → Exception  型=文字列 / 文字種=Unicode / 形式=半角数 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L183-L183](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L183-L183) | ACGは不正な指定を推測して補正せず、Fail Fastで停止する。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L187-L187](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md#L187-L187) | `無効状態` と `デフォルト` は本表のValidation組み合わせ判定とは別責務のため、本表には含めない。 | 設計承認済み（旧原典） | [2.6.8](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_ACG形式チェック_決定.md#L8-L8) | 画面設計書の `形式` は以下の6種類とする。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L17](議事録バックアップ/phase2_ACG形式チェック_決定.md#L10-L17) | ```text 半角数字 半角英数字 半角英数字記号 正規表現 日付 日時 ``` | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L19-L19](議事録バックアップ/phase2_ACG形式チェック_決定.md#L19-L19) | `日付` / `日時` は `型=文字列` と組み合わせ、文字種は `-` とする。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L21-L24](議事録バックアップ/phase2_ACG形式チェック_決定.md#L21-L24) | ```text 型=文字列 / 文字種=- / 形式=日付 型=文字列 / 文字種=- / 形式=日時 ``` | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L26-L26](議事録バックアップ/phase2_ACG形式チェック_決定.md#L26-L26) | 日付・日時の具体的な表示形式は固定せず、表示時にロケールに応じて決定する。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L30-L30](議事録バックアップ/phase2_ACG形式チェック_決定.md#L30-L30) | `文字種=ASCII` の場合は、以下のいずれかの形式を指定する。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L32-L37](議事録バックアップ/phase2_ACG形式チェック_決定.md#L32-L37) | ```text 半角数字 半角英数字 半角英数字記号 正規表現 ``` | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L39-L39](議事録バックアップ/phase2_ACG形式チェック_決定.md#L39-L39) | `文字種=ASCII / 形式=-` は使用しない。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L43-L43](議事録バックアップ/phase2_ACG形式チェック_決定.md#L43-L43) | `半角英数字記号` は、半角英字・半角数字・半角記号に加えて、**半角スペースを許可する**。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L45-L45](議事録バックアップ/phase2_ACG形式チェック_決定.md#L45-L45) | 許可範囲はASCIIの印字可能文字と半角スペースとする。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L47-L49](議事録バックアップ/phase2_ACG形式チェック_決定.md#L47-L49) | ```text 半角スペース ～ ~ ``` | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L51-L51](議事録バックアップ/phase2_ACG形式チェック_決定.md#L51-L51) | したがって、以下のような値を許可する。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L53-L58](議事録バックアップ/phase2_ACG形式チェック_決定.md#L53-L58) | ```text masahiro ariji ABC-123 test_user abc@example.com ``` | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L60-L60](議事録バックアップ/phase2_ACG形式チェック_決定.md#L60-L60) | 形式チェック自体は半角スペースを許可する。スペースのみの値を必須項目として許可するかどうかは、形式チェックではなく必須チェックの責務とする。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L64-L64](議事録バックアップ/phase2_ACG形式チェック_決定.md#L64-L64) | 上記の定義よりさらに限定した入力規則が必要な場合は `形式=正規表現` を使用し、画面設計書の `正規表現` 列で個別指定する。 | 設計承認済み（旧原典） | [2.6.9](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |


## 項目対応表（ACG：2.6.10〜2.6.14）

| 旧議事録／行 | 設計事項・例・禁止・理由等（抜粋） | 原典での状態 | 新議事録／工程ID | 照合 | 対応 |
|---|---|---|---|---|---|
| [L8-L8](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L8-L8) | 文字列項目で `必須=〇` の場合、半角スペースのみの文字列は必須チェックNGとする。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L10](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L10-L10) | 期待する判定は以下。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L19](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L12-L19) | ```text null        → NG ""          → NG " "         → NG "   "       → NG "abc"       → OK "abc def"   → OK ``` | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L23-L23](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L23-L23) | `形式=半角英数字記号` では半角スペースの入力自体を許可する。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L25-L25](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L25-L25) | 一方、スペースのみの値が必須項目として有効かどうかは `形式` の責務ではなく `必須` の責務とする。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L27-L27](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L27-L27) | したがって、以下は両立する。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L29-L35](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L29-L35) | ```text 形式=半角英数字記号 → 半角スペースを含む文字列を許可  必須=〇 → trim後に空文字となる値はNG ``` | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L39-L39](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L39-L39) | Angular標準の `Validators.required` は、スペースだけの文字列を空とは判定しない。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L41-L41](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L41-L41) | そのため、文字列型の必須チェックは、trim後に空文字かどうかを判定できる必須Validatorを使用する。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L43-L43](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L43-L43) | 具体的な共通Validatorのクラス名・メソッド名は別途実装設計で決定する。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L47-L59](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L47-L59) | ```text 文字列 + 必須=〇 → trim後の空文字もNGとする必須チェック  数値 + 必須=〇 → Validators.required 相当  Enum + 必須=〇 → Validators.required 相 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L61-L61](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md#L61-L61) | ACGは画面設計書の型に応じて適切な必須チェックを生成する。 | 設計承認済み（旧原典） | [2.6.10](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L8-L8) | 画面設計書の `デフォルト` 列では、`-` を「デフォルト未指定」とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L10](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L10-L10) | `-` のときに生成するFormControl初期値は型ごとに決める。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L26](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L12-L26) | \| 型 \| デフォルト列 \| FormControl初期値 \| \|---\|---\|---\| \| 文字列 \| `-` \| `''` \| \| 文字列 \| 任意文字列 \| 指定文字列 \| \| 数値 \| | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L30-L30](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L30-L30) | 例： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L32-L36](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L32-L36) | ```text 型=Enum Enum型=AppCodeMatchTypeEnum デフォルト=0 ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L38-L38](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L38-L38) | 生成イメージ： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L40-L44](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L40-L44) | ```ts new FormControl&lt;AppCodeMatchTypeEnum \| null>(   AppCodeMatchTypeEnum.toEnum('0') ) ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L46-L46](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L46-L46) | `デフォルト=-` の場合は `null` とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L48-L50](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L48-L50) | ```ts new FormControl&lt;AppCodeMatchTypeEnum \| null>(null) ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L54-L54](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L54-L54) | `必須=〇` であっても、`デフォルト=-` の場合にACGが値を補完しない。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L56-L58](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L56-L58) | ```text 必須=〇 + デフォルト=- ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L60-L60](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L60-L60) | の場合、初期状態は未入力とし、Validationで必須エラーになり得る状態とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L62-L62](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L62-L62) | ACGは必須だからという理由で推測して初期値を設定しない。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L66-L66](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L66-L66) | `形式=日付`、`形式=日時` も `デフォルト=-` の場合は空文字 `''` とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L68-L68](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L68-L68) | 現在日付・現在日時をデフォルト値として設定する場合は、画面設計書の `デフォルト` 列に以下の予約語を指定する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L70-L73](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L70-L73) | ```text SYSTEM_DATE SYSTEM_DATETIME ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L77-L77](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L77-L77) | 画面設計書： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L79-L82](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L79-L82) | ```text 形式=日時 デフォルト=SYSTEM_DATETIME ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L84-L84](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L84-L84) | ACG生成： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L86-L88](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L86-L88) | ```ts AppDateUtil.getSysDateTimeUtcIso8601() ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L90-L90](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L90-L90) | UTCのISO 8601形式で取得する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L92-L92](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L92-L92) | 返却値例： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L94-L96](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L94-L96) | ```text 2026-10-16T06:24:00.000Z ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L100-L100](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L100-L100) | 画面設計書： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L102-L105](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L102-L105) | ```text 形式=日付 デフォルト=SYSTEM_DATE ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L107-L107](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L107-L107) | ACG生成： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L109-L111](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L109-L111) | ```ts AppDateUtil.getSysDateIso8601() ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L113-L113](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L113-L113) | ISO 8601の日付形式で取得する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L115-L115](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L115-L115) | 返却値例： | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L117-L119](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L117-L119) | ```text 2026-10-16 ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L121-L121](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L121-L121) | `形式=日付` は非推奨とする既存方針を維持する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L125-L125](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L125-L125) | 利用する既存Utilityは以下とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L127-L129](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L127-L129) | ```text src/app/brf9000/brf9017-utils/app-date.util.ts ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L131-L131](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L131-L131) | ACGは現在日付・現在日時の取得処理を独自実装せず、`AppDateUtil` の上記メソッドを利用する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L135-L135](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L135-L135) | 画面設計書の `デフォルト` 列で使用する日付・日時の予約語は以下とする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L137-L145](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L137-L145) | ```text SYSTEM_DATE → 形式=日付 で使用 → AppDateUtil.getSysDateIso8601()  SYSTEM_DATETIME → 形式=日時 で使用 → AppDateUtil.getSys | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L147-L147](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L147-L147) | ACGはこれらの予約語を固定値文字列としてFormControlへ設定せず、対応する `AppDateUtil` 呼び出しへ変換する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L151-L151](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L151-L151) | `SYSTEM_DATE` と `SYSTEM_DATETIME` は、対応する形式と1対1で使用する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L153-L177](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L153-L177) | ```text 形式=日付 デフォルト=SYSTEM_DATE → OK  形式=日時 デフォルト=SYSTEM_DATETIME → OK  形式=日付 デフォルト=SYSTEM_DATETIME → Exception  形式 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L179-L179](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L179-L179) | ACGは不正な組み合わせを自動補正せず、検出した時点でExceptionを発生させてコード生成を停止する。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L181-L181](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L181-L181) | この方針をFail Fastとする。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L185-L185](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L185-L185) | `createDateTime`、`updateDateTime`、`deleteDateTime` などの項目について、ACGは物理名や用途を見てデフォルト値を特別扱いしない。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L187-L187](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L187-L187) | これら3項目を含め、各項目の初期値は画面設計書の `デフォルト` 列の指定に従う。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L189-L195](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L189-L195) | ```text デフォルト=- → ''  デフォルト=SYSTEM_DATETIME → AppDateUtil.getSysDateTimeUtcIso8601() ``` | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L197-L197](議事録バックアップ/phase2_ACGデフォルト値_決定.md#L197-L197) | ACGは項目名から意味を推測してデフォルト値を変更・補完しない。 | 設計承認済み（旧原典） | [2.6.11](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L8-L8) | 画面設計書の `型` 列では、TypeScript上の型を表す。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L10](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L10-L10) | `日付` および `日時` はTypeScript上ではいずれも `string` として扱うため、`文字列` と型として区別しない。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L12](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L12-L12) | そのため、画面設計書では `日付`・`日時` を `型` 列ではなく `形式` 列で表現する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L14-L14](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L14-L14) | 概念は以下とする。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L16-L21](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L16-L21) | ```text 文字列   ├─ 形式なし   ├─ 日付   ※非推奨   └─ 日時 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L23-L23](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L23-L23) | 例： | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L25-L33](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L25-L33) | ```text 日付項目 型   = 文字列 形式 = 日付   ※非推奨  日時項目 型   = 文字列 形式 = 日時 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L35-L35](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L35-L35) | 生成されるTypeScript型はいずれも `string` とする。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L37-L39](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L37-L39) | ```ts FormControl&lt;string> ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L43-L43](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L43-L43) | 画面設計書の `型` 列で使用する種別は以下とする。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L45-L50](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L45-L50) | ```text 文字列 数値 真偽 Enum ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L52-L52](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L52-L52) | `日付`・`日時` は型列から削除する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L56-L56](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L56-L56) | 画面設計書の `形式` 列では以下を扱う。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L58-L66](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L58-L66) | ```text - 半角数字 半角英数字 半角英数字記号 正規表現 日付   ※非推奨 日時 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L68-L68](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L68-L68) | `日付`・`日時` は `型=文字列` と組み合わせる。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L72-L72](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L72-L72) | `形式=日付` は互換性・限定用途のため残すが、原則として非推奨とする。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L74-L74](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L74-L74) | 理由は、日付のみでは「世界共通のある瞬間」を表現できず、閲覧者のタイムゾーンに応じて正しい現地日付へ変換することができないためである。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L76-L76](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L76-L76) | 実際に発生した出来事・予定・開始時刻など、タイムゾーンによって日付が変わり得るデータは、原則として `形式=日時` を使用し、UTCのISO 8601形式で保持する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L78-L81](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L78-L81) | ```text 例： 2026-10-16T06:24:00.000Z ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L83-L83](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L83-L83) | `形式=日付` は、「2026-10-16」という暦上の日付そのものを保持し、タイムゾーン変換を行わないことが要件として明確な場合に限って使用する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L87-L87](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L87-L87) | `形式=日付` / `形式=日時` は、特定の国・言語向けの固定表示フォーマットを意味しない。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L89-L89](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L89-L89) | 画面設計書には `yyyy/MM/dd` や `MM/dd/yyyy` などを固定値として埋め込まず、日付・日時という意味のみを指定する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L93-L93](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L93-L93) | 内部値はUTCのISO 8601形式で保持し、画面表示時に閲覧者のタイムゾーン・ロケールに応じた形式へ変換する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L95-L98](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L95-L98) | ```text 内部値（日時） 2026-10-16T06:24:00.000Z ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L102-L102](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L102-L102) | `形式=日付` は非推奨とし、内部値は以下のような暦上の日付文字列として保持する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L104-L106](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L104-L106) | ```text 2026-10-16 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L108-L108](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L108-L108) | この値はタイムゾーン変換の対象としない。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L110-L110](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L110-L110) | 表示形式はロケールに応じて決定する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L112-L116](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L112-L116) | ```text ja-JP : 2026/10/16 en-US : 10/16/2026 en-GB : 16/10/2026 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L118-L118](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L118-L118) | 責務は以下のように分離する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L120-L132](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L120-L132) | ```text 型 → TypeScript上のデータ型  形式 → 日付・日時という値の意味  日時の内部値 → UTC ISO 8601  表示形式 → 言語・地域（ロケール）に応じて決定 ``` | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L136-L136](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L136-L136) | 今回の改修で以下を実施する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L138-L138](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L138-L138) | - 型から `日付` / `日時` を削除する | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L139-L139](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L139-L139) | - 共通 `TypeScriptTypeEnum` から `DATE` / `DATE_TIME` を削除する | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L140-L140](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L140-L140) | - UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L141-L141](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L141-L141) | - DAO生成など、`DATE` / `DATE_TIME` を直接参照している箇所を `STRING` 前提へ整理する | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L142-L142](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L142-L142) | - 形式に `日付` / `日時` を追加する | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L143-L143](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L143-L143) | - `形式=日付` は非推奨として扱う | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L147-L147](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L147-L147) | 以下は別途設計する。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L149-L149](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L149-L149) | - `形式=日付` の具体的な入力・Validation仕様 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L150-L150](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L150-L150) | - `形式=日時` の具体的な入力・Validation仕様 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L151-L151](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L151-L151) | - `文字種` 列との組み合わせルール | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L153-L153](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md#L153-L153) | 本決定は、画面設計書において `日付`・`日時` を `型` ではなく `形式` として扱い、`日付` は残すが非推奨とし、タイムゾーン変換が必要なデータは原則 `日時` を使用することを対象とする。 | 設計承認済み（旧原典） | [2.6.12](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L8-L8) | ヘッダー（検索条件）と明細（検索結果）は、それぞれ別DTOとして定義することを基本形とする。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L10-L17](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L10-L17) | ```text 画面Component ├─ HeaderDto / ConditionDto │   └─ 検索条件用 FormGroup │ └─ DetailDto / ResultDto     └─ 明細1行分 ``` | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L19-L19](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L19-L19) | 画面全体を包むだけの親DTOは原則作成しない。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L23-L23](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L23-L23) | 表示専用の明細は通常のDTO配列として保持する。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L25-L27](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L25-L27) | ```ts resultList: Bru1002ResultDto[] = []; ``` | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L29-L29](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L29-L29) | 検索後の結果は、同一Componentインスタンスが生存している間、クライアント側メモリに保持される。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L33-L33](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L33-L33) | 画面上で明細行を編集する場合はReactive Formsを使用する。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L35-L41](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L35-L41) | ```text FormArray └─ FormGroup  // 1明細行    ├─ FormControl    ├─ FormControl    └─ ... ``` | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L43-L43](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L43-L43) | 編集可能明細では、FormControl/FormGroup/FormArrayにより画面入力状態・Validation・dirty/touched等を管理する。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L47-L47](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L47-L47) | 1画面・1Component内に複数のFormGroupが存在してよい。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L49-L49](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L49-L49) | 責務が異なる入力単位は無理に1つのFormGroupへまとめず、必要に応じて分離する。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L51-L51](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L51-L51) | 例： | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L53-L57](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L53-L57) | ```text Bru1002Component ├─ 検索条件FormGroup └─ 編集明細FormArray / FormGroup ``` | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L59-L59](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L59-L59) | 同一入力項目でReactive Formsと`[(ngModel)]`を併用しない。 | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L63-L72](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md#L63-L72) | ```text 表示専用明細 → DTO[]  編集可能明細 → FormArray&lt;FormGroup&lt;...>>  検索条件 → 独立したUI Form DTO / FormGroup ``` | 設計承認済み（旧原典） | [2.6.13](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L8-L8](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L8-L8) | Phase2のACG実装修正にあたり、未確定だった以下4点を正式決定する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L12-L12](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L12-L12) | 画面設計書の `文字種` 列を解釈するEnumとして `AcgUiFormCharacterTypeEnum` を追加する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L14-L14](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L14-L14) | 今回の実装では、既存のUI設計書用Enumと同じ以下のパッケージへ配置する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L16-L18](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L16-L18) | ```text io.github.soracity.alfred.generator.user.uispec.uispecenum ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L20-L20](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L20-L20) | 対象イメージ： | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L22-L25](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L22-L25) | ```text AcgUiFormFormatCheckEnum AcgUiFormCharacterTypeEnum ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L27-L27](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L27-L27) | パッケージ全体の再編は今回のACG実装では行わない。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L29-L29](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L29-L29) | 共通EnumとUI専用Enumの最終的なパッケージ構成は、AlfredCodeGeneratorのGitHub Issue #8「設計書列用Enumのパッケージ構成を整理する」で別途検討する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L31-L31](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L31-L31) | Issue #8が未決の間、今回決定した配置を暫定的な正式配置として使用する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L35-L35](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L35-L35) | `AcgClassModel` では、Injectableであるかどうかと、root提供するかどうかを分離して表現する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L37-L37](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L37-L37) | 以下の2項目を持つ方針とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L39-L42](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L39-L42) | ```text isInjectable providedInRoot ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L44-L44](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L44-L44) | UI Form DTOは以下とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L46-L49](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L46-L49) | ```text isInjectable = true providedInRoot = false ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L51-L51](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L51-L51) | 生成結果： | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L53-L58](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L53-L58) | ```ts @Injectable() export class Bru1001Dto {   // ... } ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L60-L60](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L60-L60) | DAO等、従来どおりroot提供するクラスは以下とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L62-L65](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L62-L65) | ```text isInjectable = true providedInRoot = true ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L67-L67](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L67-L67) | 生成結果： | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L69-L74](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L69-L74) | ```ts @Injectable({ providedIn: 'root' }) export class XxxDao {   // ... } ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L76-L76](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L76-L76) | これにより、`isInjectable=true` の場合に必ず `providedIn: 'root'` を生成する現行仕様を変更し、UI Form DTOをComponentスコープDIで利用できるようにする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L80-L80](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L80-L80) | `TypeScriptTypeEnum.ENUM` は固定のTypeScript型名を持たない。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L82-L82](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L82-L82) | 画面設計書では、実際のTypeScript型は `Enum型` 列から取得する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L84-L84](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L84-L84) | 例： | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L86-L89](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L86-L89) | ```text 型=Enum Enum型=AppCodeMatchTypeEnum ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L91-L91](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L91-L91) | 生成側では以下を使用する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L93-L95](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L93-L95) | ```ts FormControl&lt;Nullable&lt;AppCodeMatchTypeEnum>> ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L97-L97](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L97-L97) | `Nullable&lt;T>` はBruce共通のグローバル型として `src/global.d.ts` に定義し、ACGはimportを生成しない。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L99-L99](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L99-L99) | `ENUM` に対して共通処理から固定のTypeScript型名を取得しようとした場合、ACGは推測値を返さずFail Fastで停止する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L101-L101](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L101-L101) | つまり、`ENUM` の実型解決は `Enum型` 列を解釈できる処理の責務とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L105-L105](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L105-L105) | `形式=日付` / `形式=日時` は、任意の固定文字列をデフォルト値として許可しない。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L107-L107](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L107-L107) | 許可する組み合わせは以下のみとする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L109-L125](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L109-L125) | ```text 形式=日付 デフォルト=- → ''  形式=日付 デフォルト=SYSTEM_DATE → AppDateUtil.getSysDateIso8601()  形式=日時 デフォルト=- → ''  形式=日時 デフ | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L127-L127](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L127-L127) | 以下は不正とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L129-L137](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L129-L137) | ```text 形式=日付 デフォルト=2026-10-16 → Exception  形式=日時 デフォルト=2026-10-16T06:24:00.000Z → Exception ``` | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L139-L139](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L139-L139) | `形式=日付` / `形式=日時` に対して、`-` または対応する予約語以外が指定された場合、ACGは自動補正せずFail Fastで停止する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L141-L141](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L141-L141) | 一般の `型=文字列` に対する「任意文字列をデフォルト値として指定可能」というルールは維持するが、`形式=日付` / `形式=日時` はこの一般ルールの対象外とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L145-L145](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L145-L145) | 今回のACG実装修正では、上記4点を既存のPhase2確定仕様と合わせて実装する。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L147-L147](議事録バックアップ/phase2_ACG実装追加方針_決定.md#L147-L147) | 生成済みファイルを直接修正せず、ACG本体・設計書解析・内部モデル・コード生成・仕様チェック・テストを修正対象とする。 | 設計承認済み（旧原典） | [2.6.14](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |

## 項目対応表（Phase 00・Phase 1）

| 旧原典行 | 設計事項・調査事項・根拠（抜粋） | 原典状態 | 正本側工程 | 判定 | 対応 |
|---|---|---|---|---|---|
| [3–5](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L3-L5) | ：> 作成日：2026-10-18   > 管理対象：`soracity/bruce-document/01_ai-document` 内の**既存の `phase*.md` 15件**（本対応表を除く）。   > 現在の基準：[A | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [9–9](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L9-L9) | 目的：**既存の議事録・承認済み決定文書を工程WBS（大・中・小区分）へ紐付け、進捗管理表から議論を追跡し、議事録から現在の工程へ戻れるようにする。** | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [11–11](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L11-L11) | 目的：- 工程IDの追加は、過去に新しい承認が行われたことを意味しない。**承認状態は記録内容に基づく**。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [12–12](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L12-L12) | 目的：- 1つの議事録が複数の工程を扱うことも、1つの工程が複数の議事録に基づくこともある。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [13–13](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L13-L13) | 目的：- 日付が古い「当時未承認」の記録と、その後の「承認済み」の記録が異なる場合、**新しい正式承認を優先**し、過去の履歴を消さない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [14–14](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L14-L14) | 目的：- 「議事録側のリンク」は下記と各`phase*.md`末尾の相互参照欄で確認できる。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [15–15](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L15-L15) | 目的：- 新しい議論を開始したら、対象の工程IDを議事録に記載し、進捗管理表と本索引を必要に応じて同期する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [19–35](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L19-L35) | 1. 議事録・決定文書 → 工程ID（全件棚卸し）：\| 既存議事録・決定文書 \| 記録の性格 \| 関連工程（小区分ID） \| 補足 \| \|---\|---\|---\|---\| \| [phase00_進捗管理と議事録運用_議事録.md](phase00_進捗管理と議 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [39–49](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L39-L49) | 2. 工程 → 必要な議事録（主な再開・参照先）：\| 工程 \| 主な議事録・決定文書 \| 注意点 \| \|---\|---\|---\| \| 1.1（既存資産） \| [Phase 1調査](phase1_共通コンポーネント調査.md) \| 静的調査の完了と実機テスト | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [53–53](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L53-L53) | 3. 今回の確認結果と更新ルール：- 既存`phase*.md`は**15件、対応工程IDへの関連付けが全件成立**。各ファイルの末尾にも進捗表・本索引へのリンクと工程IDを追記。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [54–54](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L54-L54) | 3. 今回の確認結果と更新ルール：- これまで進捗表に十分展開できていなかったACG決定文書9件を、Phase 2.6（2.6.6〜2.6.14）に展開。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [55–55](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L55-L55) | 3. 今回の確認結果と更新ルール：- 実装・生成物の一致確認は**5.4.3**とし、履歴を一度のビルド成功で「検証済み」にしない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [56–56](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L56-L56) | 3. 今回の確認結果と更新ルール：- 議論終了まで議事録を更新し、工程との関係は本索引にも追記する。**最終設計書の体系化はPhase 4まで行わない**。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [57–57](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L57-L57) | 3. 今回の確認結果と更新ルール：- ファイルを工程に対応付けることと、個々の節の内容が最終承認済みであることは同義ではない（特に旧再開サマリ、Phase 3）。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [61–61](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L61-L61) | 関連：- [AIフレームワーク進捗管理表](AIフレームワーク_進捗管理表.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [62–62](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md#L62-L62) | 関連：- [Phase 00：進捗・議事録運用](phase00_進捗管理と議事録運用_議事録.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [3–6](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L3-L6) | ：> **性格：全フェーズ共通の運用議事録**。Phase 00は工程番号ではなく、開発管理上の共通記録を意味する。 > > 保存先：`soracity/bruce-document / main / 01_ai-document` | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [12–12](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L12-L12) | 2026-10-18：AIフレームワークの工程管理と議事録：AIフレームワークを**実装だけでなく運用開始まで**追跡できる進捗管理を確立する。ChatGPTとの議論をGitHubの議事録に継続保存し、**全議論終了後**に議事録をもとに体系的設計書を作成する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [16–16](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L16-L16) | 2026-10-18：AIフレームワークの工程管理と議事録：1. AIフレームワーク**運用までに必要な全フェーズ**を進捗管理表に記載する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [17–17](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L17-L17) | 2026-10-18：AIフレームワークの工程管理と議事録：2. フェーズは**大区分・中区分、必要に応じて小区分**まで分解する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [18–18](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L18-L18) | 2026-10-18：AIフレームワークの工程管理と議事録：3. ChatGPTとの議論が進むたびに、**進捗管理表を随時更新**する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [19–19](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L19-L19) | 2026-10-18：AIフレームワークの工程管理と議事録：4. 進捗管理表は**現在位置・残項目**が分かる資料にする。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [20–20](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L20-L20) | 2026-10-18：AIフレームワークの工程管理と議事録：5. ChatGPTとの**議論を議事録として随時GitHubに保存**する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [21–21](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L21-L21) | 2026-10-18：AIフレームワークの工程管理と議事録：6. 議事録のファイル名は**`phase*.md`**とする。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [22–22](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L22-L22) | 2026-10-18：AIフレームワークの工程管理と議事録：7. **すべての議論が終了してから**、議事録を元に**体系的な設計書**を作成する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [26–26](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L26-L26) | 2026-10-18：AIフレームワークの工程管理と議事録：> AIが画面実装で使用するフレームワーク。AIが独自CSS・独自コンポーネントを自由に作ると人間のソース解析・保守が困難となるため、既存LayoutManager・共通Component等の設計規則の中でAIに実装させる。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [28–28](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L28-L28) | 2026-10-18：AIフレームワークの工程管理と議事録：**目的：AI実装の効率性と人間の解析・保守性の両立。** | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [32–32](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L32-L32) | 2026-10-18：AIフレームワークの工程管理と議事録：- **進捗管理表の唯一の正本**は `01_ai-document/AIフレームワーク_進捗管理表.md`。Excelは参考出力。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [33–33](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L33-L33) | 2026-10-18：AIフレームワークの工程管理と議事録：- 「議論内容」「決定事項」「未決事項」「決定理由」「次の検討項目」「関連する工程ID・根拠」を、議論の区切りごとに該当する `phase*.md` へ追記する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [34–34](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L34-L34) | 2026-10-18：AIフレームワークの工程管理と議事録：- 議事録には**設計承認／方針合意／提案／未決／調査事実**を明確に区別して記載し、**未承認の仕様を決定済みとして扱わない**。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [35–35](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L35-L35) | 2026-10-18：AIフレームワークの工程管理と議事録：- 進捗表は議事録とは役割を分ける。進捗表は**状況・残り・次の1件・証跡**を管理し、議論の詳細は議事録へ記録する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [36–36](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L36-L36) | 2026-10-18：AIフレームワークの工程管理と議事録：- 新たな議論に着手した時点で現在位置を更新し、ユーザーが判断した項目はその議事録・進捗表へ反映する。**別の会話になってもGitHub上の正本を先に読む**。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [37–37](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L37-L37) | 2026-10-18：AIフレームワークの工程管理と議事録：- Phase 2・3等の**議論がすべて終了したことをユーザーが確認した後**、議事録を突合・統合して体系的設計書にまとめる。設計書の目次・最終的な配置は、その工程で確認する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [38–38](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L38-L38) | 2026-10-18：AIフレームワークの工程管理と議事録：- 実装・検証・運用は**設計の承認と区別**して進捗を記録する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [39–39](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L39-L39) | 2026-10-18：AIフレームワークの工程管理と議事録：- 決定済みの既存議論（例：Phase 2の幅100等分、外側/内側幅の責務、CSS注入制限等）は旧記録を根拠とする。新しい議事録の開始によって過去の承認を白紙に戻さない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [43–43](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L43-L43) | 2026-10-18：AIフレームワークの工程管理と議事録：前回案のPhase 1～6は**提案段階**だった。今回の指示で**体系的設計書作成と運用開始の工程を明示的に分離**する必要があるため、進捗表では下記の全8フェーズを採用して残作業を可視化する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [45–45](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L45-L45) | 2026-10-18：AIフレームワークの工程管理と議事録：1. Phase 1：既存資産の調査（一次調査完了）。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [46–46](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L46-L46) | 2026-10-18：AIフレームワークの工程管理と議事録：2. Phase 2：設計思想・責務・AI実装制約の議論／決定（現在進行中）。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [47–47](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L47-L47) | 2026-10-18：AIフレームワークの工程管理と議事録：3. Phase 3：共通Componentのデザインシステム設計・最終承認（方針合意あり・未完）。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [48–48](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L48-L48) | 2026-10-18：AIフレームワークの工程管理と議事録：4. Phase 4：**全議論終了後**、議事録から体系的設計書を構成・レビュー・承認する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [49–49](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L49-L49) | 2026-10-18：AIフレームワークの工程管理と議事録：5. Phase 5：承認済み設計に従いAIフレームワークを実装・既存画面を必要に応じ移行する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [50–50](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L50-L50) | 2026-10-18：AIフレームワークの工程管理と議事録：6. Phase 6：AIが利用する実装指示・禁止事項・レビュー手順を整備する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [51–51](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L51-L51) | 2026-10-18：AIフレームワークの工程管理と議事録：7. Phase 7：実画面でのAI実装・解析保守性・両OS動作・回帰を検証する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [52–52](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L52-L52) | 2026-10-18：AIフレームワークの工程管理と議事録：8. Phase 8：運用手順・変更管理・リリース判定を整え実運用を開始する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [54–54](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L54-L54) | 2026-10-18：AIフレームワークの工程管理と議事録：**上記Phase 4～8の作業項目・実装仕様・受入基準は「工程計画案」であって、個別設計まで最終承認済みという意味ではない。** 必要に応じ議論で更新する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [58–58](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L58-L58) | 2026-10-18：AIフレームワークの工程管理と議事録：- **現在位置：Phase 2-2 幅の責務**。既存の100等分・未指定均等幅・全兄弟明示・内部100%の原則は承認済み。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [59–59](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L59-L59) | 2026-10-18：AIフレームワークの工程管理と議事録：- 現行LayoutItem / LayoutSpanの**設計との差分（合計100の扱い・指定混在の扱い）**を確認し、対応方針を議論する。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [60–60](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L60-L60) | 2026-10-18：AIフレームワークの工程管理と議事録：- LayoutItemの**折り返し具体判定**はPhase 2-4の未決論点として追跡し、Phase 2-2の既決仕様にすり替えない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [61–61](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L61-L61) | 2026-10-18：AIフレームワークの工程管理と議事録：- 2026-10-17のBRU1001/BRU1002 `ng build` 成功は**基盤互換のビルド確認**であり、AIフレームワーク本体やiOS/Androidの機能・表示品質が検証済みという意味ではない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [65–65](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L65-L65) | 2026-10-18：AIフレームワークの工程管理と議事録：- [AIフレームワーク進捗管理表](AIフレームワーク_進捗管理表.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [66–66](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L66-L66) | 2026-10-18：AIフレームワークの工程管理と議事録：- [Phase 2：UI設計思想と責務（承認済みの設計内容）](phase2_UI設計思想と責務.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [67–67](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L67-L67) | 2026-10-18：AIフレームワークの工程管理と議事録：- [Phase 3：デザインシステム標準化（議論中）](phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [68–68](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L68-L68) | 2026-10-18：AIフレームワークの工程管理と議事録：- [Phase 2・3：再開用完全サマリ](phase2_phase3_再開用完全サマリ.md) | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [72–83](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L72-L83) | 2026-10-18：AIフレームワークの工程管理と議事録：```md ## YYYY-MM-DD：議題  - 関連工程ID： - 目的・現状： - 議論内容・比較した選択肢： - **決定事項（承認者・条件）**： - **未決事項（未承認案を含む）**： - 決定理由・制約： - 次の | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 要再確認 | 要意味・配置確認 |
| [85–85](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md#L85-L85) | 2026-10-18：AIフレームワークの工程管理と議事録：> 補足：ユーザーが新しい議論をした後、GitHubへの記録が実際に完了した際にそのリンク・コミットを返す。チャットの会話だけでGitHubに保存されたとは扱わない。 | 2026-10-18運用・索引 | [4.1.2](phase4_01_議論終了判定.md) | 一致 | 不要 |
| [3–4](議事録バックアップ/phase1_共通コンポーネント調査.md#L3-L4) | ：> 状態：主要16部品の一次ソース調査完了／設計方針の承認・実機検証は未完了   > 対象：`soracity/bruce` / `brf9020-shared-components` | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 別区分または共通本文 | 要意味・配置確認 |
| [7–7](議事録バックアップ/phase1_共通コンポーネント調査.md#L7-L7) | 目的：既存の共通UIコンポーネントを調査し、AIによる画面開発で再利用すべき部品と責務を明確化する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [11–11](議事録バックアップ/phase1_共通コンポーネント調査.md#L11-L11) | 共通コンポーネントの開発方針（追加決定：2026-10-15）：- **AndroidとiPhoneの両方で、見た目が崩れず美しく表示されること。** 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS間の描画差を考慮し、両プラットフォームで表示確認する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [12–12](議事録バックアップ/phase1_共通コンポーネント調査.md#L12-L12) | 共通コンポーネントの開発方針（追加決定：2026-10-15）：- **デザインはTailwind CSSとDaisyUIをベースとすること。** 共通部品のスタイルは原則として両者のユーティリティ・コンポーネント・テーマを活用し、個別CSSの追加は必要性を検討してから行う。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [14–14](議事録バックアップ/phase1_共通コンポーネント調査.md#L14-L14) | 共通コンポーネントの開発方針（追加決定：2026-10-15）：※上記2項目はユーザーが明示的に追加した開発方針。具体的なテスト端末・対応OSバージョン・例外的なCSSの運用は今後決める。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [16–16](議事録バックアップ/phase1_共通コンポーネント調査.md#L16-L16) | 共通コンポーネントの開発方針（追加決定：2026-10-15）：**決定事項（2026-10-15）**：`ToggleButtonComponent` は古い実装のためフェーズ1・3の開発対象から除外。`soracity/bruce` の `feature/feature-20261015` | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [18–18](議事録バックアップ/phase1_共通コンポーネント調査.md#L18-L18) | 共通コンポーネントの開発方針（追加決定：2026-10-15）：**旧共通部品ディレクトリの削除（2026-10-15）**：`soracity/bruce` の `feature/feature-20261015` ブランチから `src/app/brf9000/brf9014-shared | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [22–27](議事録バックアップ/phase1_共通コンポーネント調査.md#L22-L27) | コンポーネント一覧（調査時点）：\| 区分 \| 対象 \| \|---\|---\| \| 通常UI \| Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle \| \| Table \ | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [29–29](議事録バックアップ/phase1_共通コンポーネント調査.md#L29-L29) | コンポーネント一覧（調査時点）：※上記16部品は `feature/feature-20261015` の現行ソースと一次照合済み。利用箇所・テスト実行・実機動作の網羅確認は未実施。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [33–33](議事録バックアップ/phase1_共通コンポーネント調査.md#L33-L33) | 確認できた設計方針：1. `LayoutItem` は子要素を横方向に並べ、収まらなければ折り返す。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [34–34](議事録バックアップ/phase1_共通コンポーネント調査.md#L34-L34) | 確認できた設計方針：2. `ItemStackLayout` は項目や行を縦に積み重ねる。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [35–35](議事録バックアップ/phase1_共通コンポーネント調査.md#L35-L35) | 確認できた設計方針：3. 要素間の余白は原則 `margin` ではなく `gap` で管理する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [36–36](議事録バックアップ/phase1_共通コンポーネント調査.md#L36-L36) | 確認できた設計方針：4. 画面全体の外周余白は上位画面コンテナの `padding` で管理する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [37–37](議事録バックアップ/phase1_共通コンポーネント調査.md#L37-L37) | 確認できた設計方針：5. Layoutは子コンポーネントにCSSクラスを注入せず、子の幅を勝手に変更しない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [38–38](議事録バックアップ/phase1_共通コンポーネント調査.md#L38-L38) | 確認できた設計方針：6. 既存部品を優先し、不要な抽象化・過剰な汎用化を避ける。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [42–42](議事録バックアップ/phase1_共通コンポーネント調査.md#L42-L42) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：対象：`soracity/bruce` / `feature/feature-20261015`。既存のTypeScript・HTML調査に加え、8部品のSCSSと`FormControlComponentBase`を静的確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [44–53](議事録バックアップ/phase1_共通コンポーネント調査.md#L44-L53) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：\| 部品 \| SCSSの実装 \| レビュー観点 \| \|---\|---\|---\| \| Alert \| host display:block \| 狭い画面でのメッセージとボタン配置 \| \| Button \| | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [57–57](議事録バックアップ/phase1_共通コンポーネント調査.md#L57-L57) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- `@Directive()` の抽象基底クラスで、`readonly control = input.required&lt;FormControl&lt;T>>()` を定義。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [58–58](議事録バックアップ/phase1_共通コンポーネント調査.md#L58-L58) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- `ngOnInit`で`valueChanges`と`statusChanges`を購読し、`OnPush`の変更検知を`markForCheck()`で要求。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [59–59](議事録バックアップ/phase1_共通コンポーネント調査.md#L59-L59) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- `takeUntilDestroyed`により破棄時に購読解除。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [60–60](議事録バックアップ/phase1_共通コンポーネント調査.md#L60-L60) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- Date・Radio・Textboxが継承。Toggleは独自に類似処理を持つ。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [61–61](議事録バックアップ/phase1_共通コンポーネント調査.md#L61-L61) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- フェーズ3の単一`ComponentBase`案は**未実装・議論中**。現行実装を直ちに変更する決定ではない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [65–65](議事録バックアップ/phase1_共通コンポーネント調査.md#L65-L65) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- HTMLではDaisyUIの`btn`、`alert`、`input`、`radio`、`toggle`、`fieldset`等とTailwindユーティリティを利用。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [66–66](議事録バックアップ/phase1_共通コンポーネント調査.md#L66-L66) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- 独自SCSSは現状、host表示、横幅指定、FABのセーフエリア補正などに使用。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [67–67](議事録バックアップ/phase1_共通コンポーネント調査.md#L67-L67) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- **FABのセーフエリア対応はコード上で確認済み**。両OSでの表示品質は未検証。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [68–68](議事録バックアップ/phase1_共通コンポーネント調査.md#L68-L68) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- 重点確認項目：狭い画面、文字サイズ拡大、横長ラベル、タップ領域、キーボード表示、OSネイティブ入力の違い、下部ナビとの重なり。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [69–69](議事録バックアップ/phase1_共通コンポーネント調査.md#L69-L69) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- `Group`の`disabled`は現行テンプレートでは`opacity-50`を付与するだけで、投影された子コンポーネントの操作を一律に禁止する実装ではない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [70–70](議事録バックアップ/phase1_共通コンポーネント調査.md#L70-L70) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：- `Toggle`の`checked`が指定された場合は`control.value`より優先して表示される。状態の責務は設計検討対象。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [74–74](議事録バックアップ/phase1_共通コンポーネント調査.md#L74-L74) | 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）：GitHub上のソースを静的に確認。ビルド・実機・エミュレーター・単体テストの実行は行っていない。ユーザーから旧`brf9014-shared-components`削除後のビルド成功の報告あり（本レビューでの実行結果ではない）。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [78–78](議事録バックアップ/phase1_共通コンポーネント調査.md#L78-L78) | Layout 3部品の現行ソース調査（2026-10-15）：対象：`soracity/bruce` / `feature/feature-20261015`。TypeScript・HTMLを静的確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [80–84](議事録バックアップ/phase1_共通コンポーネント調査.md#L80-L84) | Layout 3部品の現行ソース調査（2026-10-15）：\| 部品 \| Input/Output \| 現行実装 \| 注意点 \| \|---\|---\|---\|---\| \| ItemStackLayout \| なし \| `&lt;div class="flex fle | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [88–88](議事録バックアップ/phase1_共通コンポーネント調査.md#L88-L88) | Layout 3部品の現行ソース調査（2026-10-15）：1. 既存の復元ドラフトでは`LayoutItem`が「折り返す」とされているが、現行HTMLには`flex-wrap`がなく、**実装と記録に差異がある**。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [89–89](議事録バックアップ/phase1_共通コンポーネント調査.md#L89-L89) | Layout 3部品の現行ソース調査（2026-10-15）：2. 復元ドラフトの「子の幅を勝手に変更しない」という記述に対し、現行`LayoutItem`は直接の子要素に`flex-1`・`basis-0`・`min-w-0`を適用する。仕様として意図した動作か、後の設計フェーズで確認する | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [90–90](議事録バックアップ/phase1_共通コンポーネント調査.md#L90-L90) | Layout 3部品の現行ソース調査（2026-10-15）：3. `LayoutSpan`は均等幅を個別の比率に変更する用途と考えられるが、具体的な利用箇所・画面例との照合は未実施。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [91–91](議事録バックアップ/phase1_共通コンポーネント調査.md#L91-L91) | Layout 3部品の現行ソース調査（2026-10-15）：4. Tailwind CSS中心で構成。iPhone/Androidの狭い画面での折り返し、ラベル切れ、文字サイズ拡大などの表示確認は未実施。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [92–92](議事録バックアップ/phase1_共通コンポーネント調査.md#L92-L92) | Layout 3部品の現行ソース調査（2026-10-15）：5. 各部品の単体テスト内容、実際の呼び出し側、ビルド・実機表示は未確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [94–94](議事録バックアップ/phase1_共通コンポーネント調査.md#L94-L94) | Layout 3部品の現行ソース調査（2026-10-15）：※これはフェーズ1の**現状調査記録**。コード修正・仕様変更を承認したものではない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [98–98](議事録バックアップ/phase1_共通コンポーネント調査.md#L98-L98) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：対象：`soracity/bruce` / `feature/feature-20261015`。TypeScript・HTML・SCSSおよび`TableCornersDirective`・`table-corner-geome | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [100–105](議事録バックアップ/phase1_共通コンポーネント調査.md#L100-L105) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：\| 部品 \| 現行Input・Output \| 主な動作 \| \|---\|---\|---\| \| TableContainerLayout \| zebra=false, responsive=false, empt | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [109–109](議事録バックアップ/phase1_共通コンポーネント調査.md#L109-L109) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：- `TableCornersDirective`はSVGオーバーレイとclip-pathを用い、角丸セルの描画を補正する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [110–110](議事録バックアップ/phase1_共通コンポーネント調査.md#L110-L110) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：- `ResizeObserver`・`MutationObserver`・スクロール・ウィンドウリサイズを監視し、`requestAnimationFrame`で再計算する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [111–111](議事録バックアップ/phase1_共通コンポーネント調査.md#L111-L111) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：- `tableGridOffset`はBlinkとWebKitのcollapsed border座標差を吸収することを意図した実装。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [112–112](議事録バックアップ/phase1_共通コンポーネント調査.md#L112-L112) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：- `recordShadow`有効時は各レコードの矩形に合わせた`rounded-lg shadow-md`の影レイヤーを作る。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [113–113](議事録バックアップ/phase1_共通コンポーネント調査.md#L113-L113) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：- 監視と描画は実装されているが、端末性能・大量レコード時の負荷・実機での描画精度は未検証。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [117–117](議事録バックアップ/phase1_共通コンポーネント調査.md#L117-L117) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：1. **スタイル継承（TableContainerLayout → TableRecord → TableCell）は未実装**。フェーズ3で検討する設計案と区別する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [118–118](議事録バックアップ/phase1_共通コンポーネント調査.md#L118-L118) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：2. `TableRecord.cellBorder`のCSSは`border: 1px solid var(--color-base-300) !important`。セル個別の罫線指定との優先関係に注意。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [119–119](議事録バックアップ/phase1_共通コンポーネント調査.md#L119-L119) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：3. `TableCell.cellClasses`はホストの`className`を内部td/thの`[class]`へ転送する。Angularクラスバインディングとの組み合わせを変更する際は確認が必要。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [120–120](議事録バックアップ/phase1_共通コンポーネント調査.md#L120-L120) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：4. `TableRecord`のクリックは`tbody (click)`。キーボード操作・フォーカス対応は未確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [121–121](議事録バックアップ/phase1_共通コンポーネント調査.md#L121-L121) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：5. `responsive`時は`overflow-x-auto`と`min-w-max`を付与。狭い画面でのスクロール操作・stickyの相互作用を実機確認する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [122–122](議事録バックアップ/phase1_共通コンポーネント調査.md#L122-L122) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：6. `TableRow.sticky`と`TableCell.sticky`は別々の方向（上端・左端）を固定する。交差部の重なり順序と背景の確認が必要。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [123–123](議事録バックアップ/phase1_共通コンポーネント調査.md#L123-L123) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：7. テーブルの`ViewEncapsulation.None`と全体セレクタを使うCSSがあるため、他画面・複数テーブルへの影響を確認する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [124–124](議事録バックアップ/phase1_共通コンポーネント調査.md#L124-L124) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：8. 補助処理のテストファイルは存在するが、本調査ではテスト実行を行っていない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [126–126](議事録バックアップ/phase1_共通コンポーネント調査.md#L126-L126) | Table 4部品と補助処理の現行ソース調査（2026-10-15）：※フェーズ1の現状調査。実装・設計変更は行っていない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [130–130](議事録バックアップ/phase1_共通コンポーネント調査.md#L130-L130) | Swipeの現行ソース調査（2026-10-15）：対象：`soracity/bruce` / `feature/feature-20261015`。SwipeDirective・SCSS・SwipeCoordinator・単体テストを静的確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [134–134](議事録バックアップ/phase1_共通コンポーネント調査.md#L134-L134) | Swipeの現行ソース調査（2026-10-15）：- `[appSwipe]`は`TemplateRef&lt;SwipeContext> \| null`を受け取り、`swipeOpenChange: EventEmitter&lt;boolean>`で状態通知。公開メソッド` | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [135–135](議事録バックアップ/phase1_共通コンポーネント調査.md#L135-L135) | Swipeの現行ソース調査（2026-10-15）：- 左スワイプで開き、右スワイプで閉じる。移動量8px以上で方向を判定し、横・縦の比率1.25で判定する。開閉判定の閾値は`min(48px, panelWidth/2)`。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [136–136](議事録バックアップ/phase1_共通コンポーネント調査.md#L136-L136) | Swipeの現行ソース調査（2026-10-15）：- アクションのAngularテンプレートを`document.body`に配置する。元のTableのDOM・角丸clip-pathを変更しない。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [137–137](議事録バックアップ/phase1_共通コンポーネント調査.md#L137-L137) | Swipeの現行ソース調査（2026-10-15）：- `SwipeCoordinator`はTableContainerLayoutのprovidersでテーブル単位に提供され、同じテーブル内の同時オープンを1件に制限する。単独カードでの利用はCoordinatorなしでも可能。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [138–138](議事録バックアップ/phase1_共通コンポーネント調査.md#L138-L138) | Swipeの現行ソース調査（2026-10-15）：- `pointerdown/move/up/cancel`・`lostpointercapture`を監視。スワイプ後700msの誤クリック抑止、通常タップとキーボード由来クリックを区別。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [139–139](議事録バックアップ/phase1_共通コンポーネント調査.md#L139-L139) | Swipeの現行ソース調査（2026-10-15）：- アクションパネルに`inert`・`aria-hidden`を適用。Escapeで閉じ、必要時にフォーカスを復元。利用側から`open()`でキーボード操作を実装できる。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [140–140](議事録バックアップ/phase1_共通コンポーネント調査.md#L140-L140) | Swipeの現行ソース調査（2026-10-15）：- `ResizeObserver`・`MutationObserver`・scroll・resize・visualViewportを使い、表示位置・幅を更新。スクロール祖先の表示領域でクリップ。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [141–141](議事録バックアップ/phase1_共通コンポーネント調査.md#L141-L141) | Swipeの現行ソース調査（2026-10-15）：- CSSは`touch-action: pan-y pinch-zoom`、`transition: transform 180ms ease-out`、`prefers-reduced-motion`対応。CSS変数による角丸 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [142–142](議事録バックアップ/phase1_共通コンポーネント調査.md#L142-L142) | Swipeの現行ソース調査（2026-10-15）：- 単体テストには、複数テーブルの排他、クリック抑止、縦スクロール維持、キャンセル、キーボード、リサイズ、テーブル構造維持、後片付け等のケースが存在する（**実行は未実施**）。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [146–146](議事録バックアップ/phase1_共通コンポーネント調査.md#L146-L146) | Swipeの現行ソース調査（2026-10-15）：1. **横スクロール可能なTableとのジェスチャー競合**：Swipe対象の`touch-action: pan-y pinch-zoom`により、横スクロールがSwipeに優先される可能性。Android・iPhone実機で | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [147–147](議事録バックアップ/phase1_共通コンポーネント調査.md#L147-L147) | Swipeの現行ソース調査（2026-10-15）：2. `document.body`へポータル表示するため、テーマCSS変数を生成時にコピーする。パネルを開いたままテーマ変更した場合の追従は要確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [148–148](議事録バックアップ/phase1_共通コンポーネント調査.md#L148-L148) | Swipeの現行ソース調査（2026-10-15）：3. アクションパネルの`aria-label`は現在英語固定の`Actions`。多言語化の必要性を後の設計フェーズで検討する。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [149–149](議事録バックアップ/phase1_共通コンポーネント調査.md#L149-L149) | Swipeの現行ソース調査（2026-10-15）：4. スワイプ以外の操作手段として`open()`が提供されるが、利用側画面に開くボタン等があるかは別途確認。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [150–150](議事録バックアップ/phase1_共通コンポーネント調査.md#L150-L150) | Swipeの現行ソース調査（2026-10-15）：5. 大量レコード時のObserver・DOM計測・bodyポータルの性能は未検証。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [151–151](議事録バックアップ/phase1_共通コンポーネント調査.md#L151-L151) | Swipeの現行ソース調査（2026-10-15）：6. 本調査は静的レビュー。実機・エミュレーター・単体テストは未実行。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [155–155](議事録バックアップ/phase1_共通コンポーネント調査.md#L155-L155) | Swipeの現行ソース調査（2026-10-15）：通常UI（8）、Layout（3）、Table（4）、Swipe（1）の主要16部品についてソース調査を実施。**主要部品の一次調査は一巡**。未検証事項の総括・調査結果の整理は次工程。ソース修正なし。 | 2026-10-15調査／方針 | [1.1.1](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [161–161](議事録バックアップ/phase1_共通コンポーネント調査.md#L161-L161) | フェーズ1一次調査の総括（2026-10-15）：- 通常UI：Alert、Button、Date、Fab、Group、Radio、Textbox、Toggle（8部品） | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [162–162](議事録バックアップ/phase1_共通コンポーネント調査.md#L162-L162) | フェーズ1一次調査の総括（2026-10-15）：- Layout：ItemStackLayout、LayoutItem、LayoutSpan（3部品） | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [163–163](議事録バックアップ/phase1_共通コンポーネント調査.md#L163-L163) | フェーズ1一次調査の総括（2026-10-15）：- Table：TableContainerLayout、TableRecord、TableRow、TableCell（4部品）および角丸描画補助処理 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [164–164](議事録バックアップ/phase1_共通コンポーネント調査.md#L164-L164) | フェーズ1一次調査の総括（2026-10-15）：- Swipe：SwipeDirective（1部品）およびSwipeCoordinator・関連SCSS | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [165–165](議事録バックアップ/phase1_共通コンポーネント調査.md#L165-L165) | フェーズ1一次調査の総括（2026-10-15）：- **合計16部品の一次ソース調査が完了**。これは実機品質・全テスト合格を意味しない。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [169–178](議事録バックアップ/phase1_共通コンポーネント調査.md#L169-L178) | フェーズ1一次調査の総括（2026-10-15）：\| 優先度 \| 分野 \| 調査で判明した事実・確認事項 \| 扱い \| \|---\|---\|---\|---\| \| 高 \| Layout \| 復元方針は「折り返す」だが、現行LayoutItemには`flex- | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [182–182](議事録バックアップ/phase1_共通コンポーネント調査.md#L182-L182) | フェーズ1一次調査の総括（2026-10-15）：- **確認済み**：GitHub上の主要16部品の現行ソース、既存テストファイルの一部、旧ディレクトリ削除後のビルド成功（ユーザー報告）。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [183–183](議事録バックアップ/phase1_共通コンポーネント調査.md#L183-L183) | フェーズ1一次調査の総括（2026-10-15）：- **未実施**：本レビューでのビルド・テスト実行、実機・エミュレーター検証、全呼び出し元の網羅調査。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [184–184](議事録バックアップ/phase1_共通コンポーネント調査.md#L184-L184) | フェーズ1一次調査の総括（2026-10-15）：- **未決定**：ComponentBase統合、Tableスタイル継承、Layout折り返し仕様など。フェーズ1では変更しない。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [185–185](議事録バックアップ/phase1_共通コンポーネント調査.md#L185-L185) | フェーズ1一次調査の総括（2026-10-15）：- **ソースコード変更なし**：この総括はドキュメント更新のみ。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [189–189](議事録バックアップ/phase1_共通コンポーネント調査.md#L189-L189) | 調査成果物と未確認事項：- 「brf9020共通コンポーネント仕様一覧 第1版」が過去の議論で言及されているが、完全な原本との照合は未完了。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [190–190](議事録バックアップ/phase1_共通コンポーネント調査.md#L190-L190) | 調査成果物と未確認事項：- 主要Input/Outputと既定値はソース調査済み。全使用箇所との照合、使用規則の確定は未完了。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [191–191](議事録バックアップ/phase1_共通コンポーネント調査.md#L191-L191) | 調査成果物と未確認事項：- 角丸OFF時の表示は追加確認が必要。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [192–192](議事録バックアップ/phase1_共通コンポーネント調査.md#L192-L192) | 調査成果物と未確認事項：- ビルド・実機表示確認は本書作成時には実施していない。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |
| [195–195](議事録バックアップ/phase1_共通コンポーネント調査.md#L195-L195) | 変更管理：本書は復元記録に現行ソースの一次調査結果を追記したもの。調査結果は仕様変更の承認を意味しない。未決事項は後続フェーズで議論する。 | 2026-10-15調査／方針 | [1.1.2](phase1_01_既存資産棚卸し.md) | 一致 | 不要 |

## 項目対応表（旧Phase 2：責務・Form・Domain／前半）

| 旧原典行 | 事項・コード例等の抜粋 | 原典状態 | 新工程小区分 | 判定 | 修正・確認 |
|---|---|---|---|---|---|
| [L9–9](議事録バックアップ/phase2_UI設計思想と責務.md#L9-L9) | フェーズ1で確認した現行共通コンポーネントを前提に、画面・共通Component・Layout・Application・Domain・Infrastructureの責務境界を明確にする。 | 調査・検討記録 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L11–11](議事録バックアップ/phase2_UI設計思想と責務.md#L11-L11) | このフェーズでは「どこに何を書くか」を決める。色・角丸・影などの具体的なデザインシステム標準化はフェーズ3で扱う。 | 調査・検討記録 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L15–23](議事録バックアップ/phase2_UI設計思想と責務.md#L15-L23) | \| 領域 \| 主な責務 \| 原則として持たせない責務 \| \|---\|---\|---\| \| UI（画面Component） \| 画面表示、ユーザー操作受付、画面固有の表示制 | 調査・検討記録 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L27–41](議事録バックアップ/phase2_UI設計思想と責務.md#L27-L41) | ```text ユーザー操作     ↓ 画面Component     ↓ FormGroup / DTO     ↓ Application     ↓ Domain     ↓ Rep | 提案・未承認 | [2.7.1](phase2_07_UI・Domain境界.md) | 一致 | 不要 |
| [L43–43](議事録バックアップ/phase2_UI設計思想と責務.md#L43-L43) | 取得結果は逆方向に戻し、最終的な表示判断を画面Componentが行う。 | 提案・未承認 | [2.7.1](phase2_07_UI・Domain境界.md) | 一致 | 不要 |
| [L45–45](議事録バックアップ/phase2_UI設計思想と責務.md#L45-L45) | 共通Componentはこの縦方向の業務フローには入らず、画面ComponentとFormControlの間にある再利用可能なUI部品として扱う。 | 提案・未承認 | [2.7.1](phase2_07_UI・Domain境界.md) | 一致 | 不要 |
| [L47–51](議事録バックアップ/phase2_UI設計思想と責務.md#L47-L51) | ```text 画面Component     ├─ FormControl ── 共通入力Component     └─ イベント  ←── 共通Component ``` | 提案・未承認 | [2.7.1](phase2_07_UI・Domain境界.md) | 一致 | 不要 |
| [L55–55](議事録バックアップ/phase2_UI設計思想と責務.md#L55-L55) | Validationは種類で分ける。 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L59–59](議事録バックアップ/phase2_UI設計思想と責務.md#L59-L59) | 画面入力として機械的に判定できるものを担当する。 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L61–61](議事録バックアップ/phase2_UI設計思想と責務.md#L61-L61) | - required | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L62–62](議事録バックアップ/phase2_UI設計思想と責務.md#L62-L62) | - 文字数 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L63–63](議事録バックアップ/phase2_UI設計思想と責務.md#L63-L63) | - 数値形式 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L64–64](議事録バックアップ/phase2_UI設計思想と責務.md#L64-L64) | - 日付形式 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L65–65](議事録バックアップ/phase2_UI設計思想と責務.md#L65-L65) | - 入力可能範囲など、画面入力として完結する制約 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L69–69](議事録バックアップ/phase2_UI設計思想と責務.md#L69-L69) | テニスの意味を理解しないと判定できないものを担当する。 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L71–71](議事録バックアップ/phase2_UI設計思想と責務.md#L71-L71) | 例： | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L73–73](議事録バックアップ/phase2_UI設計思想と責務.md#L73-L73) | - ポイント・ゲーム・セットの状態遷移が成立するか | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L74–74](議事録バックアップ/phase2_UI設計思想と責務.md#L74-L74) | - 試合状態として矛盾していないか | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L75–75](議事録バックアップ/phase2_UI設計思想と責務.md#L75-L75) | - 戦術・スタッツ上の業務ルール | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L77–77](議事録バックアップ/phase2_UI設計思想と責務.md#L77-L77) | 同じ条件を画面とDomainの双方へ重複実装しないことを原則とする。 | 提案・未承認 | [2.6.3](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L81–81](議事録バックアップ/phase2_UI設計思想と責務.md#L81-L81) | 共通Componentは「再利用可能なUI部品」に限定する。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L83–83](議事録バックアップ/phase2_UI設計思想と責務.md#L83-L83) | 例えばTextboxComponentは、値の表示・入力、FormControlとの接続、共通Validation表示などを担当してよい。一方、「この画面では試合名が必須だから保存不可」とい | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L85–85](議事録バックアップ/phase2_UI設計思想と責務.md#L85-L85) | ButtonComponentもクリックを親へ通知するところまでとし、保存ApplicationServiceを直接呼び出さない。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L87–87](議事録バックアップ/phase2_UI設計思想と責務.md#L87-L87) | この境界により、同じ共通Componentを別画面や将来の機能でも再利用できる状態を維持する。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L91–91](議事録バックアップ/phase2_UI設計思想と責務.md#L91-L91) | Layoutは配置だけを担当する。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L93–93](議事録バックアップ/phase2_UI設計思想と責務.md#L93-L93) | - 横並び / 縦積み | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L94–94](議事録バックアップ/phase2_UI設計思想と責務.md#L94-L94) | - gap | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L95–95](議事録バックアップ/phase2_UI設計思想と責務.md#L95-L95) | - 必要なレスポンシブ配置 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L96–96](議事録バックアップ/phase2_UI設計思想と責務.md#L96-L96) | - 子要素の配置比率（採用する場合） | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L98–98](議事録バックアップ/phase2_UI設計思想と責務.md#L98-L98) | 以下はLayoutに持たせない。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L100–100](議事録バックアップ/phase2_UI設計思想と責務.md#L100-L100) | - FormControl | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L101–101](議事録バックアップ/phase2_UI設計思想と責務.md#L101-L101) | - disabled判定 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L102–102](議事録バックアップ/phase2_UI設計思想と責務.md#L102-L102) | - ラベルやメッセージ | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L103–103](議事録バックアップ/phase2_UI設計思想と責務.md#L103-L103) | - Application呼び出し | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L104–104](議事録バックアップ/phase2_UI設計思想と責務.md#L104-L104) | - テニス業務ルール | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L106–106](議事録バックアップ/phase2_UI設計思想と責務.md#L106-L106) | フェーズ1で判明した `LayoutItem` の「折り返し有無」「子を均等幅にするか」は、この責務原則の中で別途決定する。 | 提案・未承認 | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L112–112](議事録バックアップ/phase2_UI設計思想と責務.md#L112-L112) | `BRU1001`では、UI側の`Bru1001Dto`がACGによる自動生成クラスとなっており、`FormGroup`と各`FormControl`の型・初期値・disabled・Angu | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L114–114](議事録バックアップ/phase2_UI設計思想と責務.md#L114-L114) | 現行画面Componentは`readonly dto = new Bru1001Dto()`、`readonly controls = this.dto.formGroup.control | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L116–116](議事録バックアップ/phase2_UI設計思想と責務.md#L116-L116) | HTML側では`@let ctrls = dto.formGroup.controls;`としてテンプレート内だけの短縮名を定義し、共通入力Componentへ`[control]="ctr | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L118–118](議事録バックアップ/phase2_UI設計思想と責務.md#L118-L118) | 一方、Application層の`Bra1001SaveMatchInfoReqDto`は`FormControl`を持たないreadonlyの値DTOであり、UIのReactive For | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L120–120](議事録バックアップ/phase2_UI設計思想と責務.md#L120-L120) | 現行`Bru1001Component`では、画面初期化・Application Service呼び出し・FormGroupへのpatchValue・保存用DTOへの変換に加え、サーブ順やリ | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L124–124](議事録バックアップ/phase2_UI設計思想と責務.md#L124-L124) | 同じ「DTO」という名称でも責務を明確に分ける。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L126–129](議事録バックアップ/phase2_UI設計思想と責務.md#L126-L129) | \| 種類 \| 例 \| 責務 \| 持たせないもの \| \|---\|---\|---\|---\| \| UI Form DTO \| `Bru1001Dto` \| FormGro | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L131–131](議事録バックアップ/phase2_UI設計思想と責務.md#L131-L131) | 現行の`Bru1001Dto`のように画面設計書からFormGroupをACG生成する方向は、UI Form DTOとして責務を限定する限り整合性が高い。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L135–135](議事録バックアップ/phase2_UI設計思想と責務.md#L135-L135) | 画面ComponentはUIのオーケストレーターとする。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L137–137](議事録バックアップ/phase2_UI設計思想と責務.md#L137-L137) | - UI Form DTOをComponentスコープDIで取得する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L138–138](議事録バックアップ/phase2_UI設計思想と責務.md#L138-L138) | - FormControlを共通Componentへ渡すためのデータ元を提供する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L139–139](議事録バックアップ/phase2_UI設計思想と責務.md#L139-L139) | - TypeScript側では記述簡略化だけを目的とした`controls`別名を持たない。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L140–140](議事録バックアップ/phase2_UI設計思想と責務.md#L140-L140) | - HTML側で必要に応じて`@let ctrls = dto.formGroup.controls;`を定義し、テンプレート内の参照を簡潔にする。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L141–141](議事録バックアップ/phase2_UI設計思想と責務.md#L141-L141) | - ルートパラメータ・画面初期化・表示/非表示など画面固有状態を扱う。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L142–142](議事録バックアップ/phase2_UI設計思想と責務.md#L142-L142) | - ユーザーイベントを受けてApplication Serviceを呼び出す。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L143–143](議事録バックアップ/phase2_UI設計思想と責務.md#L143-L143) | - UI Form DTOとApplication DTOの境界で値を変換する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L144–144](議事録バックアップ/phase2_UI設計思想と責務.md#L144-L144) | - Applicationから返った値をFormGroupへ反映する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L146–146](議事録バックアップ/phase2_UI設計思想と責務.md#L146-L146) | ただし、テニスの意味に依存するルールそのものは画面Componentに置かない。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L150–161](議事録バックアップ/phase2_UI設計思想と責務.md#L150-L161) | \| 現行処理 \| 基本的な配置先 \| \|---\|---\| \| `matchId`のルート取得、初期表示 \| 画面Component \| \| `FormGroup.valu | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L163–163](議事録バックアップ/phase2_UI設計思想と責務.md#L163-L163) | 画面上の利便性のための処理と、保存される試合データの正しさを保証する業務ルールを区別する。後者はUIを経由しない処理から呼ばれても成立する必要があるため、Domain側へ置く。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L167–184](議事録バックアップ/phase2_UI設計思想と責務.md#L167-L184) | ```text 共通Component       ⇅ FormControl 画面Component       ⇅ UI Form DTO（FormGroup）       │ 値を取り | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L186–186](議事録バックアップ/phase2_UI設計思想と責務.md#L186-L186) | Application Serviceへ`FormGroup`や`FormControl`を渡さない。DomainにもAngular依存を持ち込まない。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L188–188](議事録バックアップ/phase2_UI設計思想と責務.md#L188-L188) | Infrastructure側にDAO/DB用DTOが存在する場合、それはApplication DTOとは別責務とし、Repository/Infrastructure境界で変換する。画面 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L192–192](議事録バックアップ/phase2_UI設計思想と責務.md#L192-L192) | - UI Form DTOは画面設計書から生成してよい。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L193–193](議事録バックアップ/phase2_UI設計思想と責務.md#L193-L193) | - 型、初期値、disabled初期状態、Angular Validatorsは生成対象にできる。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L194–194](議事録バックアップ/phase2_UI設計思想と責務.md#L194-L194) | - テニス業務ルールを生成UI DTOへ埋め込まない。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L195–195](議事録バックアップ/phase2_UI設計思想と責務.md#L195-L195) | - Application DTOはユースケース契約としてUI Form DTOとは別生成物にする。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L196–196](議事録バックアップ/phase2_UI設計思想と責務.md#L196-L196) | - 自動生成ファイルを直接修正せず、変更が必要な場合は設計書またはACG生成処理を変更する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L198–198](議事録バックアップ/phase2_UI設計思想と責務.md#L198-L198) | この整理により、FormGroup生成とDDDの責務分離を両立する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L202–202](議事録バックアップ/phase2_UI設計思想と責務.md#L202-L202) | UI Form DTOの表現は次の候補を比較する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L204–209](議事録バックアップ/phase2_UI設計思想と責務.md#L204-L209) | \| 方式 \| 例 \| 評価 \| \|---\|---\|---\| \| A. `class`が`formGroup`を保持 \| `class Bru1001Dto { formG | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L211–211](議事録バックアップ/phase2_UI設計思想と責務.md#L211-L211) | フェーズ2の推奨案は **A：UI Form DTOを通常のclassとして生成し、そのプロパティとしてFormGroupを保持する方式を継続** とする。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L213–213](議事録バックアップ/phase2_UI設計思想と責務.md#L213-L213) | 画面側のDTO取得は次の形を採用する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L215–217](議事録バックアップ/phase2_UI設計思想と責務.md#L215-L217) | ```ts readonly dto = inject(Bru1001Dto); ``` | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L219–219](議事録バックアップ/phase2_UI設計思想と責務.md#L219-L219) | HTMLでは次の形とする。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L221–223](議事録バックアップ/phase2_UI設計思想と責務.md#L221-L223) | ```html @let ctrls = dto.formGroup.controls; ``` | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L225–225](議事録バックアップ/phase2_UI設計思想と責務.md#L225-L225) | UI Form DTOに独自の業務メソッドを追加してDomainオブジェクト化することはしない。FormGroup定義・初期値・入力ValidationというUI状態定義に責務を限定する。 | 調査・検討記録 | [2.6.4](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L229–230](議事録バックアップ/phase2_UI設計思想と責務.md#L229-L230) | > 状態：**設計承認済み / 実装未着手**   > 承認日：2026-10-15 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L234–234](議事録バックアップ/phase2_UI設計思想と責務.md#L234-L234) | UI Form DTOはDIで取得する。ただしアプリ全体のシングルトンにはせず、**画面Component単位のインスタンス**とする。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L236–236](議事録バックアップ/phase2_UI設計思想と責務.md#L236-L236) | `Bru1001Dto`のFormGroupは画面固有状態であるため、`providedIn: 'root'`によるアプリ全体共有は行わない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L238–238](議事録バックアップ/phase2_UI設計思想と責務.md#L238-L238) | 想定形： | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L240–247](議事録バックアップ/phase2_UI設計思想と責務.md#L240-L247) | ```ts @Injectable() export class Bru1001Dto {   readonly formGroup = new FormGroup({     // ... | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L249–257](議事録バックアップ/phase2_UI設計思想と責務.md#L249-L257) | ```ts @Component({   // ...   providers: [Bru1001Dto], }) export class Bru1001Component {   rea | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L261–261](議事録バックアップ/phase2_UI設計思想と責務.md#L261-L261) | 1. ACGが生成するUI Form DTOの`@Injectable({ providedIn: 'root' })`を、root提供しない形へ変更する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L262–262](議事録バックアップ/phase2_UI設計思想と責務.md#L262-L262) | 2. `Bru1001Component`の`providers`へ`Bru1001Dto`を登録する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L263–263](議事録バックアップ/phase2_UI設計思想と責務.md#L263-L263) | 3. `readonly dto = new Bru1001Dto();`を`readonly dto = inject(Bru1001Dto);`へ変更する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L264–264](議事録バックアップ/phase2_UI設計思想と責務.md#L264-L264) | 4. 記述簡略化だけを目的とする`readonly controls = this.dto.formGroup.controls;`を廃止する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L265–265](議事録バックアップ/phase2_UI設計思想と責務.md#L265-L265) | 5. HTMLで`@let ctrls = dto.formGroup.controls;`を定義し、`ctrls.xxx`で参照する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L266–266](議事録バックアップ/phase2_UI設計思想と責務.md#L266-L266) | 6. 同種のUI Form DTOについても、画面固有状態を持つものは同じComponentスコープDI方針を適用する。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L270–270](議事録バックアップ/phase2_UI設計思想と責務.md#L270-L270) | - FormGroupのライフサイクルを画面Componentのライフサイクルと一致させる。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L271–271](議事録バックアップ/phase2_UI設計思想と責務.md#L271-L271) | - 画面を開き直した場合や複数画面インスタンスでForm状態を意図せず共有しない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L272–272](議事録バックアップ/phase2_UI設計思想と責務.md#L272-L272) | - DTO生成方法をDIへ統一しつつ、画面状態をシングルトン化しない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L273–273](議事録バックアップ/phase2_UI設計思想と責務.md#L273-L273) | - テスト時に画面単位でUI Form DTOを差し替えやすくする。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L277–279](議事録バックアップ/phase2_UI設計思想と責務.md#L277-L279) | ```ts @Injectable({ providedIn: 'root' }) ``` | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L281–281](議事録バックアップ/phase2_UI設計思想と責務.md#L281-L281) | によるUI Form DTOのシングルトン化は採用しない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L283–283](議事録バックアップ/phase2_UI設計思想と責務.md#L283-L283) | また、画面Componentからの直接生成： | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L285–287](議事録バックアップ/phase2_UI設計思想と責務.md#L285-L287) | ```ts readonly dto = new Bru1001Dto(); ``` | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L289–289](議事録バックアップ/phase2_UI設計思想と責務.md#L289-L289) | も今後の方針としては採用しない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L291–291](議事録バックアップ/phase2_UI設計思想と責務.md#L291-L291) | ※本Issueは設計承認の記録であり、このコミットではアプリケーションソースおよびACGソースを変更しない。 | 設計承認済み | [2.6.1](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L295–295](議事録バックアップ/phase2_UI設計思想と責務.md#L295-L295) | - 画面実装は既存の共通コンポーネントを優先して利用する。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L296–296](議事録バックアップ/phase2_UI設計思想と責務.md#L296-L296) | - 画面の入力状態はAngularの`FormGroup` / `FormControl`で扱う。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L297–297](議事録バックアップ/phase2_UI設計思想と責務.md#L297-L297) | - UI Form DTOはDIで取得し、Componentスコープで管理する。シングルトン化しない。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L298–298](議事録バックアップ/phase2_UI設計思想と責務.md#L298-L298) | - 親画面から共通入力コンポーネントへ既存の`FormControl`インスタンスを渡す。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L299–299](議事録バックアップ/phase2_UI設計思想と責務.md#L299-L299) | - 記述簡略化だけを目的とした`readonly controls = this.dto.formGroup.controls;`は画面Componentに定義しない。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L300–300](議事録バックアップ/phase2_UI設計思想と責務.md#L300-L300) | - HTMLでは`@let ctrls = dto.formGroup.controls;`を使用し、テンプレート内で`ctrls.xxx`として参照する。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L301–301](議事録バックアップ/phase2_UI設計思想と責務.md#L301-L301) | - ラベル・メッセージはキーで管理し、既存のラベルキーを優先して再利用する。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L302–302](議事録バックアップ/phase2_UI設計思想と責務.md#L302-L302) | - Enumは共通・画面単位で管理し、ACG（AlfredCodeGenerator）で生成する。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L303–303](議事録バックアップ/phase2_UI設計思想と責務.md#L303-L303) | - AIは自動生成されたEnumやその他の生成コードを直接編集しない。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L304–304](議事録バックアップ/phase2_UI設計思想と責務.md#L304-L304) | - 生成結果を変更する場合は生成元の定義・生成処理を見直す。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L305–305](議事録バックアップ/phase2_UI設計思想と責務.md#L305-L305) | - Layoutから子コンポーネントに画面固有CSSを注入しない。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L306–306](議事録バックアップ/phase2_UI設計思想と責務.md#L306-L306) | - 設計思想から外れる実装を、確認なく採用しない。 | 調査・検討記録 | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L310–311](議事録バックアップ/phase2_UI設計思想と責務.md#L310-L311) | > 状態：**設計承認済み**   > 承認日：2026-10-15 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L315–315](議事録バックアップ/phase2_UI設計思想と責務.md#L315-L315) | 画面・LayoutManager・共通Componentの責務を次のように分離する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L317–325](議事録バックアップ/phase2_UI設計思想と責務.md#L317-L325) | \| 層 \| 責務 \| \|---\|---\| \| 画面Component \| 何を表示するか、どの順番で置くか、データ・イベントの接続 \| \| ItemStackLayout | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L327–327](議事録バックアップ/phase2_UI設計思想と責務.md#L327-L327) | 基本原則は次のとおりとする。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L329–329](議事録バックアップ/phase2_UI設計思想と責務.md#L329-L329) | > **画面は「配置を記述」するが、「配置をCSSで実装」しない。** | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L331–331](議事録バックアップ/phase2_UI設計思想と責務.md#L331-L331) | 画面はLayoutManagerと共通Componentを組み合わせて画面構造を定義する。画面固有CSSによって、共通Componentの外部配置や内部デザインを変更しない。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L333–333](議事録バックアップ/phase2_UI設計思想と責務.md#L333-L333) | 許可する例： | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L335–346](議事録バックアップ/phase2_UI設計思想と責務.md#L335-L346) | ```html &lt;app-item-stack-layout>   &lt;app-layout-item>     &lt;app-textbox ... />     &lt;ap | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L348–348](議事録バックアップ/phase2_UI設計思想と責務.md#L348-L348) | 禁止する例： | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L350–354](議事録バックアップ/phase2_UI設計思想と責務.md#L350-L354) | ```html &lt;div class="flex gap-4 mt-3 w-full">   ... &lt;/div> ``` | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L356–359](議事録バックアップ/phase2_UI設計思想と責務.md#L356-L359) | ```html &lt;app-textbox class="w-1/2" ... /> &lt;app-textbox classContainer="m-4" ... /> ``` | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L361–361](議事録バックアップ/phase2_UI設計思想と責務.md#L361-L361) | 幅比率など、レイアウト上必要な指定はLayoutManagerが提供する仕組みを利用する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L363–368](議事録バックアップ/phase2_UI設計思想と責務.md#L363-L368) | ```html &lt;app-layout-item>   &lt;app-textbox [appLayoutSpan]="70" ... />   &lt;app-textbox [a | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L372–372](議事録バックアップ/phase2_UI設計思想と責務.md#L372-L372) | `classContainer`、`classInput`、`classLabel`、`classSpan`等、画面側から共通Component内部へ任意CSSを注入するAPIは原則廃止する | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L374–374](議事録バックアップ/phase2_UI設計思想と責務.md#L374-L374) | - コンポーネントの外側配置はLayoutManagerが担当する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L375–375](議事録バックアップ/phase2_UI設計思想と責務.md#L375-L375) | - コンポーネント内部の配置・見た目は共通Component自身が担当する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L376–376](議事録バックアップ/phase2_UI設計思想と責務.md#L376-L376) | - 見た目の差分が必要な場合は、任意CSS文字列ではなく`variant`、`appearance`、`size`等の意味を持つ限定的なAPIを使用する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L380–380](議事録バックアップ/phase2_UI設計思想と責務.md#L380-L380) | AIに画面実装を依頼する場合も、自由なCSSレイアウトを生成させず、既存のLayoutManagerと共通Componentを使用させる。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |
| [L382–382](議事録バックアップ/phase2_UI設計思想と責務.md#L382-L382) | これにより、AI生成コードでも画面間の一貫性と設計思想を維持する。 | 設計承認済み | [2.1.1](phase2_01_責務境界.md) | 一致 | 不要 |

## 項目対応表（旧Phase 2：幅・余白・CSS等／後半）

| 旧原典行 | 事項・コード例等の抜粋 | 原典状態 | 新工程小区分 | 判定 | 修正・確認 |
|---|---|---|---|---|---|
| [L386–387](議事録バックアップ/phase2_UI設計思想と責務.md#L386-L387) | > 状態：**設計承認済み**   > 承認日：2026-10-16 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L391–391](議事録バックアップ/phase2_UI設計思想と責務.md#L391-L391) | LayoutManagerはComponentに**どれだけの領域を与えるか**を決める。共通Componentは**与えられた領域の中でどう描画するか**を決める。画面ComponentはCSSで | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L393–398](議事録バックアップ/phase2_UI設計思想と責務.md#L393-L398) | \| 対象 \| 責務 \| \|---\|---\| \| LayoutItem \| 子Componentへ割り当てる横方向の領域を管理する \| \| LayoutSpan \| Layout | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L402–402](議事録バックアップ/phase2_UI設計思想と責務.md#L402-L402) | 横方向の幅比率は**100等分**を基本単位とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L404–409](議事録バックアップ/phase2_UI設計思想と責務.md#L404-L409) | ```html &lt;app-layout-item>   &lt;app-textbox [appLayoutSpan]="70" ... />   &lt;app-date [appLayou | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L411–411](議事録バックアップ/phase2_UI設計思想と責務.md#L411-L411) | 上記は70:30の比率を表す。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L413–413](議事録バックアップ/phase2_UI設計思想と責務.md#L413-L413) | 原則として、同一`LayoutItem`内で明示的に`appLayoutSpan`を指定する場合、兄弟要素のspan合計を**100**とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L415–415](議事録バックアップ/phase2_UI設計思想と責務.md#L415-L415) | 例： | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L417–417](議事録バックアップ/phase2_UI設計思想と責務.md#L417-L417) | - `50 + 50 = 100` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L418–418](議事録バックアップ/phase2_UI設計思想と責務.md#L418-L418) | - `70 + 30 = 100` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L419–419](議事録バックアップ/phase2_UI設計思想と責務.md#L419-L419) | - `60 + 40 = 100` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L420–420](議事録バックアップ/phase2_UI設計思想と責務.md#L420-L420) | - `20 + 30 + 50 = 100` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L422–422](議事録バックアップ/phase2_UI設計思想と責務.md#L422-L422) | `appLayoutSpan`の値は**CSSの`width: n%`そのものではない**。LayoutItemが持つgap等を除いた利用可能領域を、指定されたspan比率に従って分配するための** | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L424–424](議事録バックアップ/phase2_UI設計思想と責務.md#L424-L424) | したがって、`70 + 30 + gap`をそのまま`70% + 30% + gap`として実装し、100%を超過させる実装は行わない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L428–428](議事録バックアップ/phase2_UI設計思想と責務.md#L428-L428) | 同一`LayoutItem`内で`appLayoutSpan`を指定しない場合、兄弟Componentを均等幅として扱う。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 別小区分へ集約 | 要意味・配置確認 |
| [L430–435](議事録バックアップ/phase2_UI設計思想と責務.md#L430-L435) | ```html &lt;app-layout-item>   &lt;app-textbox ... />   &lt;app-date ... /> &lt;/app-layout-item> ` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L437–437](議事録バックアップ/phase2_UI設計思想と責務.md#L437-L437) | 上記は50:50。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 別小区分へ集約 | 要意味・配置確認 |
| [L439–445](議事録バックアップ/phase2_UI設計思想と責務.md#L439-L445) | ```html &lt;app-layout-item>   &lt;app-textbox ... />   &lt;app-date ... />   &lt;app-radio ... />  | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 別小区分へ集約 | 要意味・配置確認 |
| [L447–447](議事録バックアップ/phase2_UI設計思想と責務.md#L447-L447) | 上記は3等分とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 別小区分へ集約 | 要意味・配置確認 |
| [L451–451](議事録バックアップ/phase2_UI設計思想と責務.md#L451-L451) | 同一`LayoutItem`内では、次のどちらかに統一する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L453–453](議事録バックアップ/phase2_UI設計思想と責務.md#L453-L453) | 1. 全兄弟で`appLayoutSpan`を省略し、均等割りとする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L454–454](議事録バックアップ/phase2_UI設計思想と責務.md#L454-L454) | 2. 全兄弟で`appLayoutSpan`を明示し、合計100の比率を指定する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L456–456](議事録バックアップ/phase2_UI設計思想と責務.md#L456-L456) | 以下のような混在は採用しない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L458–463](議事録バックアップ/phase2_UI設計思想と責務.md#L458-L463) | ```html &lt;app-layout-item>   &lt;app-textbox [appLayoutSpan]="70" ... />   &lt;app-date ... /> &l | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L465–465](議事録バックアップ/phase2_UI設計思想と責務.md#L465-L465) | 未指定値を「残り全部」「1」「自動値」等と解釈する余地をなくし、人間とAIの双方にとって実装規則を明確にするためである。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L469–469](議事録バックアップ/phase2_UI設計思想と責務.md#L469-L469) | 画面側から共通Componentへ`w-full`等を注入して幅を決めない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L471–473](議事録バックアップ/phase2_UI設計思想と責務.md#L471-L473) | ```html &lt;app-textbox classInput="w-full" ... /> ``` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L475–475](議事録バックアップ/phase2_UI設計思想と責務.md#L475-L475) | 上記のような指定は廃止対象とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L477–477](議事録バックアップ/phase2_UI設計思想と責務.md#L477-L477) | 一方、Textbox内部のinputが次のように自身へ割り当てられた領域を100%使用することは許容する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L479–483](議事録バックアップ/phase2_UI設計思想と責務.md#L479-L483) | ```css input {   width: 100%; } ``` | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L485–485](議事録バックアップ/phase2_UI設計思想と責務.md#L485-L485) | この100%は画面全体に対する100%ではなく、**LayoutManagerからTextboxへ割り当てられた領域の100%**である。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L489–489](議事録バックアップ/phase2_UI設計思想と責務.md#L489-L489) | Radio内部の選択肢を等幅にする等の処理はRadioComponent自身の内部レイアウト責務とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L491–491](議事録バックアップ/phase2_UI設計思想と責務.md#L491-L491) | Buttonについても、LayoutManagerは`app-button`ホストへ割り当てる領域までを担当し、内部のネイティブ`button`を全面幅にするか内容幅にするかはButtonCompo | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L493–493](議事録バックアップ/phase2_UI設計思想と責務.md#L493-L493) | 画面Componentから`w-full`等を注入して決定しない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L497–497](議事録バックアップ/phase2_UI設計思想と責務.md#L497-L497) | AIが画面を実装する場合も次を遵守する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L499–499](議事録バックアップ/phase2_UI設計思想と責務.md#L499-L499) | - 通常は`appLayoutSpan`を省略して均等割りを使用する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L500–500](議事録バックアップ/phase2_UI設計思想と責務.md#L500-L500) | - 比率変更が必要な場合のみ`appLayoutSpan`を使用する。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L501–501](議事録バックアップ/phase2_UI設計思想と責務.md#L501-L501) | - `appLayoutSpan`を使う場合は同一`LayoutItem`内の全兄弟へ明示し、合計100とする。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L502–502](議事録バックアップ/phase2_UI設計思想と責務.md#L502-L502) | - `appLayoutSpan`をCSSの`width:%`へ単純変換しない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L503–503](議事録バックアップ/phase2_UI設計思想と責務.md#L503-L503) | - 画面Componentで`w-*`等のwidth系CSSを直接使って配置を調整しない。 | 設計承認済み | [2.2.2](phase2_02_幅の責務.md) | 一致 | 不要 |
| [L507–508](議事録バックアップ/phase2_UI設計思想と責務.md#L507-L508) | > 状態：**設計承認済み**   > 承認日：2026-10-16 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L512–512](議事録バックアップ/phase2_UI設計思想と責務.md#L512-L512) | > **外側の余白は親が決める。内側の余白はComponent自身が決める。** | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L514–514](議事録バックアップ/phase2_UI設計思想と責務.md#L514-L514) | 余白の責務を次のように分離する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L516–521](議事録バックアップ/phase2_UI設計思想と責務.md#L516-L521) | \| 種類 \| 担当 \| \|---\|---\| \| 同一行の兄弟Component間の横方向の間隔 \| `LayoutItem` の `gap` \| \| 行と行の縦方向の間隔 \|  | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L525–525](議事録バックアップ/phase2_UI設計思想と責務.md#L525-L525) | TextboxとDate等、同一`LayoutItem`内にある兄弟Component同士の間隔は`LayoutItem`が管理する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L527–532](議事録バックアップ/phase2_UI設計思想と責務.md#L527-L532) | ```html &lt;app-layout-item>   &lt;app-textbox ... />   &lt;app-date ... /> &lt;/app-layout-item> ` | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L534–534](議事録バックアップ/phase2_UI設計思想と責務.md#L534-L534) | Textboxへ`mr-*`、Dateへ`ml-*`等を指定して間隔を作らない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L538–538](議事録バックアップ/phase2_UI設計思想と責務.md#L538-L538) | 複数の`LayoutItem`を縦方向に積む場合の行間は`ItemStackLayout`が管理する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L540–549](議事録バックアップ/phase2_UI設計思想と責務.md#L540-L549) | ```html &lt;app-item-stack-layout>   &lt;app-layout-item>     ...   &lt;/app-layout-item>   &lt;app | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L551–551](議事録バックアップ/phase2_UI設計思想と責務.md#L551-L551) | 各行や各Componentへ`mt-*`、`mb-*`を個別指定して行間を調整しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L555–555](議事録バックアップ/phase2_UI設計思想と責務.md#L555-L555) | 画面端からコンテンツまでの外周余白は、画面の上位Container / Layoutの責務とする。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L557–557](議事録バックアップ/phase2_UI設計思想と責務.md#L557-L557) | 現時点ではこの責務のためだけに新しい`ScreenLayoutComponent`等を追加しない。必要性が具体化した時点で、既存構造で担保できるかを確認してから導入を判断する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L561–561](議事録バックアップ/phase2_UI設計思想と責務.md#L561-L561) | 共通Component内部を成立させるためのpaddingやgapは、そのComponent自身が管理する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L563–563](議事録バックアップ/phase2_UI設計思想と責務.md#L563-L563) | 例： | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L565–565](議事録バックアップ/phase2_UI設計思想と責務.md#L565-L565) | - Buttonの枠と文字の間のpadding | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L566–566](議事録バックアップ/phase2_UI設計思想と責務.md#L566-L566) | - Alert内部のアイコン・メッセージ・アクション間のgap | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L567–567](議事録バックアップ/phase2_UI設計思想と責務.md#L567-L567) | - Radio内部の選択肢間隔 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L568–568](議事録バックアップ/phase2_UI設計思想と責務.md#L568-L568) | - Toggleとラベル間の間隔 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L569–569](議事録バックアップ/phase2_UI設計思想と責務.md#L569-L569) | - input内部のpadding | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L571–571](議事録バックアップ/phase2_UI設計思想と責務.md#L571-L571) | これらは画面上の外部配置ではなく、Component自身の内部デザインである。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L575–575](議事録バックアップ/phase2_UI設計思想と責務.md#L575-L575) | 画面Componentから共通Componentへmarginを付けて配置を調整する方式は原則採用しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L577–580](議事録バックアップ/phase2_UI設計思想と責務.md#L577-L580) | ```html &lt;app-textbox class="mr-4" ... /> &lt;app-button class="mt-6" ... /> ``` | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L582–582](議事録バックアップ/phase2_UI設計思想と責務.md#L582-L582) | 上記のような実装は行わない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L584–584](議事録バックアップ/phase2_UI設計思想と責務.md#L584-L584) | 標準的な画面構成は、`gap`と上位Containerのpaddingで表現する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L586–586](議事録バックアップ/phase2_UI設計思想と責務.md#L586-L586) | - 横方向の兄弟間隔 → `LayoutItem.gap` | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L587–587](議事録バックアップ/phase2_UI設計思想と責務.md#L587-L587) | - 縦方向の行間 → `ItemStackLayout.gap` | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L588–588](議事録バックアップ/phase2_UI設計思想と責務.md#L588-L588) | - 画面外周 → 上位Containerのpadding | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L589–589](議事録バックアップ/phase2_UI設計思想と責務.md#L589-L589) | - Component内部 → Component自身のpadding / gap | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L593–593](議事録バックアップ/phase2_UI設計思想と責務.md#L593-L593) | 現段階では、`gapSize`等の追加InputやEnumを新設しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L595–595](議事録バックアップ/phase2_UI設計思想と責務.md#L595-L595) | まずは標準gapを共通値として使用する。実際の画面要件として複数のgapバリエーションが必要になった時点で、意味のある限定的APIの追加を検討する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L597–597](議事録バックアップ/phase2_UI設計思想と責務.md#L597-L597) | 不要な抽象化やパラメータ増加を避け、初期設計は最小限とする。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L601–601](議事録バックアップ/phase2_UI設計思想と責務.md#L601-L601) | AIが画面を実装する場合も次を遵守する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L603–603](議事録バックアップ/phase2_UI設計思想と責務.md#L603-L603) | - 兄弟Component間の間隔を各Componentのmarginで調整しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L604–604](議事録バックアップ/phase2_UI設計思想と責務.md#L604-L604) | - 行間を各Componentや各行の`mt-*` / `mb-*`で調整しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L605–605](議事録バックアップ/phase2_UI設計思想と責務.md#L605-L605) | - 同一行の間隔は`LayoutItem`、行間は`ItemStackLayout`を使用する。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L606–606](議事録バックアップ/phase2_UI設計思想と責務.md#L606-L606) | - Component内部のpadding / gapを画面側CSSから変更しない。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L607–607](議事録バックアップ/phase2_UI設計思想と責務.md#L607-L607) | - 既存Layoutで表現できない余白要件が出た場合、独自CSS追加ではなく設計確認を行う。 | 設計承認済み | [2.3.1](phase2_03_余白の責務.md) | 一致 | 不要 |
| [L611–612](議事録バックアップ/phase2_UI設計思想と責務.md#L611-L612) | > 状態：**設計承認済み**   > 承認日：2026-10-16 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L616–616](議事録バックアップ/phase2_UI設計思想と責務.md#L616-L616) | > **画面ComponentはレスポンシブCSSを直接記述せず、LayoutManagerが画面幅に応じた配置変更を担当する。** | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L618–618](議事録バックアップ/phase2_UI設計思想と責務.md#L618-L618) | 画面Componentは何をどの順番で配置するかという構造だけを記述し、ブレークポイント・折り返し・row/column切替等のCSS実装を直接持たない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L622–622](議事録バックアップ/phase2_UI設計思想と責務.md#L622-L622) | 次のような画面実装は行わない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L624–628](議事録バックアップ/phase2_UI設計思想と責務.md#L624-L628) | ```html &lt;div class="flex flex-col md:flex-row">   ... &lt;/div> ``` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L630–632](議事録バックアップ/phase2_UI設計思想と責務.md#L630-L632) | ```html &lt;app-textbox class="w-full md:w-1/2" ... /> ``` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L634–634](議事録バックアップ/phase2_UI設計思想と責務.md#L634-L634) | `sm:`、`md:`、`lg:`等のレスポンシブUtilityを画面HTMLに直接記述して配置を調整しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L636–636](議事録バックアップ/phase2_UI設計思想と責務.md#L636-L636) | 画面側は次のようにLayoutManagerを使用して構造を記述する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L638–643](議事録バックアップ/phase2_UI設計思想と責務.md#L638-L643) | ```html &lt;app-layout-item>   &lt;app-textbox ... />   &lt;app-date ... /> &lt;/app-layout-item> ` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L647–647](議事録バックアップ/phase2_UI設計思想と責務.md#L647-L647) | 同一`LayoutItem`内のComponentを横並びで表示できる十分な横幅がある場合は横並びとする。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L649–649](議事録バックアップ/phase2_UI設計思想と責務.md#L649-L649) | 横幅が不足し、各Componentの操作性・視認性を維持できない場合は、`LayoutItem`が折り返して縦方向へ配置する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L651–658](議事録バックアップ/phase2_UI設計思想と責務.md#L651-L658) | ```text 十分な幅： Textbox \| Date  幅不足： Textbox Date ``` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L660–660](議事録バックアップ/phase2_UI設計思想と責務.md#L660-L660) | 画面Component自身は`flex-wrap`等を直接指定しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L664–664](議事録バックアップ/phase2_UI設計思想と責務.md#L664-L664) | `appLayoutSpan`で指定した比率は、**横並びで表示できる場合の配置比率**として扱う。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L666–671](議事録バックアップ/phase2_UI設計思想と責務.md#L666-L671) | ```html &lt;app-layout-item>   &lt;app-textbox [appLayoutSpan]="70" ... />   &lt;app-date [appLayou | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L673–673](議事録バックアップ/phase2_UI設計思想と責務.md#L673-L673) | 十分な横幅がある場合は70:30で配置する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L675–675](議事録バックアップ/phase2_UI設計思想と責務.md#L675-L675) | 横幅不足時には70:30を無理に維持せず、折り返した各Componentが利用可能な横幅を使用する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L679–679](議事録バックアップ/phase2_UI設計思想と責務.md#L679-L679) | 現段階では次のようなInputを追加しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L681–681](議事録バックアップ/phase2_UI設計思想と責務.md#L681-L681) | - `minWidth` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L682–682](議事録バックアップ/phase2_UI設計思想と責務.md#L682-L682) | - `responsiveBreakpoint` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L683–683](議事録バックアップ/phase2_UI設計思想と責務.md#L683-L683) | - `wrapBreakpoint` | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L685–685](議事録バックアップ/phase2_UI設計思想と責務.md#L685-L685) | まずはLayoutManager側の共通ルールで対応する。実際の画面要件として一般ルールでは対応できないケースが複数発生した場合のみ、意味のある限定的API追加を検討する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L687–687](議事録バックアップ/phase2_UI設計思想と責務.md#L687-L687) | 不要な抽象化や設定項目を初期段階から増やさない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L691–691](議事録バックアップ/phase2_UI設計思想と責務.md#L691-L691) | `ItemStackLayout`は行を縦方向に積み重ねる責務を持つため、通常はレスポンシブによる大きな方向変更を必要としない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L693–693](議事録バックアップ/phase2_UI設計思想と責務.md#L693-L693) | 主なレスポンシブ・折り返し責務は`LayoutItem`が担う。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L697–697](議事録バックアップ/phase2_UI設計思想と責務.md#L697-L697) | AIが画面を実装する場合も次を遵守する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L699–699](議事録バックアップ/phase2_UI設計思想と責務.md#L699-L699) | - 画面HTMLに`sm:`、`md:`、`lg:`等のレスポンシブUtilityを直接追加しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L700–700](議事録バックアップ/phase2_UI設計思想と責務.md#L700-L700) | - 画面側に`flex-wrap`や独自メディアクエリを追加しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L701–701](議事録バックアップ/phase2_UI設計思想と責務.md#L701-L701) | - 横並び・折り返しは`LayoutItem`の責務として実装する。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L702–702](議事録バックアップ/phase2_UI設計思想と責務.md#L702-L702) | - `appLayoutSpan`は横並び時の比率として扱い、狭い画面で比率維持を強制しない。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L703–703](議事録バックアップ/phase2_UI設計思想と責務.md#L703-L703) | - 既存LayoutManagerで対応できないレスポンシブ要件が出た場合、画面固有CSSで回避せず設計確認を行う。 | 設計承認済み | [2.4.1](phase2_04_レスポンシブ・折り返し.md) | 一致 | 不要 |
| [L707–708](議事録バックアップ/phase2_UI設計思想と責務.md#L707-L708) | > 状態：**設計承認済み**   > 承認日：2026-10-16 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L712–712](議事録バックアップ/phase2_UI設計思想と責務.md#L712-L712) | > **画面側から共通Component内部へ任意CSSを注入しない。外側の配置はLayoutManager、内側の見た目は共通Component自身が管理する。** | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L714–714](議事録バックアップ/phase2_UI設計思想と責務.md#L714-L714) | 共通Componentは画面側から見てブラックボックスとして扱う。画面Componentは、共通Component内部のDOM構造や内部class名を前提とした実装を行わない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L718–718](議事録バックアップ/phase2_UI設計思想と責務.md#L718-L718) | 以下のような任意CSS文字列を受け取るInputは、原則として段階的に廃止する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L720–720](議事録バックアップ/phase2_UI設計思想と責務.md#L720-L720) | - `classContainer` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L721–721](議事録バックアップ/phase2_UI設計思想と責務.md#L721-L721) | - `classInput` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L722–722](議事録バックアップ/phase2_UI設計思想と責務.md#L722-L722) | - `classLabel` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L723–723](議事録バックアップ/phase2_UI設計思想と責務.md#L723-L723) | - `classSpan` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L724–724](議事録バックアップ/phase2_UI設計思想と責務.md#L724-L724) | - `classButton` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L725–725](議事録バックアップ/phase2_UI設計思想と責務.md#L725-L725) | - `classRadioItem` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L726–726](議事録バックアップ/phase2_UI設計思想と責務.md#L726-L726) | - `classLabelSpan` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L727–727](議事録バックアップ/phase2_UI設計思想と責務.md#L727-L727) | - `classMessageContainer` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L728–728](議事録バックアップ/phase2_UI設計思想と責務.md#L728-L728) | - `classButtonContainer` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L729–729](議事録バックアップ/phase2_UI設計思想と責務.md#L729-L729) | - `classAlertBox` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L730–730](議事録バックアップ/phase2_UI設計思想と責務.md#L730-L730) | - `classMessage` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L731–731](議事録バックアップ/phase2_UI設計思想と責務.md#L731-L731) | - `classMessageIcon` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L733–733](議事録バックアップ/phase2_UI設計思想と責務.md#L733-L733) | 実際のComponentに上記以外の同種APIが存在する場合も、同じ基準で扱う。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L737–737](議事録バックアップ/phase2_UI設計思想と責務.md#L737-L737) | 次のような実装は採用しない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L739–744](議事録バックアップ/phase2_UI設計思想と責務.md#L739-L744) | ```html &lt;app-textbox   classContainer="m-4"   classInput="w-full" /> ``` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L746–746](議事録バックアップ/phase2_UI設計思想と責務.md#L746-L746) | `m-4`等の外部配置はLayoutManagerの責務とする。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L748–748](議事録バックアップ/phase2_UI設計思想と責務.md#L748-L748) | Textbox内部のinputが割り当てられた領域を全面使用する必要がある場合は、画面から`w-full`を注入せず、TextboxComponent内部の標準仕様として実装する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L752–752](議事録バックアップ/phase2_UI設計思想と責務.md#L752-L752) | Component内部を成立させるためのCSSは排除対象ではない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L754–754](議事録バックアップ/phase2_UI設計思想と責務.md#L754-L754) | 例： | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L756–756](議事録バックアップ/phase2_UI設計思想と責務.md#L756-L756) | - Radio内部の選択肢を横並び・等幅にするためのflex / gap | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L757–757](議事録バックアップ/phase2_UI設計思想と責務.md#L757-L757) | - Alert内部のアイコン・メッセージ・アクションの配置 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L758–758](議事録バックアップ/phase2_UI設計思想と責務.md#L758-L758) | - Toggleとラベルの内部配置 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L759–759](議事録バックアップ/phase2_UI設計思想と責務.md#L759-L759) | - Textbox内部のinput幅・padding | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L760–760](議事録バックアップ/phase2_UI設計思想と責務.md#L760-L760) | - Button内部の文字・アイコン配置 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L762–762](議事録バックアップ/phase2_UI設計思想と責務.md#L762-L762) | 判断基準はCSSプロパティ名ではなく、**Componentの外側の配置を調整するものか、Component内部を成立させるものか**とする。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L766–766](議事録バックアップ/phase2_UI設計思想と責務.md#L766-L766) | 画面ごとに見た目の差分が必要な場合でも、任意CSS文字列を渡さない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L768–768](議事録バックアップ/phase2_UI設計思想と責務.md#L768-L768) | 必要に応じて、例えば次のような意味のある限定APIで表現する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L770–770](議事録バックアップ/phase2_UI設計思想と責務.md#L770-L770) | - `variant` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L771–771](議事録バックアップ/phase2_UI設計思想と責務.md#L771-L771) | - `appearance` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L772–772](議事録バックアップ/phase2_UI設計思想と責務.md#L772-L772) | - `size` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L773–773](議事録バックアップ/phase2_UI設計思想と責務.md#L773-L773) | - `density` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L774–774](議事録バックアップ/phase2_UI設計思想と責務.md#L774-L774) | - `level` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L775–775](議事録バックアップ/phase2_UI設計思想と責務.md#L775-L775) | - `color` | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L777–777](議事録バックアップ/phase2_UI設計思想と責務.md#L777-L777) | ただし、将来必要になる可能性だけを理由にInputやEnumを先行追加しない。実際の画面要件として必要性が確認されたものだけを追加する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L781–781](議事録バックアップ/phase2_UI設計思想と責務.md#L781-L781) | 既存の任意CSS注入Inputを、設計承認直後に一括削除して既存画面を破壊することはしない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L783–783](議事録バックアップ/phase2_UI設計思想と責務.md#L783-L783) | 実装フェーズでは利用箇所を確認しながら段階的に移行する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L785–785](議事録バックアップ/phase2_UI設計思想と責務.md#L785-L785) | 1. 外部配置に使われているclass指定をLayoutManagerへ移す。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L786–786](議事録バックアップ/phase2_UI設計思想と責務.md#L786-L786) | 2. Component内部を成立させる標準CSSはComponent内部へ固定化する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L787–787](議事録バックアップ/phase2_UI設計思想と責務.md#L787-L787) | 3. 本当に必要な見た目差分のみ意味のある限定APIへ置き換える。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L788–788](議事録バックアップ/phase2_UI設計思想と責務.md#L788-L788) | 4. 利用箇所がなくなった任意CSS注入Inputを削除する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L789–789](議事録バックアップ/phase2_UI設計思想と責務.md#L789-L789) | 5. component-test / APIドキュメントの利用例を新方式へ更新する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L793–793](議事録バックアップ/phase2_UI設計思想と責務.md#L793-L793) | AIが画面・共通Componentを実装する場合も次を遵守する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L795–795](議事録バックアップ/phase2_UI設計思想と責務.md#L795-L795) | - `classContainer`等の任意CSS注入APIを新規利用・新規追加しない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L796–796](議事録バックアップ/phase2_UI設計思想と責務.md#L796-L796) | - 画面側から共通Component内部DOMを前提としたclass指定を行わない。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L797–797](議事録バックアップ/phase2_UI設計思想と責務.md#L797-L797) | - 外部配置はLayoutManagerを使用する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L798–798](議事録バックアップ/phase2_UI設計思想と責務.md#L798-L798) | - 内部レイアウト・内部デザインは共通Component自身に実装する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L799–799](議事録バックアップ/phase2_UI設計思想と責務.md#L799-L799) | - 見た目変更が必要な場合は既存の意味的APIを優先する。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L800–800](議事録バックアップ/phase2_UI設計思想と責務.md#L800-L800) | - 必要なAPIが存在しない場合、勝手にCSS注入で回避せず設計確認を行う。 | 設計承認済み | [2.5.1](phase2_05_任意CSS注入の排除.md) | 一致 | 不要 |
| [L804–805](議事録バックアップ/phase2_UI設計思想と責務.md#L804-L805) | > 状態：**設計承認済み**   > 承認日：2026-10-16 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L809–809](議事録バックアップ/phase2_UI設計思想と責務.md#L809-L809) | UI Form DTOとApplication DTOの間の値変換、およびApplication ResponseからUI Form DTOへの反映のために、Mapperクラス・Mapperサービス | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L811–811](議事録バックアップ/phase2_UI設計思想と責務.md#L811-L811) | 変換処理は画面Component内で明示的に行う。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L813–817](議事録バックアップ/phase2_UI設計思想と責務.md#L813-L817) | ```text UI Form DTO（FormGroup）       ↓ 画面Componentで値変換 Application DTO ``` | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L819–819](議事録バックアップ/phase2_UI設計思想と責務.md#L819-L819) | 逆方向も同様に、Application ResponseからFormGroupへの`patchValue`等は画面Componentで行う。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L823–823](議事録バックアップ/phase2_UI設計思想と責務.md#L823-L823) | AIは次の判断を独自に行ってはならない。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L825–825](議事録バックアップ/phase2_UI設計思想と責務.md#L825-L825) | - 項目数が多いことを理由にMapperを作成する。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L826–826](議事録バックアップ/phase2_UI設計思想と責務.md#L826-L826) | - 変換処理が長いことを理由にMapperを作成する。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L827–827](議事録バックアップ/phase2_UI設計思想と責務.md#L827-L827) | - 重複があることを理由にMapperを作成する。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L828–828](議事録バックアップ/phase2_UI設計思想と責務.md#L828-L828) | - DDDや一般的なベストプラクティスを理由にMapper層を新設する。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L829–829](議事録バックアップ/phase2_UI設計思想と責務.md#L829-L829) | - `XxxMapper`、`XxxConverter`、`XxxAssembler`等、同等責務の別名称クラスへ置き換える。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L831–831](議事録バックアップ/phase2_UI設計思想と責務.md#L831-L831) | Mapper相当の抽象を新設する必要があるとAIが判断した場合も、実装せず設計確認を求める。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L835–835](議事録バックアップ/phase2_UI設計思想と責務.md#L835-L835) | 本承認は、本文中の過去の提案にある「重複や複雑化時にMapperを検討する」という記述を**上書きする正式方針**である。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L837–837](議事録バックアップ/phase2_UI設計思想と責務.md#L837-L837) | フェーズ2の正式仕様化時には、旧提案のMapper検討記述を削除し、本方針へ統一する。 | 設計承認済み | [2.6.5](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L841–841](議事録バックアップ/phase2_UI設計思想と責務.md#L841-L841) | - UI Form DTOの`class + formGroup`方式を推奨案から正式方針へ確定するか。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L842–842](議事録バックアップ/phase2_UI設計思想と責務.md#L842-L842) | - UIレベルValidationとDomain Validationの具体的な境界。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L843–843](議事録バックアップ/phase2_UI設計思想と責務.md#L843-L843) | - 現行BRU1001のサーブ順・リターン側ロジックをDomainへ移す場合のDomainモデル/API。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L844–844](議事録バックアップ/phase2_UI設計思想と責務.md#L844-L844) | - レスポンシブ実装時に「十分な幅」を判定する具体方式。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L845–845](議事録バックアップ/phase2_UI設計思想と責務.md#L845-L845) | - 画面外周paddingの具体的な実装場所。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L846–846](議事録バックアップ/phase2_UI設計思想と責務.md#L846-L846) | - 任意CSS注入Inputの現行利用箇所調査と削除順序。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L847–847](議事録バックアップ/phase2_UI設計思想と責務.md#L847-L847) | - レイヤーと実際のディレクトリ構造・クラスとの対応。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L848–848](議事録バックアップ/phase2_UI設計思想と責務.md#L848-L848) | - 過去の決定事項の網羅性および設計理由の完全な復元。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L852–852](議事録バックアップ/phase2_UI設計思想と責務.md#L852-L852) | フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。 | 調査・未決記録 | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |

## 項目対応表（旧Phase 3：共通デザイン・Table・Swipe）

| 旧原典行 | 事項・理由・コード例等の抜粋 | 原典状態 | 新工程小区分 | 判定 | 修正・確認 |
|---|---|---|---|---|---|
| [L10–L10](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L10-L10) | - **AndroidとiPhoneの両方で、見た目が崩れず美しく表示されること。** 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS間の描画差を考慮し、両プラットフォームで表示確認する。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L11–L11](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L11-L11) | - **デザインはTailwind CSSとDaisyUIをベースとすること。** 共通部品のスタイルは原則として両者のユーティリティ・コンポーネント・テーマを活用し、個別CSSの追加は必要性を検討してか | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L13–L13](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L13-L13) | ※上記2項目はユーザーが明示的に追加した開発方針。具体的なテスト端末・対応OSバージョン・例外的なCSSの運用は今後決める。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L17–L24](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L17-L24) | \| 手順 \| 内容 \| 状態 \| \|---\|---\|---\| \| 1 \| 共通コンポーネント棚卸し \| 完了として議論 \| \| 2 \| 共通デザイン属性の整理 \| 方針合意  | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L26–L26](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L26-L26) | ※実装・テストは最終承認後。現在のソースがこの仕様を実装済みであることを意味しない。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L30–L30](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L30-L30) | 呼び出し側はオブジェクトをまとめて渡す `[uiStyle]="{...}"` ではなく、**各属性を個別Inputで指定**する。 | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L32–L32](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L32-L32) | 例： | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L34–L36](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L34-L36) | ```html &lt;app-textbox [border]="true" [roundedSize]="8" /> ``` | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L38–L50](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L38-L50) | \| Input \| 型 \| 原則既定値 \| 補足 \| \|---\|---\|---\|---\| \| `border` \| `boolean` \| `true` \| 枠線の有無 \|  | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L52–L52](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L52-L52) | `UiColor` 候補：`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-300`, `info`,  | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L54–L54](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L54-L54) | 数値指定の単位はpx。 | 方針合意（最終未承認） | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L58–L58](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L58-L58) | **状態を持たない静的ユーティリティ**とする。レイアウト配置やdisabled制御は担当しない。 | 方針合意（最終未承認） | [3.2.1](phase3_02_UiStyleUtil.md) | 一致 | 不要 |
| [L60–L60](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L60-L60) | 想定API： | 方針合意（最終未承認） | [3.2.1](phase3_02_UiStyleUtil.md) | 一致 | 不要 |
| [L62–L70](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L62-L70) | ```ts getBorderClass(border: boolean, width: UiBorderWidth): string getRoundedClass(rounded: boolean,  | 方針合意（最終未承認） | [3.2.1](phase3_02_UiStyleUtil.md) | 一致 | 不要 |
| [L72–L72](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L72-L72) | Tailwindのビルド時クラス検出を考慮し、許容値とクラス名を**明示的に対応付ける**。実行時に任意文字列を連結してクラス名を組み立てる方式は避ける。 | 方針合意（最終未承認） | [3.2.1](phase3_02_UiStyleUtil.md) | 一致 | 不要 |
| [L76–L76](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L76-L76) | `UiStyleComponentBase` と `FormControlComponentBase` を分けず、**共通デザインInput・visible・任意のFormControl Inputを1つ | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L78–L78](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L78-L78) | FormControlを使わないButton等も同じ基底クラスを継承するが、controlは使用しない。 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L80–L94](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L80-L94) | ```ts export abstract class ComponentBase {   readonly control = input&lt;FormControl>();    protected | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L96–L96](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L96-L96) | - 親画面から既存の `FormControl` インスタンスを渡す。例：`&lt;app-textbox [control]="dto.formGroup.controls.playerName" /> | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L97–L97](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L97-L97) | - `input(new FormControl(''))` のようなダミーインスタンスは**作らない**。 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L98–L98](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L98-L98) | - `getControl()` は入力系コンポーネントで利用し、未指定時には明示的にエラーとする。 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L99–L99](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L99-L99) | - 不必要な `?.` や `!` に依存しない書き方を優先する。 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L100–L100](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L100-L100) | - FormControlの有効・無効はFormControlで管理し、Button等のdisabledは部品個別に扱う。 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L102–L102](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L102-L102) | **実装前検証**：既存 `FormControlComponentBase` の処理との整合、Angularの継承・型・テンプレートからのprotectedメソッド参照を確認する。設計を勝手に変更せず、 | 方針合意（最終未承認） | [3.3.1](phase3_03_ComponentBase.md) | 一致 | 不要 |
| [L106–L106](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L106-L106) | 議論済みの方向性： | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L108–L108](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L108-L108) | - スタイルの既定値を `TableContainerLayout → TableRecord → TableCell` に伝播させる。TableRowは構造・sticky等を担う。 | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L109–L109](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L109-L109) | - 優先順位：**Cellの明示指定 > Recordの明示指定 > Tableの明示指定 > 共通既定値**。 | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L110–L110](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L110-L110) | - 子が**未指定（undefined）**なら親から継承し、子が明示的に `false` を指定した場合は `false` を優先する。 | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L111–L111](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L111-L111) | - `zebra`、`recordGap`、`sticky`、`colSpan`、`rowSpan` 等のTable固有属性は共通デザイン属性と区別する。 | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L113–L113](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L113-L113) | **未解決の技術論点**：基底 `ComponentBase` が既定値を持つInputを定義した場合、子で「未指定」と「既定値」を区別しにくい。Table子クラスでInputを `undefined`  | 未決 | [3.4.1](phase3_04_Table.md) | 一致 | 不要 |
| [L117–L117](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L117-L117) | - `SwipeDirective` の共通スタイル適用は**アクションパネル部分**を対象とし、ジェスチャー制御とは分離する。 | 方針合意（最終未承認） | [3.5.1](phase3_05_Swipe・Layout.md) | 一致 | 不要 |
| [L118–L118](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L118-L118) | - `LayoutItem`、`ItemStackLayout`、`LayoutSpan` は配置責務のため、原則 `UiStyleUtil` の管理対象外。 | 方針合意（最終未承認） | [3.5.1](phase3_05_Swipe・Layout.md) | 一致 | 不要 |
| [L122–L122](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L122-L122) | **2026-10-15決定**：`ToggleButtonComponent` は古いため開発対象から除外。`bruce` の `feature/feature-20261015` ブランチで `brf | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L124–L124](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L124-L124) | - 通常UI：Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle（ToggleButtonは旧式のため除外）。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L125–L125](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L125-L125) | - Table：TableContainerLayout / TableRecord / TableRow / TableCell。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L126–L126](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L126-L126) | - Swipe：SwipeDirective。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L127–L127](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L127-L127) | - Layout：LayoutItem / ItemStackLayout / LayoutSpan。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L128–L128](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L128-L128) | - `component-base`、`component-test`、`apidoc` は通常のUI部品一覧とは分けて扱う。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L130–L130](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L130-L130) | 対象数の分類や属性適用範囲は、最新ソースと照合して最終確定する。 | 当時の決定・調査 | [3.1.1](phase3_01_共通スタイル.md) | 一致 | 不要 |
| [L134–L134](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L134-L134) | 1. まず**第5手順のTable継承設計**から再開する。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L135–L135](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L135-L135) | 2. 過去に合意した内容と、未決の内容を混同しない。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L136–L136](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L136-L136) | 3. 最終レビューとユーザー承認の前に、ソースを変更しない。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L137–L137](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L137-L137) | 4. 決定事項・設計理由・禁止事項・未決事項をこの文書に追記する。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |
| [L138–L138](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md#L138-L138) | 5. 本書は「議論の保存版」であり、フェーズ3の完成・実装完了を示さない。 | 方針合意（最終未承認） | [3.6.1](phase3_06_Phase 3最終承認.md) | 一致 | 不要 |

## 項目対応表（2026-10-17 ACG/Bruce復旧・再開記録）

| 旧原典行 | 状態・注意点・手順等の抜粋 | 原典状態 | 新工程小区分 | 判定 | 修正・確認 |
|---|---|---|---|---|---|
| [L11–L11](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L11-L11) | 現在行っているACG修正に伴うBruce対応は、プロジェクトの最終目的ではない。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L13–L13](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L13-L13) | 本来の目的は、**Bruceの設計思想を維持したまま、LayoutManagerと既存共通Componentを制約としてAIに画面実装を行わせること**である。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L15–L15](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L15-L15) | 目指す流れ： | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L17–L37](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L17-L37) | ```text 画面設計書     ↓ Bruceの設計思想・AI実装ルール     ↓ LayoutManager   ├─ LayoutItem   ├─ ItemStackLayout    | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L39–L39](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L39-L39) | AIに自由なHTML/CSSレイアウトを作らせることが目的ではない。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L41–L41](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L41-L41) | 特に次を守る。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L43–L43](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L43-L43) | - 画面はLayoutManagerを使用する。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L44–L44](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L44-L44) | - 入力・表示には既存共通Componentを優先使用する。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L45–L45](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L45-L45) | - AIが画面固有の `flex` / `grid` / 任意CSS注入で独自レイアウトを作らない。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L46–L46](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L46-L46) | - ACG生成ファイルは直接手修正しない。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L47–L47](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L47-L47) | - AI生成コードであっても、ユーザーの設計思想から外れる場合は採用せず、必要ならユーザー自身が設計・重要実装に関与する。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L48–L48](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L48-L48) | - 定型コードはAIへ任せても、設計・責務・共通化方針までAIへ完全委任しない。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L50–L50](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L50-L50) | ACG対応は、このAI画面開発を安定して行うための**一時的な基盤整備**として扱う。 | 復旧・作業記録（当時の状態） | [2.8.1](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L56–L56](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L56-L56) | ACGで `Nullable&lt;T>`、Enum型FormControl等の生成仕様を変更し、Bruceを再生成したところ、多数のビルドエラーが発生した。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L58–L58](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L58-L58) | その後、Bruce側でビルドエラーを手修正していたが、修正途中で以下が同時に混在した。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L60–L60](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L60-L60) | - Enum型になったFormControlへの対応 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L61–L61](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L61-L61) | - RadioComponentのFormControl型対応 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L62–L62](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L62-L62) | - ToggleComponentの値・checked・FormControl型対応 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L63–L63](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L63-L63) | - `eventKey` の型対応 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L64–L64](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L64-L64) | - UI Form DTOとApplication DTO間の変換 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L65–L65](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L65-L65) | - BRU1001 / BRU1002の画面ロジック修正 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L67–L67](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L67-L67) | その結果、単に「ビルドを通すための修正」と「本来共通ComponentやACG側で直すべき修正」が混ざり、設計上の正しさに自信を持てない状態になった。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L69–L69](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L69-L69) | このため、個別エラーをそのまま潰し続けず、**いったん修正前へ戻して依存関係の順にやり直す**方針とした。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L75–L75](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L75-L75) | 対象ブランチ： | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L77–L80](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L77-L80) | ```text soracity/bruce feature/feature-20261015 ``` | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L82–L82](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L82-L82) | ACG再生成・手修正後にバックアップとしてPUSHされていたコミット： | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L84–L88](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L84-L88) | ```text 1回目 869d16621ae325cfbc10cc7fe7c30c22d85f284d 2回目 fbfa8698744ee930155393443ae0d4e430ea5faa  | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L90–L90](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L90-L90) | 2026-10-17、履歴を失わないように次のバックアップブランチを作成した。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L92–L94](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L92-L94) | ```text backup/pre-rollback-20261017 ``` | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L96–L96](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L96-L96) | このバックアップブランチは、手修正途中の `8eb35d3...` を保持する。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L98–L98](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L98-L98) | その後、`feature/feature-20261015` はACG再生成前のファイル状態へ戻した。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L100–L100](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L100-L100) | ロールバックコミット： | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L102–L105](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L102-L105) | ```text 831b496036d8bc1f33ffe3f91fd81131b91b22bb revert: restore Bruce to pre-ACG-regeneration sta | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L107–L107](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L107-L107) | このコミットのツリーは、ACG再生成前の基準点である次のコミットと同じ状態。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L109–L112](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L109-L112) | ```text 48548c8dda81a24bc621c8470a8911a260b49d9d feat: add global Nullable type ``` | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L114–L114](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L114-L114) | したがって、`Nullable&lt;T>` の導入自体は残した状態で、ACG再生成・Bruce手修正をやり直せる。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L116–L116](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L116-L116) | 注意：上記はGitHubリモートの状態。ローカル作業ツリーは再開時にGitHubと同期状態を確認すること。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L122–L122](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L122-L122) | 詳細は `01_ai-document` 配下の各 `_決定.md` を正本として参照する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L124–L124](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L124-L124) | 特に今回の再対応に関係する正本： | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L126–L126](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L126-L126) | - `phase2_Nullable型_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L127–L127](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L127-L127) | - `phase2_TypeScriptTypeEnum_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L128–L128](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L128-L128) | - `phase2_ACGデフォルト値_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L129–L129](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L129-L129) | - `phase2_ACG形式チェック_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L130–L130](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L130-L130) | - `phase2_ACG必須チェック_空白文字列_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L131–L131](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L131-L131) | - `phase2_ACG実装追加方針_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L132–L132](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L132-L132) | - `phase2_画面DTO項目_型別指定可能パターン_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L133–L133](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L133-L133) | - `phase2_画面設計書_日付日時の形式列化_決定.md` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L135–L135](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L135-L135) | 主な既決事項のうち今回重要なもの： | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L137–L137](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L137-L137) | - Bruceでは `Nullable&lt;T>` を `T \| null` の共通表現として使用する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L138–L138](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L138-L138) | - `src/global.d.ts` に `type Nullable&lt;T> = T \| null;` を置く。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L139–L139](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L139-L139) | - 画面設計書のEnum型項目は、UI Form DTOで `FormControl&lt;Nullable&lt;対象Enum>>` として生成する方向。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L140–L140](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L140-L140) | - Enum項目の初期値は基本 `null`。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L141–L141](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L141-L141) | - ACG生成ファイルを直接手修正しない。問題が生成規則にある場合は設計書またはACGを修正して再生成する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L142–L142](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L142-L142) | - UI Form DTOは画面設計書から生成するが、業務ロジックを持たせない。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L144–L144](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L144-L144) | 個別の型・Validation・デフォルト値・形式チェックの詳細は必ず正本を参照し、この追記文書だけで再解釈しない。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L150–L150](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L150-L150) | 以下は2026-10-17のレビューで判明した事項。**すべてを新しい最終設計として承認したという意味ではない。** 再対応時に同じ誤りを繰り返さないための確認事項として保存する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L154–L154](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L154-L154) | 共通Componentの `eventKey` は、親へ「どの操作が発生したか」を通知するためのキー。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L156–L156](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L156-L156) | 一方、`FormControl&lt;T>` の `T` は、その入力Componentが保持・編集するフォーム値の型。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L158–L158](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L158-L158) | 例： | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L160–L164](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L160-L164) | ```text control.value = AppCodeMatchTypeEnum  eventKey = "matchTypeChange" ``` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L166–L166](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L166-L166) | この2つを同じ型パラメータとして扱うと、Radio等の共通Component設計が崩れやすい。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L168–L168](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L168-L168) | `AppEventKeyType` を共通イベントキー型として使う案は議論したが、**global.d.tsへの最終配置・import方式・各Componentへの適用範囲は未承認**。再開時に勝 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L170–L170](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L170-L170) | ユーザーの要求として、共通ComponentのeventKeyをstring専用に限定せず、string / number / boolean / Enum等を扱える方向を検討している。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L174–L174](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L174-L174) | 修正途中では、Enum FormControlへ合わせるために | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L176–L178](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L176-L178) | ```ts FormControlComponentBase&lt;AppEventKeyType> ``` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L180–L180](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L180-L180) | のような方向へ変更したが、これはFormControl値とeventKeyを混同する危険がある。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L182–L182](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L182-L182) | さらに既存Radioの `values` が `string[]` のままで、FormControl側だけEnumオブジェクトへ変わると、選択値とFormControl値の型が一致しなくなる。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L184–L184](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L184-L184) | 再対応時は、**画面側で無理にキャストして逃げず、Radioがstring値とEnum値をどう扱うかを共通Component設計として先に決める。** | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L188–L188](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L188-L188) | HTML checkboxの `checked` はUI上はbooleanの概念。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L190–L190](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L190-L190) | `AppCodeBooleanEnum.FALSE` のようなEnumオブジェクトをJavaScriptのbooleanとして扱ってはいけない。Enumオブジェクトは `FALSE` という名前で | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L192–L196](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L192-L196) | ```ts if (AppCodeBooleanEnum.FALSE) {   // オブジェクトなのでtrue扱い } ``` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L198–L198](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L198-L198) | FormControl値をEnumにする場合でも、Toggle内部の `checked`、DOMの `HTMLInputElement.checked`、FormControl値の変換責務をどこに | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L200–L200](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L200-L200) | **「Enum化したからcheckedもEnumにする」と短絡的に変更しない。** | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L204–L204](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L204-L204) | Enumオブジェクトに対して、TRUE/FALSEの意味判定を次のように書かない。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L206–L209](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L206-L209) | ```ts if (value) { ... } !value ``` | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L211–L211](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L211-L211) | `null` 判定とEnum値判定を分ける。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L213–L213](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L213-L213) | 例： | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L215–L219](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L215-L219) | ```ts value === null value === AppCodeMatchSettingEnum.TRUE value === AppCodeMatchSettingEnum.FALS | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L223–L223](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L223-L223) | UI Form DTO側でEnumオブジェクトを保持し、Application/DB側の契約がコード文字列の場合、境界で明示変換する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L225–L225](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L225-L225) | 基本方向： | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L227–L233](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L227-L233) | ```text Application / DB の string code       ↓ toEnum(...) UI FormControl の Enum object       ↓ .v | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L235–L235](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L235-L235) | 既存方針どおり、UI Form DTOとApplication DTOの間にMapper/Converter/Assemblerを機械的に追加せず、画面Componentで明示変換する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L237–L237](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L237-L237) | ただし、具体的なnullable時の扱い・`toEnum()` の引数契約・Enum共通InterfaceはACG/Enum設計と整合するよう再確認する。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L241–L241](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L241-L241) | 修正途中で、Application Request DTOへ値を渡す箇所に `as XxxDto` があると、Enum object → string等の型不一致をTypeScriptが検出できな | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L243–L243](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L243-L243) | 再対応では、まず型が自然に一致する形へ直し、型アサーションをビルドエラー隠しとして使わない。 | 復旧・作業記録（当時の状態） | [2.6.2](phase2_06_DTO・Form・Validation.md) | 一致 | 不要 |
| [L249–L249](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L249-L249) | 次回は大量のビルドエラーを1件ずつ場当たり的に直さない。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L251–L251](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L251-L251) | 次の順序で進める。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L253–L279](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L253-L279) | ```text 1. Bruceをロールバック基準点へ同期    ↓ 2. 修正版ACGで再生成    ↓ 3. 手修正を始める前に「ACG再生成直後」をコミット    ↓ 4. ビルドしてエラー | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L281–L281](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L281-L281) | 重要：同じ原因のエラーは個別ファイルごとに潰さず、共通原因を先に直して横展開する。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L283–L283](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L283-L283) | 生成ファイルの問題はBruce側で手修正せず、ACG/設計書へ戻す。 | 復旧・作業記録（当時の状態） | [5.4.3](phase5_04_ACG・画面の移行.md) | 一致 | 不要 |
| [L289–L289](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L289-L289) | ACG/Bruce互換対応が終わったら、新しい基盤議論へ拡張し続けない。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L291–L291](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L291-L291) | 2026-10-15版 `phase2_phase3_再開用完全サマリ.md` に記録されている本線へ戻る。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L293–L293](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L293-L293) | **本線の再開地点：フェーズ2-2「幅の責務」** | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L295–L295](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L295-L295) | 最初に再確認する項目： | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L297–L297](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L297-L297) | 1. `appLayoutSpan` 未指定兄弟を均等割りにするか | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L298–L298](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L298-L298) | 2. 比率指定行では兄弟すべてに `appLayoutSpan` を明示するか | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L299–L299](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L299-L299) | 3. span指定・未指定の混在を禁止するか | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L300–L300](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L300-L300) | 4. `w-full` を画面側から注入せず、Layout割当領域とComponent内部100%を分離するか | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L301–L301](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L301-L301) | 5. Button / Radio等の「内部幅」とLayoutの「外部割当幅」を分離するか | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L303–L303](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L303-L303) | ここを承認後、フェーズ2-3「余白の責務」へ進む。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L305–L305](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L305-L305) | その後の最終目的は、設計ルールをAIへ与え、**実際の1画面をAI主体で実装 → ユーザーレビュー → 共通ルールへフィードバック**するサイクルへ移行すること。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L311–L311](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L311-L311) | 新しいチャットや長期間中断後は、推測で再開しない。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L313–L313](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L313-L313) | 最初に次を読む。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L315–L315](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L315-L315) | 1. `phase2_phase3_再開用完全サマリ.md` | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L316–L316](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L316-L316) | 2. 本書 `phase2_phase3_20261017追記_再開情報.md` | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L317–L317](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L317-L317) | 3. `phase2_UI設計思想と責務.md` | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L318–L318](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L318-L318) | 4. 必要な各 `_決定.md` | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L319–L319](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L319-L319) | 5. フェーズ3へ進む場合のみ `phase3_UIデザインシステム標準化_議論記録.md` | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L321–L321](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L321-L321) | そのうえで、GitHubの現在ブランチ/ソースを確認し、文書に書かれた「スナップショット」と現在ソースの差分を確認する。 | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L325–L329](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L325-L329) | ```text bruce-document/01_ai-document の再開文書を読み、現在のGitHubソースとの差分を確認してください。 ACG/Bruce互換対応が未完なら 2026- | 復旧・作業記録（当時の状態） | [2.9.1](phase2_09_Phase 2最終承認.md) | 一致 | 不要 |
| [L335–L335](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L335-L335) | - ChatGPTのメモリは補助。**GitHub上の `bruce-document/01_ai-document` を正本とする。** | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L336–L336](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L336-L336) | - 会話内で決定した重要事項は、将来のメモリ保持を前提にせずGitHubへ保存する。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L337–L337](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L337-L337) | - 「承認済み」「方針合意」「提案」「未決」「調査事実」を明示して記録する。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L338–L338](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L338-L338) | - 未承認案をAIが既決事項として実装しない。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L339–L339](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L339-L339) | - ユーザー承認前にAIが設計思想を変更しない。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L340–L340](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L340-L340) | - ACG生成コードを直接修正しない。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
| [L341–L341](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md#L341-L341) | - 本来の目的であるAI画面開発から外れる基盤作業は、必要範囲を明確にして終了条件を持つ。 | 復旧・作業記録（当時の状態） | [2.8.2](phase2_08_AI実装制約.md) | 一致 | 不要 |
