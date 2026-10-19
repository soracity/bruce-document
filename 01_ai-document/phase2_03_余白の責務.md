# Phase 2.3 余白の責務

> **工程表の中区分：2.3 余白の責務**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

LayoutItemは同一行gap、ItemStackLayoutは行間、共通Componentは内部paddingを担当。外周paddingの具体的な配置先は未決。

## 2.3.1 横gap・縦gap・内部paddingの責務を決定

- **作業**：完了／**設計**：承認済／**実装**：一部実装／**検証**：静的確認済
- **対象と背景**：LayoutItemの横gap、ItemStackLayoutの縦gap、共通Componentの内部paddingを分離する。画面外周paddingの管理位置は未決。
- **この小区分で扱う具体事項**：横gap・縦gap・内部paddingの責務を決定。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：実装反映・検証はPhase 5で実施。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=一部実装、検証=静的確認済。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：実装反映・検証はPhase 5で実施
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### 承認済みIssue：余白の責務

> 状態：**設計承認済み**  
> 承認日：2026-10-16

##### 基本原則

> **外側の余白は親が決める。内側の余白はComponent自身が決める。**

余白の責務を次のように分離する。

| 種類 | 担当 |
|---|---|
| 同一行の兄弟Component間の横方向の間隔 | `LayoutItem` の `gap` |
| 行と行の縦方向の間隔 | `ItemStackLayout` の `gap` |
| 画面全体の外周余白 | 上位の画面Container / Layout |
| 共通Component内部のpadding / gap | 各共通Component自身 |

##### 同一行のComponent間隔

TextboxとDate等、同一`LayoutItem`内にある兄弟Component同士の間隔は`LayoutItem`が管理する。

```html
<app-layout-item>
  <app-textbox ... />
  <app-date ... />
</app-layout-item>
```

Textboxへ`mr-*`、Dateへ`ml-*`等を指定して間隔を作らない。

##### 行間

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

##### 画面全体の外周padding

画面端からコンテンツまでの外周余白は、画面の上位Container / Layoutの責務とする。

現時点ではこの責務のためだけに新しい`ScreenLayoutComponent`等を追加しない。必要性が具体化した時点で、既存構造で担保できるかを確認してから導入を判断する。

##### 共通Component内部の余白

共通Component内部を成立させるためのpaddingやgapは、そのComponent自身が管理する。

例：

- Buttonの枠と文字の間のpadding
- Alert内部のアイコン・メッセージ・アクション間のgap
- Radio内部の選択肢間隔
- Toggleとラベル間の間隔
- input内部のpadding

これらは画面上の外部配置ではなく、Component自身の内部デザインである。

##### marginの扱い

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

##### gap変更APIの追加方針

現段階では、`gapSize`等の追加InputやEnumを新設しない。

まずは標準gapを共通値として使用する。実際の画面要件として複数のgapバリエーションが必要になった時点で、意味のある限定的APIの追加を検討する。

不要な抽象化やパラメータ増加を避け、初期設計は最小限とする。

##### AI実装ルール

AIが画面を実装する場合も次を遵守する。

- 兄弟Component間の間隔を各Componentのmarginで調整しない。
- 行間を各Componentや各行の`mt-*` / `mb-*`で調整しない。
- 同一行の間隔は`LayoutItem`、行間は`ItemStackLayout`を使用する。
- Component内部のpadding / gapを画面側CSSから変更しない。
- 既存Layoutで表現できない余白要件が出た場合、独自CSS追加ではなく設計確認を行う。



## 2.3.2 画面外周paddingの具体的な管理位置を確定

- **作業**：完了（管理位置の基本設計）／**設計**：承認済／**実装**：未着手／**検証**：未検証
- **対象と背景**：LayoutItemの横gap、ItemStackLayoutの縦gap、共通Componentの内部paddingを分離する。画面外周paddingの管理位置は未決。
- **この小区分で扱う具体事項**：画面外周paddingの具体的な管理位置を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：既存上位Containerで扱えるか確認する。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=検討中、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：既存上位Containerで扱えるか確認する
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 2026-10-19：画面外周paddingは上位Containerが管理（方式A・承認済み）

- **承認根拠**：比較案の「1. A：上位Containerで管理（推奨）」にユーザーが「1」と回答。
- **決定**：画面の上下左右の外周paddingは画面の上位Containerが管理する。LayoutItemは横gap、ItemStackLayoutは縦gap、各共通Componentは内部paddingの責務を維持し、LayoutManagerが画面外周paddingを重ねて持つ方式Bは採用しない。
- **境界**：説明で使用した`app-screen-container`は仮称であり、新規コンポーネントの採用やpaddingの数値（例：16px）を承認したものではない。既存の上位Containerを利用可能かPhase 5で確認し、必要なら具体案を設計・承認する。
- **状態**：2.3.2は管理位置の基本設計完了。実装未着手・検証未実施。次は2.4.2の幅不足時の折り返し仕様。

## 2.3.3 gap追加Inputの必要性を判断

- **作業**：完了／**設計**：承認済／**実装**：対象外／**検証**：対象外
- **対象と背景**：LayoutItemの横gap、ItemStackLayoutの縦gap、共通Componentの内部paddingを分離する。画面外周paddingの管理位置は未決。
- **この小区分で扱う具体事項**：gap追加Inputの必要性を判断。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：現段階は追加しない。要件発生時だけ再検討。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=対象外、検証=対象外。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：現段階は追加しない。要件発生時だけ再検討
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)


## 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
