# 共通スタイル・UiStyleUtil設計（暫定・全件監査前）

> 承認済み事項の抽出。実装・検証は未完了。根拠：[3.1](../01_ai-document/phase3_01_共通スタイル.md)、[3.2](../01_ai-document/phase3_02_UiStyleUtil.md)、[3.3](../01_ai-document/phase3_03_ComponentBase.md)。

| ID | 現行仕様 |
|---|---|
| BRUCE-STYLE-001 | ComponentBaseに共通Signal Inputを一元定義し、子で再定義しない。FormControlComponentBase<T>はComponentBaseを継承。 |
| BRUCE-STYLE-002 | 画面明示指定を優先し、未指定時はComponent固有の既定値取得メソッドをoverrideして適用。 |
| BRUCE-STYLE-003 | 基準値：border=true、borderWidth=1px、rounded=true、roundedSize=8px、shadow=false、shadowSize=md、padding=8px、visible=true、backgroundColor/textColor=undefined。DOMに一律強制しない。 |
| BRUCE-STYLE-004 | Button背景SECONDARY、FAB背景PRIMARY・円形・影あり、Textbox/Date/Radio/Group/Alert/Toggleの背景と文字は未指定。TableCellは親指定優先・なければテーマ。 |
| BRUCE-STYLE-005 | 背景・文字色は共通AppUiColorEnumで指定。PRIMARY、SECONDARY、ACCENT、NEUTRAL、BASE_100、BASE_200、BASE_300、INFO、SUCCESS、WARNING、ERRORの11値。未指定はEnum値でなくundefined。 |
| BRUCE-STYLE-006 | 11色はそれぞれ固定のbg-primary/text-primary、bg-secondary/text-secondary、bg-accent/text-accent、bg-neutral/text-neutral、bg-base-100/text-base-100、bg-base-200/text-base-200、bg-base-300/text-base-300、bg-info/text-info、bg-success/text-success、bg-warning/text-warning、bg-error/text-errorに対応。 |
| BRUCE-STYLE-007 | UiStyleUtilは状態なしstaticメソッド。getBorderClass、getRoundedClass、getShadowClass、getPaddingClass、getBackgroundColorClass、getTextColorClass、getVisibleClass、getTableCellStatusColorClassを提供。 |
| BRUCE-STYLE-008 | CSSクラス名の動的連結は禁止。許容値ごとの固定マッピングを使用。色undefinedの変換は空文字列。 |
| BRUCE-STYLE-009 | TableCell状態背景ERROR/INFO/WARNING/SUCCESSは透明度20%相当の固定スタイル。backgroundOpacityは追加しない。 |
| BRUCE-STYLE-010 | iOS/Androidで画面サイズ、セーフエリア、タップ領域、文字あふれ、スクロール競合、キーボード、テーマ、操作一貫性を検証。タップ領域は既存承認値を変更しない。 |

## 保留・検証

既存DaisyUIの見た目を維持し、Signal Input継承、CSS抽出・テーマ切替、実際のDOM適用対象はPhase 5/7で検証する。旧単一ComponentBase+任意control案は撤回済み。重複と例外の全件監査は未完了。
