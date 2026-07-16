## 列挙型設計書

#### 列挙型名称
- 論理名：試合状態
- 物理名：AppMatchStatusCodeEnum
- ファイル名：app-match-status-code.enum.ts

#### 列挙型パッケージ
app\shared\utils\enum\code

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
| --- | :--- | :--- | :--- | :--- |
| 01 |ENUM_NOT_STARTED|01|文字列| 試合開始前 |
| 02 |ENUM_IN_PROGRESS|02|文字列| 試合中 |
| 03 |ENUM_FINISHED|03|文字列| 試合終了 |
| 04 |ENUM_FINAL|04|文字列| 試合確定 |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
