# フェーズ3：UIデザインシステム標準化 — 議論記録

> **状態：議論途中の保存版（未実装・未最終承認）**  
> 記録日：2026-10-15  
> 対象：`soracity/bruce` / `brf9020-shared-components`  
> この文書は議論の継続性を確保するための記録。実装指示ではない。

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

- 通常UI：Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle / ToggleButton。
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
