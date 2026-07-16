## 列挙型設計書

#### 列挙型名称
- 論理名：スコア入力タブ
- 物理名：AppLiveScoringTabCodeEnum
- ファイル名：app-live-scoring-tab-code-enum.enum.ts

#### 列挙型パッケージ
app\shared\utils\enum\menu

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
| --- | :--- | :--- | :--- | :--- |
| 01 |ENUM_TEAMA_TEAMB|1|文字列| 左（TEAM_A）,右（TEAM_B） |
| 02 |ENUM_TEAMB_TEAMA|2|文字列| 左（TEAM_B）,右（TEAM_A） |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
