# Phase 3.1 共通スタイル

> **工程表の中区分：3.1 共通スタイル**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

各デザイン属性を独立Inputにする方向で合意。Android・iPhoneで崩れない表示、Tailwind CSS・DaisyUIを基盤とする方針。最終承認前。

## 3.1.1 個別デザインInputと意味色の仕様を最終確定

- **作業**：未着手／**設計**：方針合意／**実装**：未着手／**検証**：未検証
- **対象と背景**：個別のデザインInputと意味色・複数OSで一貫するデザイン規則を検討中。最終承認は未了。
- **この小区分で扱う具体事項**：個別デザインInputと意味色の仕様を最終確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：既定値・適用対象を最終レビュー。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=方針合意、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：既定値・適用対象を最終レビュー
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 2. 共通デザイン属性

呼び出し側はオブジェクトをまとめて渡す `[uiStyle]="{...}"` ではなく、**各属性を個別Inputで指定**する。

例：

```html
<app-textbox [border]="true" [roundedSize]="8" />
```

| Input | 型 | 原則既定値 | 補足 |
|---|---|---|---|
| `border` | `boolean` | `true` | 枠線の有無 |
| `borderWidth` | `UiBorderWidth` | `1` | px: 0, 0.5, 1, 2, 4 |
| `rounded` | `boolean` | `true` | 角丸の有無 |
| `roundedSize` | `UiRoundedSize` | `8` | px: 0, 4, 8, 16, 24。FABは円形を既定とする |
| `shadow` | `boolean` | `false` | FABは `true` を既定とする |
| `shadowSize` | `UiShadowSize` | `'md'` | sm, md, lg。FABはlg既定 |
| `padding` | `UiPadding` | `8` | px: 0, 4, 8, 12, 16, 24, 32 |
| `backgroundColor` | `UiColor` | 部品別 | DaisyUIの意味色 |
| `textColor` | `UiColor` | 部品別 | DaisyUIの意味色 |
| `visible` | `boolean` | `true` | `false` は `hidden`（display:none） |
| `disabled` | — | **共通化しない** | 入力系はFormControl、ボタン等は個別の責務 |

`UiColor` 候補：`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-300`, `info`, `success`, `warning`, `error`。

数値指定の単位はpx。



### 旧Phase 3の補足・変更履歴（原典転記）

> [旧Phase 3議事録](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)の調査・運用履歴。2026-10-15時点の情報であり、現行実装の保証や最終設計承認とは区別する。

### フェーズ3：UIデザインシステム標準化 — 議論記録

> **状態：議論途中の保存版（未実装・未最終承認）**  
> 記録日：2026-10-15  
> 対象：`soracity/bruce` / `brf9020-shared-components`  
> この文書は議論の継続性を確保するための記録。実装指示ではない。

#### 共通コンポーネントの開発方針（追加決定：2026-10-15）

- **AndroidとiPhoneの両方で、見た目が崩れず美しく表示されること。** 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS間の描画差を考慮し、両プラットフォームで表示確認する。
- **デザインはTailwind CSSとDaisyUIをベースとすること。** 共通部品のスタイルは原則として両者のユーティリティ・コンポーネント・テーマを活用し、個別CSSの追加は必要性を検討してから行う。

※上記2項目はユーザーが明示的に追加した開発方針。具体的なテスト端末・対応OSバージョン・例外的なCSSの運用は今後決める。



#### 7. 対象コンポーネントと現行整理

**2026-10-15決定**：`ToggleButtonComponent` は古いため開発対象から除外。`bruce` の `feature/feature-20261015` ブランチで `brf9020-shared-components/toggleButton/components/` の4ファイルを削除（commit `5b2800c`）。別の `brf9014-shared-components` 配下は削除対象外。

- 通常UI：Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle（ToggleButtonは旧式のため除外）。
- Table：TableContainerLayout / TableRecord / TableRow / TableCell。
- Swipe：SwipeDirective。
- Layout：LayoutItem / ItemStackLayout / LayoutSpan。
- `component-base`、`component-test`、`apidoc` は通常のUI部品一覧とは分けて扱う。

