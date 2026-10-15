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

## 確認できた設計方針

- 画面実装は既存の共通コンポーネントを優先して利用する。
- 画面の入力状態はAngularの`FormGroup` / `FormControl`で扱う。
- 親画面から共通入力コンポーネントへ既存の`FormControl`インスタンスを渡す。
- ラベル・メッセージはキーで管理し、既存のラベルキーを優先して再利用する。
- Enumは共通・画面単位で管理し、ACG（AlfredCodeGenerator）で生成する。
- AIは自動生成されたEnumやその他の生成コードを直接編集しない。
- 生成結果を変更する場合は生成元の定義・生成処理を見直す。
- Layoutから子コンポーネントに画面固有CSSを注入しない。
- 設計思想から外れる実装を、確認なく採用しない。

## 継続検討・照合事項

- FormGroupを画面定義から生成する方式と、生成クラス・controlsオブジェクトの表現。
- UIレベルValidationとDomain Validationの具体的な境界。
- Application Serviceと画面Component間で使用する入出力DTOの形。
- `LayoutItem`の折り返し・均等幅・`LayoutSpan`の正式仕様。
- レイヤーと実際のディレクトリ構造・クラスとの対応。
- 過去の決定事項の網羅性および設計理由の完全な復元。

## 変更管理

フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。
