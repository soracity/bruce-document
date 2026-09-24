# DAO設計書

## １．概要
PTN13 検索系（１件検索）：入力プリミティブ、出力IF

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [ ] 検索系(１件)
- [x] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN13
- 物理名：PTN13Dao
- ファイル名：ptn13.dao.ts

#### （３）パッケージ
daotest

#### （４）SQL
```
SELECT match_id                    AS matchId
     , match_code                  AS matchCode
     , match_date_time             AS matchDateTime
     , match_name                  AS matchName
     , match_type                  AS matchType
     , singles_player1             AS singlesPlayer1
     , singles_player2             AS singlesPlayer2
     , doubles_player_a1           AS doublesPlayerA1
     , doubles_player_a2           AS doublesPlayerA2
     , doubles_player_b1           AS doublesPlayerB1
     , doubles_player_b2           AS doublesPlayerB2
     , serve_no_singles_player1    AS serveNoSinglesPlayer1
     , serve_no_singles_player2    AS serveNoSinglesPlayer2
     , serve_no_doubles_player_a1  AS serveNoDoublesPlayerA1
     , serve_no_doubles_player_a2  AS serveNoDoublesPlayerA2
     , serve_no_doubles_player_b1  AS serveNoDoublesPlayerB1
     , serve_no_doubles_player_b2  AS serveNoDoublesPlayerB2
     , return_no_doubles_player_a1 AS returnNoDoublesPlayerA1
     , return_no_doubles_player_a2 AS returnNoDoublesPlayerA2
     , return_no_doubles_player_b1 AS returnNoDoublesPlayerB1
     , return_no_doubles_player_b2 AS returnNoDoublesPlayerB2
     , match_setting               AS matchSetting
     , set_type                    AS setType
     , game_final_type             AS gameFinalType
     , match_status                AS matchStatus
     , tie_break_mode              AS tieBreakMode
     , create_date_time            AS createDateTime
     , update_date_time            AS updateDateTime
     , delete_date_time            AS deleteDateTime
  FROM t_t_matches
 ORDER BY match_code;
```

## ３．入力パラメータ
#### （１）入力パラメータ種別
- [x] 値形式
- [ ] インターフェイス形式
- [ ] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：
- 物理名：
- ファイル名：

#### （３）入力パラメータパッケージ

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合CODE    |matchCode| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [　] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：PTN13
- 物理名：PTN13ResDto
- ファイル名：ptn13-res.dto.ts

#### （３）出力パラメータパッケージ
daotest

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
  - バイナリ：Uint8Array
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