対象数の分類や属性適用範囲は、最新ソースと照合して最終確定する。



### 旧再開サマリの検討詳細とスナップショット（2026-10-15）

> [旧再開サマリ](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)の内容。当時の未決・提案・再開指示を履歴として収録。後日にユーザーが承認した事項は最新記録を優先する。

#### 2.4 共通デザイン属性（方針合意）

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



#### 2.9 対象Component

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



#### 2.10 フォント・文字スタイルに関する調査・標準化候補

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

#### 明日の最優先再開点

**フェーズ2-2「幅の責務」から再開する。**

最初に確認する内容：

1. `appLayoutSpan` 未指定兄弟を均等割りにするか
2. 比率指定行では兄弟すべてに `appLayoutSpan` を明示するか
3. span指定・未指定の混在を禁止するか
4. `w-full` を画面から注入せず、Layout割当領域とComponent内部100%を分離するか
5. Button/Radio等の「内部幅」とLayoutの「外部割当幅」の責務分離を採用するか

ユーザーが承認したら、フェーズ2正本へ承認済み事項として保存する。

次にフェーズ2-3「余白の責務」へ進む。

#### フェーズ3は保留中

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


### 旧サマリ2.10：フォント・文字スタイル調査（未承認候補）

> [2026-10-15旧再開サマリ](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)の詳細。**正式に承認したデザイン規則ではない**。

#### 2.10 フォント・文字スタイルに関する調査・標準化候補

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


## 3.1.2 Android・iPhone共通表示品質の検査観点を確定

- **作業**：未着手／**設計**：方針合意／**実装**：未着手／**検証**：未検証
- **対象と背景**：個別のデザインInputと意味色・複数OSで一貫するデザイン規則を検討中。最終承認は未了。
- **この小区分で扱う具体事項**：Android・iPhone共通表示品質の検査観点を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：端末条件・セーフエリア・タップ領域を整理。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=方針合意、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：端末条件・セーフエリア・タップ領域を整理
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 2. 共通デザイン属性

呼び出し側はオブジェクトをまとめて渡す `[uiStyle]="{...}"` ではなく、**各属性を個別Inputで指定**する。

例：

```html
<app-textbox [border]="true" [roundedSize]="8" />
```

| Input | 型 | 原則既定値 | 補足 |
|---|---|---|---|
| `border` | `boolean` | `true` | 枠線の有無 |
| `borderWidth` | `UiBorderWidth` | `1` | px: 0, 0.5, 1, 2, 4 |
| `rounded` | `boolean` | `true` | 角丸の有無 |
| `roundedSize` | `UiRoundedSize` | `8` | px: 0, 4, 8, 16, 24。FABは円形を既定とする |
| `shadow` | `boolean` | `false` | FABは `true` を既定とする |
| `shadowSize` | `UiShadowSize` | `'md'` | sm, md, lg。FABはlg既定 |
| `padding` | `UiPadding` | `8` | px: 0, 4, 8, 12, 16, 24, 32 |
| `backgroundColor` | `UiColor` | 部品別 | DaisyUIの意味色 |
| `textColor` | `UiColor` | 部品別 | DaisyUIの意味色 |
| `visible` | `boolean` | `true` | `false` は `hidden`（display:none） |
| `disabled` | — | **共通化しない** | 入力系はFormControl、ボタン等は個別の責務 |

`UiColor` 候補：`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-300`, `info`, `success`, `warning`, `error`。

数値指定の単位はpx。



### 旧再開サマリの検討詳細とスナップショット（2026-10-15）

> [旧再開サマリ](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)の内容。当時の未決・提案・再開指示を履歴として収録。後日にユーザーが承認した事項は最新記録を優先する。

#### 2.3 共通Component開発方針

ユーザー明示方針：

- AndroidとiPhoneの両方で見た目が崩れず、美しく表示されること。
- 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS描画差を考慮する。
- デザインはTailwind CSSとDaisyUIをベースとする。
- 個別CSSは必要性を検討してから追加する。

具体的なテスト端末、対応OS、例外CSS運用は未決。

---



## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
