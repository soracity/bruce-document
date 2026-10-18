# Phase 3.6 Phase 3最終承認

> **工程表の中区分：3.6 Phase 3最終承認**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

Phase3のTable継承など未決の仕様を完了し、全体レビュー・最終承認してから実装する。

## 3.6.1 共通Componentデザイン案を全体レビュー・承認

- **作業**：未着手／**設計**：未着手／**実装**：未着手／**検証**：未検証
- **具体的な対象**：共通Componentデザイン案を全体レビュー・承認。Phase3のTable継承など未決の仕様を完了し、全体レビュー・最終承認してから実装する。
- **必要な確認・判断**：3.1〜3.5の未決を終了しユーザー最終承認。未確定の方式は既存ソースや原典を確認してから比較・承認する。
- **成果・完了条件**：既存規則・対象Component・利用側の影響と検証方法を記録する。未着手の工程であり、実装済み・承認済みとは扱わない。
- **状態**：作業=未着手、設計=未着手、実装=未着手、検証=未検証。
- **次の作業**：3.1〜3.5の未決を終了しユーザー最終承認
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 1. 進行状況

| 手順 | 内容 | 状態 |
|---|---|---|
| 1 | 共通コンポーネント棚卸し | 完了として議論 |
| 2 | 共通デザイン属性の整理 | 方針合意 |
| 3 | `UiStyleUtil` API・型の整理 | 方針合意 |
| 4 | `ComponentBase` の設計 | 方針合意 |
| 5 | Tableスタイル継承 | **未決・次の論点** |
| 6 | 最終レビュー・実装承認 | 未実施 |

※実装・テストは最終承認後。現在のソースがこの仕様を実装済みであることを意味しない。



### 旧Phase 3の補足・変更履歴（原典転記）

> [旧Phase 3議事録](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)の調査・運用履歴。2026-10-15時点の情報であり、現行実装の保証や最終設計承認とは区別する。

#### 8. 継続時のルール

1. まず**第5手順のTable継承設計**から再開する。
2. 過去に合意した内容と、未決の内容を混同しない。
3. 最終レビューとユーザー承認の前に、ソースを変更しない。
4. 決定事項・設計理由・禁止事項・未決事項をこの文書に追記する。
5. 本書は「議論の保存版」であり、フェーズ3の完成・実装完了を示さない。



## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。


---

## 旧議事録原文の完全性保証（機械照合用）

> 2026-10-15時点の過去の議論です。方針合意・未決と最終承認を区別し、最新の工程別記録が優先します。

<details>
<summary>原典全文：phase3_UIデザインシステム標準化_議論記録.md（履歴）</summary>

<!-- MIGRATION-SOURCE-BEGIN 01_ai-document/議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md -->
# フェーズ3：UIデザインシステム標準化 — 議論記録

> **状態：議論途中の保存版（未実装・未最終承認）**  
> 記録日：2026-10-15  
> 対象：`soracity/bruce` / `brf9020-shared-components`  
> この文書は議論の継続性を確保するための記録。実装指示ではない。

## 共通コンポーネントの開発方針（追加決定：2026-10-15）

- **AndroidとiPhoneの両方で、見た目が崩れず美しく表示されること。** 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS間の描画差を考慮し、両プラットフォームで表示確認する。
- **デザインはTailwind CSSとDaisyUIをベースとすること。** 共通部品のスタイルは原則として両者のユーティリティ・コンポーネント・テーマを活用し、個別CSSの追加は必要性を検討してから行う。

※上記2項目はユーザーが明示的に追加した開発方針。具体的なテスト端末・対応OSバージョン・例外的なCSSの運用は今後決める。

## 1. 進行状況

| 手順 | 内容 | 状態 |
|---|---|---|
| 1 | 共通コンポーネント棚卸し | 完了として議論 |
| 2 | 共通デザイン属性の整理 | 方針合意 |
| 3 | `UiStyleUtil` API・型の整理 | 方針合意 |
| 4 | `ComponentBase` の設計 | 方針合意 |
| 5 | Tableスタイル継承 | **未決・次の論点** |
| 6 | 最終レビュー・実装承認 | 未実施 |

