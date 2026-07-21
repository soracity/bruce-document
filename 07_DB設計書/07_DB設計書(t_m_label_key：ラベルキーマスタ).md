# DB設計書
- 論理名：ラベルキーマスタ
- 物理名：t_m_label_key

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ラベルキー | label_key | TEXT |  |  |  | 1 |  |  |  |  |   |
| 2 | ラベルタイプ | label_type | TEXT |  |  |  |  |  |  |  |  |   |
| 3 | 説明 | description | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | 無効フラグ | disabled_flg | TEXT |  |  |  |  |  |  |  |  |   |
| 5 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 7 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
