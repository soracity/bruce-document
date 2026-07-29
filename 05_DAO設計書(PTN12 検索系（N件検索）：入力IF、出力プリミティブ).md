# DAO設計書

## １．概要
PTN12 検索系（１件検索）：入力IF、出力プリミティブ

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [ ] 検索系(１件)
- [x] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN12
- 物理名：PTN12Dao
- ファイル名：ptn12.dao.ts

#### （３）パッケージ
daotest

#### （４）SQL
```
select match_id                  as matchId
     , match_date_time           as matchDateTime
     , match_name                as matchName
     , match_type                as matchType
     , singles_player1           as singlesPlayer1
     , singles_player2           as singlesPlayer2
     , doubles_player_a1         as doublesPlayerA1
     , doubles_player_a2         as doublesPlayerA2
     , doubles_player_b1         as doublesPlayerB1
     , doubles_player_b2         as doublesPlayerB2
     , match_setting             as matchSetting
     , set_type                  as setType
     , game_final_type           as gameFinalType
     , match_status              as matchStatus
     , tie_break_mode            as tieBreakMode
     , first_server_player_id    as firstServerPlayerId
     , second_server_player_id   as secondServerPlayerId
     , first_receiver_player_id  as firstReceiverPlayerId
     , second_receiver_player_id as secondReceiverPlayerId
     , create_date_time          as createDateTime
     , update_date_time          as updateDateTime
     , delete_date_time          as deleteDateTime
  from t_t_matches
 order by match_id;
```

## ３．入力パラメータ
#### （１）入力パラメータ種別
- [ ] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：PTN12
- 物理名：PTN12ReqDto
- ファイル名：ptn12-req.dto.ts

#### （３）入力パラメータパッケージ
daotest

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合ID    |matchId| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [x] 値形式
- [ ] インターフェイス形式
- [ ] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：
- 物理名：
- ファイル名：

#### （３）出力パラメータパッケージ

#### （４）出力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合名    |matchName| 文字列 | --- |

## 凡例
- 型
  - 文字列：string
  - 数値：number
  - 日付：string
  - 真偽：boolean
- 必須
  - ●：入力チェック実装対象
- 形式 ※入力形式チェック実装対象
  - 半角数字
  - 半角英数字
  - 正規表現

## ９．チェックリストテスト
- [x] checked item1
- [x] checked item2
- [ ] checked item3

