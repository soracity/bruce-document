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

## Phase 3.1／3.4 後日承認の詳細設計照合（2026-10-21）

根拠：[Phase 3.1](../01_ai-document/phase3_01_共通スタイル.md) の2026-10-20「最終設計承認：Component別既定値・全11色固定マッピング」、[Phase 3.4](../01_ai-document/phase3_04_Table.md) の同日追加承認。これは対象2原典の照合であり、全議事録監査完了ではない。

### 現行色Enumと旧設計の優先順位

- **現行**：共通 `AppUiColorEnum` の11色を一般ComponentとTableCellで共用する。EnumはACG生成対象。画面は意味色を指定し、固定CSSクラスへの変換は共通 `UiStyleUtil` が担当する。
- **履歴**：旧 `AppComponentTableCellBackgroundEnum` の6値・`backgroundColor` Input案はPhase 2.5.3時点の承認。後日共通Enum方式が優先するため、旧専用Enumを新実装の正本として扱わない。
- **セル固有表現**：TableCellのERROR/INFO/WARNING/SUCCESSの状態背景は従来の透明度20%相当を維持。一般ComponentのERRORは通常のエラー色。透明度はEnumの値ではなくComponentの表示責務。別Input `backgroundOpacity` は設けない。
- **禁止**：任意class転送 `cellClasses` の継続、EnumへのCSSクラス文字列格納、Tailwindクラス名の動的文字列組立て。

### 共通11色の固定マッピング（承認済み）

| AppUiColorEnum | 背景 | 文字 |
|---|---|---|
| PRIMARY | `bg-primary` | `text-primary` |
| SECONDARY | `bg-secondary` | `text-secondary` |
| ACCENT | `bg-accent` | `text-accent` |
| NEUTRAL | `bg-neutral` | `text-neutral` |
| BASE_100 | `bg-base-100` | `text-base-100` |
| BASE_200 | `bg-base-200` | `text-base-200` |
| BASE_300 | `bg-base-300` | `text-base-300` |
| INFO | `bg-info` | `text-info` |
| SUCCESS | `bg-success` | `text-success` |
| WARNING | `bg-warning` | `text-warning` |
| ERROR | `bg-error` | `text-error` |

上記は一般の共通色変換。TableCell状態背景の4色は**20%相当の専用固定変換**を使用する。Enumの同じERROR等を状態色として解釈する具体的な呼出し契約・変換API・優先順位は既存Component実装との照合が必要であり、勝手に確定しない。

### Tableスタイル値の解決規則

`backgroundColor` と `textColor` は、それぞれ独立して次の優先順位で解決する。

1. Cellで明示指定された値
2. Recordで明示指定された値
3. Tableで明示指定された値
4. Cell固有の既定値（親も未指定の場合は既存テーマを尊重）

**未指定は`undefined`**で表す。したがって背景色だけCell指定、文字色だけTable指定のように属性ごとに別の継承元を選択できる。共通 `ComponentBase` の `backgroundColor` / `textColor` 基準既定値は`undefined`。Enumに「未指定」用定数を増やさない。

`border`、`borderWidth`、`rounded`、`roundedSize`、`shadow`、`shadowSize`、`padding` は**継承しない**。各Componentの明示値・個別既定値だけを自身に適用する。特にRecordのshadowをCellへ伝播しない。TableRowは構造を担当し、色継承の追加段階にしない。

### 検証用の入力と期待結果

| ID | 入力 | 期待結果 |
|---|---|---|
| COLOR-01 | Table背景PRIMARY、Record/Cell背景未指定 | Cell背景PRIMARY |
| COLOR-02 | Table背景PRIMARY、Record背景SECONDARY、Cell未指定 | Cell背景SECONDARY |
| COLOR-03 | Table背景PRIMARY、Record背景SECONDARY、Cell背景ERROR | Cell背景ERROR（セル状態色指定時の表示は20%相当） |
| COLOR-04 | Table文字PRIMARY、Record/Cell文字未指定、Cell背景SUCCESS | Cell文字PRIMARY、背景はCell明示SUCCESS |
| COLOR-05 | Table/Record/Cell背景すべて未指定 | Cell既定表示・既存テーマを尊重 |
| COLOR-06 | Recordにshadow=true、Cellにshadow未指定 | Record自身だけに影。Cellへ自動継承しない |
| COLOR-07 | Tableにborder=false、Cellにborder未指定 | TableのfalseをCellに継承しない |
| COLOR-08 | 状態色ERROR/INFO/WARNING/SUCCESS | TableCellでは従来の20%背景を維持。一般Componentは通常色 |
| COLOR-09 | テーマ変更とzebra/selected/sticky併用 | 既存表示・優先関係を回帰検証し、意図しない差異を残さない |
| COLOR-10 | 旧TableCell専用EnumとcellClassesを使う既存画面 | 共通Enum指定へ置換後、任意class転送を廃止する |

**未完了**：Angular Signal Input継承とComponent別既定値の両立、Table→Record→Cellの値伝達API、TableCell状態色と通常背景色の識別契約、CSS優先順位、既存コードの再調査、ACG生成・実装・端末検証。Phase 3.1.1および3.4の**設計承認**を実装・検証完了と読み替えない。
