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

