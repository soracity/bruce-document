## 列挙型設計書

#### 列挙型名称
- 論理名：ラベルキー
- 物理名：AppI18nLabelKeyBrf1001Enum
- ファイル名：app-i18n-label-key-brf1001.enum.ts

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
app\brf9000\brf9011-enum\i18n

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
|---|---|---|---|---|
| 01 | LBL_MATCH_ID | lbl.brf1001.match.id | 文字列 | 試合ID |
| 02 | LBL_MATCH_DATETIME | lbl.brf1001.match.date.time | 文字列 | 試合日時 |
| 03 | LBL_MATCH_NAME | lbl.brf1001.match.name | 文字列 | 試合名 |
| 04 | LBL_MATCH_TYPE | lbl.brf1001.match.type | 文字列 | 試合タイプ |
| 05 | LBL_SINGLES_PLAYER1 | lbl.brf1001.singles.player.1 | 文字列 | 選手名１ |
| 06 | LBL_SINGLES_PLAYER2 | lbl.brf1001.singles.player.2 | 文字列 | 選手名２ |
| 07 | LBL_DOUBLES_PLAYERA1 | lbl.brf1001.doubles.player.a1 | 文字列 | 選手名１ |
| 08 | LBL_DOUBLES_PLAYERA2 | lbl.brf1001.doubles.player.a2 | 文字列 | 選手名２ |
| 09 | LBL_DOUBLES_PLAYERB1 | lbl.brf1001.doubles.player.b1 | 文字列 | 選手名３ |
| 10 | LBL_DOUBLES_PLAYERB2 | lbl.brf1001.doubles.player.b2 | 文字列 | 選手名４ |
| 11 | LBL_MATCH_SETTING | lbl.brf1001.match.setting | 文字列 | ゲーム設定 |
| 12 | LBL_SET_TYPE | lbl.brf1001.set.type | 文字列 | セット設定 |
| 13 | LBL_GAME_FINAL_TYPE | lbl.brf1001.gamefinal.type | 文字列 | ゲーム確定 |
| 14 | LBL_MATCH_STATUS | lbl.brf1001.match.status | 文字列 | 状態 |
| 15 | LBL_TIEBREAK_MODE | lbl.brf1001.tiebreak.mode | 文字列 | タイブレークモード |
| 16 | LBL_SERVE_ROTATION | lbl.brf1001.serve.rotation | 文字列 | サーバー順 |
| 17 | LBL_RETURN_ROTATION | lbl.brf1001.return.rotation | 文字列 | リターン順 |
| 18 | LBL_MATCH_TYPE_SINGLES | lbl.brf1001.match.type.singles | 文字列 | シングルス |
| 19 | LBL_MATCH_TYPE_DOUBLES | lbl.brf1001.match.type.doubles | 文字列 | ダブルス |
| 20 | LBL_MATCH_SETTING_ON | lbl.brf1001.match.setting.on | 文字列 | オン |
| 21 | LBL_MATCH_SETTING_OFF | lbl.brf1001.match.setting.off | 文字列 | オフ |
| 22 | LBL_SET_TYPE_OFF | lbl.brf1001.set.type.off | 文字列 | オフ |
| 23 | LBL_SET_TYPE_1 | lbl.brf1001.set.type.1 | 文字列 | １セット |
| 24 | LBL_SET_TYPE_3 | lbl.brf1001.set.type.3 | 文字列 | ３セット |
| 25 | LBL_SET_TYPE_5 | lbl.brf1001.set.type.5 | 文字列 | ５セット |
| 26 | LBL_GAME_FINAL_TYPE_DUCE | lbl.brf1001.gamefinal.type.duce | 文字列 | デュース |
| 27 | LBL_GAME_FINAL_TYPE_SEMIAD | lbl.brf1001.gamefinal.type.semiad | 文字列 | セミアド |
| 28 | LBL_GAME_FINAL_TYPE_NOAD | lbl.brf1001.gamefinal.type.noad | 文字列 | ノーアド |
| 29 | LBL_MATCH_STATUS_NOT_READY | lbl.brf1001.match.status.not.ready | 文字列 | 試合開始前 |
| 30 | LBL_MATCH_STATUS_SCORING | lbl.brf1001.match.status.scoring | 文字列 | スコア入力中 |
| 31 | LBL_MATCH_STATUS_FINISHED | lbl.brf1001.match.status.finished | 文字列 | 試合終了 |
| 32 | LBL_MATCH_STATUS_SCORE_FINAL | lbl.brf1001.match.status.score.final | 文字列 | スコア確定 |
| 33 | LBL_TIEBREAK_MODE_ON | lbl.brf1001.tiebreak.mode.on | 文字列 | オン |
| 34 | LBL_TIEBREAK_MODE_OFF | lbl.brf1001.tiebreak.mode.off | 文字列 | オフ |
| 35 | LBL_COURT_DEUCE_SIDE | lbl.brf1001.court.deuce.side | 文字列 | デュースサイド(正式名) |
| 36 | LBL_COURT_AD_SIDE | lbl.brf1001.court.ad.side | 文字列 | アドバンテージサイド(正式名) |
| 37 | LBL_COURT_DEUCE | lbl.brf1001.court.deuce | 文字列 | デュースサイド(略名) |
| 38 | LBL_COURT_AD | lbl.brf1001.court.ad | 文字列 | アドバンテージサイド(略名) |

  - 値説明
  - lbl.<"comn" | 機能ID>.<label key>
  - msg.<"comn" | 機能ID>.<label key>

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
