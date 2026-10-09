# DAO設計書

## １．概要
PTN30 検索系（N件検索）：入力IF、出力IF

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [ ] 検索系(１件)
- [x] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN30
- 物理名：PTN30Dao
- ファイル名：ptn30.dao.ts

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
     , CAST(NULL AS INTEGER)        AS pointCount
     , 0                            AS gameCount
     , 'ABC'                        AS testStringValue
     , CAST(NULL AS TEXT)           AS testStringNull
     , ''                           AS testStringEmpty
     , -12                          AS testNumberNegative
     , 12.5                         AS testNumberDecimal
     , 1                            AS testBooleanTrue
     , 0                            AS testBooleanFalse
     , CAST(NULL AS INTEGER)        AS testBooleanNull
     , '2026-10-09'                 AS testDateValue
     , CAST(NULL AS TEXT)           AS testDateNull
     , '2026-10-09 18:00:00'        AS testDateTimeValue
     , CAST(NULL AS TEXT)           AS testDateTimeNull
     , X'0102FF'                    AS testBinaryValue
     , CAST(NULL AS BLOB)           AS testBinaryNull
  FROM t_t_matches
 ORDER BY match_code;
```

## ３．入力パラメータ
#### （１）入力パラメータ種別
- [ ] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：PTN30
- 物理名：PTN30ReqDto
- ファイル名：ptn30-req.dto.ts

#### （３）入力パラメータパッケージ
daotest

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合CODE    |matchCode| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [ ] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：PTN30
- 物理名：PTN30ResDto
- ファイル名：ptn30-res.dto.ts

#### （３）出力パラメータパッケージ
daotest

#### （４）出力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合ID    |matchId| 文字列 | --- |
| 02 |試合CODE    |matchCode| 文字列 | --- |
| 03 |試合日時  |matchDateTime| 文字列 | --- |
| 04 |試合名    |matchName| 文字列 | --- |
| 05 |試合タイプ|matchType| 文字列 | --- |
| 06 |選手名１  |singlesPlayer1| 文字列 | --- |
| 07 |選手名２  |singlesPlayer2| 文字列 | --- |
| 08 |選手名１  |doublesPlayerA1| 文字列 | --- |
| 09 |選手名２  |doublesPlayerA2| 文字列 | --- |
| 10 |選手名３  |doublesPlayerB1| 文字列 | --- |
| 11 |選手名４  |doublesPlayerB2| 文字列 | --- |
| 12 | サーブ順(選手名S1) | serveNoSinglesPlayer1 | 文字列 | --- |
| 13 | サーブ順(選手名S2) | serveNoSinglesPlayer2 | 文字列 | --- |
| 14 | サーブ順(選手名DA1) | serveNoDoublesPlayerA1 | 文字列 | --- |
| 15 | サーブ順(選手名DA2) | serveNoDoublesPlayerA2 | 文字列 | --- |
| 16 | サーブ順(選手名DB1) | serveNoDoublesPlayerB1 | 文字列 | --- |
| 17 | サーブ順(選手名DB2) | serveNoDoublesPlayerB2 | 文字列 | --- |
| 18 | リターン順(選手名DA1) | returnNoDoublesPlayerA1 | 文字列 | 0 = DEUCE（デュースサイド）、1 = AD（アドサイド）|
| 19 | リターン順(選手名DA2) | returnNoDoublesPlayerA2 | 文字列 | 0 = DEUCE（デュースサイド）、1 = AD（アドサイド） |
| 20 | リターン順(選手名DB1) | returnNoDoublesPlayerB1 | 文字列 | 0 = DEUCE（デュースサイド）、1 = AD（アドサイド） |
| 21 | リターン順(選手名DB2) | returnNoDoublesPlayerB2 | 文字列 | 0 = DEUCE（デュースサイド）、1 = AD（アドサイド） |
| 22 |ゲーム設定|matchSetting| 文字列 | --- |
| 23 |セット設定|setType| 文字列 | --- |
| 24 |ゲーム確定|gameFinalType| 文字列 | --- |
| 25 |状態      |matchStatus| 文字列 | --- |
| 26 |タイブレークモード|tieBreakMode| 文字列 | --- |
| 27 |作成日| createDateTime| 文字列 | --- |
| 28 |更新日| updateDateTime| 文字列 | --- |
| 29 |削除日| deleteDateTime| 文字列 | --- |
| 30 |ポイント数（NULL確認用）| pointCount | 数値 | NULLを維持すること |
| 31 |ゲーム数（ゼロ確認用）| gameCount | 数値 | 0を維持すること |
| 32 |文字列通常値| testStringValue | 文字列 | ABCを維持 |
| 33 |文字列NULL| testStringNull | 文字列 | NULLを空文字へ変換 |
| 34 |文字列空文字| testStringEmpty | 文字列 | 空文字を維持 |
| 35 |負数| testNumberNegative | 数値 | -12を維持 |
| 36 |小数| testNumberDecimal | 数値 | 12.5を維持 |
| 37 |真偽TRUE相当| testBooleanTrue | 真偽 | SQLiteの1がJSのbooleanに変換されるか確認 |
| 38 |真偽FALSE相当| testBooleanFalse | 真偽 | SQLiteの0がJSのbooleanに変換されるか確認 |
| 39 |真偽NULL| testBooleanNull | 真偽 | NULLを維持 |
| 40 |日付通常値| testDateValue | 日付 | 2026-10-09を維持 |
| 41 |日付NULL| testDateNull | 日付 | NULLを空文字へ変換 |
| 42 |日時通常値| testDateTimeValue | 日時 | 2026-10-09 18:00:00を維持 |
| 43 |日時NULL| testDateTimeNull | 日時 | NULLを空文字へ変換 |
| 44 |バイナリ通常値| testBinaryValue | バイナリ | X'0102FF'の取得時の実体型を確認 |
| 45 |バイナリNULL| testBinaryNull | バイナリ | NULLを維持 |

## 凡例
- 型
  - 文字列：string
  - 数値：number
  - 真偽：boolean
  - 日付：string
  - 日時：string
  - バイナリ：Uint8Array

- 必須
  - ●：入力チェック実装対象
- 形式 ※入力形式チェック実装対象
  - 半角数字
  - 半角英数字
  - 正規表現

## ８．型別テストの注意事項
- 本設計書はDAOの型別コード生成およびSQLite実行時の挙動を検証するためのもの。
- SQLの真偽値は0/1であり、SQLiteからの戻り値がbooleanになるとは限らない。生成されたDTOの型だけで実行時変換は行われない。
- BLOBはSQLiteドライバによってUint8Array以外の形式で返る可能性があるため、実機で検証する。
- NULLを返す数値・真偽・バイナリ項目は、生成DTOの型がNULLを許容するか別途確認する。
- 既存の入力DTOはテスト用に保持するが、SQLにはバインドパラメータがない。

## ９．チェックリストテスト
- [ ] 文字列型のNULLが空文字に変換されること
- [ ] 数値型pointCountのNULLがNULLのまま返ること
- [ ] 数値型gameCountの0が0のまま返ること
- [ ] 検索結果0件の場合に空配列が返ること
- [ ] 通常文字列ABCと空文字が維持されること
- [ ] 文字列NULLが空文字へ変換されること
- [ ] 数値の負数・小数が維持されること
- [ ] 真偽の1・0が実際にbooleanになるか確認すること（SQLiteは通常数値として返す）
- [ ] 真偽NULLがNULLのまま返ること
- [ ] 日付・日時の通常値が維持されること
- [ ] 日付・日時のNULLが空文字へ変換されること
- [ ] BLOB値がUint8Arrayとして取得されるか確認すること（SQLiteドライバ依存）
- [ ] バイナリNULLがNULLのまま返ること
- [ ] 生成DTOのNULL許容型と実際の戻り値が一致すること

