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



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> この節は旧サマリからの転記です。当時の「未承認」「再開地点」「提案」を現在の決定として扱わないでください。
<!-- HISTORICAL-SUMMARY-SECTIONS: 2.10 -->

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

> 旧サマリの「2026-10-15終了時点の現在位置」「再開時の運用ルール」「明日の再開用の一文」は共通スタイル仕様ではないため、[旧サマリ原典](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)の履歴に集約。現行の設計判断には用いない。


### 2026-10-20 追加承認：共通スタイル属性の基底クラス集約

- **設計状態：原則承認済み（3.1.1の全項目最終確定ではない）**。ユーザーはASIS（各Componentにスタイル指定が分散）からTOBE（共通スタイルプロパティの定義と処理を抽象化・一元管理）への変更を「OK」で承認。
- **TOBE**：角丸・シャドー・枠線・背景色等の汎用スタイルInputは共通の基底クラス `ComponentBase` に集約し、適用対象のComponentは継承して利用する。CSSクラスへの変換は `UiStyleUtil` に集約。Component固有の属性（例：TableContainerLayoutのレコード単位の `recordShadow`）は別責務として維持可能。
- **ASIS静的確認**：`soracity/bruce` の `feature/feature-20261015` で、Textboxは `FormControlComponentBase<T>` を継承（FormControlの値・状態変更時の変更検知を担当）。TableCellとTableContainerLayoutは基底クラス非継承。Textbox/ButtonのHTMLではDaisyUI/Tailwindクラスを直接指定し、TableContainerLayoutは独自 `recordShadow` InputとSCSSで描画。共通スタイル基底クラスによる一元管理は未実装。これは調査したファイルに基づく静的確認であり、全Componentの実装確認完了ではない。
- **実装・検証**：未実施。既存の `FormControlComponentBase` との単一継承上の関係、適用対象、各Inputの既定値・意味色、移行方法は後続の設計で明確化する。既存コードをこの承認だけで変更しない。


### 2026-10-20 追加承認：共通Inputの既定値とComponent別上書き

- **設計判断：承認済み**。共通スタイルInputの型・意味・制御方式は `ComponentBase` に統一する。一方、**既定値は各Componentの用途に応じて変更可能**とする。共通基底の既定値を全Componentに一律強制しない。
- 例：一般的な角丸サイズは8pxを基準としつつ、FABの円形やTableCellの角丸なし等、Component固有の既定表示を許容する。例示したComponent別具体値は個別仕様と照合して確定する。
- **実装上の検討事項（未決）**：Angular signal inputの継承下で、共通Inputの公開契約を維持しながらComponent別既定値を安全に実現する具体的方法。既存実装を変更せずPhase 5で検証する。
- **状態**：基本方針承認済み。全Inputの型・許容値・Component別既定値一覧・意味色の適用範囲は引き続き最終確認が必要。実装・動作検証は未実施。


### 2026-10-20 追加承認：背景色・文字色のEnum指定

- **設計判断：承認済み**。共通スタイルの `backgroundColor`・`textColor` は共通Enum型で受け取る。画面側から任意のCSSクラス文字列を直接渡さず、`UiStyleUtil` がEnum値をTailwind/DaisyUIの定義済みCSSクラスへ変換する。
- 色の選択肢はEnumで制限し、画面とスタイル実装の責務を分離する。意味色（primary、secondary、success、error等）を基本とする。
- **未決**：Enumの正式名称、定数一覧、背景色と文字色のEnum共用可否、各Componentの初期値、変換マッピングの詳細。既存定義と照合して確定する。
- **状態**：方式は設計承認済み。実装・検証は未着手。


### 2026-10-20 追加承認：TableCellと一般Componentの共通色Enum・変換処理共有

- **設計承認済み**：TableCellの背景色・文字色と一般Componentの背景色・文字色は共通色Enumを使用し、共通`UiStyleUtil`でEnumから事前定義済みTailwind/DaisyUI CSSクラスへ変換する。画面から任意CSSクラス文字列を受け取らない。
- セル固有の状態色・意味表現が必要な場合に限り、TableCell専用Enumを別途設けることを許容する。
- 以前承認されたTableCellの`cellClasses`廃止は維持する。
- **未決**：Enumの正式名・定数一覧・マッピング・適用優先順位、セル固有Enumが実際に必要か。**実装・検証は未着手**。


### 2026-10-20 ACG用列挙型設計書ドラフト作成

- [AppUiColorEnum：共通UI意味色](../06_列挙型設計書/02_COMPONENT/06_列挙型設計書(AppUiColorEnum：共通UI意味色).md) を既存の列挙型設計書形式で作成。
- 共通色Enumを一般ComponentとTableCellで共用する**方式は承認済み**。Enum物理名・11定数と値は**提案・未承認**。ACG生成と実装は未実施。

## 3.1.2 Android・iPhone共通表示品質の検査観点を確定

- **作業**：未着手／**設計**：方針合意／**実装**：未着手／**検証**：未検証
- **対象と背景**：個別のデザインInputと意味色・複数OSで一貫するデザイン規則を検討中。最終承認は未了。
- **この小区分で扱う具体事項**：Android・iPhone共通表示品質の検査観点を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：端末条件・セーフエリア・タップ領域を整理。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=方針合意、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：端末条件・セーフエリア・タップ領域を整理
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 過去の議論の記録です。「未承認」「次回の議題」の記載は当時のもので、現在の承認・進捗には優先しません。
<!-- HISTORICAL-SUMMARY-SECTIONS: 2.3 -->

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
