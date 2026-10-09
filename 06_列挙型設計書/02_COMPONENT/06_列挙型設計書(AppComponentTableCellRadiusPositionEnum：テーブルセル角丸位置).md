## 列挙型設計書

#### 列挙型名称
- 論理名：テーブルセル角丸位置
- 物理名：AppComponentTableCellRadiusPositionEnum
- ファイル名：app-component-table-cell-radius-position.enum.ts

#### 列挙型パッケージ
app\brf9000\brf9011-enum\component

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
| --- | :--- | :--- | :--- | :--- |
| 01 | NONE | none | 文字列 | 角丸なし |
| 02 | TOP_LEFT | top-left | 文字列 | 左上を角丸 |
| 03 | TOP_RIGHT | top-right | 文字列 | 右上を角丸 |
| 04 | BOTTOM_LEFT | bottom-left | 文字列 | 左下を角丸 |
| 05 | BOTTOM_RIGHT | bottom-right | 文字列 | 右下を角丸 |
| 06 | LEFT | left | 文字列 | 左上・左下を角丸 |
| 07 | RIGHT | right | 文字列 | 右上・右下を角丸 |
| 08 | ALL | all | 文字列 | 四隅すべてを角丸 |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number

- 列挙型定義テーブルの型はすべて同じ必要があります