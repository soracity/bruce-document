# DB設計書
- 論理名：言語マスタ
- 物理名：t_m_label_language

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 言語コード | language_code | TEXT |  |  |  | 1 |  |  |  |  |   |
| 2 | 言語名（英語表記） | language_name | TEXT |  |  |  |  |  |  |  |  |   |
| 3 | 言語名（ネイティブ） | native_name | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | ソート順 | display_order | INTEGER |  |  |  |  |  |  |  |  |   |
| 5 | 無効フラグ | disabled_flg | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 7 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 8 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
