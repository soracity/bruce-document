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
