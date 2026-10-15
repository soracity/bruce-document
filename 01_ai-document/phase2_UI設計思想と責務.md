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

## 継続検討・照合事項

- UI Form DTOの`class + formGroup`方式を推奨案から正式方針へ確定するか。
- UI Form DTOとApplication DTO間の変換を画面Componentに残す範囲と、Mapperを導入する基準。
- UIレベルValidationとDomain Validationの具体的な境界。
- 現行BRU1001のサーブ順・リターン側ロジックをDomainへ移す場合のDomainモデル/API。
- `LayoutItem`の折り返し・レスポンシブ挙動の正式仕様。
- 画面外周paddingの具体的な実装場所。
- レイヤーと実際のディレクトリ構造・クラスとの対応。
- 過去の決定事項の網羅性および設計理由の完全な復元。

## 変更管理

フェーズ2は設計検討中。上記のうち「提案」と明記した項目は議論対象であり、アプリケーションソースへの実装はユーザー確認後に行う。