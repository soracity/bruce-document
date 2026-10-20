# Phase 3.4 Table

> **工程表の中区分：3.4 Table**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

Cell明示＞Record明示＞Table明示＞既定値の継承方向を議論。未指定undefinedと明示falseの区別は未解決。

## 3.4.1 Table→Record→Cellスタイル継承の方式を決定

- **作業**：未着手／**設計**：未決／**実装**：未着手／**検証**：未検証
- **具体的な対象**：Table→Record→Cellスタイル継承の方式を決定。Cell明示＞Record明示＞Table明示＞既定値の継承方向を議論。未指定undefinedと明示falseの区別は未解決。
- **必要な確認・判断**：未指定undefinedと明示falseを区別する方式が未決。未確定の方式は既存ソースや原典を確認してから比較・承認する。
- **成果・完了条件**：既存規則・対象Component・利用側の影響と検証方法を記録する。未着手の工程であり、実装済み・承認済みとは扱わない。
- **状態**：作業=未着手、設計=未決、実装=未着手、検証=未検証。
- **次の作業**：未指定undefinedと明示falseを区別する方式が未決
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 5. Tableスタイル継承（未決）

議論済みの方向性：

- スタイルの既定値を `TableContainerLayout → TableRecord → TableCell` に伝播させる。TableRowは構造・sticky等を担う。
- 優先順位：**Cellの明示指定 > Recordの明示指定 > Tableの明示指定 > 共通既定値**。
- 子が**未指定（undefined）**なら親から継承し、子が明示的に `false` を指定した場合は `false` を優先する。
- `zebra`、`recordGap`、`sticky`、`colSpan`、`rowSpan` 等のTable固有属性は共通デザイン属性と区別する。

**未解決の技術論点**：基底 `ComponentBase` が既定値を持つInputを定義した場合、子で「未指定」と「既定値」を区別しにくい。Table子クラスでInputを `undefined` 許容に再定義する案は出たが、AngularのInput継承・TypeScriptの型互換性を未検証。**まだ実装方式を決定していない**。



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> この節は旧サマリからの転記です。当時の「未承認」「再開地点」「提案」を現在の決定として扱わないでください。
<!-- HISTORICAL-SUMMARY-SECTIONS: 2.7 -->

#### 2.7 Tableスタイル継承（未決・フェーズ3再開点）

方向性：

`TableContainerLayout → TableRecord → TableCell` に既定スタイルを伝播させる。

TableRowは構造・sticky等を担う。

優先順位案：

> **Cell明示指定 > Record明示指定 > Table明示指定 > 共通既定値**

子が `undefined` なら親から継承。

子が明示的に `false` を指定した場合は `false` を優先。

Table固有属性は共通デザイン属性と区別する。

例：

- zebra
- recordGap
- sticky
- colSpan
- rowSpan

未解決：

基底ComponentBaseに既定値付きInputがあると、子で「未指定」と「既定値」を区別しにくい。

Table子クラスで `undefined` 許容Inputを再定義する案は出たが、Angular Input継承とTypeScript型互換性を未検証。

**実装方式は未決。**

フェーズ3を再開する場合はここから議論する。

---

## 3.4.2 Table固有属性と共通スタイルの境界を確定

- **作業**：未着手／**設計**：検討中／**実装**：未着手／**検証**：未検証
- **具体的な対象**：Table固有属性と共通スタイルの境界を確定。Cell明示＞Record明示＞Table明示＞既定値の継承方向を議論。未指定undefinedと明示falseの区別は未解決。
- **必要な確認・判断**：zebra／recordGap／colSpan等と共通属性を分離。未確定の方式は既存ソースや原典を確認してから比較・承認する。
- **成果・完了条件**：既存規則・対象Component・利用側の影響と検証方法を記録する。未着手の工程であり、実装済み・承認済みとは扱わない。
- **状態**：作業=未着手、設計=検討中、実装=未着手、検証=未検証。
- **次の作業**：zebra／recordGap／colSpan等と共通属性を分離
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)



