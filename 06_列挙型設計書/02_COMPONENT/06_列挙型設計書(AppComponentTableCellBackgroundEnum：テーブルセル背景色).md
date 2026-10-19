## 列挙型設計書

#### 列挙型名称
- 論理名：テーブルセル背景色
- 物理名：AppComponentTableCellBackgroundEnum
- ファイル名：app-component-table-cell-background.enum.ts

#### 列挙種別
- [x] 一般列挙型
- [ ] コード列挙型
- [ ] ラベル列挙型
- [ ] メッセージ列挙型

#### 列挙型パッケージ
app\brf9000\brf9011-enum\component

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
|---|---|---|---|---|
| 01 | DEFAULT | default | 文字列 | 背景色を追加指定しない |
| 02 | LABEL | label | 文字列 | ラベルセル用の背景色 |
| 03 | ERROR | error | 文字列 | エラー系の背景色 |
| 04 | INFO | info | 文字列 | 情報系の背景色 |
| 05 | WARNING | warning | 文字列 | 警告系の背景色 |
| 06 | SUCCESS | success | 文字列 | 成功系の背景色 |

#### TableCellとの関連（2026-10-20承認済み）
- `TableCellComponent`の公開Input名は`backgroundColor`、型は本Enum、省略時既定値は`DEFAULT`。
- 画面側はEnum値で背景色の意味を指定し、背景色の具体的CSSはTableCell内部に隠蔽する。Enumの`value`にTailwindのCSSクラス名を格納しない。
- 現行画面の視覚表示との対応：`LABEL`＝既存`bg-base-200`、`ERROR`＝既存`bg-error/20`、`INFO`＝既存`bg-info/20`、`WARNING`＝既存`bg-warning/20`、`SUCCESS`＝既存`bg-success/20`。これは従来の表示要件の参照であり、列挙値ではない。
- Tailwind動的組立て（例：`bg-${color}/20`）は禁止。定義済みの内部固定CSSを使用し、テーマと不透明度の互換性を確認する。
- `cellClasses`は画面側のEnum指定への移行後に廃止する。任意CSSクラスの内部転送を再導入しない。
- 固定背景色11箇所・動的背景色1箇所（BRU1002）を移行対象とする。zebra、selected、stickyとのCSS優先順位は既存表示を維持し、Phase 5実装・Phase 7検証で扱う。
- ACGが本設計書からTypeScriptのEnumを生成する。生成ファイルは手で編集しない。
- **状態**：列挙名、値、既定値、公開Input名はユーザー承認済み。ACG生成、アプリ実装および実機検証は未実施。
