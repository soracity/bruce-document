## 列挙型設計書

#### 列挙型名称
- 論理名：ラベルキー
- 物理名：Brf9010I18nLabelKeyBrf1002Enum
- ファイル名：brf9010-i18n-label-key-brf1002.enum.ts

#### 列挙種別
- [ ] 一般列挙型
- [x] ラベル列挙型
- [ ] メッセージ列挙型

| 列挙種別 | 意味 |
|---|---|
| 一般列挙型 | 列挙名、値で構成される列挙型 |
| ラベル列挙型 | ラベルの列挙型 |
| メッセージ列挙型 | メッセージの列挙型 |

#### 列挙型パッケージ
io\github\soracity\bruce\brf9000\brf9010-enum\i18n

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
|---|---|---|---|---|
| 01 | LBL_MATCH_ID | lbl.brf1001.match.id | 文字列 | 試合ID |
| 02 | LBL_MATCH_CODE | lbl.brf1001.match.code | 文字列 | 試合CODE |
| 03 | LBL_MATCH_DATETIME | lbl.brf1001.match.date.time | 文字列 | 試合日時 |
| 04 | LBL_MATCH_NAME | lbl.brf1001.match.name | 文字列 | 試合名 |
| 05 | LBL_MATCH_TYPE | lbl.brf1001.match.type | 文字列 | 試合タイプ |
| 06 | LBL_SINGLES_PLAYER1 | lbl.brf1001.singles.player.1 | 文字列 | 選手名１ |
| 07 | LBL_SINGLES_PLAYER2 | lbl.brf1001.singles.player.2 | 文字列 | 選手名２ |
| 08 | LBL_DOUBLES_PLAYERA1 | lbl.brf1001.doubles.player.a1 | 文字列 | 選手名１ |
| 09 | LBL_DOUBLES_PLAYERA2 | lbl.brf1001.doubles.player.a2 | 文字列 | 選手名２ |
| 10 | LBL_DOUBLES_PLAYERB1 | lbl.brf1001.doubles.player.b1 | 文字列 | 選手名３ |
| 11 | LBL_DOUBLES_PLAYERB2 | lbl.brf1001.doubles.player.b2 | 文字列 | 選手名４ |
| 12 | LBL_SET_TYPE | lbl.brf1001.set.type | 文字列 | セット設定 |
| 13 | LBL_GAME_FINAL_TYPE | lbl.brf1001.gamefinal.type | 文字列 | ゲーム確定 |
| 14 | LBL_MATCH_STATUS | lbl.brf1001.match.status | 文字列 | 状態 |
| 15 | LBL_SEARCH_ITEM | lbl.brf1002.search.item | 文字列 | 検索項目 |
| 16 | LBL_SEARCH | lbl.brf1002.search | 文字列 | 検索 |
| 17 | LBL_MATCH_PLACE | lbl.brf1002.match.place | 文字列 | 場所 |
| 18 | LBL_SURFACE | lbl.brf1002.surface | 文字列 | サーフェス |

  - 値説明
  - lbl.<"comn" | 機能ID>.<label key>
  - msg.<"comn" | 機能ID>.<label key>

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
