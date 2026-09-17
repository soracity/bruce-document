## 列挙型設計書

#### 列挙型名称
- 論理名：ラベルキー
- 物理名：AppI18nLabelKeyEnum
- ファイル名：app-i18n-label-key.enum.ts

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
| No | 列挙名 | 値 | 型 | 説明  |
|---|---|---|---|---|
| 01 | COMMON_ADDRESS | lbl.common.address | 文字列 | 住所  |
| 02 | COMMON_PHONENUMBER | lbl.common.phoneNumber | 文字列 | 電話番号  |
| 03 | BUTTON_SAVE | lbl.button.save | 文字列 | 保存ボタン  |
| 04 | BUTTON_CANCEL | lbl.button.cancel | 文字列 | キャンセル  |
| 05 | MENU_DOUBLE_FAULT | lbl.menu.double_fault | 文字列 | ダブルフォルト  |
| 06 | MENU_DROP | lbl.menu.drop | 文字列 | ドロップ  |
| 07 | MENU_OTHER | lbl.menu.other | 文字列 | その他  |
| 08 | MENU_FORCED_ERROR | lbl.menu.forced_error | 文字列 | フォーストエラー  |
| 09 | MENU_GROUND_STROKE | lbl.menu.ground_stroke | 文字列 | グラウンドストローク  |
| 10 | MENU_LOB | lbl.menu.lob | 文字列 | ロブ  |
| 11 | MENU_NET | lbl.menu.net | 文字列 | ネット  |
| 12 | MENU_OUT | lbl.menu.out | 文字列 | アウト  |
| 13 | MENU_PASSING | lbl.menu.passing | 文字列 | パッシング  |
| 14 | MENU_RETURN | lbl.menu.return | 文字列 | リターン  |
| 15 | MENU_RETURN_ACE | lbl.menu.return_ace | 文字列 | リターンエース  |
| 16 | MENU_RETURN_ERROR | lbl.menu.return_error | 文字列 | リターンエラー  |
| 17 | MENU_SERVICE | lbl.menu.service | 文字列 | サービス  |
| 18 | MENU_SERVICE_ACE | lbl.menu.service_ace | 文字列 | サービスエース  |
| 19 | MENU_SMASH | lbl.menu.smash | 文字列 | スマッシュ  |
| 20 | MENU_UNFORCED_ERROR | lbl.menu.unforced_error | 文字列 | アンフォーストエラー  |
| 21 | MENU_VOLLEY | lbl.menu.volley | 文字列 | ボレー  |
| 22 | MENU_WINNER | lbl.menu.winner | 文字列 | ウィナー  |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
