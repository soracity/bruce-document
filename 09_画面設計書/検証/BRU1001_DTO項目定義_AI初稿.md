# BRU1001 DTO項目定義：AI作成初稿（検証用）

- 対象：`04_画面設計書(BRU1001：試合属性エントリ).md` の「（４）DTO項目定義」
- 本ファイルは既存の正本を更新せずに作成した比較用の初稿。
- AI担当範囲：画面にある25項目、物理名、コンポーネント名、型、既存Enum、既存ラベルキー。
- 開発者担当範囲：非表示管理項目の追記、入力制約・デフォルト・無効状態等の更新。
- 表中の `-` は開発者の追記・確認前であることを表し、未設定仕様として確定したものではない。
- 「（４）DTO項目定義」のコンポーネント名はDTO項目に結び付く入力部品を表す。DTO項目に結び付かないグループ見出し・列見出しは別表の「表示専用コンポーネント定義」にまとめ、設計から漏らさない。管理用の非表示項目には対応する画面部品はない。
- **ACG互換性の注意：** 現行の17列に1列追加した18列の検証用定義であり、ACGがこの列を安全に無視または解析できることは未確認。ACG対応を確認するまでは、コード生成用の正本を変更しない。

#### （４）DTO項目定義
| No | グループ | 論理名 | 物理名 | コンポーネント名 | 型 | Enum型 | 無効状態 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 | デフォルト | ラベルキー | 備考 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | - | 試合ID | matchId | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_ID` | UUID |
| 02 | - | 試合CODE | matchCode | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_CODE` | 先頭ゼロ埋め |
| 03 | - | 試合日時 | matchDateTime | `app-date` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_DATETIME` | UTC ISO 8601 |
| 04 | - | 試合名 | matchName | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_NAME` | - |
| 05 | - | 試合タイプ | matchType | `app-radio` | Enum | Brf9010CodeMatchTypeEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_TYPE` | SINGLES=0、DOUBLES=1 |
| 06 | - | 選手名１ | singlesPlayer1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER1` | - |
| 07 | - | 選手名２ | singlesPlayer2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER2` | - |
| 08 | - | 選手名１ | doublesPlayerA1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA1` | - |
| 09 | - | 選手名２ | doublesPlayerA2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA2` | - |
| 10 | - | 選手名３ | doublesPlayerB1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB1` | - |
| 11 | - | 選手名４ | doublesPlayerB2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB2` | - |
| 12 | - | サーブ順(選手名S1) | serveNoSinglesPlayer1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 13 | - | サーブ順(選手名S2) | serveNoSinglesPlayer2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 14 | - | サーブ順(選手名DA1) | serveNoDoublesPlayerA1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 15 | - | サーブ順(選手名DA2) | serveNoDoublesPlayerA2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 16 | - | サーブ順(選手名DB1) | serveNoDoublesPlayerB1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 17 | - | サーブ順(選手名DB2) | serveNoDoublesPlayerB2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 18 | - | リターン順(選手名DA1) | returnNoDoublesPlayerA1 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 19 | - | リターン順(選手名DA2) | returnNoDoublesPlayerA2 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 20 | - | リターン順(選手名DB1) | returnNoDoublesPlayerB1 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 21 | - | リターン順(選手名DB2) | returnNoDoublesPlayerB2 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 22 | - | 試合設定 | matchSetting | `app-toggle` | Enum | CatwCommonCodeBooleanEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_SETTING` | FALSE=0、TRUE=1 |
| 23 | - | セット設定 | setType | `app-radio` | Enum | Brf9010CodeNumberOfSetsEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SET_TYPE` | SET_NON=0、SET1=1、SET3=3、SET5=5 |
| 24 | - | ゲーム確定 | gameFinalType | `app-radio` | Enum | Brf9010CodeGameFinalEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_GAME_FINAL_TYPE` | DEUCE=0、NO_AD=1、SEMI_AD=2 |
| 25 | - | タイブレークモード | tieBreakMode | `app-radio` | Enum | Brf9010CodeTieBreakEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_TIEBREAK_MODE` | WITH_TB=0、NO_TB=1 |


## 表示専用コンポーネント定義（DTO項目なし）

画面の構成要素には、DTOのFormControlを持たない`app-group`（見出し・囲み）や`app-label`（列見出し）もあるため、これらをDTO項目定義とは分けて管理する。**本表の項目はDTO生成対象ではない。** 表示文言はユーザー提示の画像と現行HTMLの両方を確認した。

| No | 表示位置・用途 | 画像の表示名 | 現行HTMLの表示名／設定 | コンポーネント名 | DTO物理名 | 表示条件 |
| --- | --- | --- | --- | --- | --- | --- |
| UI01 | 基本情報グループ | 基本情報 | `label="基本情報"` | `app-group` | - | 常時 |
| UI02 | 試合タイプグループ | 試合タイプ | `[labelKey]="LabelKey.LBL_MATCH_TYPE"` | `app-group` | - | 常時 |
| UI03 | シングルス選手グループ | 選手 | `label="選手"` | `app-group` | - | SINGLES |
| UI04 | ダブルスAグループ | 選手A | `label="選手 A"` | `app-group` | - | DOUBLES |
| UI05 | ダブルスA：サーブ順列見出し | サーブ順 | `label="サービス"` | `app-label` | - | DOUBLES |
| UI06 | ダブルスA：リターン順列見出し | リターン順 | `label="リターン"` | `app-label` | - | DOUBLES |
| UI07 | ダブルスBグループ | 選手B | `label="選手 B"` | `app-group` | - | DOUBLES |
| UI08 | ダブルスB：サーブ順列見出し | サーブ順 | `label="サービス"` | `app-label` | - | DOUBLES |
| UI09 | ダブルスB：リターン順列見出し | リターン順 | `label="リターン"` | `app-label` | - | DOUBLES |
| UI10 | ゲーム設定グループ | ゲーム設定 | `[labelKey]="LabelKey.LBL_MATCH_SETTING"` | `app-group` | - | 常時 |
| UI11 | セット設定のラジオグループ見出し | セット設定 | `[labelKey]="LabelKey.LBL_SET_TYPE"` | `app-group` | - | 常時 |
| UI12 | ゲーム確定のラジオグループ見出し | ゲーム確定 | `[labelKey]="LabelKey.LBL_GAME_FINAL_TYPE"` | `app-group` | - | 常時 |
| UI13 | タイブレークのラジオグループ見出し | タイブレークモード | `[labelKey]="LabelKey.LBL_TIEBREAK_MODE"` | `app-group` | - | 常時 |

### 表示文言の差異と多言語対応

- 提示された画像の「サーブ順」「リターン順」は、現行HTMLではそれぞれ「サービス」「リターン」である。**両者を同一の表示仕様として扱わず、どちらの文言を採用するかの確認事項として残す。**
- UI04・UI07の`選手 A`・`選手 B`は現行HTMLに直接記載されている。画像では「選手A」「選手B」となっており、空白の有無も差異がある。
- `label="..."`を直接指定しているグループ名・列見出しは現行HTMLではラベルキーを使用していない。多言語対応用のラベルキーは既存資産を調査してから割り当て、存在しないキーを既存として扱わない。
- `app-layout-item`、`app-item-stack-layout`などのレイアウト専用タグはDTO項目ではなく、配置仕様で管理する。
- この表を「（４）DTO項目定義」の行として混入させると、ACGが余分なFormControlを生成する可能性があるため、コード生成対象から分離する。


## 比較検証結果

| 検証項目 | 結果 |
| --- | --- |
| AI初稿の画面表示・入力項目 | 25件 |
| 現行設計書の画面表示・入力項目 | 25件 |
| 項目物理名・型・Enum型・ラベルキー | 25件一致 |
| DTO連携コンポーネント名 | HTMLに基づき25件設定（Textbox 9件、Date 1件、Radio 4件、Toggle 11件） |
| DTOを持たない見出し・列見出し | 13箇所を別表に追記（Group 9件、Label 4件） |
| 非表示の管理項目 | 現行設計書は4件（AI初稿には含めない） |
| 入力制約・初期値・無効状態 | 開発者担当のため、初稿では未指定 |
| 新規Enum定義 | 不要（既存Enumを再利用） |

### 開発者が追加する非表示管理項目

| 物理名 | 現行の型 |
| --- | --- |
| `matchStatus` | `Brf9010CodeMatchStatusEnum` |
| `createDateTime` | 文字列 |
| `updateDateTime` | 文字列 |
| `deleteDateTime` | 文字列 |

## 検証上の注意

- 既存EnumはBruceの定義ソース、ラベルキーは`Brf9010I18nLabelKeyBrf1001Enum`の定義ソースを照合済み。
- `CatwCommonCodeBooleanEnum`は既存DTOでの使用を確認済み（共通ライブラリ本体の定義ファイルまでは本検証では未確認）。
- 実際のACG生成は未実施。開発者が本初稿を補完し、設計書へ反映してから実施する。
- 既存設計書・生成済みDTO・アプリのコードは変更していない。