※実装・テストは最終承認後。現在のソースがこの仕様を実装済みであることを意味しない。

## 2. 共通デザイン属性

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

## 3. UiStyleUtil

**状態を持たない静的ユーティリティ**とする。レイアウト配置やdisabled制御は担当しない。

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

Tailwindのビルド時クラス検出を考慮し、許容値とクラス名を**明示的に対応付ける**。実行時に任意文字列を連結してクラス名を組み立てる方式は避ける。

## 4. ComponentBase：親クラスは1つに統一

`UiStyleComponentBase` と `FormControlComponentBase` を分けず、**共通デザインInput・visible・任意のFormControl Inputを1つの `ComponentBase` に持たせる**方針。

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

  // 共通デザインInput群はここに定義する
}
```

- 親画面から既存の `FormControl` インスタンスを渡す。例：`<app-textbox [control]="dto.formGroup.controls.playerName" />`
- `input(new FormControl(''))` のようなダミーインスタンスは**作らない**。
- `getControl()` は入力系コンポーネントで利用し、未指定時には明示的にエラーとする。
- 不必要な `?.` や `!` に依存しない書き方を優先する。
- FormControlの有効・無効はFormControlで管理し、Button等のdisabledは部品個別に扱う。

**実装前検証**：既存 `FormControlComponentBase` の処理との整合、Angularの継承・型・テンプレートからのprotectedメソッド参照を確認する。設計を勝手に変更せず、制約があれば説明して再協議する。

## 5. Tableスタイル継承（未決）

議論済みの方向性：

- スタイルの既定値を `TableContainerLayout → TableRecord → TableCell` に伝播させる。TableRowは構造・sticky等を担う。
- 優先順位：**Cellの明示指定 > Recordの明示指定 > Tableの明示指定 > 共通既定値**。
- 子が**未指定（undefined）**なら親から継承し、子が明示的に `false` を指定した場合は `false` を優先する。
- `zebra`、`recordGap`、`sticky`、`colSpan`、`rowSpan` 等のTable固有属性は共通デザイン属性と区別する。

**未解決の技術論点**：基底 `ComponentBase` が既定値を持つInputを定義した場合、子で「未指定」と「既定値」を区別しにくい。Table子クラスでInputを `undefined` 許容に再定義する案は出たが、AngularのInput継承・TypeScriptの型互換性を未検証。**まだ実装方式を決定していない**。

## 6. SwipeとLayoutの扱い

- `SwipeDirective` の共通スタイル適用は**アクションパネル部分**を対象とし、ジェスチャー制御とは分離する。
- `LayoutItem`、`ItemStackLayout`、`LayoutSpan` は配置責務のため、原則 `UiStyleUtil` の管理対象外。

## 7. 対象コンポーネントと現行整理

**2026-10-15決定**：`ToggleButtonComponent` は古いため開発対象から除外。`bruce` の `feature/feature-20261015` ブランチで `brf9020-shared-components/toggleButton/components/` の4ファイルを削除（commit `5b2800c`）。別の `brf9014-shared-components` 配下は削除対象外。

- 通常UI：Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle（ToggleButtonは旧式のため除外）。
- Table：TableContainerLayout / TableRecord / TableRow / TableCell。
- Swipe：SwipeDirective。
- Layout：LayoutItem / ItemStackLayout / LayoutSpan。
- `component-base`、`component-test`、`apidoc` は通常のUI部品一覧とは分けて扱う。

対象数の分類や属性適用範囲は、最新ソースと照合して最終確定する。

## 8. 継続時のルール

1. まず**第5手順のTable継承設計**から再開する。
2. 過去に合意した内容と、未決の内容を混同しない。
3. 最終レビューとユーザー承認の前に、ソースを変更しない。
4. 決定事項・設計理由・禁止事項・未決事項をこの文書に追記する。
5. 本書は「議論の保存版」であり、フェーズ3の完成・実装完了を示さない。

<!-- MIGRATION-SOURCE-END 01_ai-document/議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md -->

</details>
