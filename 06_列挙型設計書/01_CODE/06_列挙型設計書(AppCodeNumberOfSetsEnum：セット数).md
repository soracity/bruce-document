## 列挙型設計書

#### 列挙型名称
- 論理名：セット数
- 物理名：Brf9010CodeNumberOfSetsEnum
- ファイル名：brf9010-code-number-of-sets.enum.ts

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
| No | 列挙名 | 値 | 型 | 説明 | ラベルキー | アイコン |
| --- | :--- | :--- | :--- | :--- | --- | --- |
| 00 | SET1 | 1 | 文字列 | SET1 | lbl.code.set1 | looks_one |
| 01 | SET3 | 3 | 文字列 | SET3 | lbl.code.set3 | looks_3 |
| 02 | SET5 | 5 | 文字列 | SET5 | lbl.code.set5 | looks_5 |
| 03 | SET_NON | 0 | 文字列 | セットなし | lbl.code.set.non | remove_circle |

- ラベルキー：`lbl.code.` + 列挙名を小文字化し、`_`を`.`に置換する。

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
