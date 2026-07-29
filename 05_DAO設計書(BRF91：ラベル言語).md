# DAO設計書

## １．概要
ラベル言語データを取得する

## ２．DAO定義
#### （１）DAO種別
- [ ] 更新系(INSERT, UPDATE, DELETE)
- [ ] 検索系(１件)
- [x] 検索系(複数件)

#### （２）DAO名称
- 論理名：BRI9100(ラベル言語一覧取得)
- 物理名：Bri9100LabelLanguageSelectDao
- ファイル名：bri9100-label-language-select.dao.ts

#### （３）パッケージ
app\brf9000\brf9010-i18n\infrastructure\dao-generate

#### （４）SQL
```
select language_code    as languageCode
     , language_name    as languageName
     , native_name      as nativeName
     , display_order    as displayOrder
     , disabled_flg     as disabledFlg
     , create_date_time as createDateTime
     , update_date_time as updateDateTime
     , delete_date_time as deleteDateTime
   from t_m_label_language
  where disabled_flg is null
  order by display_order;
```

## ３．入力パラメータ
#### （１）入力パラメータ種別
- [ ] 値形式
- [ ] インターフェイス形式
- [ ] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [x] パラメータ無し

#### （２）入力パラメータ名称
- 論理名：BRI9100(ラベル言語一覧取得)
- 物理名：Bri9100LabelLanguageSelectReqDto
- ファイル名：bri9100-label-language-select-req.dto.ts

#### （３）入力パラメータパッケージ
app\brf9000\brf9010-i18n\infrastructure\dto-generate

#### （４）入力パラメータ値
| No | 名称(論理名) | 名称(物理名) | 型 | 備考 |
| :--- | :--- | :--- | :--- | :--- |

## ４．出力パラメータ
#### （１）出力パラメータ種別
- [ ] 値形式
- [ ] インターフェイス形式
- [x] 型形式(ブランド有)
- [ ] 型形式(ブランド無)
- [ ] パラメータ無し

#### （２）出力パラメータ名称
- 論理名：BRI9100(ラベル言語一覧取得)
- 物理名：Bri9100LabelLanguageSelectResDto
- ファイル名：bri9100-label-language-select-res.dto.ts

#### （３）出力パラメータパッケージ
app\brf9000\brf9010-i18n\infrastructure\dto-generate

#### （４）出力パラメータ値
| No | 項目名（論理名） | 項目名（物理名） | 型 | 備考  |
| :--- | :--- | :--- | :--- | :--- |
| 01 | 言語コード | languageCode | 文字列 |   |
| 02 | 言語名（英語表記） | languageName | 文字列 |   |
| 03 | 言語名（ネイティブ） | nativeName | 文字列 |   |
| 04 | ソート順 | displayOrder | 数値 |   |
| 05 | 無効フラグ | disabledFlg | 文字列 |   |
| 06 | 作成日 | createDateTime | 文字列 |   |
| 07 | 更新日 | updateDateTime | 文字列 |   |
| 08 | 削除日 | deleteDateTime | 文字列 |   |

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

