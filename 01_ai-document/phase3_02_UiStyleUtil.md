# Phase 3.2 UiStyleUtil

> **工程表の中区分：3.2 UiStyleUtil**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

UiStyleUtilを状態を持たない共通スタイル変換処理とする方向で合意。Tailwindの静的クラスの扱いは実装前確認。

## 3.2.1 静的ユーティリティAPIと静的CSSクラス対応を確定

- **作業**：未着手／**設計**：方針合意／**実装**：未着手／**検証**：未検証
- **対象と背景**：UiStyleUtilは状態を持たない共通スタイル変換処理とし、Tailwindの静的クラス抽出と整合させる方向で合意。
- **この小区分で扱う具体事項**：静的ユーティリティAPIと静的CSSクラス対応を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：Tailwindのビルド時検出と型制約を検証。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=方針合意、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：Tailwindのビルド時検出と型制約を検証
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 3. UiStyleUtil

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


### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 過去の議論の記録です。「未承認」「次回の議題」の記載は当時のもので、現在の承認・進捗には優先しません。
<!-- HISTORICAL-SUMMARY-SECTIONS: 2.5 -->

#### 2.5 UiStyleUtil（方針合意）

状態を持たない静的Utilityとする。

担当しないもの：

- レイアウト配置
- disabled制御

想定API：


Tailwindのビルド時クラス検出を考慮し、許容値とクラス名を明示対応させる。

任意文字列連結で実行時にクラス名を組み立てる方式は避ける。

---

## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。

### 2026-10-20 追加承認：UiStyleUtilの責務分離と変換方式
- `UiStyleUtil`は状態を持たない静的ユーティリティとして、Enumや規定の数値から事前定義された固定CSSクラスへ変換する。CSSクラス名の動的連結は禁止する。
- 画面はEnum・数値を指定し、`ComponentBase`は共通Input・既定値を管理し、各Componentは固有の表示ルールと適用優先順位を管理する。
- 一般背景色の例：`UiStyleUtil.backgroundColor(AppUiColorEnum.ERROR)` → `bg-error`。
- TableCell状態色の例：`UiStyleUtil.tableCellStatusColor(AppUiColorEnum.ERROR)` → `bg-error/20`。状態色の透明度20%を維持する。API名・具体的実装コードは説明例であり、実装時に整合性を確認する。
- TailwindのCSS生成を確実にする固定クラスの検出・生成方法は実装時に検証する。
- 状態：設計承認済み。実装・検証は未実施。
