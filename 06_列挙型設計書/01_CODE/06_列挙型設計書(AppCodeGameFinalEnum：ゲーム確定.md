## 列挙型設計書

#### 列挙型名称
- 論理名：ゲーム確定
- 物理名：Brf9010CodeGameFinalEnum
- ファイル名：brf9010-code-game-final.enum.ts

#### 列挙種別
- [ ] 一般列挙型
- [x] コード列挙型
- [ ] ラベル列挙型
- [ ] メッセージ列挙型

| 列挙種別 | 意味 |
|---|---| --- | --- |
| 一般列挙型 | 列挙名、値で構成される列挙型 |
| コード列挙型 | コード値の列挙型 |
| ラベル列挙型 | ラベルの列挙型 |
| メッセージ列挙型 | メッセージの列挙型 |

#### 列挙型パッケージ
io\github\soracity\bruce\brf9000\brf9010-enum\code

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 | ラベルキー | アイコン |
| --- | :--- | :--- | :--- | :--- |
| 01 | DEUCE | 0 | 文字列 | DEUCE | lbl.code.deuce | balance |
| 02 | NO_AD | 1 | 文字列 | NO_AD | lbl.code.no.ad | close |
| 03 | SEMI_AD | 2 | 文字列 | SEMI_AD | lbl.code.semi.ad | tune |

- ラベルキー：`lbl.code.` + 列挙名を小文字化し、`_`を`.`に置換する。

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
