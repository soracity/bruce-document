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