### 2026-10-20 承認事項：TableCellの共通色指定

- **承認済み**：TableCellの背景色・文字色は一般Componentと共通の色Enumを用い、共通`UiStyleUtil`で固定CSSクラスへ変換する。画面からの任意CSSクラス指定は認めず、`cellClasses`廃止方針を維持する。
- セル固有の状態色・意味を表現する必要がある場合に限り専用Enumを検討する。専用Enumの新設自体は未決。
- 既存のTable→Record→Cellの継承優先順位・未指定とfalseの扱いは引き続き未決。**設計承認のみで実装・検証は未着手**。

## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。

### 2026-10-20 追加承認：共通色EnumとTableCell状態色の整合
- 色の意味は一般Componentと同じ`AppUiColorEnum`で統一する。TableCellの状態色（ERROR/INFO/WARNING/SUCCESS）は従来の透明度20%の表示を維持する。
- 透明度はTableCell側の表示表現として固定CSSに隠蔽する。`backgroundOpacity`は追加せず、CSSクラスの動的組立てを禁止する。
- 旧`AppComponentTableCellBackgroundEnum`設計書は移行前の承認履歴として保持し、共通Enumとの重複・移行方法を実装設計時に整理する。ACG生成・実装・検証は未実施。

### 2026-10-20 追加承認：shadowの適用対象
- `shadow`は指定されたComponent自身にのみ適用し、Table→Record→Cellへ自動継承しない。
- 例：`<app-table-record [shadow]="true">`はRecord自身にのみ影を付け、TableやCellには影を付けない。
- 背景色など継承可能なスタイルと、shadowなど適用先固有のスタイルを区別する。継承対象の全属性と明示指定時の優先順位は引き続き設計する。
- 設計承認済み。実装・検証は未実施。

### 2026-10-20 追加承認：背景色の継承優先順位
- 背景色はTable→Record→Cellの順に継承可能とし、**Cell明示値 ＞ Record明示値 ＞ Table明示値 ＞ Cell既定値**を適用する。
- 入力未指定は`undefined`として扱い、親の指定値がある場合に継承する。親にも指定がない場合はCell固有の既定値を適用する。
- TableCellの状態色ERROR/INFO/WARNING/SUCCESSは既存の透明度20%表示を維持する。
- `shadow`は既承認どおり継承対象外であり、指定されたComponent自身にのみ適用する。
- 設計承認済み。Angular実装・CSS優先順位・表示検証は未実施。

### 2026-10-20 追加承認：Table固有属性と共通スタイルの責務分離（Phase 3.4.2）
- `ComponentBase`：`border`、`borderWidth`、`rounded`、`roundedSize`、`shadow`、`shadowSize`、`padding`、`backgroundColor`、`textColor`、`visible`など汎用属性を管理する。
- `TableContainerLayout`：`zebra`、`recordGap`などTable固有属性を管理する。
- `TableRecord`：Record固有属性を管理する。
- `TableCell`：`colSpan`、`rowSpan`、`sticky`などセル固有属性を管理する。
- Table固有属性は`ComponentBase`へ追加しない。既承認の`cellClasses`廃止方針を維持する。
- 設計承認済み。実装・検証は未実施。

### 2026-10-20 追加承認：Tableスタイルの継承対象を確定（Phase 3.4.1）
- `backgroundColor`および`textColor`はTable→Record→Cellで継承する。優先順位は**Cell明示値 ＞ Record明示値 ＞ Table明示値 ＞ Cell既定値**。未指定（`undefined`）は親を継承する。
- `border`、`borderWidth`、`rounded`、`roundedSize`、`shadow`、`shadowSize`、`padding`は継承しない。指定したComponent自身にのみ適用する。
- TableCellの状態背景色の透明度20%は既承認どおり維持する。
- 継承対象と優先順位の設計は承認済み。実装・検証は未実施。CSS優先順位とAngularでの値伝播は実装時に確認する。
