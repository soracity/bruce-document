# DB設計書
- 論理名：試合属性
- 物理名：t_t_matches

#### DB項目定義
| # | 項目名（論理名） | 項目名（物理名） | 型 | サイズ | 値 | NOTNULL | PK | IDX1 | IDX2 | IDX3 | IDX4 | IDX5  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 試合ID | match_id | TEXT |  |  | ● | 1 |  |  |  |  |   |
| 2 | 試合日時 | match_date_time | TEXT |  |  |  |  | 1 |  |  |  |   |
| 3 | 試合名 | match_name | TEXT |  |  |  |  |  |  |  |  |   |
| 4 | 試合タイプ | match_type | TEXT |  |  [AppGameTypeCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppGameTypeCodeEnum：ゲーム形式).md)  |  |  |  |  |  |  |   |
| 5 | 選手名（シングル）１ | singles_player1 | TEXT |  |  |  |  |  |  |  |  |   |
| 6 | 選手名（シングル）２ | singles_player2 | TEXT |  |  |  |  |  |  |  |  |   |
| 7 | 選手名（ダブルス）１ | doubles_player_a1 | TEXT |  |  |  |  |  |  |  |  |   |
| 8 | 選手名（ダブルス）２ | doubles_player_a2 | TEXT |  |  |  |  |  |  |  |  |   |
| 9 | 選手名（ダブルス）３ | doubles_player_b1 | TEXT |  |  |  |  |  |  |  |  |   |
| 10 | 選手名（ダブルス）４ | doubles_player_b2 | TEXT |  |  |  |  |  |  |  |  |   |
| 11 | ゲーム設定 | match_setting | TEXT |  |  [AppMatchSettingCodeNnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppMatchSettingCodeNnum：試合設定).md)  |  |  |  |  |  |  |   |
| 12 | セット設定 | set_type | TEXT |  |  [AppNumberOfSetsCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppNumberOfSetsCodeEnum：セット数).md)  |  |  |  |  |  |  |   |
| 13 | ゲーム確定 | game_final_type | TEXT |  |  [AppGameFinalCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppGameFinalCodeEnum：ゲーム確定).md)  |  |  |  |  |  |  |   |
| 14 | 状態 | match_status | TEXT |  |  [AppMatchStatusCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppMatchStatusCodeEnum：試合状態).md)  |  |  |  |  |  |  |   |
| 15 | タイブレークモード | tie_break_mode | TEXT |  |  [AppTieBreakCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppTieBreakCodeEnum：タイブレーク).md)  |  |  |  |  |  |  |   |
| 16 | サーバー（第１ゲーム） | first_server_player_id | TEXT |  |  [AppPlayerCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppPlayerCodeEnum：プレイヤー).md)  |  |  |  |  |  |  |   |
| 17 | サーバー（第２ゲーム） | second_server_player_id | TEXT |  |  [AppPlayerCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppPlayerCodeEnum：プレイヤー).md)  |  |  |  |  |  |  |   |
| 18 | レシーバー（第１ゲーム） | first_receiver_player_id | TEXT |  |  [AppPlayerCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppPlayerCodeEnum：プレイヤー).md)  |  |  |  |  |  |  |   |
| 19 | レシーバー（第２ゲーム） | second_receiver_player_id | TEXT |  |  [AppPlayerCodeEnum](../06_列挙型設計書/01_CODE/06_列挙型設計書(AppPlayerCodeEnum：プレイヤー).md)  |  |  |  |  |  |  |   |
| 20 | 作成日 | create_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 21 | 更新日 | update_date_time | TEXT |  |  |  |  |  |  |  |  |   |
| 22 | 削除日 | delete_date_time | TEXT |  |  |  |  |  |  |  |  |   |
