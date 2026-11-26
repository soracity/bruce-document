## 列挙型設計書

#### 列挙型名称
- 論理名：試合状態
- 物理名：Brf9010CodeMatchStatusEnum
- ファイル名：brf9010-code-match-status.enum.ts

#### 列挙種別
- [ ] 一般列挙型
- [x] コード列挙型
- [ ] ラベル列挙型
- [ ] メッセージ列挙型

| 列挙種別 | 意味 |
|---|---|
| 一般列挙型 | 列挙名、値で構成される列挙型 |
| コード列挙型 | コード値の列挙型 |
| ラベル列挙型 | ラベルの列挙型 |
| メッセージ列挙型 | メッセージの列挙型 |

#### 列挙型パッケージ
io\github\soracity\bruce\brf9000\brf9010-enum\code

#### 列挙型定義
| No | 列挙名 | 値 | 型 | ラベルキー | アイコン | 説明 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | NOT_STARTED | 00 | 文字列 | lbl.code.not.started | schedule | 試合開始前 |
| 02 | IN_PROGRESS | 01 | 文字列 | lbl.code.in.progress | play_circle | 試合中 |
| 03 | FINISHED | 02 | 文字列 | lbl.code.finished | sports_score | 試合終了 |
| 04 | FINAL | 03 | 文字列 | lbl.code.final | verified | 試合確定 |

- ラベルキー：`lbl.code.` + 列挙名を小文字化し、`_`を`.`に置換する。

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
