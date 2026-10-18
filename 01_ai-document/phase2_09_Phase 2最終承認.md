# Phase 2.9 Phase 2最終承認

> **工程表の中区分：2.9 Phase 2最終承認**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

Phase2の各設計原則の承認と未決を混同せず、全論点の議論終了を確認して次工程へ進める。

## 2.9.1 承認済み事項と未決事項を相互整合させ議論終了判定

- **作業**：未着手／**設計**：未着手／**実装**：対象外／**検証**：未検証
- **対象と背景**：Phase 2の承認済み仕様と未決を突合し、議論終了の正式判定を行う工程。
- **この小区分で扱う具体事項**：承認済み事項と未決事項を相互整合させ議論終了判定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：2.xの未決をすべて扱いPhase 3と整合。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=未着手、実装=対象外、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：2.xの未決をすべて扱いPhase 3と整合
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase2_phase3_再開用完全サマリ.md](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### 継続検討・照合事項

- UI Form DTOの`class + formGroup`方式を推奨案から正式方針へ確定するか。
- UIレベルValidationとDomain Validationの具体的な境界。
- 現行BRU1001のサーブ順・リターン側ロジックをDomainへ移す場合のDomainモデル/API。
- レスポンシブ実装時に「十分な幅」を判定する具体方式。
- 画面外周paddingの具体的な実装場所。
- 任意CSS注入Inputの現行利用箇所調査と削除順序。
- レイヤーと実際のディレクトリ構造・クラスとの対応。
- 過去の決定事項の網羅性および設計理由の完全な復元。



#### 変更管理

フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。

### 旧2026-10-17再開情報の詳細（復旧スナップショット）

> [旧ACG/Bruce再開情報](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)を転記。**ロールバック・ブランチ情報は当時の事実**であり、現在のブランチ状態を保証しない。未承認の技術提案を承認済みに変更しない。

#### 7. 本線への復帰地点

ACG/Bruce互換対応が終わったら、新しい基盤議論へ拡張し続けない。

2026-10-15版 `phase2_phase3_再開用完全サマリ.md` に記録されている本線へ戻る。

**本線の再開地点：フェーズ2-2「幅の責務」**

最初に再確認する項目：

1. `appLayoutSpan` 未指定兄弟を均等割りにするか
2. 比率指定行では兄弟すべてに `appLayoutSpan` を明示するか
3. span指定・未指定の混在を禁止するか
4. `w-full` を画面側から注入せず、Layout割当領域とComponent内部100%を分離するか
5. Button / Radio等の「内部幅」とLayoutの「外部割当幅」を分離するか

ここを承認後、フェーズ2-3「余白の責務」へ進む。

その後の最終目的は、設計ルールをAIへ与え、**実際の1画面をAI主体で実装 → ユーザーレビュー → 共通ルールへフィードバック**するサイクルへ移行すること。

---



#### 8. 再開時にChatGPTが最初に行うこと

新しいチャットや長期間中断後は、推測で再開しない。

最初に次を読む。

1. `phase2_phase3_再開用完全サマリ.md`
2. 本書 `phase2_phase3_20261017追記_再開情報.md`
3. `phase2_UI設計思想と責務.md`
4. 必要な各 `_決定.md`
5. フェーズ3へ進む場合のみ `phase3_UIデザインシステム標準化_議論記録.md`

そのうえで、GitHubの現在ブランチ/ソースを確認し、文書に書かれた「スナップショット」と現在ソースの差分を確認する。

##### 再開用の指示文

```text
bruce-document/01_ai-document の再開文書を読み、現在のGitHubソースとの差分を確認してください。
ACG/Bruce互換対応が未完なら 2026-10-17追記の手順から再開し、完了済みならフェーズ2-2「幅の責務」へ戻ってください。
承認済み・未承認・調査事実を混同せず、承認事項は正本へ保存してください。
```

---



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 過去の議論の記録です。「未承認」「次回の議題」の記載は当時のもので、現在の承認・進捗には優先しません。
<!-- HISTORICAL-SUMMARY-SECTIONS: 1.2,1.8 -->

#### 1.2 フェーズ2全体の作業ロードマップ

現在の整理は以下。

| 項目 | 内容 | 状態 |
|---|---|---|
| 2-1 | 画面・LayoutManager・共通Componentの責務境界 | **承認済み・正本保存済み** |
| 2-2 | 幅の責務（均等割り、LayoutSpan、w-full、Component内部幅） | **議論済み・未承認。次回ここから再開** |
| 2-3 | 余白の責務（gap / padding / margin） | 未決 |
| 2-4 | レスポンシブ・折り返し（wrap、スマホ幅、縦横切替） | 未決 |
| 2-5 | 共通Componentの外部CSS排除（classContainer等） | 基本方針は合意済み、詳細移行ルール未完 |
| 2-6 | Form / DTO / Validation責務 | 一部承認済み、一部継続 |
| 2-7 | UIとDomainの責務（テニス業務ロジック） | 未決 |
| 2-8 | AI / ACG実装ルール | 基本方針は合意済み |

この番号は議論の進行を分かりやすくするための整理であり、各項目は承認された時点で正本へ確定事項として反映する。

---

#### 1.8 フェーズ2で残っている主要論点

##### 余白

既存方針：

- 同一行のComponent間 → LayoutItemの `gap`
- 行と行の間 → ItemStackLayoutの `gap`
- 画面全体の外周 → 上位画面Containerの `padding`
- 各Textbox/Button/Date等へmarginを持たせて画面調整する方式にはしない

ただし細部はフェーズ2-3で正式決定する。

##### レスポンシブ / wrap

- LayoutItemの `flex-wrap` の正式挙動
- スマホ幅での1行から複数行への切替
- row/column切替の責務
- LayoutSpanとwrapの組み合わせ

をフェーズ2-4で詰める。

##### Form / DTO / Validation

継続論点：

- UI Form DTOの `class + formGroup` 方式を正式方針として確定するか
- UI Form DTOとApplication DTO間の変換を画面Componentに残す範囲
- Mapper導入基準
- UI入力ValidationとDomain Validationの具体的境界

##### UI / Domain

現行BRU1001にある

- サーブ順
- ダブルスのリターン側
- 組合せルール

等のテニス意味依存ロジックをDomainへ移す場合のモデル/APIが未決。

##### レイヤーとディレクトリ

論理レイヤーと実際のディレクトリ構造・クラスの対応を最終確認する。

---

# 2. フェーズ3：UIデザインシステム標準化

## 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)
- [phase2_phase3_再開用完全サマリ.md](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。


---

## 旧議事録原文の完全性保証（機械照合用）

> 原文の欠落を防ぐための履歴保存です。元の「提案」「未決」「次回再開地点」は当時の記録であり、現在の承認済み仕様と進捗状況には優先しません。

<details>
<summary>原典全文：phase2_UI設計思想と責務.md（歴史的記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_UI設計思想と責務.md -->
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

現行画面Componentは`readonly dto = new Bru1001Dto()`、`readonly controls = this.dto.formGroup.controls`としている。設計方針としては、DTO取得をComponentスコープDIへ変更し、記述簡略化専用の`controls`別名は廃止する。

HTML側では`@let ctrls = dto.formGroup.controls;`としてテンプレート内だけの短縮名を定義し、共通入力Componentへ`[control]="ctrls.xxx"`の形で直接`FormControl`を渡す。

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

- UI Form DTOをComponentスコープDIで取得する。
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
| Form値からApplication Request DTOへの変換 | UI/Application境界。画面Componentで行う。Mapperは作成しない |
| Application Responseを`patchValue`する | UI/Application境界。画面Componentで行う |
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

### UI Form DTOの生成クラス表現（比較・提案）

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

## 承認済みIssue：UI Form DTOをComponentスコープDIへ変更

> 状態：**設計承認済み / 実装未着手**  
> 承認日：2026-10-15

### 決定内容

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

### 実装時の変更対象

1. ACGが生成するUI Form DTOの`@Injectable({ providedIn: 'root' })`を、root提供しない形へ変更する。
2. `Bru1001Component`の`providers`へ`Bru1001Dto`を登録する。
3. `readonly dto = new Bru1001Dto();`を`readonly dto = inject(Bru1001Dto);`へ変更する。
4. 記述簡略化だけを目的とする`readonly controls = this.dto.formGroup.controls;`を廃止する。
5. HTMLで`@let ctrls = dto.formGroup.controls;`を定義し、`ctrls.xxx`で参照する。
6. 同種のUI Form DTOについても、画面固有状態を持つものは同じComponentスコープDI方針を適用する。

### 採用理由

- FormGroupのライフサイクルを画面Componentのライフサイクルと一致させる。
- 画面を開き直した場合や複数画面インスタンスでForm状態を意図せず共有しない。
- DTO生成方法をDIへ統一しつつ、画面状態をシングルトン化しない。
- テスト時に画面単位でUI Form DTOを差し替えやすくする。

### 非採用

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

## 確認できた設計方針

- 画面実装は既存の共通コンポーネントを優先して利用する。
- 画面の入力状態はAngularの`FormGroup` / `FormControl`で扱う。
- UI Form DTOはDIで取得し、Componentスコープで管理する。シングルトン化しない。
- 親画面から共通入力コンポーネントへ既存の`FormControl`インスタンスを渡す。
- 記述簡略化だけを目的とした`readonly controls = this.dto.formGroup.controls;`は画面Componentに定義しない。
- HTMLでは`@let ctrls = dto.formGroup.controls;`を使用し、テンプレート内で`ctrls.xxx`として参照する。
- ラベル・メッセージはキーで管理し、既存のラベルキーを優先して再利用する。
- Enumは共通・画面単位で管理し、ACG（AlfredCodeGenerator）で生成する。
- AIは自動生成されたEnumやその他の生成コードを直接編集しない。
- 生成結果を変更する場合は生成元の定義・生成処理を見直す。
- Layoutから子コンポーネントに画面固有CSSを注入しない。
- 設計思想から外れる実装を、確認なく採用しない。

## 承認済みIssue：画面・LayoutManager・共通Componentの責務境界

> 状態：**設計承認済み**  
> 承認日：2026-10-15

### 決定内容

画面・LayoutManager・共通Componentの責務を次のように分離する。

| 層 | 責務 |
|---|---|
| 画面Component | 何を表示するか、どの順番で置くか、データ・イベントの接続 |
| ItemStackLayout | 行を縦方向に積み重ね、行間のgapを管理する |
| LayoutItem | 1行を構成し、子要素の横並び・gap・wrapを管理する |
| LayoutSpan | 必要な場合のみ子要素の幅比率を指定する |
| TableContainerLayout | テーブル固有の構造・列・横スクロール等を管理する |
| 共通Component | 自身の内部構造・操作性・見た目を管理する |
| styles.scss / design token | アプリ全体の色・文字・サイズ等のデザイン規則を管理する |

基本原則は次のとおりとする。

> **画面は「配置を記述」するが、「配置をCSSで実装」しない。**

画面はLayoutManagerと共通Componentを組み合わせて画面構造を定義する。画面固有CSSによって、共通Componentの外部配置や内部デザインを変更しない。

許可する例：

```html
<app-item-stack-layout>
  <app-layout-item>
    <app-textbox ... />
    <app-date ... />
  </app-layout-item>

  <app-layout-item>
    <app-button ... />
  </app-layout-item>
</app-item-stack-layout>
```

禁止する例：

```html
<div class="flex gap-4 mt-3 w-full">
  ...
</div>
```

```html
<app-textbox class="w-1/2" ... />
<app-textbox classContainer="m-4" ... />
```

幅比率など、レイアウト上必要な指定はLayoutManagerが提供する仕組みを利用する。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="70" ... />
  <app-textbox [appLayoutSpan]="30" ... />
</app-layout-item>
```

### 任意CSS注入に関する方針

`classContainer`、`classInput`、`classLabel`、`classSpan`等、画面側から共通Component内部へ任意CSSを注入するAPIは原則廃止する方向とする。

- コンポーネントの外側配置はLayoutManagerが担当する。
- コンポーネント内部の配置・見た目は共通Component自身が担当する。
- 見た目の差分が必要な場合は、任意CSS文字列ではなく`variant`、`appearance`、`size`等の意味を持つ限定的なAPIを使用する。

### AIによる画面実装への適用

AIに画面実装を依頼する場合も、自由なCSSレイアウトを生成させず、既存のLayoutManagerと共通Componentを使用させる。

これにより、AI生成コードでも画面間の一貫性と設計思想を維持する。

## 承認済みIssue：幅の責務

> 状態：**設計承認済み**  
> 承認日：2026-10-16

### 基本原則

LayoutManagerはComponentに**どれだけの領域を与えるか**を決める。共通Componentは**与えられた領域の中でどう描画するか**を決める。画面ComponentはCSSで幅を直接決めない。

| 対象 | 責務 |
|---|---|
| LayoutItem | 子Componentへ割り当てる横方向の領域を管理する |
| LayoutSpan | LayoutItem内における子Componentの幅比率を指定する |
| Textbox / Date / Radio / Button等 | LayoutManagerから与えられた領域内で自身を描画する |
| 画面Component | 画面上意味のある比率だけをLayoutSpanで指定する。CSSのwidth系classを直接指定しない |

### LayoutSpanは100等分で扱う

横方向の幅比率は**100等分**を基本単位とする。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="70" ... />
  <app-date [appLayoutSpan]="30" ... />
</app-layout-item>
```

上記は70:30の比率を表す。

原則として、同一`LayoutItem`内で明示的に`appLayoutSpan`を指定する場合、兄弟要素のspan合計を**100**とする。

例：

- `50 + 50 = 100`
- `70 + 30 = 100`
- `60 + 40 = 100`
- `20 + 30 + 50 = 100`

`appLayoutSpan`の値は**CSSの`width: n%`そのものではない**。LayoutItemが持つgap等を除いた利用可能領域を、指定されたspan比率に従って分配するための**重み**として扱う。

したがって、`70 + 30 + gap`をそのまま`70% + 30% + gap`として実装し、100%を超過させる実装は行わない。

### span未指定時は均等割り

同一`LayoutItem`内で`appLayoutSpan`を指定しない場合、兄弟Componentを均等幅として扱う。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
</app-layout-item>
```

上記は50:50。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
  <app-radio ... />
</app-layout-item>
```

上記は3等分とする。

### 明示指定と未指定を混在させない

同一`LayoutItem`内では、次のどちらかに統一する。

1. 全兄弟で`appLayoutSpan`を省略し、均等割りとする。
2. 全兄弟で`appLayoutSpan`を明示し、合計100の比率を指定する。

以下のような混在は採用しない。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="70" ... />
  <app-date ... />
</app-layout-item>
```

未指定値を「残り全部」「1」「自動値」等と解釈する余地をなくし、人間とAIの双方にとって実装規則を明確にするためである。

### Component内部の100%幅は許容する

画面側から共通Componentへ`w-full`等を注入して幅を決めない。

```html
<app-textbox classInput="w-full" ... />
```

上記のような指定は廃止対象とする。

一方、Textbox内部のinputが次のように自身へ割り当てられた領域を100%使用することは許容する。

```css
input {
  width: 100%;
}
```

この100%は画面全体に対する100%ではなく、**LayoutManagerからTextboxへ割り当てられた領域の100%**である。

### Radio・Button等の内部幅

Radio内部の選択肢を等幅にする等の処理はRadioComponent自身の内部レイアウト責務とする。

Buttonについても、LayoutManagerは`app-button`ホストへ割り当てる領域までを担当し、内部のネイティブ`button`を全面幅にするか内容幅にするかはButtonComponentのデザイン責務とする。

画面Componentから`w-full`等を注入して決定しない。

### AI実装ルール

AIが画面を実装する場合も次を遵守する。

- 通常は`appLayoutSpan`を省略して均等割りを使用する。
- 比率変更が必要な場合のみ`appLayoutSpan`を使用する。
- `appLayoutSpan`を使う場合は同一`LayoutItem`内の全兄弟へ明示し、合計100とする。
- `appLayoutSpan`をCSSの`width:%`へ単純変換しない。
- 画面Componentで`w-*`等のwidth系CSSを直接使って配置を調整しない。

## 承認済みIssue：余白の責務

> 状態：**設計承認済み**  
> 承認日：2026-10-16

### 基本原則

> **外側の余白は親が決める。内側の余白はComponent自身が決める。**

余白の責務を次のように分離する。

| 種類 | 担当 |
|---|---|
| 同一行の兄弟Component間の横方向の間隔 | `LayoutItem` の `gap` |
| 行と行の縦方向の間隔 | `ItemStackLayout` の `gap` |
| 画面全体の外周余白 | 上位の画面Container / Layout |
| 共通Component内部のpadding / gap | 各共通Component自身 |

### 同一行のComponent間隔

TextboxとDate等、同一`LayoutItem`内にある兄弟Component同士の間隔は`LayoutItem`が管理する。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
</app-layout-item>
```

Textboxへ`mr-*`、Dateへ`ml-*`等を指定して間隔を作らない。

### 行間

複数の`LayoutItem`を縦方向に積む場合の行間は`ItemStackLayout`が管理する。

```html
<app-item-stack-layout>
  <app-layout-item>
    ...
  </app-layout-item>
  <app-layout-item>
    ...
  </app-layout-item>
</app-item-stack-layout>
```

各行や各Componentへ`mt-*`、`mb-*`を個別指定して行間を調整しない。

### 画面全体の外周padding

画面端からコンテンツまでの外周余白は、画面の上位Container / Layoutの責務とする。

現時点ではこの責務のためだけに新しい`ScreenLayoutComponent`等を追加しない。必要性が具体化した時点で、既存構造で担保できるかを確認してから導入を判断する。

### 共通Component内部の余白

共通Component内部を成立させるためのpaddingやgapは、そのComponent自身が管理する。

例：

- Buttonの枠と文字の間のpadding
- Alert内部のアイコン・メッセージ・アクション間のgap
- Radio内部の選択肢間隔
- Toggleとラベル間の間隔
- input内部のpadding

これらは画面上の外部配置ではなく、Component自身の内部デザインである。

### marginの扱い

画面Componentから共通Componentへmarginを付けて配置を調整する方式は原則採用しない。

```html
<app-textbox class="mr-4" ... />
<app-button class="mt-6" ... />
```

上記のような実装は行わない。

標準的な画面構成は、`gap`と上位Containerのpaddingで表現する。

- 横方向の兄弟間隔 → `LayoutItem.gap`
- 縦方向の行間 → `ItemStackLayout.gap`
- 画面外周 → 上位Containerのpadding
- Component内部 → Component自身のpadding / gap

### gap変更APIの追加方針

現段階では、`gapSize`等の追加InputやEnumを新設しない。

まずは標準gapを共通値として使用する。実際の画面要件として複数のgapバリエーションが必要になった時点で、意味のある限定的APIの追加を検討する。

不要な抽象化やパラメータ増加を避け、初期設計は最小限とする。

### AI実装ルール

AIが画面を実装する場合も次を遵守する。

- 兄弟Component間の間隔を各Componentのmarginで調整しない。
- 行間を各Componentや各行の`mt-*` / `mb-*`で調整しない。
- 同一行の間隔は`LayoutItem`、行間は`ItemStackLayout`を使用する。
- Component内部のpadding / gapを画面側CSSから変更しない。
- 既存Layoutで表現できない余白要件が出た場合、独自CSS追加ではなく設計確認を行う。

## 承認済みIssue：レスポンシブ・折り返し

> 状態：**設計承認済み**  
> 承認日：2026-10-16

### 基本原則

> **画面ComponentはレスポンシブCSSを直接記述せず、LayoutManagerが画面幅に応じた配置変更を担当する。**

画面Componentは何をどの順番で配置するかという構造だけを記述し、ブレークポイント・折り返し・row/column切替等のCSS実装を直接持たない。

### 画面側でブレークポイントを直接指定しない

次のような画面実装は行わない。

```html
<div class="flex flex-col md:flex-row">
  ...
</div>
```

```html
<app-textbox class="w-full md:w-1/2" ... />
```

`sm:`、`md:`、`lg:`等のレスポンシブUtilityを画面HTMLに直接記述して配置を調整しない。

画面側は次のようにLayoutManagerを使用して構造を記述する。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
</app-layout-item>
```

### LayoutItemが折り返しを担当する

同一`LayoutItem`内のComponentを横並びで表示できる十分な横幅がある場合は横並びとする。

横幅が不足し、各Componentの操作性・視認性を維持できない場合は、`LayoutItem`が折り返して縦方向へ配置する。

```text
十分な幅：
Textbox | Date

幅不足：
Textbox
Date
```

画面Component自身は`flex-wrap`等を直接指定しない。

### LayoutSpanと折り返し

`appLayoutSpan`で指定した比率は、**横並びで表示できる場合の配置比率**として扱う。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="70" ... />
  <app-date [appLayoutSpan]="30" ... />
</app-layout-item>
```

十分な横幅がある場合は70:30で配置する。

横幅不足時には70:30を無理に維持せず、折り返した各Componentが利用可能な横幅を使用する。

### Component単位のレスポンシブInputは現段階で追加しない

現段階では次のようなInputを追加しない。

- `minWidth`
- `responsiveBreakpoint`
- `wrapBreakpoint`

まずはLayoutManager側の共通ルールで対応する。実際の画面要件として一般ルールでは対応できないケースが複数発生した場合のみ、意味のある限定的API追加を検討する。

不要な抽象化や設定項目を初期段階から増やさない。

### ItemStackLayoutの扱い

`ItemStackLayout`は行を縦方向に積み重ねる責務を持つため、通常はレスポンシブによる大きな方向変更を必要としない。

主なレスポンシブ・折り返し責務は`LayoutItem`が担う。

### AI実装ルール

AIが画面を実装する場合も次を遵守する。

- 画面HTMLに`sm:`、`md:`、`lg:`等のレスポンシブUtilityを直接追加しない。
- 画面側に`flex-wrap`や独自メディアクエリを追加しない。
- 横並び・折り返しは`LayoutItem`の責務として実装する。
- `appLayoutSpan`は横並び時の比率として扱い、狭い画面で比率維持を強制しない。
- 既存LayoutManagerで対応できないレスポンシブ要件が出た場合、画面固有CSSで回避せず設計確認を行う。

## 承認済みIssue：共通Componentの外部CSS排除

> 状態：**設計承認済み**  
> 承認日：2026-10-16

### 基本原則

> **画面側から共通Component内部へ任意CSSを注入しない。外側の配置はLayoutManager、内側の見た目は共通Component自身が管理する。**

共通Componentは画面側から見てブラックボックスとして扱う。画面Componentは、共通Component内部のDOM構造や内部class名を前提とした実装を行わない。

### 任意CSS注入Inputは原則廃止対象

以下のような任意CSS文字列を受け取るInputは、原則として段階的に廃止する。

- `classContainer`
- `classInput`
- `classLabel`
- `classSpan`
- `classButton`
- `classRadioItem`
- `classLabelSpan`
- `classMessageContainer`
- `classButtonContainer`
- `classAlertBox`
- `classMessage`
- `classMessageIcon`

実際のComponentに上記以外の同種APIが存在する場合も、同じ基準で扱う。

### 外部配置はLayoutManagerへ移す

次のような実装は採用しない。

```html
<app-textbox
  classContainer="m-4"
  classInput="w-full"
/>
```

`m-4`等の外部配置はLayoutManagerの責務とする。

Textbox内部のinputが割り当てられた領域を全面使用する必要がある場合は、画面から`w-full`を注入せず、TextboxComponent内部の標準仕様として実装する。

### Component内部CSSはComponent自身が管理する

Component内部を成立させるためのCSSは排除対象ではない。

例：

- Radio内部の選択肢を横並び・等幅にするためのflex / gap
- Alert内部のアイコン・メッセージ・アクションの配置
- Toggleとラベルの内部配置
- Textbox内部のinput幅・padding
- Button内部の文字・アイコン配置

判断基準はCSSプロパティ名ではなく、**Componentの外側の配置を調整するものか、Component内部を成立させるものか**とする。

### 見た目の差分は意味のある限定APIで表現する

画面ごとに見た目の差分が必要な場合でも、任意CSS文字列を渡さない。

必要に応じて、例えば次のような意味のある限定APIで表現する。

- `variant`
- `appearance`
- `size`
- `density`
- `level`
- `color`

ただし、将来必要になる可能性だけを理由にInputやEnumを先行追加しない。実際の画面要件として必要性が確認されたものだけを追加する。

### 移行方針

既存の任意CSS注入Inputを、設計承認直後に一括削除して既存画面を破壊することはしない。

実装フェーズでは利用箇所を確認しながら段階的に移行する。

1. 外部配置に使われているclass指定をLayoutManagerへ移す。
2. Component内部を成立させる標準CSSはComponent内部へ固定化する。
3. 本当に必要な見た目差分のみ意味のある限定APIへ置き換える。
4. 利用箇所がなくなった任意CSS注入Inputを削除する。
5. component-test / APIドキュメントの利用例を新方式へ更新する。

### AI実装ルール

AIが画面・共通Componentを実装する場合も次を遵守する。

- `classContainer`等の任意CSS注入APIを新規利用・新規追加しない。
- 画面側から共通Component内部DOMを前提としたclass指定を行わない。
- 外部配置はLayoutManagerを使用する。
- 内部レイアウト・内部デザインは共通Component自身に実装する。
- 見た目変更が必要な場合は既存の意味的APIを優先する。
- 必要なAPIが存在しない場合、勝手にCSS注入で回避せず設計確認を行う。

## 承認済みIssue：Mapperを作成しない

> 状態：**設計承認済み**  
> 承認日：2026-10-16

### 決定内容

UI Form DTOとApplication DTOの間の値変換、およびApplication ResponseからUI Form DTOへの反映のために、Mapperクラス・Mapperサービス・Mapperユーティリティ等の専用抽象を作成しない。

変換処理は画面Component内で明示的に行う。

```text
UI Form DTO（FormGroup）
      ↓ 画面Componentで値変換
Application DTO
```

逆方向も同様に、Application ResponseからFormGroupへの`patchValue`等は画面Componentで行う。

### AI実装ルール

AIは次の判断を独自に行ってはならない。

- 項目数が多いことを理由にMapperを作成する。
- 変換処理が長いことを理由にMapperを作成する。
- 重複があることを理由にMapperを作成する。
- DDDや一般的なベストプラクティスを理由にMapper層を新設する。
- `XxxMapper`、`XxxConverter`、`XxxAssembler`等、同等責務の別名称クラスへ置き換える。

Mapper相当の抽象を新設する必要があるとAIが判断した場合も、実装せず設計確認を求める。

### 優先関係

本承認は、本文中の過去の提案にある「重複や複雑化時にMapperを検討する」という記述を**上書きする正式方針**である。

フェーズ2の正式仕様化時には、旧提案のMapper検討記述を削除し、本方針へ統一する。

## 継続検討・照合事項

- UI Form DTOの`class + formGroup`方式を推奨案から正式方針へ確定するか。
- UIレベルValidationとDomain Validationの具体的な境界。
- 現行BRU1001のサーブ順・リターン側ロジックをDomainへ移す場合のDomainモデル/API。
- レスポンシブ実装時に「十分な幅」を判定する具体方式。
- 画面外周paddingの具体的な実装場所。
- 任意CSS注入Inputの現行利用箇所調査と削除順序。
- レイヤーと実際のディレクトリ構造・クラスとの対応。
- 過去の決定事項の網羅性および設計理由の完全な復元。

## 変更管理

フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。
<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_UI設計思想と責務.md -->

</details>

<details>
<summary>原典全文：phase2_phase3_再開用完全サマリ.md（歴史的記録）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase2_phase3_再開用完全サマリ.md -->
# フェーズ2・フェーズ3 再開用完全サマリ

> 記録日：2026-10-15  
> 目的：ChatGPTの会話履歴・メモリが失われても、この文書と正本設計書だけで議論を再開できるようにする。  
> 対象：テニスアプリ / Angular / ACG / `soracity/bruce` / `soracity/bruce-document`

## 0. 正本と参照順序

設計書の正本は `soracity/bruce-document` の `01_ai-document` 配下に置く。

1. `phase2_UI設計思想と責務.md`
2. `phase3_UIデザインシステム標準化_議論記録.md`
3. 本書 `phase2_phase3_再開用完全サマリ.md`

`bruce` はアプリケーションソース、`bruce-document` は設計書の正本として扱う。

本書は正本2ファイルの内容を置き換えるものではなく、**現在位置・決定事項・未決事項・再開順序を一か所で復元するための索引兼スナップショット**である。

---

# 1. フェーズ2：UI設計思想と責務

## 1.1 フェーズ2の目的

フェーズ2では、色・角丸・影等の具体的な見た目ではなく、**画面・Layout・共通Component・FormGroup/DTO・Application・Domain・Infrastructureの責務境界**を決める。

基本思想は「どこに何を書くか」を固定すること。

具体的なデザインシステム標準化はフェーズ3で扱う。

## 1.2 フェーズ2全体の作業ロードマップ

現在の整理は以下。

| 項目 | 内容 | 状態 |
|---|---|---|
| 2-1 | 画面・LayoutManager・共通Componentの責務境界 | **承認済み・正本保存済み** |
| 2-2 | 幅の責務（均等割り、LayoutSpan、w-full、Component内部幅） | **議論済み・未承認。次回ここから再開** |
| 2-3 | 余白の責務（gap / padding / margin） | 未決 |
| 2-4 | レスポンシブ・折り返し（wrap、スマホ幅、縦横切替） | 未決 |
| 2-5 | 共通Componentの外部CSS排除（classContainer等） | 基本方針は合意済み、詳細移行ルール未完 |
| 2-6 | Form / DTO / Validation責務 | 一部承認済み、一部継続 |
| 2-7 | UIとDomainの責務（テニス業務ロジック） | 未決 |
| 2-8 | AI / ACG実装ルール | 基本方針は合意済み |

この番号は議論の進行を分かりやすくするための整理であり、各項目は承認された時点で正本へ確定事項として反映する。

---

## 1.3 承認済み：UI Form DTOをComponentスコープDIで管理

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

## 1.4 承認済み：画面・LayoutManager・共通Componentの責務境界

承認日：2026-10-15。

### 責務

| 層 | 責務 |
|---|---|
| 画面Component | 何を表示するか、どの順番で置くか、データ・イベントを接続する |
| ItemStackLayout | 行を縦方向に積み重ね、行間gapを管理する |
| LayoutItem | 1行を構成し、子の横並び・gap・wrapを管理する |
| LayoutSpan | 必要時のみ子要素の幅比率を指定する |
| TableContainerLayout | テーブル固有の構造・列・横スクロール等を管理する |
| 共通Component | 自身の内部構造・操作性・見た目を管理する |
| styles.scss / design token | アプリ全体の色・文字・サイズ等のデザイン規則を管理する |

### 最重要原則

> **画面は「配置を記述」するが、「配置をCSSで実装」しない。**

許可する方向：

```html
<app-item-stack-layout>
  <app-layout-item>
    <app-textbox ... />
    <app-date ... />
  </app-layout-item>

  <app-layout-item>
    <app-button ... />
  </app-layout-item>
</app-item-stack-layout>
```

原則禁止：

```html
<div class="flex gap-4 mt-3 w-full">
  ...
</div>
```

```html
<app-textbox class="w-1/2" ... />
<app-textbox classContainer="m-4" ... />
```

画面固有CSSで共通Componentの外部配置や内部デザインを変えない。

### 外部レイアウト / 内部レイアウト

- **外部レイアウト**：Component自体の幅、余白、画面上の位置、隣接Componentとの間隔 → LayoutManager。
- **内部レイアウト**：alert内のアイコンとメッセージ、radio選択肢、toggleとラベル等 → 共通Component自身。

CSSプロパティ名だけで責務を判定しない。**Componentホストより外を調整するか、Component内部を成立させるか**で判断する。

---

## 1.5 任意CSS注入APIの方針

基本方針は合意済み。

`classContainer`、`classInput`、`classLabel`、`classSpan`、`classButton`、`classRadioItem`、`classLabelSpan`、alert内部用class input等の、**画面側から任意CSS文字列を注入するAPIは原則廃止する方向**。

理由：

- 画面側が共通Component内部DOMを意識することになる。
- Layout責務とComponent内部デザイン責務が混在する。
- AIが独自CSSを注入して画面ごとの一貫性を崩しやすい。

代替：

- Component内部の固定スタイル
- `variant`
- `appearance`
- `size`
- `density`
- `level`
- `color`

等、意味のある型付き・限定的なAPIを使う。

### 移行の方向性

過去調査での推奨順：

1. LayoutItemの幅・grow等の仕様決定
2. ItemStackLayoutのdirection/gap/wrap/alignment決定
3. textbox/date等の外側 `m-4` をLayout側へ移行
4. textbox/date等の `w-full` をホスト幅＋内部input標準幅へ整理
5. `classContainer` と専用外周divを削除
6. 未使用class input削除
7. その他任意class inputを段階削除
8. groupのARIA・内部DOM整理
9. radio/toggle内部DOM整理
10. component-test / APIドキュメントをLayoutManager利用例へ更新

---

## 1.6 AIによる画面実装ルール

基本方針は合意済み。

AIにUI実装を任せる場合でも、自由にTailwindレイアウトを生成させない。

優先して使用させるもの：

- LayoutItem
- ItemStackLayout
- LayoutSpan
- TableContainerLayout
- 既存共通Component

AIは以下を勝手に行わない。

- 画面固有の `<div class="flex ...">` / `<div class="grid ...">` で独自レイアウトを作る
- 共通Componentへ任意CSSを注入する
- 自動生成されたEnumその他生成コードを直接編集する
- 設計思想と異なる実装を確認なく採用する

狙いは、**AIを利用してもユーザー自身の設計思想と画面間の一貫性を維持すること**。

---

## 1.7 フェーズ2-2：幅の責務（2026-10-15時点の議論案・未承認）

> **重要：以下はまだユーザー承認前。次回、この内容の承認判断から再開する。**

### 基本案

幅を「割り当て幅」と「内部の消費幅」に分ける。

| 対象 | 責務案 |
|---|---|
| LayoutItem | 子Componentへどれだけの横幅を割り当てるか |
| LayoutSpan | LayoutItem内での幅比率 |
| Textbox / Date / Radio等 | 与えられた幅の中で自分自身をどう描画するか |
| 画面Component | 1:1、7:3等、意味のある配置指定のみ行う |

### 均等割り案

`appLayoutSpan` を指定しない兄弟Componentは均等割りとする案。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
</app-layout-item>
```

上記を 1:1 とする。

### 比率指定案

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="7" ... />
  <app-date [appLayoutSpan]="3" ... />
</app-layout-item>
```

上記を 7:3 とする。

### 混在禁止案

比率指定する行では兄弟Componentすべてに `appLayoutSpan` を明示する。

以下のような「指定あり・指定なし」の混在は禁止する案。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="7" ... />
  <app-date ... />
</app-layout-item>
```

理由：人間にもAIにも規則が明確で、挙動を予測しやすくするため。

### `w-full` の考え方

画面側から以下のように指定しない。

```html
<app-textbox classInput="w-full" ... />
```

一方、Textbox内部のinputが

```css
input {
  width: 100%;
}
```

となることは許容する案。

この `100%` は「画面全体の100%」ではなく、**LayoutManagerから割り当てられた領域の100%をComponent内部で消費する**という意味。

### Radio等の内部等幅

Radioの選択肢を `flex-1` で等幅化する処理等は、Radio自身を成立させる内部デザインなのでComponent側に残す。

LayoutItemが決める「Radio Component自体の割り当て幅」とは別責務。

### Button

LayoutItemが担当するのは `app-button` ホストへ割り当てる領域まで。

内部のネイティブ `<button>` が親幅いっぱいに広がるか、内容幅になるかはButtonComponentのデザイン責務とする案。

画面側から `w-full` を注入して決めない。

### フェーズ2-2の次回確認事項

次回はまず上記の幅責務案について、ユーザー承認を取る。

承認された場合：

- `phase2_UI設計思想と責務.md` に「承認済みIssue：幅の責務」として追記する。
- その後フェーズ2-3「余白・gap・padding・marginの責務」へ進む。

---

## 1.8 フェーズ2で残っている主要論点

### 余白

既存方針：

- 同一行のComponent間 → LayoutItemの `gap`
- 行と行の間 → ItemStackLayoutの `gap`
- 画面全体の外周 → 上位画面Containerの `padding`
- 各Textbox/Button/Date等へmarginを持たせて画面調整する方式にはしない

ただし細部はフェーズ2-3で正式決定する。

### レスポンシブ / wrap

- LayoutItemの `flex-wrap` の正式挙動
- スマホ幅での1行から複数行への切替
- row/column切替の責務
- LayoutSpanとwrapの組み合わせ

をフェーズ2-4で詰める。

### Form / DTO / Validation

継続論点：

- UI Form DTOの `class + formGroup` 方式を正式方針として確定するか
- UI Form DTOとApplication DTO間の変換を画面Componentに残す範囲
- Mapper導入基準
- UI入力ValidationとDomain Validationの具体的境界

### UI / Domain

現行BRU1001にある

- サーブ順
- ダブルスのリターン側
- 組合せルール

等のテニス意味依存ロジックをDomainへ移す場合のモデル/APIが未決。

### レイヤーとディレクトリ

論理レイヤーと実際のディレクトリ構造・クラスの対応を最終確認する。

---

# 2. フェーズ3：UIデザインシステム標準化

## 2.1 フェーズ3の位置づけ

フェーズ2で責務境界を固めた上で、色・角丸・影・padding・フォント等の**共通デザイン規則**を標準化するフェーズ。

フェーズ3は一部先行して議論済みだが、現在はフェーズ2を優先している。

既存正本：`phase3_UIデザインシステム標準化_議論記録.md`

## 2.2 進行状況

| 手順 | 内容 | 状態 |
|---|---|---|
| 1 | 共通Component棚卸し | 完了として議論 |
| 2 | 共通デザイン属性整理 | 方針合意 |
| 3 | `UiStyleUtil` API・型整理 | 方針合意 |
| 4 | `ComponentBase` 設計 | 方針合意 |
| 5 | Tableスタイル継承 | **未決。フェーズ3再開時の最初の論点** |
| 6 | 最終レビュー・実装承認 | 未実施 |

実装・テストは最終承認後。議論記録があることはソース実装済みを意味しない。

---

## 2.3 共通Component開発方針

ユーザー明示方針：

- AndroidとiPhoneの両方で見た目が崩れず、美しく表示されること。
- 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS描画差を考慮する。
- デザインはTailwind CSSとDaisyUIをベースとする。
- 個別CSSは必要性を検討してから追加する。

具体的なテスト端末、対応OS、例外CSS運用は未決。

---

## 2.4 共通デザイン属性（方針合意）

呼び出し側は `[uiStyle]="{...}"` の一括オブジェクトではなく、各属性を個別Inputで指定する。

例：

```html
<app-textbox [border]="true" [roundedSize]="8" />
```

| Input | 型 | 原則既定値 | 補足 |
|---|---|---|---|
| `border` | `boolean` | `true` | 枠線有無 |
| `borderWidth` | `UiBorderWidth` | `1` | px: 0, 0.5, 1, 2, 4 |
| `rounded` | `boolean` | `true` | 角丸有無 |
| `roundedSize` | `UiRoundedSize` | `8` | px: 0, 4, 8, 16, 24。FABは円形既定 |
| `shadow` | `boolean` | `false` | FABはtrue既定 |
| `shadowSize` | `UiShadowSize` | `'md'` | sm, md, lg。FABはlg既定 |
| `padding` | `UiPadding` | `8` | px: 0, 4, 8, 12, 16, 24, 32 |
| `backgroundColor` | `UiColor` | 部品別 | DaisyUI意味色 |
| `textColor` | `UiColor` | 部品別 | DaisyUI意味色 |
| `visible` | `boolean` | `true` | falseはhidden/display:none |
| `disabled` | — | 共通化しない | 入力系はFormControl、Button等は個別責務 |

`UiColor` 候補：

- primary
- secondary
- accent
- neutral
- base-100
- base-200
- base-300
- info
- success
- warning
- error

数値指定単位はpx。

---

## 2.5 UiStyleUtil（方針合意）

状態を持たない静的Utilityとする。

担当しないもの：

- レイアウト配置
- disabled制御

想定API：

```ts
getBorderClass(border: boolean, width: UiBorderWidth): string
getRoundedClass(rounded: boolean, size: UiRoundedSize): string
getShadowClass(shadow: boolean, size: UiShadowSize): string
getPaddingClass(padding: UiPadding): string
getBackgroundColorClass(color: UiColor): string
getTextColorClass(color: UiColor): string
getVisibleClass(visible: boolean): string
```

Tailwindのビルド時クラス検出を考慮し、許容値とクラス名を明示対応させる。

任意文字列連結で実行時にクラス名を組み立てる方式は避ける。

---

## 2.6 ComponentBase（方針合意）

`UiStyleComponentBase` と `FormControlComponentBase` を分けず、**1つのComponentBaseに統一**する方向。

- 共通デザインInput
- visible
- 任意のFormControl Input

を持つ。

FormControlを使わないButton等も同じ基底クラスを継承するが、controlは使用しない。

```ts
export abstract class ComponentBase {
  readonly control = input<FormControl>();

  protected getControl(): FormControl {
    const control = this.control();
    if (control === undefined) {
      throw new Error('FormControlが指定されていません');
    }
    return control;
  }

  // 共通デザインInput群
}
```

方針：

- 親画面から既存FormControlインスタンスを渡す。
- ダミー `new FormControl('')` は作らない。
- 入力系Componentは `getControl()` で未指定を明示エラーにする。
- 不要な `?.` / `!` に依存しない。
- FormControlのenable/disableはFormControlで管理。
- Button等のdisabledはComponent個別責務。

実装前に既存 `FormControlComponentBase`、Angular継承/Input、型、templateアクセス制約を検証する。

制約が見つかった場合、AIが勝手に設計変更せず説明して再協議する。

---

## 2.7 Tableスタイル継承（未決・フェーズ3再開点）

方向性：

`TableContainerLayout → TableRecord → TableCell` に既定スタイルを伝播させる。

TableRowは構造・sticky等を担う。

優先順位案：

> **Cell明示指定 > Record明示指定 > Table明示指定 > 共通既定値**

子が `undefined` なら親から継承。

子が明示的に `false` を指定した場合は `false` を優先。

Table固有属性は共通デザイン属性と区別する。

例：

- zebra
- recordGap
- sticky
- colSpan
- rowSpan

未解決：

基底ComponentBaseに既定値付きInputがあると、子で「未指定」と「既定値」を区別しにくい。

Table子クラスで `undefined` 許容Inputを再定義する案は出たが、Angular Input継承とTypeScript型互換性を未検証。

**実装方式は未決。**

フェーズ3を再開する場合はここから議論する。

---

## 2.8 Swipe / Layout

- SwipeDirectiveへの共通スタイル適用はアクションパネル部分を対象とする。
- ジェスチャー制御とは分離する。
- LayoutItem / ItemStackLayout / LayoutSpanは配置責務なので、原則 `UiStyleUtil` の管理対象外。

---

## 2.9 対象Component

2026-10-15時点：

- 通常UI：Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle
- Table：TableContainerLayout / TableRecord / TableRow / TableCell
- Swipe：SwipeDirective
- Layout：LayoutItem / ItemStackLayout / LayoutSpan

`ToggleButtonComponent` は旧式のため開発対象から除外。

`bruce` の `feature/feature-20261015` で `brf9020-shared-components/toggleButton/components/` の4ファイルを削除済み（commit `5b2800c`）。

`brf9014-shared-components` 側は削除対象外。

`component-base`、`component-test`、`apidoc` は通常UI部品一覧とは分けて扱う。

---

## 2.10 フォント・文字スタイルに関する調査・標準化候補

> この節は過去のソース調査・議論内容の保存。フェーズ3の最終承認事項と混同しない。

調査で確認した方向性：

- ルートフォントサイズは原則 `100%` を基準にする。
- 本文13px相当を使う場合は `0.8125rem` として扱う案。
- `styles.scss` で `--font-sans` 等のフォントトークンを管理する。
- タイトル、本文、ボタン、表、小文字等を役割別の文字サイズ・行間・太さトークンへ整理する。
- Tailwindの文字Utilityを `styles.scss` のトークンへ接続し、共通Componentで役割別Utilityを明示適用する方向が適している。
- `html` の継承設定だけでは、DaisyUIの `.table`、`.btn`、Tailwindの `text-xl` / `text-xs` 等の直接指定を統一できない。
- Header、Table、Button、Input等、直接指定を持つ要素は役割別トークンを明示する必要がある。
- Material Symbols等の専用アイコンフォントは本文フォント一括上書きの対象外にする。
- 文字標準化の際、既存DOM構造、Tableのrowspan/colspan、角丸、影、Swipe等、文字と無関係な挙動を不用意に変更しない。

過去調査ではTailwind CSS 4.1.18 / DaisyUI 5.5.13の構成を対象として確認した記録がある。

このフォント設計の最終値・正式採用はフェーズ3最終レビューで再確認する。

---

# 3. 2026-10-15 終了時点の現在位置

## 明日の最優先再開点

**フェーズ2-2「幅の責務」から再開する。**

最初に確認する内容：

1. `appLayoutSpan` 未指定兄弟を均等割りにするか
2. 比率指定行では兄弟すべてに `appLayoutSpan` を明示するか
3. span指定・未指定の混在を禁止するか
4. `w-full` を画面から注入せず、Layout割当領域とComponent内部100%を分離するか
5. Button/Radio等の「内部幅」とLayoutの「外部割当幅」の責務分離を採用するか

ユーザーが承認したら、フェーズ2正本へ承認済み事項として保存する。

次にフェーズ2-3「余白の責務」へ進む。

## フェーズ3は保留中

フェーズ3へ戻る際は、正本 `phase3_UIデザインシステム標準化_議論記録.md` を読み、**第5手順 Tableスタイル継承**から再開する。

---

# 4. 再開時の運用ルール

1. 会話メモリより設計書を優先する。
2. 新しいチャットでは、まず本書とフェーズ2・フェーズ3正本を読む。
3. 「承認済み」「方針合意」「提案」「未決」を混同しない。
4. ユーザーが承認した内容は、その場で正本設計書へ追記する。
5. 未承認の議論も、次回復元できるよう「未承認案」として保存する。
6. AIは設計思想を勝手に変更しない。
7. 自動生成コードを直接編集しない。
8. Phase3は最終レビュー・ユーザー承認前に実装へ進めない。
9. UI画面実装では既存LayoutManager・共通Componentを優先し、独自CSSレイアウトを増やさない。

---

# 5. 明日の再開用の一文

新しいチャットで次のように指示すれば再開できる。

> `bruce-document/01_ai-document/phase2_UI設計思想と責務.md`、`phase3_UIデザインシステム標準化_議論記録.md`、`phase2_phase3_再開用完全サマリ.md` を前提に、フェーズ2-2「幅の責務」の承認判断から再開してください。承認事項は随時設計書へ保存してください。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase2_phase3_再開用完全サマリ.md -->

</details>
