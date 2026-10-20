# Table・Swipe設計（暫定・全件監査前）

根拠：[3.4](../01_ai-document/phase3_04_Table.md)、[3.5](../01_ai-document/phase3_05_Swipe・Layout.md)、[2.5](../01_ai-document/phase2_05_任意CSS注入の排除.md)。

| ID | 現行承認事項 |
|---|---|
| BRUCE-TABLE-001 | backgroundColorとtextColorのみTable→Record→Cellで継承。優先順位はCell明示値＞Record明示値＞Table明示値＞Cell既定値。未指定undefinedは親を継承。 |
| BRUCE-TABLE-002 | border、borderWidth、rounded、roundedSize、shadow、shadowSize、paddingは継承せず、指定Component自身に適用。 |
| BRUCE-TABLE-003 | TableContainerLayoutはzebra/recordGapなど表固有、TableRecordは行固有、TableCellはcolSpan/rowSpan/stickyなどセル固有を管理。汎用属性はComponentBase。 |
| BRUCE-TABLE-004 | cellClassesによる任意CSS注入は移行後廃止。背景・文字はAppUiColorEnumと固定マッピングを使用。 |
| BRUCE-TABLE-005 | ERROR/INFO/WARNING/SUCCESSのTableCell状態背景は20%透明度相当を維持。動的Tailwind文字列の生成は禁止。 |
| BRUCE-TABLE-006 | 旧AppComponentTableCellBackgroundEnumは当時の承認履歴として保持。共通AppUiColorEnumとの移行・重複整理を実装時に行う。旧専用Enumと共通Enumを両方同時に正本とみなさない。 |
| BRUCE-SWIPE-001 | SwipeComponentは独立した操作Component。ジェスチャー判定をComponentBase/LayoutManagerへ移さない。 |
| BRUCE-SWIPE-002 | LayoutManagerは配置のみ担当。SwipeComponentにComponentBase継承を一律強制しない。 |
| BRUCE-SWIPE-003 | Table横スクロールとの競合はPhase 7で実機検証する。 |

## 追加の原典照合が必要な事項

[2.5.3の旧承認](../01_ai-document/phase2_05_任意CSS注入の排除.md)にはTableCell専用Enumの物理名・6値とHeader/TabBarのCSS注入廃止が記録されている。後続の共通Enum承認との時系列を追い、最終的な置換対象と互換性を確認する。Header/TabBarの外部CSSをComponent内部に移す方針は継続。実装・検証未実施。
