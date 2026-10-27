## 列挙型設計書

#### 列挙型名称
- 論理名：共通メッセージキー
- 物理名：AppI18nMessageKeyCommonEnum
- ファイル名：app-i18n-message-key-common.enum.ts

#### 列挙種別
- [ ] 一般列挙型
- [ ] ラベル列挙型
- [x] メッセージ列挙型

| 列挙種別 | 意味 |
|---|---|
| 一般列挙型 | 列挙名、値で構成される列挙型 |
| ラベル列挙型 | ラベルの列挙型 |
| メッセージ列挙型 | メッセージの列挙型 |

#### 列挙型パッケージ
io\github\soracity\bruce\brf9000\brf9011-enum\i18n

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明  |
|---|---|---|---|---|
| 01 | MSG_DATA_NOT_FOUND | msg.common.data.not.found | 文字列 | データがありません |

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
