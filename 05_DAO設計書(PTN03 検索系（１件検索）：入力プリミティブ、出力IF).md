# DAO設計書

## １．概要
PTN03 検索系（１件検索）：入力プリミティブ、出力IF

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [x] 検索系(１件)
- [ ] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN03
- 物理名：PTN03Dao
- ファイル名：ptn03.dao.ts

#### （３）パッケージ
daotest

#### （４）SQL
```
select matchId
      , matchDateTime
      , matchName
      , matchType
      , singlesPlayer1
      , singlesPlayer2
      , doublesPlayerA1
      , doublesPlayerA2
      , doublesPlayerB1
      , doublesPlayerB2
      , matchSetting
      , setType
      , gameFinalType
      , matchStatus
      , tieBreakMode
      , serveRotation
      , returnRotation
      , createDateTime
      , updateDateTime
      , deleteDateTime
  from t_matches
  where matchId = :matchId
  order by matchId;
```

## ３．入力パラメータ
#### （１）入力パラメータ種別
- [x] 値形式
- [ ] インターフェイス形式
- [ ] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：【値形式のため未定義】
- 物理名：【値形式のため未定義】
- ファイル名：【値形式のため未定義】

#### （３）入力パラメータパッケージ
【値形式のため未定義】

#### （４）入力パラメータ値
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
| 16 |サーバー順| serveRotation| 文字列 | --- |
| 17 |リターン順| returnRotation| 文字列 | --- |
| 18 |作成日| createDateTime| 文字列 | --- |
| 19 |更新日| updateDateTime| 文字列 | --- |
| 20 |削除日| deleteDateTime| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [　] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：PTN03
- 物理名：PTN03ResponseDto
- ファイル名：ptn03-response.dto.ts

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
| 16 |サーバー順| serveRotation| 文字列 | --- |
| 17 |リターン順| returnRotation| 文字列 | --- |
| 18 |作成日| createDateTime| 文字列 | --- |
| 19 |更新日| updateDateTime| 文字列 | --- |
| 20 |削除日| deleteDateTime| 文字列 | --- |

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

