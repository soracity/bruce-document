# フェーズ2：UI設計思想と責務

> 状態：フェーズ2設計検討中  
> 対象：テニスアプリ / Angular / ACG  
> 開始条件：フェーズ1の主要16共通部品の一次ソース調査完了

## 目的

フェーズ1で確認した現行共通コンポーネントを前提に、画面・共通Component・Layout・Application・Domain・Infrastructureの責務境界を明確にする。

このフェーズでは「どこに何を書くか」を決める。色・角丸・影などの具体的なデザインシステム標準化はフェーズ3で扱う。

## 責務分離

| 領域 | 主な責務 | 原則として持たせない責務 |
|---|---|---|
| UI（画面Component） | 画面表示、ユーザー操作受付、画面固有の表示制御、Application呼び出し | テニスの業務ルール、DB直接アクセス、共通部品内部の見た目実装 |
| DTO / FormGroup | 画面入力値、入力状態、画面入力レベルのValidation状態保持 | DB処理、テニス業務ルール、画面遷移 |
| 共通Component | 共通の入力・表示、FormControlとの接続、汎用イベント通知 | 画面固有処理、Application呼び出し、Domain判断、DBアクセス |
| Layout | 配置、間隔、必要なレスポンシブ配置 | 入力値保持、業務判断、画面固有イベント処理 |
| Application | ユースケースの調整、DomainとInfrastructureの呼び出し順序、処理結果の組み立て | UI描画、CSS、DB製品固有処理 |
| Domain | テニスの業務ルール、状態遷移、業務上の整合性 | Angular、SQLite、REST、画面表示 |
| Infrastructure | DB、REST、端末機能等の技術的処理 | テニス業務ルール、画面表示判断 |

## 基本データ・イベントフロー（提案）

```text
ユーザー操作
    ↓
画面Component
    ↓
FormGroup / DTO
    ↓
Application
    ↓
Domain
    ↓
Repository Interface
    ↓
Infrastructure
```

取得結果は逆方向に戻し、最終的な表示判断を画面Componentが行う。

共通Componentはこの縦方向の業務フローには入らず、画面ComponentとFormControlの間にある再利用可能なUI部品として扱う。

```text
画面Component
    ├─ FormControl ── 共通入力Component
    └─ イベント  ←── 共通Component
```

## Validationの責務境界（提案）

Validationは種類で分ける。

### FormGroup / FormControl側

画面入力として機械的に判定できるものを担当する。

- required
- 文字数
- 数値形式
- 日付形式
- 入力可能範囲など、画面入力として完結する制約

### Domain側

テニスの意味を理解しないと判定できないものを担当する。

例：

- ポイント・ゲーム・セットの状態遷移が成立するか
- 試合状態として矛盾していないか
- 戦術・スタッツ上の業務ルール

同じ条件を画面とDomainの双方へ重複実装しないことを原則とする。

## 共通Componentの境界（提案）

共通Componentは「再利用可能なUI部品」に限定する。

例えばTextboxComponentは、値の表示・入力、FormControlとの接続、共通Validation表示などを担当してよい。一方、「この画面では試合名が必須だから保存不可」といった画面固有判断は持たせない。

ButtonComponentもクリックを親へ通知するところまでとし、保存ApplicationServiceを直接呼び出さない。

この境界により、同じ共通Componentを別画面や将来の機能でも再利用できる状態を維持する。

## Layoutの境界（提案）

Layoutは配置だけを担当する。

- 横並び / 縦積み
- gap
- 必要なレスポンシブ配置
- 子要素の配置比率（採用する場合）

以下はLayoutに持たせない。

- FormControl
- disabled判定
- ラベルやメッセージ
- Application呼び出し
- テニス業務ルール

フェーズ1で判明した `LayoutItem` の「折り返し有無」「子を均等幅にするか」は、この責務原則の中で別途決定する。

## FormGroup / UI DTO / Application DTO / 画面Componentの責務（現行BRU1001照合）

### 現行ソースで確認した事実

`BRU1001`では、UI側の`Bru1001Dto`がACGによる自動生成クラスとなっており、`FormGroup`と各`FormControl`の型・初期値・disabled・Angular Validatorsを保持している。

画面Componentは`readonly dto = new Bru1001Dto()`を保持し、HTML側では`@let ctrls = dto.formGroup.controls;`としてテンプレート内だけの短縮名を定義する方針とする。TypeScript側に`readonly controls = this.dto.formGroup.controls;`のような記述簡略化専用の別名は持たせない。

共通入力Componentへの受け渡しは、HTMLから`[control]="ctrls.xxx"`の形で直接`FormControl`を渡す。

一方、Application層の`Bra1001SaveMatchInfoReqDto`は`FormControl`を持たないreadonlyの値DTOであり、UIのReactive Formsとは分離されている。

現行`Bru1001Component`では、画面初期化・Application Service呼び出し・FormGroupへのpatchValue・保存用DTOへの変換に加え、サーブ順やリターン側の決定などテニス固有の状態変更ロジックも実装されている。

