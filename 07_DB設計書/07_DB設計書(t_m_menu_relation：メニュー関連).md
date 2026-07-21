# DB設計書
- 論理名：メニュー関連
- 物理名：t_m_menu_relation

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | メニュー関連ID | menu_relation_id | TEXT |  |  |  | 1 |  |  |  |  |   |
| 2 | メニュー関連ID（親） | parent_menu_relation_id | TEXT |  |  |  |  |  |  |  |  |   |
| 3 | メニューID | menu_id | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | 表示順 | display_order | TEXT |  |  |  |  |  |  |  |  |   |
| 5 | 無効フラグ | disabled_flg | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 7 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 8 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
