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

## Table色解決の純粋関数契約・実装前検証仕様（2026-10-21）

本節は[Phase 3.1](../01_ai-document/phase3_01_共通スタイル.md)と[Phase 3.4](../01_ai-document/phase3_04_Table.md)の**承認済み優先順位をテスト可能な形に記述した設計補助**。Angular Component間の値伝達方式を新たに承認したものではない。

### 属性別の解決関数（参照擬似コード）

```ts
// 型名は説明用。公開API名・ファイル配置を承認したものではない。
type Color = AppUiColorEnum | undefined;

function resolveCellColor(
  cell: Color,
  record: Color,
  table: Color,
  cellDefault: Color,
): Color {
  return cell ?? record ?? table ?? cellDefault;
}

const background = resolveCellColor(
  cellBackground, recordBackground, tableBackground, cellDefaultBackground
);
const foreground = resolveCellColor(
  cellText, recordText, tableText, cellDefaultText
);
```

- 入力が`undefined`の場合のみ親へフォールバックする。色Enumに「未指定」定数を追加しない。
- 背景と文字を**別々**に解決する。背景の継承元がRecordでも、文字の継承元はTableになり得る。
- `ComponentBase`で基準既定値を持つ非継承属性（例：`border=true`）と、色Inputの未指定判定を混同しない。
- この純粋関数は値選択の**意味的な参照実装**。Angular Signal Input、DI、親参照、Contextのどれで値を渡すかは未決であり、採用を示唆しない。
- `??` は本節でEnum/undefinedに限定した場合の意味表現。boolean型の共通属性には流用しない。非継承属性の`false`を親の`true`で上書きしてはならない。

### テストベクトル（背景と文字の独立性）

| ID | Cell / Record / Table / Cell既定 | 期待 |
|---|---|---|
| RESOLVE-01 | undefined / undefined / undefined / undefined | undefined（既存テーマ表示） |
| RESOLVE-02 | undefined / undefined / PRIMARY / undefined | PRIMARY |
| RESOLVE-03 | undefined / SECONDARY / PRIMARY / undefined | SECONDARY |
| RESOLVE-04 | ERROR / SECONDARY / PRIMARY / undefined | ERROR |
| RESOLVE-05 | undefined / undefined / undefined / BASE_100 | BASE_100 |
| RESOLVE-06 | 背景Cell=ERROR、文字Cell=undefined・Record=undefined・Table=PRIMARY | 背景ERROR、文字PRIMARY |
| RESOLVE-07 | Record shadow=true、Cell shadow=false | Recordに影あり、Cellに影なし（親の影を継承しない） |

### 色の解決とCSS表現は別処理

1. 背景色・文字色それぞれの**有効Enum値を解決**する。
2. 共通`UiStyleUtil`の**固定マッピング**を使って色を表現する。
3. TableCell状態色の20%透明度相当は**Componentの表示責務**として処理する。

**残る仕様上の曖昧さ**：同じ`ERROR`を通常背景色として使う場合と「試合状態のエラー色」として使う場合を区別する入力契約が原典で未確定。すべてのTableCell ERRORを無条件に20%表示する、あるいは勝手に`stateColor` Inputを増設する、といった判断は行わない。実装前に既存状態色利用箇所と承認事項を照合して決定する。

**完了状態**：参照関数と7ベクトルは仕様の検証材料。正式なTypeScript API、Component連携、状態色判定、CSS適用順、ACG生成、Phase 7回帰試験は未完了。完成監査の合格を意味しない。
