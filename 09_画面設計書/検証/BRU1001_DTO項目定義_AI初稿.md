# BRU1001 DTO項目定義：AI作成初稿（検証用）

- 対象：`04_画面設計書(BRU1001：試合属性エントリ).md` の「（４）DTO項目定義」
- 本ファイルは既存の正本を更新せずに作成した比較用の初稿。
- AI担当範囲：画面にある25項目、物理名、型、既存Enum、既存ラベルキー。
- 開発者担当範囲：非表示管理項目の追記、入力制約・デフォルト・無効状態等の更新。
- 表中の `-` は開発者の追記・確認前であることを表し、未設定仕様として確定したものではない。

#### （４）DTO項目定義
| No | グループ | 論理名 | 物理名 | 型 | Enum型 | 無効状態 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 | デフォルト | ラベルキー | 備考 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | - | 試合ID | matchId | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_ID` | UUID |
| 02 | - | 試合CODE | matchCode | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_CODE` | 先頭ゼロ埋め |
| 03 | - | 試合日時 | matchDateTime | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_DATETIME` | UTC ISO 8601 |
| 04 | - | 試合名 | matchName | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_NAME` | - |
| 05 | - | 試合タイプ | matchType | Enum | Brf9010CodeMatchTypeEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_TYPE` | SINGLES=0、DOUBLES=1 |
| 06 | - | 選手名１ | singlesPlayer1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER1` | - |
| 07 | - | 選手名２ | singlesPlayer2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER2` | - |
| 08 | - | 選手名１ | doublesPlayerA1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA1` | - |
| 09 | - | 選手名２ | doublesPlayerA2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA2` | - |
| 10 | - | 選手名３ | doublesPlayerB1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB1` | - |
| 11 | - | 選手名４ | doublesPlayerB2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB2` | - |
| 12 | - | サーブ順(選手名S1) | serveNoSinglesPlayer1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 13 | - | サーブ順(選手名S2) | serveNoSinglesPlayer2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 14 | - | サーブ順(選手名DA1) | serveNoDoublesPlayerA1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 15 | - | サーブ順(選手名DA2) | serveNoDoublesPlayerA2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 16 | - | サーブ順(選手名DB1) | serveNoDoublesPlayerB1 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 17 | - | サーブ順(選手名DB2) | serveNoDoublesPlayerB2 | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 18 | - | リターン順(選手名DA1) | returnNoDoublesPlayerA1 | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 19 | - | リターン順(選手名DA2) | returnNoDoublesPlayerA2 | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 20 | - | リターン順(選手名DB1) | returnNoDoublesPlayerB1 | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 21 | - | リターン順(選手名DB2) | returnNoDoublesPlayerB2 | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 22 | - | 試合設定 | matchSetting | Enum | CatwCommonCodeBooleanEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_SETTING` | FALSE=0、TRUE=1 |
| 23 | - | セット設定 | setType | Enum | Brf9010CodeNumberOfSetsEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SET_TYPE` | SET_NON=0、SET1=1、SET3=3、SET5=5 |
| 24 | - | ゲーム確定 | gameFinalType | Enum | Brf9010CodeGameFinalEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_GAME_FINAL_TYPE` | DEUCE=0、NO_AD=1、SEMI_AD=2 |
| 25 | - | タイブレークモード | tieBreakMode | Enum | Brf9010CodeTieBreakEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_TIEBREAK_MODE` | WITH_TB=0、NO_TB=1 |

## 比較検証結果

| 検証項目 | 結果 |
| --- | --- |
| AI初稿の画面表示・入力項目 | 25件 |
| 現行設計書の画面表示・入力項目 | 25件 |
| 項目物理名・型・Enum型・ラベルキー | 25件一致 |
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
