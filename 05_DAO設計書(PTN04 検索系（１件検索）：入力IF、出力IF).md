# DAO設計書

## １．概要
PTN04 検索系（１件検索）：入力IF、出力IF

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [x] 検索系(１件)
- [ ] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN04
- 物理名：PTN04Dao
- ファイル名：ptn04.dao.ts

#### （３）パッケージ
daotest

#### （４）SQL
```
select match_id                   as matchId
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
  from t_matches
  where match_id = :matchId
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
- 論理名：PTN04
- 物理名：PTN04RequestDto
- ファイル名：ptn04-request.dto.ts

#### （３）入力パラメータパッケージ
daotest

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合ID    |matchId| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [　] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：PTN04
- 物理名：PTN04ResponseDto
- ファイル名：ptn04-response.dto.ts

#### （３）出力パラメータパッケージ
daotest

#### （４）出力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合ID    |matchId| 文字列 | --- |
| 02 |試合日時  |matchDateTime| 文字列 | --- |
| 03 |試合名    |matchName| 文字列 | --- |
| 04 |試合タイプ|matchType| 文字列 | --- |
| 05 |選手名１  |singlesPlayer1| 文字列 | --- |
| 06 |選手名２  |singlesPlayer2| 文字列 | --- |
| 07 |選手名１  |doublesPlayerA1| 文字列 | --- |
| 08 |選手名２  |doublesPlayerA2| 文字列 | --- |
| 09 |選手名３  |doublesPlayerB1| 文字列 | --- |
| 10 |選手名４  |doublesPlayerB2| 文字列 | --- |
| 11 |ゲーム設定|matchSetting| 文字列 | --- |
| 12 |セット設定|setType| 文字列 | --- |
| 13 |ゲーム確定|gameFinalType| 文字列 | --- |
| 14 |状態      |matchStatus| 文字列 | --- |
| 15 |タイブレークモード|tieBreakMode| 文字列 | --- |
| 16 |サーバー（第１ゲーム）| firstServerPlayerId| 文字列 | --- |
| 17 |サーバー（第２ゲーム）| secondServerPlayerId| 文字列 | --- |
| 18 |リターン（第１ゲーム）| firstReceiverPlayerId| 文字列 | --- |
| 19 |リターン（第２ゲーム）| secondReceiverPlayerId| 文字列 | --- |
| 20 |作成日| createDateTime| 文字列 | --- |
| 21 |更新日| updateDateTime| 文字列 | --- |
| 22 |削除日| deleteDateTime| 文字列 | --- |

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

