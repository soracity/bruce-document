# Phase 2.1 責務境界

> **工程表の中区分：2.1 責務境界**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

画面は表示と操作、Layoutは配置、共通Componentは内部表示と入力を担当する。画面独自CSSによるレイアウトを避ける責務分離が承認済み。

## 2.1.1 画面・Layout・共通Componentの責務を決定

- **作業**：完了／**設計**：承認済／**実装**：一部実装／**検証**：静的確認済
- **具体的な規則・調査事実**：画面Componentは表示・操作受付・画面状態・Application呼び出し、LayoutManagerはComponentの外側の配置、共通Componentは内部表示とFormControl連携を担当する。テニス固有の判断はDomain側を原則とする。
- **具体例・根拠**：例：TextboxとDateを横並びにするのはLayoutItem、Textbox内部のinput・paddingはTextbox、保存操作や画面表示の制御は画面Componentの責務。
- **未完了事項・引継ぎ**：サーブ順やリターン側等の既存BRU1001の業務ロジックをどこに置くかは2.7で個別判断する。責務原則承認とコード全面移行は区別する。
- **次の作業**：画面の独自CSS逸脱はPhase 5で確認
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 2026-10-16承認済み原典の詳細

> [原典](議事録バックアップ/phase2_UI設計思想と責務.md)から復元。ここに記載した設計承認と実装完了は別である。

#### 承認済みIssue：画面・LayoutManager・共通Componentの責務境界

> 状態：**設計承認済み**  
> 承認日：2026-10-15

##### 決定内容

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

##### 任意CSS注入に関する方針

`classContainer`、`classInput`、`classLabel`、`classSpan`等、画面側から共通Component内部へ任意CSSを注入するAPIは原則廃止する方向とする。

- コンポーネントの外側配置はLayoutManagerが担当する。
- コンポーネント内部の配置・見た目は共通Component自身が担当する。
- 見た目の差分が必要な場合は、任意CSS文字列ではなく`variant`、`appearance`、`size`等の意味を持つ限定的なAPIを使用する。

##### AIによる画面実装への適用

AIに画面実装を依頼する場合も、自由なCSSレイアウトを生成させず、既存のLayoutManagerと共通Componentを使用させる。

これにより、AI生成コードでも画面間の一貫性と設計思想を維持する。


## 2.1.2 画面が配置をCSSで直接実装しない制約を決定

- **作業**：完了／**設計**：承認済／**実装**：一部実装／**検証**：静的確認済
- **具体的な規則・調査事実**：画面が独自のflex/gridやwidth系CSSで外部配置を設計せず、LayoutItem・ItemStackLayout・TableContainerLayoutと共通Componentの組合せを使用する。
- **具体例・根拠**：AIに画面を生成させる際も、共通Component内部のclass指定や画面独自CSSで設計を迂回しない。足りない機能をAIが独断で実装しない。
- **未完了事項・引継ぎ**：既存画面のCSS逸脱箇所を2.5で棚卸し、実装修正をPhase 5、AI向け禁止事項・レビューをPhase 6で具体化する。
- **次の作業**：既存画面との照合とAIルール化はPhase 5・6
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 2026-10-16承認済み原典の詳細

> [原典](議事録バックアップ/phase2_UI設計思想と責務.md)から復元。ここに記載した設計承認と実装完了は別である。

#### 承認済みIssue：画面・LayoutManager・共通Componentの責務境界

> 状態：**設計承認済み**  
> 承認日：2026-10-15

##### 決定内容

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

##### 任意CSS注入に関する方針

`classContainer`、`classInput`、`classLabel`、`classSpan`等、画面側から共通Component内部へ任意CSSを注入するAPIは原則廃止する方向とする。

- コンポーネントの外側配置はLayoutManagerが担当する。
- コンポーネント内部の配置・見た目は共通Component自身が担当する。
- 見た目の差分が必要な場合は、任意CSS文字列ではなく`variant`、`appearance`、`size`等の意味を持つ限定的なAPIを使用する。

##### AIによる画面実装への適用

AIに画面実装を依頼する場合も、自由なCSSレイアウトを生成させず、既存のLayoutManagerと共通Componentを使用させる。

これにより、AI生成コードでも画面間の一貫性と設計思想を維持する。


## 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
