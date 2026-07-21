# DB設計書
- 論理名：ラベル多言語マスタ
- 物理名：t_m_label_text

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ラベルキー | label_key | TEXT |  |  |  | 1 |  |  |  |  |   |
| 2 | 言語コード | language_code | TEXT |  |  |  |  |  |  |  |  |   |
| 3 | ラベルテキスト | label_text | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 5 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
