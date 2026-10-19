## 列挙型設計書

#### 列挙型名称
- 論理名：文字列表示方式
- 物理名：AppCodeTextOverflowModeEnum
- ファイル名：app-code-text-overflow-mode.enum.ts

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
app\brf9000\brf9011-enum\code

#### 列挙型定義
| No | 列挙名 | 値 | 型 | 説明 |
|---|---|---|---|---|
| 01 | WRAP | wrap | 文字列 | 表示領域に収まらない文字列を複数行に折り返して全文を表示する |
| 02 | MARQUEE_BOUNCE | marquee_bounce | 文字列 | 左から右へ流れ、右端で反転して左へ流れる。左右の端で方向を変え、往復する |
| 03 | MARQUEE_RESTART | marquee_restart | 文字列 | 左から右へ流れ、右端に達すると左の先頭位置へ戻り、再び右へ流れる。逆方向には流れない |
| 04 | ELLIPSIS | ellipsis | 文字列 | 表示領域に収まらない文字列の末尾を省略記号（…）で表示する |

  - 値説明
  - lbl.<"comn" | 機能ID>.<label key>
  - msg.<"comn" | 機能ID>.<label key>

#### 留意事項
- 型
  - 文字列：string
  - 数値：number
- 列挙型定義テーブルの型はすべて同じ必要があります
- ACGによるTypeScript列挙型の自動生成用設計書。生成対象のTypeScriptソースを手書きで追加するものではありません。
- 本列挙型は共通LabelComponentの長文表示方式をComponentパラメーターから指定する用途を想定します。
- WRAP／MARQUEE_BOUNCE／MARQUEE_RESTART／ELLIPSISは互いに排他的な表示方式であり、Componentの同一パラメーターから1つ選択します。
- マーキーの方向指定用に別の列挙型やComponentパラメーターを設けません。旧AppCodeMarqueeModeEnumの案は本設計に統合して廃止します。
- Componentの幅が縮小されても、文字サイズは自動縮小しません（Phase 2.4.2承認事項）。
- **設計状態**：パラメーターによる表示方式の選択は承認済み。**WRAP・MARQUEE_BOUNCE・MARQUEE_RESTART・ELLIPSISの4種類と各値はユーザー提示に基づき承認済み**です。物理名・ファイル名および既定値は未承認の設計案です。
- **未決事項**：表示方式パラメーターの正式名称、既定値、マーキーの速度・停止時間などの詳細、Button等ほかのComponentへの適用範囲。実装・ACG生成・検証は未着手です。
