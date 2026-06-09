# DAO設計書

## １．概要
PTN02 検索系（１件検索）：入力IF、出力プリミティブ

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [x] 検索系(１件)
- [ ] 検索系(複数件)

#### （２）DAO名称
- 論理名：PTN02
- 物理名：PTN02Dao
- ファイル名：ptn02.dao

#### （３）パッケージ
- パッケージ：daotest\dao-generated

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
- [ ] 値形式
- [x] インターフェイス形式
- [ ] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：PTN02
- 物理名：PTN02RequestDto
- ファイル名：ptn02-request.dto

#### （３）入力パラメータパッケージ
- パッケージ：daotest\dao-generated

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |
| 01 |試合ID    |matchId| 文字列 | --- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [x] 値形式
- [ ] インターフェイス形式
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：【値形式のため未定義】
- 物理名：【値形式のため未定義】
- ファイル名：【値形式のため未定義】

#### （３）出力パラメータパッケージ
- パッケージ：【値形式のため未定義】

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

