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



## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