### DTOを2種類に分けて考える（提案）

同じ「DTO」という名称でも責務を明確に分ける。

| 種類 | 例 | 責務 | 持たせないもの |
|---|---|---|---|
| UI Form DTO | `Bru1001Dto` | FormGroup、FormControl、初期値、disabled初期状態、画面入力Validation | Application呼び出し、DB処理、テニス業務ルール |
| Application DTO | `Bra1001SaveMatchInfoReqDto`等 | UI/Application間のユースケース入力・出力値 | FormControl、FormGroup、Angular Validator、画面表示状態 |

現行の`Bru1001Dto`のように画面設計書からFormGroupをACG生成する方向は、UI Form DTOとして責務を限定する限り整合性が高い。

### 画面Componentの責務（提案）

画面ComponentはUIのオーケストレーターとする。

- UI Form DTOを保持または参照する。
- FormControlを共通Componentへ渡すためのデータ元を提供する。
- TypeScript側では記述簡略化だけを目的とした`controls`別名を持たない。
- HTML側で必要に応じて`@let ctrls = dto.formGroup.controls;`を定義し、テンプレート内の参照を簡潔にする。
- ルートパラメータ・画面初期化・表示/非表示など画面固有状態を扱う。
- ユーザーイベントを受けてApplication Serviceを呼び出す。
- UI Form DTOとApplication DTOの境界で値を変換する。
- Applicationから返った値をFormGroupへ反映する。

ただし、テニスの意味に依存するルールそのものは画面Componentに置かない。

### 現行BRU1001の処理を責務別に分類する（提案）

| 現行処理 | 基本的な配置先 |
|---|---|
| `matchId`のルート取得、初期表示 | 画面Component |
| `FormGroup.valueChanges`を契機とした自動保存 | 画面Component（保存ユースケースの起動） |
| `@let ctrls = dto.formGroup.controls;`でテンプレート内に短縮名を定義 | Template |
| `ctrls.xxx`を共通Componentへ渡す | Template |
| `matchSetting`に応じた入力項目のenable/disable | 画面表示制御である限り画面Component |
| Form値からApplication Request DTOへの変換 | UI/Application境界。まずは画面Componentで可。重複が増えた場合のみMapper等を検討 |
| Application Responseを`patchValue`する | UI/Application境界。まずは画面Componentで可 |
| シングルス/ダブルス切替で非対象入力をクリア | 単なる画面編集状態の整理なら画面Component。保存データの整合性条件ならDomainでも保証が必要 |
| サーブ順の決定・相互関係 | Domain側の候補 |
| ダブルスのリターン側・組合せルール | Domain側の候補 |

画面上の利便性のための処理と、保存される試合データの正しさを保証する業務ルールを区別する。後者はUIを経由しない処理から呼ばれても成立する必要があるため、Domain側へ置く。

### 推奨フロー（提案）

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

### ACGとの関係（提案）

- UI Form DTOは画面設計書から生成してよい。
- 型、初期値、disabled初期状態、Angular Validatorsは生成対象にできる。
- テニス業務ルールを生成UI DTOへ埋め込まない。
- Application DTOはユースケース契約としてUI Form DTOとは別生成物にする。
- 自動生成ファイルを直接修正せず、変更が必要な場合は設計書またはACG生成処理を変更する。

この整理により、FormGroup生成とDDDの責務分離を両立する。

## 確認できた設計方針

- 画面実装は既存の共通コンポーネントを優先して利用する。
- 画面の入力状態はAngularの`FormGroup` / `FormControl`で扱う。
- 親画面から共通入力コンポーネントへ既存の`FormControl`インスタンスを渡す。
- 記述簡略化だけを目的とした`readonly controls = this.dto.formGroup.controls;`は画面Componentに定義しない。
- HTMLでは`@let ctrls = dto.formGroup.controls;`を使用し、テンプレート内で`ctrls.xxx`として参照する。
- ラベル・メッセージはキーで管理し、既存のラベルキーを優先して再利用する。
- Enumは共通・画面単位で管理し、ACG（AlfredCodeGenerator）で生成する。
- AIは自動生成されたEnumやその他の生成コードを直接編集しない。
- 生成結果を変更する場合は生成元の定義・生成処理を見直す。
- Layoutから子コンポーネントに画面固有CSSを注入しない。
- 設計思想から外れる実装を、確認なく採用しない。

## 継続検討・照合事項

- UI Form DTOの生成クラス表現を現行の`class + formGroup`で正式採用するか。
- UI Form DTOとApplication DTO間の変換を画面Componentに残す範囲と、Mapperを導入する基準。
- UIレベルValidationとDomain Validationの具体的な境界。
- 現行BRU1001のサーブ順・リターン側ロジックをDomainへ移す場合のDomainモデル/API。
- `LayoutItem`の折り返し・均等幅・`LayoutSpan`の正式仕様。
- レイヤーと実際のディレクトリ構造・クラスとの対応。
- 過去の決定事項の網羅性および設計理由の完全な復元。

## 変更管理

フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。
