# Phase 2.6 DTO・Form・Validation

> **工程表の中区分：2.6 DTO・Form・Validation**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

UI Form DTOはComponentスコープDI、専用Mapperは作らず画面Componentで値変換する。画面DTO class＋formGroupの正式確定とValidation境界は未決。ACGの各承認事項は2.6.6〜2.6.14へ独立掲載。

旧ACG決定文書9件を2.6.6〜2.6.14に割り当てた。**決定済みの仕様を再承認せず引き継ぎ、実装確認は5.4.3で行う。**

## 2.6.1 UI Form DTOのComponentスコープDI方針を決定

- **作業**：完了／**設計**：承認済／**実装**：未着手／**検証**：未検証
- **対象と背景**：UI Form DTO・FormControl・ACG生成とApplication値DTOの責務を分ける。既承認のACG詳細は旧原典の承認状態を優先する。
- **この小区分で扱う具体事項**：UI Form DTOのComponentスコープDI方針を決定。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：ACGと画面実装への反映はPhase 5。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=未着手、検証=未検証。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：ACGと画面実装への反映はPhase 5
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)、[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)、[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)、[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)、[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)、[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)、[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)、[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)、[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)、[phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### 承認済みIssue：UI Form DTOをComponentスコープDIへ変更

> 状態：**設計承認済み / 実装未着手**  
> 承認日：2026-10-15

##### 決定内容

UI Form DTOはDIで取得する。ただしアプリ全体のシングルトンにはせず、**画面Component単位のインスタンス**とする。

`Bru1001Dto`のFormGroupは画面固有状態であるため、`providedIn: 'root'`によるアプリ全体共有は行わない。

想定形：

```ts
@Injectable()
export class Bru1001Dto {
  readonly formGroup = new FormGroup({
    // ...
  });
}
```

```ts
@Component({
  // ...
  providers: [Bru1001Dto],
})
export class Bru1001Component {
  readonly dto = inject(Bru1001Dto);
}
```

##### 実装時の変更対象

1. ACGが生成するUI Form DTOの`@Injectable({ providedIn: 'root' })`を、root提供しない形へ変更する。
2. `Bru1001Component`の`providers`へ`Bru1001Dto`を登録する。
3. `readonly dto = new Bru1001Dto();`を`readonly dto = inject(Bru1001Dto);`へ変更する。
4. 記述簡略化だけを目的とする`readonly controls = this.dto.formGroup.controls;`を廃止する。
5. HTMLで`@let ctrls = dto.formGroup.controls;`を定義し、`ctrls.xxx`で参照する。
6. 同種のUI Form DTOについても、画面固有状態を持つものは同じComponentスコープDI方針を適用する。

##### 採用理由

- FormGroupのライフサイクルを画面Componentのライフサイクルと一致させる。
- 画面を開き直した場合や複数画面インスタンスでForm状態を意図せず共有しない。
- DTO生成方法をDIへ統一しつつ、画面状態をシングルトン化しない。
- テスト時に画面単位でUI Form DTOを差し替えやすくする。

##### 非採用

```ts
@Injectable({ providedIn: 'root' })
```

によるUI Form DTOのシングルトン化は採用しない。

また、画面Componentからの直接生成：

```ts
readonly dto = new Bru1001Dto();
```

も今後の方針としては採用しない。

※本Issueは設計承認の記録であり、このコミットではアプリケーションソースおよびACGソースを変更しない。



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 以下は移行時点の原文であり、当時の提案や未決は現在の承認ではありません。後日の正式承認事項を優先してください。
<!-- HISTORICAL-SUMMARY-SECTIONS: 1.3 -->

#### 1.3 承認済み：UI Form DTOをComponentスコープDIで管理

承認日：2026-10-15。

- UI Form DTOはDIで取得する。
- `providedIn: 'root'` のアプリ全体シングルトンにはしない。
- 画面Componentの `providers` へ登録し、画面単位のインスタンスとする。
- 画面Componentでは `readonly dto = inject(Bru1001Dto);` とする。
- `readonly dto = new Bru1001Dto();` は今後の方針として採用しない。
- 記述短縮だけの `readonly controls = this.dto.formGroup.controls;` は画面Componentに持たない。
- HTMLでは必要に応じて `@let ctrls = dto.formGroup.controls;` を使う。
- UI Form DTOにはFormGroup、FormControl、型、初期値、disabled初期状態、画面入力Validationを持たせる。
- UI Form DTOへテニス業務ルールを埋め込まない。
- Application DTOにはFormGroup/FormControl/Angular Validatorを持ち込まない。
- Application ServiceやDomainへFormGroup/FormControlを渡さない。

想定形：

```ts
@Injectable()
export class Bru1001Dto {
  readonly formGroup = new FormGroup({
    // ...
  });
}
```

```ts
@Component({
  providers: [Bru1001Dto],
})
export class Bru1001Component {
  readonly dto = inject(Bru1001Dto);
}
```

```html
@let ctrls = dto.formGroup.controls;
```

ACG生成コードを直接修正しない。変更が必要な場合は設計書またはACG生成処理を変更する。

---

## 2.6.2 Enum FormControlとApplication string codeの境界変換

- **作業**：完了／**設計**：承認済／**実装**：完了／**検証**：ビルド確認済
- **対象と背景**：UI Form DTO・FormControl・ACG生成とApplication値DTOの責務を分ける。既承認のACG詳細は旧原典の承認状態を優先する。
- **この小区分で扱う具体事項**：Enum FormControlとApplication string codeの境界変換。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：保存→再表示等の動作確認はPhase 7。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=完了、検証=ビルド確認済。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：保存→再表示等の動作確認はPhase 7
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)、[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)、[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)、[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)、[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)、[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)、[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)、[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)、[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)、[phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

### 旧2026-10-17再開情報の詳細（復旧スナップショット）

> [旧ACG/Bruce再開情報](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)を転記。**ロールバック・ブランチ情報は当時の事実**であり、現在のブランチ状態を保証しない。未承認の技術提案を承認済みに変更しない。

#### 4. ACG側で既に決定済みの事項

詳細は `01_ai-document` 配下の各 `_決定.md` を正本として参照する。

特に今回の再対応に関係する正本：

- `phase2_Nullable型_決定.md`
- `phase2_TypeScriptTypeEnum_決定.md`
- `phase2_ACGデフォルト値_決定.md`
- `phase2_ACG形式チェック_決定.md`
- `phase2_ACG必須チェック_空白文字列_決定.md`
- `phase2_ACG実装追加方針_決定.md`
- `phase2_画面DTO項目_型別指定可能パターン_決定.md`
- `phase2_画面設計書_日付日時の形式列化_決定.md`

主な既決事項のうち今回重要なもの：

- Bruceでは `Nullable<T>` を `T | null` の共通表現として使用する。
- `src/global.d.ts` に `type Nullable<T> = T | null;` を置く。
- 画面設計書のEnum型項目は、UI Form DTOで `FormControl<Nullable<対象Enum>>` として生成する方向。
- Enum項目の初期値は基本 `null`。
- ACG生成ファイルを直接手修正しない。問題が生成規則にある場合は設計書またはACGを修正して再生成する。
- UI Form DTOは画面設計書から生成するが、業務ロジックを持たせない。

個別の型・Validation・デフォルト値・形式チェックの詳細は必ず正本を参照し、この追記文書だけで再解釈しない。

---



#### 5. 手修正レビューで判明した重要事項

以下は2026-10-17のレビューで判明した事項。**すべてを新しい最終設計として承認したという意味ではない。** 再対応時に同じ誤りを繰り返さないための確認事項として保存する。

##### 5.1 FormControlの値とeventKeyは別概念

共通Componentの `eventKey` は、親へ「どの操作が発生したか」を通知するためのキー。

一方、`FormControl<T>` の `T` は、その入力Componentが保持・編集するフォーム値の型。

例：

```text
control.value = AppCodeMatchTypeEnum

eventKey = "matchTypeChange"
```

この2つを同じ型パラメータとして扱うと、Radio等の共通Component設計が崩れやすい。

`AppEventKeyType` を共通イベントキー型として使う案は議論したが、**global.d.tsへの最終配置・import方式・各Componentへの適用範囲は未承認**。再開時に勝手に確定しない。

ユーザーの要求として、共通ComponentのeventKeyをstring専用に限定せず、string / number / boolean / Enum等を扱える方向を検討している。

##### 5.2 RadioComponent

修正途中では、Enum FormControlへ合わせるために

```ts
FormControlComponentBase<AppEventKeyType>
```

のような方向へ変更したが、これはFormControl値とeventKeyを混同する危険がある。

さらに既存Radioの `values` が `string[]` のままで、FormControl側だけEnumオブジェクトへ変わると、選択値とFormControl値の型が一致しなくなる。

再対応時は、**画面側で無理にキャストして逃げず、Radioがstring値とEnum値をどう扱うかを共通Component設計として先に決める。**

##### 5.3 ToggleComponent

HTML checkboxの `checked` はUI上はbooleanの概念。

`AppCodeBooleanEnum.FALSE` のようなEnumオブジェクトをJavaScriptのbooleanとして扱ってはいけない。Enumオブジェクトは `FALSE` という名前でもオブジェクトなのでtruthyとなる。

```ts
if (AppCodeBooleanEnum.FALSE) {
  // オブジェクトなのでtrue扱い
}
```

FormControl値をEnumにする場合でも、Toggle内部の `checked`、DOMの `HTMLInputElement.checked`、FormControl値の変換責務をどこに置くかは別途整理する。

**「Enum化したからcheckedもEnumにする」と短絡的に変更しない。**

##### 5.4 Enumオブジェクトの真偽判定

Enumオブジェクトに対して、TRUE/FALSEの意味判定を次のように書かない。

```ts
if (value) { ... }
!value
```

`null` 判定とEnum値判定を分ける。

例：

```ts
value === null
value === AppCodeMatchSettingEnum.TRUE
value === AppCodeMatchSettingEnum.FALSE
```

##### 5.5 UI / Application境界

UI Form DTO側でEnumオブジェクトを保持し、Application/DB側の契約がコード文字列の場合、境界で明示変換する。

基本方向：

```text
Application / DB の string code
      ↓ toEnum(...)
UI FormControl の Enum object
      ↓ .value
Application / DB の string code
```

既存方針どおり、UI Form DTOとApplication DTOの間にMapper/Converter/Assemblerを機械的に追加せず、画面Componentで明示変換する。

ただし、具体的なnullable時の扱い・`toEnum()` の引数契約・Enum共通InterfaceはACG/Enum設計と整合するよう再確認する。

##### 5.6 型アサーションで問題を隠さない

修正途中で、Application Request DTOへ値を渡す箇所に `as XxxDto` があると、Enum object → string等の型不一致をTypeScriptが検出できなくなる場合がある。

再対応では、まず型が自然に一致する形へ直し、型アサーションをビルドエラー隠しとして使わない。

---



## 2.6.3 FormControl ValidationとDomain Validationの境界を確定

- **作業**：未着手／**設計**：検討中／**実装**：未着手／**検証**：未検証
- **対象と背景**：UI Form DTO・FormControl・ACG生成とApplication値DTOの責務を分ける。既承認のACG詳細は旧原典の承認状態を優先する。
- **この小区分で扱う具体事項**：FormControl ValidationとDomain Validationの境界を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：具体例で重複なく責務を分ける。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=検討中、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：具体例で重複なく責務を分ける
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)、[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)、[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)、[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)、[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)、[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)、[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)、[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)、[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)、[phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### Validationの責務境界（提案）

Validationは種類で分ける。

##### FormGroup / FormControl側

画面入力として機械的に判定できるものを担当する。

- required
- 文字数
- 数値形式
- 日付形式
- 入力可能範囲など、画面入力として完結する制約

##### Domain側

テニスの意味を理解しないと判定できないものを担当する。

例：

- ポイント・ゲーム・セットの状態遷移が成立するか
- 試合状態として矛盾していないか
- 戦術・スタッツ上の業務ルール

同じ条件を画面とDomainの双方へ重複実装しないことを原則とする。



## 2.6.4 UI Form DTOのclass＋formGroup方式を最終確定

- **作業**：未着手／**設計**：推奨案／**実装**：既存実装／**検証**：静的確認済
- **対象と背景**：UI Form DTO・FormControl・ACG生成とApplication値DTOの責務を分ける。既承認のACG詳細は旧原典の承認状態を優先する。
- **この小区分で扱う具体事項**：UI Form DTOのclass＋formGroup方式を最終確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：既存方針とAngularの扱いをレビュー。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=推奨案、実装=既存実装、検証=静的確認済。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：既存方針とAngularの扱いをレビュー
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)、[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)、[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)、[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)、[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)、[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)、[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)、[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)、[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)、[phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### FormGroup / UI DTO / Application DTO / 画面Componentの責務（現行BRU1001照合）

##### 現行ソースで確認した事実

`BRU1001`では、UI側の`Bru1001Dto`がACGによる自動生成クラスとなっており、`FormGroup`と各`FormControl`の型・初期値・disabled・Angular Validatorsを保持している。

現行画面Componentは`readonly dto = new Bru1001Dto()`、`readonly controls = this.dto.formGroup.controls`としている。設計方針としては、DTO取得をComponentスコープDIへ変更し、記述簡略化専用の`controls`別名は廃止する。

HTML側では`@let ctrls = dto.formGroup.controls;`としてテンプレート内だけの短縮名を定義し、共通入力Componentへ`[control]="ctrls.xxx"`の形で直接`FormControl`を渡す。

一方、Application層の`Bra1001SaveMatchInfoReqDto`は`FormControl`を持たないreadonlyの値DTOであり、UIのReactive Formsとは分離されている。

現行`Bru1001Component`では、画面初期化・Application Service呼び出し・FormGroupへのpatchValue・保存用DTOへの変換に加え、サーブ順やリターン側の決定などテニス固有の状態変更ロジックも実装されている。

##### DTOを2種類に分けて考える（提案）

同じ「DTO」という名称でも責務を明確に分ける。

| 種類 | 例 | 責務 | 持たせないもの |
|---|---|---|---|
| UI Form DTO | `Bru1001Dto` | FormGroup、FormControl、初期値、disabled初期状態、画面入力Validation | Application呼び出し、DB処理、テニス業務ルール |
| Application DTO | `Bra1001SaveMatchInfoReqDto`等 | UI/Application間のユースケース入力・出力値 | FormControl、FormGroup、Angular Validator、画面表示状態 |

現行の`Bru1001Dto`のように画面設計書からFormGroupをACG生成する方向は、UI Form DTOとして責務を限定する限り整合性が高い。

##### 画面Componentの責務（提案）

画面ComponentはUIのオーケストレーターとする。

- UI Form DTOをComponentスコープDIで取得する。
- FormControlを共通Componentへ渡すためのデータ元を提供する。
- TypeScript側では記述簡略化だけを目的とした`controls`別名を持たない。
- HTML側で必要に応じて`@let ctrls = dto.formGroup.controls;`を定義し、テンプレート内の参照を簡潔にする。
- ルートパラメータ・画面初期化・表示/非表示など画面固有状態を扱う。
- ユーザーイベントを受けてApplication Serviceを呼び出す。
- UI Form DTOとApplication DTOの境界で値を変換する。
- Applicationから返った値をFormGroupへ反映する。

ただし、テニスの意味に依存するルールそのものは画面Componentに置かない。

##### 現行BRU1001の処理を責務別に分類する（提案）

| 現行処理 | 基本的な配置先 |
|---|---|
| `matchId`のルート取得、初期表示 | 画面Component |
| `FormGroup.valueChanges`を契機とした自動保存 | 画面Component（保存ユースケースの起動） |
| `@let ctrls = dto.formGroup.controls;`でテンプレート内に短縮名を定義 | Template |
| `ctrls.xxx`を共通Componentへ渡す | Template |
| `matchSetting`に応じた入力項目のenable/disable | 画面表示制御である限り画面Component |
| Form値からApplication Request DTOへの変換 | UI/Application境界。画面Componentで行う。Mapperは作成しない |
| Application Responseを`patchValue`する | UI/Application境界。画面Componentで行う |
| シングルス/ダブルス切替で非対象入力をクリア | 単なる画面編集状態の整理なら画面Component。保存データの整合性条件ならDomainでも保証が必要 |
| サーブ順の決定・相互関係 | Domain側の候補 |
| ダブルスのリターン側・組合せルール | Domain側の候補 |

画面上の利便性のための処理と、保存される試合データの正しさを保証する業務ルールを区別する。後者はUIを経由しない処理から呼ばれても成立する必要があるため、Domain側へ置く。

##### 推奨フロー（提案）

```text
共通Component
      ⇅ FormControl
画面Component
      ⇅
UI Form DTO（FormGroup）
      │ 値を取り出す / patchValue
      ↓
Application DTO
      ↓
Application Service
      ↓
Domain
      ↓
Repository
      ↓
Infrastructure
```

Application Serviceへ`FormGroup`や`FormControl`を渡さない。DomainにもAngular依存を持ち込まない。

Infrastructure側にDAO/DB用DTOが存在する場合、それはApplication DTOとは別責務とし、Repository/Infrastructure境界で変換する。画面ComponentからDAO DTOを直接扱わない。

##### ACGとの関係（提案）

- UI Form DTOは画面設計書から生成してよい。
- 型、初期値、disabled初期状態、Angular Validatorsは生成対象にできる。
- テニス業務ルールを生成UI DTOへ埋め込まない。
- Application DTOはユースケース契約としてUI Form DTOとは別生成物にする。
- 自動生成ファイルを直接修正せず、変更が必要な場合は設計書またはACG生成処理を変更する。

この整理により、FormGroup生成とDDDの責務分離を両立する。

##### UI Form DTOの生成クラス表現（比較・提案）

UI Form DTOの表現は次の候補を比較する。

| 方式 | 例 | 評価 |
|---|---|---|
| A. `class`が`formGroup`を保持 | `class Bru1001Dto { formGroup = new FormGroup(...) }` | **推奨**。現行方式を活かせる。DTO自体とAngular FormGroupを分離したまま、生成物の単位が明確 |
| B. `FormGroup`を継承 | `class Bru1001Dto extends FormGroup<...>` | 非推奨。UI DTOがAngularクラスそのものになり、継承による結合が強くなる |
| C. controlsオブジェクトだけ生成 | `const controls = {...}` | FormGroup生成責務が画面側へ漏れ、画面ごとの定型処理が増える |
| D. type + factory関数 | `type Bru1001Form = ...` + `createBru1001Form()` | 成立するが、現行ACG資産からの変更量が大きく、現時点で得られるメリットが小さい |

フェーズ2の推奨案は **A：UI Form DTOを通常のclassとして生成し、そのプロパティとしてFormGroupを保持する方式を継続** とする。

画面側のDTO取得は次の形を採用する。

```ts
readonly dto = inject(Bru1001Dto);
```

HTMLでは次の形とする。

```html
@let ctrls = dto.formGroup.controls;
```

UI Form DTOに独自の業務メソッドを追加してDomainオブジェクト化することはしない。FormGroup定義・初期値・入力ValidationというUI状態定義に責務を限定する。



## 2.6.5 専用Mapperを作成しないルールを確定

- **作業**：完了／**設計**：承認済／**実装**：一部実装／**検証**：静的確認済
- **対象と背景**：UI Form DTO・FormControl・ACG生成とApplication値DTOの責務を分ける。既承認のACG詳細は旧原典の承認状態を優先する。
- **この小区分で扱う具体事項**：専用Mapperを作成しないルールを確定。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：画面実装ルールへ反映して確認。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=一部実装、検証=静的確認済。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：画面実装ルールへ反映して確認
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)、[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)、[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)、[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)、[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)、[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)、[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)、[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)、[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)、[phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### 承認済みIssue：Mapperを作成しない

> 状態：**設計承認済み**  
> 承認日：2026-10-16

##### 決定内容

UI Form DTOとApplication DTOの間の値変換、およびApplication ResponseからUI Form DTOへの反映のために、Mapperクラス・Mapperサービス・Mapperユーティリティ等の専用抽象を作成しない。

変換処理は画面Component内で明示的に行う。

```text
UI Form DTO（FormGroup）
      ↓ 画面Componentで値変換
Application DTO
```

逆方向も同様に、Application ResponseからFormGroupへの`patchValue`等は画面Componentで行う。

##### AI実装ルール

AIは次の判断を独自に行ってはならない。

- 項目数が多いことを理由にMapperを作成する。
- 変換処理が長いことを理由にMapperを作成する。
- 重複があることを理由にMapperを作成する。
- DDDや一般的なベストプラクティスを理由にMapper層を新設する。
- `XxxMapper`、`XxxConverter`、`XxxAssembler`等、同等責務の別名称クラスへ置き換える。

Mapper相当の抽象を新設する必要があるとAIが判断した場合も、実装せず設計確認を求める。

##### 優先関係

本承認は、本文中の過去の提案にある「重複や複雑化時にMapperを検討する」という記述を**上書きする正式方針**である。

フェーズ2の正式仕様化時には、旧提案のMapper検討記述を削除し、本方針へ統一する。



## 2.6.6 Nullable<T>共通型・global.d.tsの設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：Nullable<T>=T | nullをsrc/global.d.tsに配置しimport不要とする。undefinedは対象外。
- **次の作業**：ACG／生成物との適合は5.4.3で確認
- **原典**：[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

Bruceでは、TypeScriptで `null` を許容する型を表現する際、`A | null` を直接記述せず、共通型エイリアス `Nullable<T>` を使用する。

```ts
type Nullable<T> = T | null;
```

以下は同じ型を表す。

```ts
AppCodeMatchStatusEnum | null
```

```ts
Nullable<AppCodeMatchStatusEnum>
```

`Nullable<T>` は型表記を統一するための型エイリアスであり、TypeScript上のnull許容の意味や型安全性は変更しない。

###### 共通型の配置

Bruceの `src/global.d.ts` に以下を定義する。

```ts
type Nullable<T> = T | null;
```

`global.d.ts` はモジュール化せず、`import` / `export` を記述しない。

これにより、Bruce配下のTypeScriptソースでは `Nullable<T>` をimportせずに使用可能とする。

###### 適用方針

BruceおよびACG生成ソースでは、null許容型を原則以下の形式で表現する。

```text
A | null
↓
Nullable<A>
```

対象例：

```ts
Nullable<number>
Nullable<boolean>
Nullable<Uint8Array>
Nullable<AppCodeMatchStatusEnum>
```

FormControlでも同様とする。

```ts
FormControl<Nullable<AppCodeMatchStatusEnum>>
```

メソッド引数・戻り値・変数・プロパティなど、型として `A | null` を表現する箇所でも `Nullable<A>` を使用する。

###### ACG方針

ACGが生成するTypeScriptコードでは、null許容型を `A | null` ではなく `Nullable<A>` として生成する。

`Nullable<T>` はBruceのグローバル型であるため、ACGは `Nullable` 用のimportを生成しない。

生成済みファイルを直接修正せず、ACG本体の型生成処理を修正する。

###### 注意事項

`Nullable<T>` は `T | null` の別名であり、nullそのものを禁止・除去する仕組みではない。

そのため、nullが存在し得る箇所では従来どおりnullチェックまたは型の絞り込みが必要となる。

また、`undefined` は `Nullable<T>` の対象外とする。

## 2.6.7 TypeScriptTypeEnum／Enum実型解決の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：TypeScriptPrimitiveTypeEnumをTypeScriptTypeEnumに改名。ENUM追加、DATE/DATE_TIME削除、日時は文字列＋形式で管理。
- **次の作業**：Enum実型・参照箇所の実装確認は5.4.3
- **原典**：[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

既存の `TypeScriptPrimitiveTypeEnum` は、実際には画面設計書・DAO設計・列挙型設計・データモデル設計などで「TypeScript上の型分類」を表す共通Enumとして利用されている。

名称中の `Primitive` は実際の責務に対して狭すぎるため、以下のように名称変更する。

```text
TypeScriptPrimitiveTypeEnum
↓
TypeScriptTypeEnum
```

###### 型分類

`TypeScriptTypeEnum` では、TypeScript上の型として意味のある分類のみを持つ。

```text
STRING
NUMBER
BOOLEAN
UINT8ARRAY
ENUM
```

`DATE` / `DATE_TIME` はTypeScript上では `string` であり、`STRING` と型として区別する意味がないため削除する。

日付・日時という意味は、画面設計書では `型` ではなく `形式` で表現する。

```text
型=文字列 / 形式=日付
型=文字列 / 形式=日時
```

###### Enum型の追加

画面設計書の `型` 列で `Enum` を指定可能にするため、同Enumへ `ENUM` を追加する。

`ENUM` の具体的なTypeScript型名は、画面設計書の `Enum型` 列で指定されたクラス名を使用するため、`TypeScriptTypeEnum` 自体で固定のTypeScript型名を持つ前提にはしない。

###### ACG改修方針

今回の改修で以下を実施する。

- `TypeScriptPrimitiveTypeEnum` を `TypeScriptTypeEnum` へリネームする
- `ENUM` を追加する
- `DATE` を削除する
- `DATE_TIME` を削除する
- DAO生成などで `DATE` / `DATE_TIME` を直接判定している箇所を削除し、文字列は `STRING` として扱う
- UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する
- 画面設計書の形式Enumに `日付` / `日時` を追加する

自動生成ファイルを直接修正せず、ACG本体の参照箇所を修正する。

###### 方針

UI専用の別型Enumは新設せず、既存の型分類Enumを汎用名称へリネームして拡張する。

###### 現行パッケージの扱い

ACGの現行パッケージは `io.github.soracity.alfred` とする。

`com.github.soracity.alfred` は旧パッケージとして扱い、今後の設計検討・コード調査・修正対象・コード例から除外する。

## 2.6.8 画面DTO項目の型別指定可能パターンの設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：型・Enum型・文字種・形式・必須・文字数・数値範囲・正規表現の許可組合せを確定。違反はFail Fast。
- **次の作業**：生成チェックは5.4.3で確認
- **原典**：[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

画面設計書のDTO項目定義について、型ごとの指定可能パターンを以下の表で正式化する。

`指定可` は任意指定、`必須` は指定必須、`-` は指定不可を表す。

| 型 | Enum型 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 |
|---|---|---|---|---|---|---|---|---|
| 文字列 | `-` | `-` | `-` | `-` | `-` | `-` | `-` | `-` |
| 文字列 | `-` | Unicode | `-` | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角数字 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角英数字 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角英数字記号 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 正規表現 | 指定可 | `-` | 指定可 | `-` | 必須 |
| 文字列 | `-` | `-` | 日付 | 指定可 | `-` | `-` | `-` | `-` |
| 文字列 | `-` | `-` | 日時 | 指定可 | `-` | `-` | `-` | `-` |
| 数値 | `-` | `-` | `-` | 指定可 | `-` | `-` | 指定可 | `-` |
| 真偽 | `-` | `-` | `-` | `-` | 指定可 | `-` | `-` | `-` |
| Enum | 必須 | `-` | `-` | 指定可 | `-` | `-` | `-` | `-` |

###### 文字列型のルール

###### Validationなし

文字列項目にValidationを行わない場合は、以下の組み合わせを許可する。

```text
型=文字列 / 文字種=- / 形式=-
```

このパターンでは、文字種・形式を含めてValidationを生成しない。

以下はすべて `-` とする。

```text
必須
必須(真偽)
文字数(最小/最大)
数値(最小/最大)
正規表現
```

プログラム側で生成・設定する値など、画面入力値としてValidationする必要がない文字列に使用する。

###### Unicode

Unicode文字列は、`形式=-` とする。

指定可能なのは以下のみ。

```text
必須
文字数(最小/最大)
```

###### ASCII

ASCII文字列は、`形式=-` を許可しない。

必ず以下のいずれかを指定する。

```text
半角数字
半角英数字
半角英数字記号
正規表現
```

`形式=正規表現` の場合のみ、`正規表現` 列を必須指定する。

###### 日付・日時

日付・日時はTypeScript上の型ではなく形式として扱う。

```text
型=文字列 / 文字種=- / 形式=日付
型=文字列 / 文字種=- / 形式=日時
```

日付・日時の場合、文字種・文字数・数値範囲・正規表現は指定しない。

表示形式は画面設計書に固定記述せず、ロケールに応じて決定する。

###### Validation責務

`形式=日付` / `形式=日時` の値が正しい日付・日時形式であることは、日付・日時入力コンポーネント側で保証する。

ACGは、日付・日時専用の形式ValidatorをFormControlへ生成しない。

FormControl側でACGが生成するValidationは、画面設計書で `必須=〇` が指定された場合の必須チェックのみとする。

```text
形式=日付 / 必須=-
→ 日付形式Validatorは生成しない
→ 必須Validatorも生成しない

形式=日付 / 必須=〇
→ 日付形式Validatorは生成しない
→ 必須Validatorのみ生成

形式=日時 / 必須=-
→ 日時形式Validatorは生成しない
→ 必須Validatorも生成しない

形式=日時 / 必須=〇
→ 日時形式Validatorは生成しない
→ 必須Validatorのみ生成
```

責務は以下のように分離する。

```text
日付・日時の入力形式保証
→ 日付・日時入力コンポーネント

未入力チェック
→ FormControl Validation

ACG
→ 画面設計書の必須指定に従い必須Validationのみ生成
```

###### 半角英数字記号

`半角英数字記号` は、半角スペースを含む印字可能ASCII文字を許可する。

例：

```text
masahiro ariji
ABC-123
test_user
abc@example.com
```

半角スペースを含むこと自体は許可する。

ただし、文字列項目で `必須=〇` の場合、スペースのみの値は必須チェックNGとする。

```text
" "      → NG
"   "    → NG
"abc"    → OK
"abc def"→ OK
```

必須判定は形式チェックとは分離し、trim後に空文字となる値をNGとする。

###### Fail Fast

ACGは、上表に存在しない組み合わせを不正な画面設計書として扱い、コード生成を停止する。

例：

```text
型=文字列 / 文字種=- / 形式=- / 必須=〇
→ Exception

型=文字列 / 文字種=ASCII / 形式=-
→ Exception

型=文字列 / 文字種=Unicode / 形式=半角数字
→ Exception

型=文字列 / 文字種=ASCII / 形式=日付
→ Exception

型=数値 / 文字種=ASCII
→ Exception

型=真偽 / 必須=〇
→ Exception

型=Enum / Enum型=-
→ Exception
```

ACGは不正な指定を推測して補正せず、Fail Fastで停止する。

###### 補足

`無効状態` と `デフォルト` は本表のValidation組み合わせ判定とは別責務のため、本表には含めない。

## 2.6.9 ACG形式チェック・文字種・正規表現の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：半角数字・半角英数字・半角英数字記号・正規表現・日付・日時の6形式を確定。半角英数字記号は半角スペースを許容。
- **次の作業**：生成コードの形式チェックは5.4.3で確認
- **原典**：[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 更新日：2026-10-16

###### 形式チェック

画面設計書の `形式` は以下の6種類とする。

```text
半角数字
半角英数字
半角英数字記号
正規表現
日付
日時
```

`日付` / `日時` は `型=文字列` と組み合わせ、文字種は `-` とする。

```text
型=文字列 / 文字種=- / 形式=日付
型=文字列 / 文字種=- / 形式=日時
```

日付・日時の具体的な表示形式は固定せず、表示時にロケールに応じて決定する。

###### ASCII文字列の形式

`文字種=ASCII` の場合は、以下のいずれかの形式を指定する。

```text
半角数字
半角英数字
半角英数字記号
正規表現
```

`文字種=ASCII / 形式=-` は使用しない。

###### 半角英数字記号

`半角英数字記号` は、半角英字・半角数字・半角記号に加えて、**半角スペースを許可する**。

許可範囲はASCIIの印字可能文字と半角スペースとする。

```text
半角スペース ～ ~
```

したがって、以下のような値を許可する。

```text
masahiro ariji
ABC-123
test_user
abc@example.com
```

形式チェック自体は半角スペースを許可する。スペースのみの値を必須項目として許可するかどうかは、形式チェックではなく必須チェックの責務とする。

###### 正規表現

上記の定義よりさらに限定した入力規則が必要な場合は `形式=正規表現` を使用し、画面設計書の `正規表現` 列で個別指定する。

## 2.6.10 空白文字列を含む必須チェック仕様の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：文字列の必須はtrim後の空文字NG。数値・Enumはrequired相当、真偽必須はrequiredTrue相当。
- **次の作業**：Validator実装名・動作は今後確認
- **原典**：[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

文字列項目で `必須=〇` の場合、半角スペースのみの文字列は必須チェックNGとする。

期待する判定は以下。

```text
null        → NG
""          → NG
" "         → NG
"   "       → NG
"abc"       → OK
"abc def"   → OK
```

###### 責務分離

`形式=半角英数字記号` では半角スペースの入力自体を許可する。

一方、スペースのみの値が必須項目として有効かどうかは `形式` の責務ではなく `必須` の責務とする。

したがって、以下は両立する。

```text
形式=半角英数字記号
→ 半角スペースを含む文字列を許可

必須=〇
→ trim後に空文字となる値はNG
```

###### Angular標準Validatorとの違い

Angular標準の `Validators.required` は、スペースだけの文字列を空とは判定しない。

そのため、文字列型の必須チェックは、trim後に空文字かどうかを判定できる必須Validatorを使用する。

具体的な共通Validatorのクラス名・メソッド名は別途実装設計で決定する。

###### 型ごとの必須チェック

```text
文字列 + 必須=〇
→ trim後の空文字もNGとする必須チェック

数値 + 必須=〇
→ Validators.required 相当

Enum + 必須=〇
→ Validators.required 相当

真偽 + 必須(真偽)=〇
→ Validators.requiredTrue 相当
```

ACGは画面設計書の型に応じて適切な必須チェックを生成する。

## 2.6.11 型別デフォルト・日付日時予約語仕様の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：デフォルト「-」は未指定。日付・日時のSYSTEM_DATE/SYSTEM_DATETIMEはAppDateUtilを呼ぶ。不正組合せはFail Fast。
- **次の作業**：初期値・予約語生成は5.4.3で検証
- **原典**：[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

画面設計書の `デフォルト` 列では、`-` を「デフォルト未指定」とする。

`-` のときに生成するFormControl初期値は型ごとに決める。

| 型 | デフォルト列 | FormControl初期値 |
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

###### Enumのデフォルト値

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
デフォルト=0
```

生成イメージ：

```ts
new FormControl<AppCodeMatchTypeEnum | null>(
  AppCodeMatchTypeEnum.toEnum('0')
)
```

`デフォルト=-` の場合は `null` とする。

```ts
new FormControl<AppCodeMatchTypeEnum | null>(null)
```

###### 必須項目との関係

`必須=〇` であっても、`デフォルト=-` の場合にACGが値を補完しない。

```text
必須=〇 + デフォルト=-
```

の場合、初期状態は未入力とし、Validationで必須エラーになり得る状態とする。

ACGは必須だからという理由で推測して初期値を設定しない。

###### 日付・日時

`形式=日付`、`形式=日時` も `デフォルト=-` の場合は空文字 `''` とする。

現在日付・現在日時をデフォルト値として設定する場合は、画面設計書の `デフォルト` 列に以下の予約語を指定する。

```text
SYSTEM_DATE
SYSTEM_DATETIME
```

###### 日時

画面設計書：

```text
形式=日時
デフォルト=SYSTEM_DATETIME
```

ACG生成：

```ts
AppDateUtil.getSysDateTimeUtcIso8601()
```

UTCのISO 8601形式で取得する。

返却値例：

```text
2026-10-16T06:24:00.000Z
```

###### 日付

画面設計書：

```text
形式=日付
デフォルト=SYSTEM_DATE
```

ACG生成：

```ts
AppDateUtil.getSysDateIso8601()
```

ISO 8601の日付形式で取得する。

返却値例：

```text
2026-10-16
```

`形式=日付` は非推奨とする既存方針を維持する。

###### AppDateUtil

利用する既存Utilityは以下とする。

```text
src/app/brf9000/brf9017-utils/app-date.util.ts
```

ACGは現在日付・現在日時の取得処理を独自実装せず、`AppDateUtil` の上記メソッドを利用する。

###### 予約語

画面設計書の `デフォルト` 列で使用する日付・日時の予約語は以下とする。

```text
SYSTEM_DATE
→ 形式=日付 で使用
→ AppDateUtil.getSysDateIso8601()

SYSTEM_DATETIME
→ 形式=日時 で使用
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

ACGはこれらの予約語を固定値文字列としてFormControlへ設定せず、対応する `AppDateUtil` 呼び出しへ変換する。

###### 予約語と形式の組み合わせチェック

`SYSTEM_DATE` と `SYSTEM_DATETIME` は、対応する形式と1対1で使用する。

```text
形式=日付
デフォルト=SYSTEM_DATE
→ OK

形式=日時
デフォルト=SYSTEM_DATETIME
→ OK

形式=日付
デフォルト=SYSTEM_DATETIME
→ Exception

形式=日時
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATETIME
→ Exception
```

ACGは不正な組み合わせを自動補正せず、検出した時点でExceptionを発生させてコード生成を停止する。

この方針をFail Fastとする。

###### 特定項目の特別扱い禁止

`createDateTime`、`updateDateTime`、`deleteDateTime` などの項目について、ACGは物理名や用途を見てデフォルト値を特別扱いしない。

これら3項目を含め、各項目の初期値は画面設計書の `デフォルト` 列の指定に従う。

```text
デフォルト=-
→ ''

デフォルト=SYSTEM_DATETIME
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

ACGは項目名から意味を推測してデフォルト値を変更・補完しない。

## 2.6.12 日付・日時を文字列の形式列とする設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：日付・日時は文字列型＋形式。日時はUTC ISO 8601保持・閲覧時ロケールに変換、日付形式は原則非推奨。
- **次の作業**：生成型・形式チェックは5.4.3で検証
- **原典**：[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

画面設計書の `型` 列では、TypeScript上の型を表す。

`日付` および `日時` はTypeScript上ではいずれも `string` として扱うため、`文字列` と型として区別しない。

そのため、画面設計書では `日付`・`日時` を `型` 列ではなく `形式` 列で表現する。

概念は以下とする。

```text
文字列
  ├─ 形式なし
  ├─ 日付   ※非推奨
  └─ 日時
```

例：

```text
日付項目
型   = 文字列
形式 = 日付   ※非推奨

日時項目
型   = 文字列
形式 = 日時
```

生成されるTypeScript型はいずれも `string` とする。

```ts
FormControl<string>
```

###### 型列

画面設計書の `型` 列で使用する種別は以下とする。

```text
文字列
数値
真偽
Enum
```

`日付`・`日時` は型列から削除する。

###### 形式列

画面設計書の `形式` 列では以下を扱う。

```text
-
半角数字
半角英数字
半角英数字記号
正規表現
日付   ※非推奨
日時
```

`日付`・`日時` は `型=文字列` と組み合わせる。

###### 日付形式の扱い

`形式=日付` は互換性・限定用途のため残すが、原則として非推奨とする。

理由は、日付のみでは「世界共通のある瞬間」を表現できず、閲覧者のタイムゾーンに応じて正しい現地日付へ変換することができないためである。

実際に発生した出来事・予定・開始時刻など、タイムゾーンによって日付が変わり得るデータは、原則として `形式=日時` を使用し、UTCのISO 8601形式で保持する。

```text
例：
2026-10-16T06:24:00.000Z
```

`形式=日付` は、「2026-10-16」という暦上の日付そのものを保持し、タイムゾーン変換を行わないことが要件として明確な場合に限って使用する。

###### 多言語・多地域対応

`形式=日付` / `形式=日時` は、特定の国・言語向けの固定表示フォーマットを意味しない。

画面設計書には `yyyy/MM/dd` や `MM/dd/yyyy` などを固定値として埋め込まず、日付・日時という意味のみを指定する。

###### 日時

内部値はUTCのISO 8601形式で保持し、画面表示時に閲覧者のタイムゾーン・ロケールに応じた形式へ変換する。

```text
内部値（日時）
2026-10-16T06:24:00.000Z
```

###### 日付

`形式=日付` は非推奨とし、内部値は以下のような暦上の日付文字列として保持する。

```text
2026-10-16
```

この値はタイムゾーン変換の対象としない。

表示形式はロケールに応じて決定する。

```text
ja-JP : 2026/10/16
en-US : 10/16/2026
en-GB : 16/10/2026
```

責務は以下のように分離する。

```text
型
→ TypeScript上のデータ型

形式
→ 日付・日時という値の意味

日時の内部値
→ UTC ISO 8601

表示形式
→ 言語・地域（ロケール）に応じて決定
```

###### 今回のACG改修範囲

今回の改修で以下を実施する。

- 型から `日付` / `日時` を削除する
- 共通 `TypeScriptTypeEnum` から `DATE` / `DATE_TIME` を削除する
- UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する
- DAO生成など、`DATE` / `DATE_TIME` を直接参照している箇所を `STRING` 前提へ整理する
- 形式に `日付` / `日時` を追加する
- `形式=日付` は非推奨として扱う

###### 未決事項

以下は別途設計する。

- `形式=日付` の具体的な入力・Validation仕様
- `形式=日時` の具体的な入力・Validation仕様
- `文字種` 列との組み合わせルール

本決定は、画面設計書において `日付`・`日時` を `型` ではなく `形式` として扱い、`日付` は残すが非推奨とし、タイムゾーン変換が必要なデータは原則 `日時` を使用することを対象とする。

## 2.6.13 UIヘッダー・明細DTO分離方針の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：検索条件と明細で別DTOを用いる。表示明細はDTO[]、編集明細はFormArray/FormGroup。
- **次の作業**：画面への適用状況は5.4.3で検証
- **原典**：[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

ヘッダー（検索条件）と明細（検索結果）は、それぞれ別DTOとして定義することを基本形とする。

```text
画面Component
├─ HeaderDto / ConditionDto
│   └─ 検索条件用 FormGroup
│
└─ DetailDto / ResultDto
    └─ 明細1行分
```

画面全体を包むだけの親DTOは原則作成しない。

###### 表示専用明細

表示専用の明細は通常のDTO配列として保持する。

```ts
resultList: Bru1002ResultDto[] = [];
```

検索後の結果は、同一Componentインスタンスが生存している間、クライアント側メモリに保持される。

###### 編集可能明細

画面上で明細行を編集する場合はReactive Formsを使用する。

```text
FormArray
└─ FormGroup  // 1明細行
   ├─ FormControl
   ├─ FormControl
   └─ ...
```

編集可能明細では、FormControl/FormGroup/FormArrayにより画面入力状態・Validation・dirty/touched等を管理する。

###### Reactive Forms方針

1画面・1Component内に複数のFormGroupが存在してよい。

責務が異なる入力単位は無理に1つのFormGroupへまとめず、必要に応じて分離する。

例：

```text
Bru1002Component
├─ 検索条件FormGroup
└─ 編集明細FormArray / FormGroup
```

同一入力項目でReactive Formsと`[(ngModel)]`を併用しない。

###### 基本原則

```text
表示専用明細
→ DTO[]

編集可能明細
→ FormArray<FormGroup<...>>

検索条件
→ 独立したUI Form DTO / FormGroup
```

## 2.6.14 ACG実装追加方針（文字種Enum・DI等）の設計

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **議論・決定内容**：文字種Enumの暫定配置、isInjectableとprovidedInRootの分離、Enum実型解決と日時デフォルトの制限を確定。
- **次の作業**：実装反映状況は5.4.3で検証
- **原典**：[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)

####### 原典全文（承認済み仕様・コード例・例外規則）

> 次の内容は[phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)の原文。これは2026-10-16の設計承認の記録であり、コード実装やテストが完了したことを意味しない。

> 状態：設計承認済み  
> 承認日：2026-10-16

###### 決定内容

Phase2のACG実装修正にあたり、未確定だった以下4点を正式決定する。

###### 1. 文字種Enumの配置

画面設計書の `文字種` 列を解釈するEnumとして `AcgUiFormCharacterTypeEnum` を追加する。

今回の実装では、既存のUI設計書用Enumと同じ以下のパッケージへ配置する。

```text
io.github.soracity.alfred.generator.user.uispec.uispecenum
```

対象イメージ：

```text
AcgUiFormFormatCheckEnum
AcgUiFormCharacterTypeEnum
```

パッケージ全体の再編は今回のACG実装では行わない。

共通EnumとUI専用Enumの最終的なパッケージ構成は、AlfredCodeGeneratorのGitHub Issue #8「設計書列用Enumのパッケージ構成を整理する」で別途検討する。

Issue #8が未決の間、今回決定した配置を暫定的な正式配置として使用する。

###### 2. Injectableのroot提供有無

`AcgClassModel` では、Injectableであるかどうかと、root提供するかどうかを分離して表現する。

以下の2項目を持つ方針とする。

```text
isInjectable
providedInRoot
```

UI Form DTOは以下とする。

```text
isInjectable = true
providedInRoot = false
```

生成結果：

```ts
@Injectable()
export class Bru1001Dto {
  // ...
}
```

DAO等、従来どおりroot提供するクラスは以下とする。

```text
isInjectable = true
providedInRoot = true
```

生成結果：

```ts
@Injectable({ providedIn: 'root' })
export class XxxDao {
  // ...
}
```

これにより、`isInjectable=true` の場合に必ず `providedIn: 'root'` を生成する現行仕様を変更し、UI Form DTOをComponentスコープDIで利用できるようにする。

###### 3. TypeScriptTypeEnum.ENUMのTypeScript型

`TypeScriptTypeEnum.ENUM` は固定のTypeScript型名を持たない。

画面設計書では、実際のTypeScript型は `Enum型` 列から取得する。

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
```

生成側では以下を使用する。

```ts
FormControl<Nullable<AppCodeMatchTypeEnum>>
```

`Nullable<T>` はBruce共通のグローバル型として `src/global.d.ts` に定義し、ACGはimportを生成しない。

`ENUM` に対して共通処理から固定のTypeScript型名を取得しようとした場合、ACGは推測値を返さずFail Fastで停止する。

つまり、`ENUM` の実型解決は `Enum型` 列を解釈できる処理の責務とする。

###### 4. 日付・日時のデフォルト値

`形式=日付` / `形式=日時` は、任意の固定文字列をデフォルト値として許可しない。

許可する組み合わせは以下のみとする。

```text
形式=日付
デフォルト=-
→ ''

形式=日付
デフォルト=SYSTEM_DATE
→ AppDateUtil.getSysDateIso8601()

形式=日時
デフォルト=-
→ ''

形式=日時
デフォルト=SYSTEM_DATETIME
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

以下は不正とする。

```text
形式=日付
デフォルト=2026-10-16
→ Exception

形式=日時
デフォルト=2026-10-16T06:24:00.000Z
→ Exception
```

`形式=日付` / `形式=日時` に対して、`-` または対応する予約語以外が指定された場合、ACGは自動補正せずFail Fastで停止する。

一般の `型=文字列` に対する「任意文字列をデフォルト値として指定可能」というルールは維持するが、`形式=日付` / `形式=日時` はこの一般ルールの対象外とする。

###### 実装対象

今回のACG実装修正では、上記4点を既存のPhase2確定仕様と合わせて実装する。

生成済みファイルを直接修正せず、ACG本体・設計書解析・内部モデル・コード生成・仕様チェック・テストを修正対象とする。

###### 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)
- [phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)
- [phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)
- [phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)
- [phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)
- [phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)
- [phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)
- [phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)
- [phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)
- [phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)
- [phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)

###### 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。


---

## 旧議事録原文の完全性保証（機械照合用）

> 旧議事録の原文を改変せず保存し、転記漏れを機械検査するための履歴です。最新の承認・実装状況は上の工程本文およびWBSを参照してください。

<details>
<summary>原典全文：phase2_ACGデフォルト値_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_ACGデフォルト値_決定.md -->
# Phase2 ACGデフォルト値 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

画面設計書の `デフォルト` 列では、`-` を「デフォルト未指定」とする。

`-` のときに生成するFormControl初期値は型ごとに決める。

| 型 | デフォルト列 | FormControl初期値 |
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

## Enumのデフォルト値

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
デフォルト=0
```

生成イメージ：

```ts
new FormControl<AppCodeMatchTypeEnum | null>(
  AppCodeMatchTypeEnum.toEnum('0')
)
```

`デフォルト=-` の場合は `null` とする。

```ts
new FormControl<AppCodeMatchTypeEnum | null>(null)
```

## 必須項目との関係

`必須=〇` であっても、`デフォルト=-` の場合にACGが値を補完しない。

```text
必須=〇 + デフォルト=-
```

の場合、初期状態は未入力とし、Validationで必須エラーになり得る状態とする。

ACGは必須だからという理由で推測して初期値を設定しない。

## 日付・日時

`形式=日付`、`形式=日時` も `デフォルト=-` の場合は空文字 `''` とする。

現在日付・現在日時をデフォルト値として設定する場合は、画面設計書の `デフォルト` 列に以下の予約語を指定する。

```text
SYSTEM_DATE
SYSTEM_DATETIME
```

### 日時

画面設計書：

```text
形式=日時
デフォルト=SYSTEM_DATETIME
```

ACG生成：

```ts
AppDateUtil.getSysDateTimeUtcIso8601()
```

UTCのISO 8601形式で取得する。

返却値例：

```text
2026-10-16T06:24:00.000Z
```

### 日付

画面設計書：

```text
形式=日付
デフォルト=SYSTEM_DATE
```

ACG生成：

```ts
AppDateUtil.getSysDateIso8601()
```

ISO 8601の日付形式で取得する。

返却値例：

```text
2026-10-16
```

`形式=日付` は非推奨とする既存方針を維持する。

## AppDateUtil

利用する既存Utilityは以下とする。

```text
src/app/brf9000/brf9017-utils/app-date.util.ts
```

ACGは現在日付・現在日時の取得処理を独自実装せず、`AppDateUtil` の上記メソッドを利用する。

## 予約語

画面設計書の `デフォルト` 列で使用する日付・日時の予約語は以下とする。

```text
SYSTEM_DATE
→ 形式=日付 で使用
→ AppDateUtil.getSysDateIso8601()

SYSTEM_DATETIME
→ 形式=日時 で使用
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

ACGはこれらの予約語を固定値文字列としてFormControlへ設定せず、対応する `AppDateUtil` 呼び出しへ変換する。

## 予約語と形式の組み合わせチェック

`SYSTEM_DATE` と `SYSTEM_DATETIME` は、対応する形式と1対1で使用する。

```text
形式=日付
デフォルト=SYSTEM_DATE
→ OK

形式=日時
デフォルト=SYSTEM_DATETIME
→ OK

形式=日付
デフォルト=SYSTEM_DATETIME
→ Exception

形式=日時
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATETIME
→ Exception
```

ACGは不正な組み合わせを自動補正せず、検出した時点でExceptionを発生させてコード生成を停止する。

この方針をFail Fastとする。

## 特定項目の特別扱い禁止

`createDateTime`、`updateDateTime`、`deleteDateTime` などの項目について、ACGは物理名や用途を見てデフォルト値を特別扱いしない。

これら3項目を含め、各項目の初期値は画面設計書の `デフォルト` 列の指定に従う。

```text
デフォルト=-
→ ''

デフォルト=SYSTEM_DATETIME
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

ACGは項目名から意味を推測してデフォルト値を変更・補完しない。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_ACGデフォルト値_決定.md -->

</details>

<details>
<summary>原典全文：phase2_ACG実装追加方針_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_ACG実装追加方針_決定.md -->
# Phase2 ACG実装追加方針 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

Phase2のACG実装修正にあたり、未確定だった以下4点を正式決定する。

## 1. 文字種Enumの配置

画面設計書の `文字種` 列を解釈するEnumとして `AcgUiFormCharacterTypeEnum` を追加する。

今回の実装では、既存のUI設計書用Enumと同じ以下のパッケージへ配置する。

```text
io.github.soracity.alfred.generator.user.uispec.uispecenum
```

対象イメージ：

```text
AcgUiFormFormatCheckEnum
AcgUiFormCharacterTypeEnum
```

パッケージ全体の再編は今回のACG実装では行わない。

共通EnumとUI専用Enumの最終的なパッケージ構成は、AlfredCodeGeneratorのGitHub Issue #8「設計書列用Enumのパッケージ構成を整理する」で別途検討する。

Issue #8が未決の間、今回決定した配置を暫定的な正式配置として使用する。

## 2. Injectableのroot提供有無

`AcgClassModel` では、Injectableであるかどうかと、root提供するかどうかを分離して表現する。

以下の2項目を持つ方針とする。

```text
isInjectable
providedInRoot
```

UI Form DTOは以下とする。

```text
isInjectable = true
providedInRoot = false
```

生成結果：

```ts
@Injectable()
export class Bru1001Dto {
  // ...
}
```

DAO等、従来どおりroot提供するクラスは以下とする。

```text
isInjectable = true
providedInRoot = true
```

生成結果：

```ts
@Injectable({ providedIn: 'root' })
export class XxxDao {
  // ...
}
```

これにより、`isInjectable=true` の場合に必ず `providedIn: 'root'` を生成する現行仕様を変更し、UI Form DTOをComponentスコープDIで利用できるようにする。

## 3. TypeScriptTypeEnum.ENUMのTypeScript型

`TypeScriptTypeEnum.ENUM` は固定のTypeScript型名を持たない。

画面設計書では、実際のTypeScript型は `Enum型` 列から取得する。

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
```

生成側では以下を使用する。

```ts
FormControl<Nullable<AppCodeMatchTypeEnum>>
```

`Nullable<T>` はBruce共通のグローバル型として `src/global.d.ts` に定義し、ACGはimportを生成しない。

`ENUM` に対して共通処理から固定のTypeScript型名を取得しようとした場合、ACGは推測値を返さずFail Fastで停止する。

つまり、`ENUM` の実型解決は `Enum型` 列を解釈できる処理の責務とする。

## 4. 日付・日時のデフォルト値

`形式=日付` / `形式=日時` は、任意の固定文字列をデフォルト値として許可しない。

許可する組み合わせは以下のみとする。

```text
形式=日付
デフォルト=-
→ ''

形式=日付
デフォルト=SYSTEM_DATE
→ AppDateUtil.getSysDateIso8601()

形式=日時
デフォルト=-
→ ''

形式=日時
デフォルト=SYSTEM_DATETIME
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

以下は不正とする。

```text
形式=日付
デフォルト=2026-10-16
→ Exception

形式=日時
デフォルト=2026-10-16T06:24:00.000Z
→ Exception
```

`形式=日付` / `形式=日時` に対して、`-` または対応する予約語以外が指定された場合、ACGは自動補正せずFail Fastで停止する。

一般の `型=文字列` に対する「任意文字列をデフォルト値として指定可能」というルールは維持するが、`形式=日付` / `形式=日時` はこの一般ルールの対象外とする。

## 実装対象

今回のACG実装修正では、上記4点を既存のPhase2確定仕様と合わせて実装する。

生成済みファイルを直接修正せず、ACG本体・設計書解析・内部モデル・コード生成・仕様チェック・テストを修正対象とする。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_ACG実装追加方針_決定.md -->

</details>

<details>
<summary>原典全文：phase2_ACG形式チェック_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_ACG形式チェック_決定.md -->
# Phase2 ACG形式チェック 決定

> 状態：設計承認済み  
> 更新日：2026-10-16

## 形式チェック

画面設計書の `形式` は以下の6種類とする。

```text
半角数字
半角英数字
半角英数字記号
正規表現
日付
日時
```

`日付` / `日時` は `型=文字列` と組み合わせ、文字種は `-` とする。

```text
型=文字列 / 文字種=- / 形式=日付
型=文字列 / 文字種=- / 形式=日時
```

日付・日時の具体的な表示形式は固定せず、表示時にロケールに応じて決定する。

## ASCII文字列の形式

`文字種=ASCII` の場合は、以下のいずれかの形式を指定する。

```text
半角数字
半角英数字
半角英数字記号
正規表現
```

`文字種=ASCII / 形式=-` は使用しない。

## 半角英数字記号

`半角英数字記号` は、半角英字・半角数字・半角記号に加えて、**半角スペースを許可する**。

許可範囲はASCIIの印字可能文字と半角スペースとする。

```text
半角スペース ～ ~
```

したがって、以下のような値を許可する。

```text
masahiro ariji
ABC-123
test_user
abc@example.com
```

形式チェック自体は半角スペースを許可する。スペースのみの値を必須項目として許可するかどうかは、形式チェックではなく必須チェックの責務とする。

## 正規表現

上記の定義よりさらに限定した入力規則が必要な場合は `形式=正規表現` を使用し、画面設計書の `正規表現` 列で個別指定する。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_ACG形式チェック_決定.md -->

</details>

<details>
<summary>原典全文：phase2_ACG必須チェック_空白文字列_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md -->
# Phase2 ACG必須チェック 空白文字列 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

文字列項目で `必須=〇` の場合、半角スペースのみの文字列は必須チェックNGとする。

期待する判定は以下。

```text
null        → NG
""          → NG
" "         → NG
"   "       → NG
"abc"       → OK
"abc def"   → OK
```

## 責務分離

`形式=半角英数字記号` では半角スペースの入力自体を許可する。

一方、スペースのみの値が必須項目として有効かどうかは `形式` の責務ではなく `必須` の責務とする。

したがって、以下は両立する。

```text
形式=半角英数字記号
→ 半角スペースを含む文字列を許可

必須=〇
→ trim後に空文字となる値はNG
```

## Angular標準Validatorとの違い

Angular標準の `Validators.required` は、スペースだけの文字列を空とは判定しない。

そのため、文字列型の必須チェックは、trim後に空文字かどうかを判定できる必須Validatorを使用する。

具体的な共通Validatorのクラス名・メソッド名は別途実装設計で決定する。

## 型ごとの必須チェック

```text
文字列 + 必須=〇
→ trim後の空文字もNGとする必須チェック

数値 + 必須=〇
→ Validators.required 相当

Enum + 必須=〇
→ Validators.required 相当

真偽 + 必須(真偽)=〇
→ Validators.requiredTrue 相当
```

ACGは画面設計書の型に応じて適切な必須チェックを生成する。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md -->

</details>

<details>
<summary>原典全文：phase2_Nullable型_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_Nullable型_決定.md -->
# Phase2 Nullable型 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

Bruceでは、TypeScriptで `null` を許容する型を表現する際、`A | null` を直接記述せず、共通型エイリアス `Nullable<T>` を使用する。

```ts
type Nullable<T> = T | null;
```

以下は同じ型を表す。

```ts
AppCodeMatchStatusEnum | null
```

```ts
Nullable<AppCodeMatchStatusEnum>
```

`Nullable<T>` は型表記を統一するための型エイリアスであり、TypeScript上のnull許容の意味や型安全性は変更しない。

## 共通型の配置

Bruceの `src/global.d.ts` に以下を定義する。

```ts
type Nullable<T> = T | null;
```

`global.d.ts` はモジュール化せず、`import` / `export` を記述しない。

これにより、Bruce配下のTypeScriptソースでは `Nullable<T>` をimportせずに使用可能とする。

## 適用方針

BruceおよびACG生成ソースでは、null許容型を原則以下の形式で表現する。

```text
A | null
↓
Nullable<A>
```

対象例：

```ts
Nullable<number>
Nullable<boolean>
Nullable<Uint8Array>
Nullable<AppCodeMatchStatusEnum>
```

FormControlでも同様とする。

```ts
FormControl<Nullable<AppCodeMatchStatusEnum>>
```

メソッド引数・戻り値・変数・プロパティなど、型として `A | null` を表現する箇所でも `Nullable<A>` を使用する。

## ACG方針

ACGが生成するTypeScriptコードでは、null許容型を `A | null` ではなく `Nullable<A>` として生成する。

`Nullable<T>` はBruceのグローバル型であるため、ACGは `Nullable` 用のimportを生成しない。

生成済みファイルを直接修正せず、ACG本体の型生成処理を修正する。

## 注意事項

`Nullable<T>` は `T | null` の別名であり、nullそのものを禁止・除去する仕組みではない。

そのため、nullが存在し得る箇所では従来どおりnullチェックまたは型の絞り込みが必要となる。

また、`undefined` は `Nullable<T>` の対象外とする。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_Nullable型_決定.md -->

</details>

<details>
<summary>原典全文：phase2_TypeScriptTypeEnum_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md -->
# Phase2 TypeScript型Enum 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

既存の `TypeScriptPrimitiveTypeEnum` は、実際には画面設計書・DAO設計・列挙型設計・データモデル設計などで「TypeScript上の型分類」を表す共通Enumとして利用されている。

名称中の `Primitive` は実際の責務に対して狭すぎるため、以下のように名称変更する。

```text
TypeScriptPrimitiveTypeEnum
↓
TypeScriptTypeEnum
```

## 型分類

`TypeScriptTypeEnum` では、TypeScript上の型として意味のある分類のみを持つ。

```text
STRING
NUMBER
BOOLEAN
UINT8ARRAY
ENUM
```

`DATE` / `DATE_TIME` はTypeScript上では `string` であり、`STRING` と型として区別する意味がないため削除する。

日付・日時という意味は、画面設計書では `型` ではなく `形式` で表現する。

```text
型=文字列 / 形式=日付
型=文字列 / 形式=日時
```

## Enum型の追加

画面設計書の `型` 列で `Enum` を指定可能にするため、同Enumへ `ENUM` を追加する。

`ENUM` の具体的なTypeScript型名は、画面設計書の `Enum型` 列で指定されたクラス名を使用するため、`TypeScriptTypeEnum` 自体で固定のTypeScript型名を持つ前提にはしない。

## ACG改修方針

今回の改修で以下を実施する。

- `TypeScriptPrimitiveTypeEnum` を `TypeScriptTypeEnum` へリネームする
- `ENUM` を追加する
- `DATE` を削除する
- `DATE_TIME` を削除する
- DAO生成などで `DATE` / `DATE_TIME` を直接判定している箇所を削除し、文字列は `STRING` として扱う
- UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する
- 画面設計書の形式Enumに `日付` / `日時` を追加する

自動生成ファイルを直接修正せず、ACG本体の参照箇所を修正する。

## 方針

UI専用の別型Enumは新設せず、既存の型分類Enumを汎用名称へリネームして拡張する。

## 現行パッケージの扱い

ACGの現行パッケージは `io.github.soracity.alfred` とする。

`com.github.soracity.alfred` は旧パッケージとして扱い、今後の設計検討・コード調査・修正対象・コード例から除外する。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md -->

</details>

<details>
<summary>原典全文：phase2_UIヘッダー明細DTO分離_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md -->
# Phase2 UIヘッダー・明細DTO分離 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

ヘッダー（検索条件）と明細（検索結果）は、それぞれ別DTOとして定義することを基本形とする。

```text
画面Component
├─ HeaderDto / ConditionDto
│   └─ 検索条件用 FormGroup
│
└─ DetailDto / ResultDto
    └─ 明細1行分
```

画面全体を包むだけの親DTOは原則作成しない。

## 表示専用明細

表示専用の明細は通常のDTO配列として保持する。

```ts
resultList: Bru1002ResultDto[] = [];
```

検索後の結果は、同一Componentインスタンスが生存している間、クライアント側メモリに保持される。

## 編集可能明細

画面上で明細行を編集する場合はReactive Formsを使用する。

```text
FormArray
└─ FormGroup  // 1明細行
   ├─ FormControl
   ├─ FormControl
   └─ ...
```

編集可能明細では、FormControl/FormGroup/FormArrayにより画面入力状態・Validation・dirty/touched等を管理する。

## Reactive Forms方針

1画面・1Component内に複数のFormGroupが存在してよい。

責務が異なる入力単位は無理に1つのFormGroupへまとめず、必要に応じて分離する。

例：

```text
Bru1002Component
├─ 検索条件FormGroup
└─ 編集明細FormArray / FormGroup
```

同一入力項目でReactive Formsと`[(ngModel)]`を併用しない。

## 基本原則

```text
表示専用明細
→ DTO[]

編集可能明細
→ FormArray<FormGroup<...>>

検索条件
→ 独立したUI Form DTO / FormGroup
```

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md -->

</details>

<details>
<summary>原典全文：phase2_画面DTO項目_型別指定可能パターン_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md -->
# Phase2 画面DTO項目 型別指定可能パターン 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

画面設計書のDTO項目定義について、型ごとの指定可能パターンを以下の表で正式化する。

`指定可` は任意指定、`必須` は指定必須、`-` は指定不可を表す。

| 型 | Enum型 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 |
|---|---|---|---|---|---|---|---|---|
| 文字列 | `-` | `-` | `-` | `-` | `-` | `-` | `-` | `-` |
| 文字列 | `-` | Unicode | `-` | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角数字 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角英数字 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 半角英数字記号 | 指定可 | `-` | 指定可 | `-` | `-` |
| 文字列 | `-` | ASCII | 正規表現 | 指定可 | `-` | 指定可 | `-` | 必須 |
| 文字列 | `-` | `-` | 日付 | 指定可 | `-` | `-` | `-` | `-` |
| 文字列 | `-` | `-` | 日時 | 指定可 | `-` | `-` | `-` | `-` |
| 数値 | `-` | `-` | `-` | 指定可 | `-` | `-` | 指定可 | `-` |
| 真偽 | `-` | `-` | `-` | `-` | 指定可 | `-` | `-` | `-` |
| Enum | 必須 | `-` | `-` | 指定可 | `-` | `-` | `-` | `-` |

## 文字列型のルール

### Validationなし

文字列項目にValidationを行わない場合は、以下の組み合わせを許可する。

```text
型=文字列 / 文字種=- / 形式=-
```

このパターンでは、文字種・形式を含めてValidationを生成しない。

以下はすべて `-` とする。

```text
必須
必須(真偽)
文字数(最小/最大)
数値(最小/最大)
正規表現
```

プログラム側で生成・設定する値など、画面入力値としてValidationする必要がない文字列に使用する。

### Unicode

Unicode文字列は、`形式=-` とする。

指定可能なのは以下のみ。

```text
必須
文字数(最小/最大)
```

### ASCII

ASCII文字列は、`形式=-` を許可しない。

必ず以下のいずれかを指定する。

```text
半角数字
半角英数字
半角英数字記号
正規表現
```

`形式=正規表現` の場合のみ、`正規表現` 列を必須指定する。

### 日付・日時

日付・日時はTypeScript上の型ではなく形式として扱う。

```text
型=文字列 / 文字種=- / 形式=日付
型=文字列 / 文字種=- / 形式=日時
```

日付・日時の場合、文字種・文字数・数値範囲・正規表現は指定しない。

表示形式は画面設計書に固定記述せず、ロケールに応じて決定する。

#### Validation責務

`形式=日付` / `形式=日時` の値が正しい日付・日時形式であることは、日付・日時入力コンポーネント側で保証する。

ACGは、日付・日時専用の形式ValidatorをFormControlへ生成しない。

FormControl側でACGが生成するValidationは、画面設計書で `必須=〇` が指定された場合の必須チェックのみとする。

```text
形式=日付 / 必須=-
→ 日付形式Validatorは生成しない
→ 必須Validatorも生成しない

形式=日付 / 必須=〇
→ 日付形式Validatorは生成しない
→ 必須Validatorのみ生成

形式=日時 / 必須=-
→ 日時形式Validatorは生成しない
→ 必須Validatorも生成しない

形式=日時 / 必須=〇
→ 日時形式Validatorは生成しない
→ 必須Validatorのみ生成
```

責務は以下のように分離する。

```text
日付・日時の入力形式保証
→ 日付・日時入力コンポーネント

未入力チェック
→ FormControl Validation

ACG
→ 画面設計書の必須指定に従い必須Validationのみ生成
```

### 半角英数字記号

`半角英数字記号` は、半角スペースを含む印字可能ASCII文字を許可する。

例：

```text
masahiro ariji
ABC-123
test_user
abc@example.com
```

半角スペースを含むこと自体は許可する。

ただし、文字列項目で `必須=〇` の場合、スペースのみの値は必須チェックNGとする。

```text
" "      → NG
"   "    → NG
"abc"    → OK
"abc def"→ OK
```

必須判定は形式チェックとは分離し、trim後に空文字となる値をNGとする。

## Fail Fast

ACGは、上表に存在しない組み合わせを不正な画面設計書として扱い、コード生成を停止する。

例：

```text
型=文字列 / 文字種=- / 形式=- / 必須=〇
→ Exception

型=文字列 / 文字種=ASCII / 形式=-
→ Exception

型=文字列 / 文字種=Unicode / 形式=半角数字
→ Exception

型=文字列 / 文字種=ASCII / 形式=日付
→ Exception

型=数値 / 文字種=ASCII
→ Exception

型=真偽 / 必須=〇
→ Exception

型=Enum / Enum型=-
→ Exception
```

ACGは不正な指定を推測して補正せず、Fail Fastで停止する。

## 補足

`無効状態` と `デフォルト` は本表のValidation組み合わせ判定とは別責務のため、本表には含めない。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md -->

</details>

<details>
<summary>原典全文：phase2_画面設計書_日付日時の形式列化_決定.md（2026-10-16承認済み記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md -->
# Phase2 画面設計書 日付・日時の形式列化 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

画面設計書の `型` 列では、TypeScript上の型を表す。

`日付` および `日時` はTypeScript上ではいずれも `string` として扱うため、`文字列` と型として区別しない。

そのため、画面設計書では `日付`・`日時` を `型` 列ではなく `形式` 列で表現する。

概念は以下とする。

```text
文字列
  ├─ 形式なし
  ├─ 日付   ※非推奨
  └─ 日時
```

例：

```text
日付項目
型   = 文字列
形式 = 日付   ※非推奨

日時項目
型   = 文字列
形式 = 日時
```

生成されるTypeScript型はいずれも `string` とする。

```ts
FormControl<string>
```

## 型列

画面設計書の `型` 列で使用する種別は以下とする。

```text
文字列
数値
真偽
Enum
```

`日付`・`日時` は型列から削除する。

## 形式列

画面設計書の `形式` 列では以下を扱う。

```text
-
半角数字
半角英数字
半角英数字記号
正規表現
日付   ※非推奨
日時
```

`日付`・`日時` は `型=文字列` と組み合わせる。

## 日付形式の扱い

`形式=日付` は互換性・限定用途のため残すが、原則として非推奨とする。

理由は、日付のみでは「世界共通のある瞬間」を表現できず、閲覧者のタイムゾーンに応じて正しい現地日付へ変換することができないためである。

実際に発生した出来事・予定・開始時刻など、タイムゾーンによって日付が変わり得るデータは、原則として `形式=日時` を使用し、UTCのISO 8601形式で保持する。

```text
例：
2026-10-16T06:24:00.000Z
```

`形式=日付` は、「2026-10-16」という暦上の日付そのものを保持し、タイムゾーン変換を行わないことが要件として明確な場合に限って使用する。

## 多言語・多地域対応

`形式=日付` / `形式=日時` は、特定の国・言語向けの固定表示フォーマットを意味しない。

画面設計書には `yyyy/MM/dd` や `MM/dd/yyyy` などを固定値として埋め込まず、日付・日時という意味のみを指定する。

### 日時

内部値はUTCのISO 8601形式で保持し、画面表示時に閲覧者のタイムゾーン・ロケールに応じた形式へ変換する。

```text
内部値（日時）
2026-10-16T06:24:00.000Z
```

### 日付

`形式=日付` は非推奨とし、内部値は以下のような暦上の日付文字列として保持する。

```text
2026-10-16
```

この値はタイムゾーン変換の対象としない。

表示形式はロケールに応じて決定する。

```text
ja-JP : 2026/10/16
en-US : 10/16/2026
en-GB : 16/10/2026
```

責務は以下のように分離する。

```text
型
→ TypeScript上のデータ型

形式
→ 日付・日時という値の意味

日時の内部値
→ UTC ISO 8601

表示形式
→ 言語・地域（ロケール）に応じて決定
```

## 今回のACG改修範囲

今回の改修で以下を実施する。

- 型から `日付` / `日時` を削除する
- 共通 `TypeScriptTypeEnum` から `DATE` / `DATE_TIME` を削除する
- UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する
- DAO生成など、`DATE` / `DATE_TIME` を直接参照している箇所を `STRING` 前提へ整理する
- 形式に `日付` / `日時` を追加する
- `形式=日付` は非推奨として扱う

## 未決事項

以下は別途設計する。

- `形式=日付` の具体的な入力・Validation仕様
- `形式=日時` の具体的な入力・Validation仕様
- `文字種` 列との組み合わせルール

本決定は、画面設計書において `日付`・`日時` を `型` ではなく `形式` として扱い、`日付` は残すが非推奨とし、タイムゾーン変換が必要なデータは原則 `日時` を使用することを対象とする。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md -->

</details>
