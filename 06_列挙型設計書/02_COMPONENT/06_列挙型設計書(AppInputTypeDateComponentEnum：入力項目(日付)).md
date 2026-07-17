## 列挙型設計書

#### 列挙型名称
- 論理名：入力項目（日付）
- 物理名：AppInputTypeDateComponentEnum
- ファイル名：app-input-type-date-component-enum.ts

#### 列挙型パッケージ
app\shared\utils\enum\component

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
| --- | :--- | :--- | :--- | :--- |
| 01 |ENUM_DATE|date|文字列| 日付 |
| 02 |ENUM_DATE_TIME|datetime-local|文字列| 日時（ローカル） |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
