# BRU1001 DTO項目定義：AI作成初稿（検証用）

- 対象：`04_画面設計書(BRU1001：試合属性エントリ).md` の「（４）DTO項目定義」
- 本ファイルは既存の正本を更新せずに作成した比較用の初稿。
- AI担当範囲：画面にある25項目、物理名、コンポーネント名、型、既存Enum、既存ラベルキー。
- 開発者担当範囲：非表示管理項目の追記、入力制約・デフォルト・無効状態等の更新。
- 表中の `-` は開発者の追記・確認前であることを表し、未設定仕様として確定したものではない。
- 「（４）DTO項目定義」に入力部品と、DTOを持たないグループ見出し・列見出しを**同じ表の行**として記載する。DTO対象列の`〇`は生成対象、`-`は表示専用を示す。管理用の非表示項目は開発者が追記する。
- **ACG互換性の注意：** 現行17列の「グループ」を「DTO対象」に改名し「コンポーネント名」を追加した18列の検証用定義であり、ACGがこの列を安全に無視または解析できることは未確認。ACG対応を確認するまでは、コード生成用の正本を変更しない。

#### （４）DTO項目定義
| No | DTO対象 | 論理名 | 物理名 | コンポーネント名 | 型 | Enum型 | 無効状態 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 | デフォルト | ラベルキー | 備考 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | 基本情報 | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_BASIC_INFO` | 新規ラベルキー候補 |
| 02 | 〇 | 試合ID | matchId | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_ID` | UUID |
| 03 | 〇 | 試合CODE | matchCode | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_CODE` | 先頭ゼロ埋め |
| 04 | 〇 | 試合日時 | matchDateTime | `app-date` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_DATETIME` | UTC ISO 8601 |
| 05 | 〇 | 試合名 | matchName | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_NAME` | - |
| 06 | 試合タイプ（グループ） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_TYPE` | 既存 |
| 07 | 〇 | 試合タイプ | matchType | `app-radio` | Enum | Brf9010CodeMatchTypeEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_TYPE` | SINGLES=0、DOUBLES=1 |
| 08 | 選手（シングルス） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_PLAYERS` | 新規ラベルキー候補 |
| 09 | 〇 | 選手名１ | singlesPlayer1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER1` | - |
| 10 | 〇 | 選手名２ | singlesPlayer2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SINGLES_PLAYER2` | - |
| 11 | 選手A | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_PLAYER_A` | 新規ラベルキー候補 |
| 12 | 〇 | 選手名１ | doublesPlayerA1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA1` | - |
| 13 | 〇 | 選手名２ | doublesPlayerA2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERA2` | - |
| 14 | 選手B | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_PLAYER_B` | 新規ラベルキー候補 |
| 15 | 〇 | 選手名３ | doublesPlayerB1 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB1` | - |
| 16 | 〇 | 選手名４ | doublesPlayerB2 | `app-textbox` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_DOUBLES_PLAYERB2` | - |
| 17 | 〇 | サーブ順(選手名S1) | serveNoSinglesPlayer1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 18 | 〇 | サーブ順(選手名S2) | serveNoSinglesPlayer2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 19 | サーブ順（選手A見出し） | - | app-label | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | 既存。現行HTMLは「サービス」 |
| 20 | 〇 | サーブ順(選手名DA1) | serveNoDoublesPlayerA1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 21 | 〇 | サーブ順(選手名DA2) | serveNoDoublesPlayerA2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 22 | サーブ順（選手B見出し） | - | app-label | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | 既存。現行HTMLは「サービス」 |
| 23 | 〇 | サーブ順(選手名DB1) | serveNoDoublesPlayerB1 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 24 | 〇 | サーブ順(選手名DB2) | serveNoDoublesPlayerB2 | `app-toggle` | 文字列 | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SERVE_ROTATION` | - |
| 25 | リターン順（選手A見出し） | - | app-label | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | 既存。現行HTMLは「リターン」 |
| 26 | 〇 | リターン順(選手名DA1) | returnNoDoublesPlayerA1 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 27 | 〇 | リターン順(選手名DA2) | returnNoDoublesPlayerA2 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 28 | リターン順（選手B見出し） | - | app-label | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | 既存。現行HTMLは「リターン」 |
| 29 | 〇 | リターン順(選手名DB1) | returnNoDoublesPlayerB1 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 30 | 〇 | リターン順(選手名DB2) | returnNoDoublesPlayerB2 | `app-toggle` | Enum | Brf9010CodeCourtSideEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_RETURN_ROTATION` | DEUCE_SIDE=0、AD_SIDE=1 |
| 31 | ゲーム設定（グループ） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_SETTING` | 既存 |
| 32 | 〇 | 試合設定 | matchSetting | `app-toggle` | Enum | CatwCommonCodeBooleanEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_MATCH_SETTING` | FALSE=0、TRUE=1 |
| 33 | セット設定（グループ） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SET_TYPE` | 既存 |
| 34 | 〇 | セット設定 | setType | `app-radio` | Enum | Brf9010CodeNumberOfSetsEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_SET_TYPE` | SET_NON=0、SET1=1、SET3=3、SET5=5 |
| 35 | ゲーム確定（グループ） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_GAME_FINAL_TYPE` | 既存 |
| 36 | 〇 | ゲーム確定 | gameFinalType | `app-radio` | Enum | Brf9010CodeGameFinalEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_GAME_FINAL_TYPE` | DEUCE=0、NO_AD=1、SEMI_AD=2 |
| 37 | タイブレークモード（グループ） | - | app-group | - | - | - | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_TIEBREAK_MODE` | 既存 |
| 38 | 〇 | タイブレークモード | tieBreakMode | `app-radio` | Enum | Brf9010CodeTieBreakEnum | - | - | - | - | - | - | - | - | - | `Brf9010I18nLabelKeyBrf1001Enum.LBL_TIEBREAK_MODE` | WITH_TB=0、NO_TB=1 |

本表はDTO対象（`〇`）と表示専用（`-`）を同一の18列表にまとめた検証案です。ラベルキーの「新規候補」は未定義の名称であり、翻訳データやEnumの作成は未実施です。表示専用行はACGでFormControlを生成しません。

## 比較検証結果

| 検証項目 | 結果 |
| --- | --- |
| AI初稿の画面表示・入力項目 | 25件 |
| 現行設計書の画面表示・入力項目 | 25件 |
| 項目物理名・型・Enum型・ラベルキー | 25件一致 |
| DTO連携コンポーネント名 | HTMLに基づき25件設定（Textbox 9件、Date 1件、Radio 4件、Toggle 11件） |
| DTOを持たない見出し・列見出し | 同じ表に13行追加（Group 9件、Label 4件） |
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
