## 列挙型設計書

#### 列挙型名称
- 論理名：タイブレーク
- 物理名：AppTieBreakCodeEnum
- ファイル名：app-tie-break-code.enum.ts

#### 列挙型パッケージ
app\shared\utils\enum\code

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
| --- | :--- | :--- | :--- | :--- |
| 01 |ENUM_WITH_TB|1|文字列| タイブレークあり |
| 02 |ENUM_NO_TB|2|文字列| タイブレークなし |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
