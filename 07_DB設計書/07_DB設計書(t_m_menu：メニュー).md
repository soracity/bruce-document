# DB設計書
- 論理名：メニュー
- 物理名：t_m_menu

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | メニューID | menu_id | TEXT |  |  |  | 1 |  |  |  |  |   |
| 2 | ラベルキー | label_key | TEXT |  |  |  |  |  |  |  |  |   |
| 3 | メニュータイプ | menu_type | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | アイコン | icon | TEXT |  |  |  |  |  |  |  |  |   |
| 5 | 遷移先 | url | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 無効フラグ | disabled_flg | TEXT |  |  |  |  |  |  |  |  |   |
| 7 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 8 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 9 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
