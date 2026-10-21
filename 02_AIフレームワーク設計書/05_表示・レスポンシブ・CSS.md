# 表示・レスポンシブ・CSS設計（暫定・全件監査前）

根拠：[2.4](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_04_レスポンシブ・折り返し.md)、[2.5](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_05_任意CSS注入の排除.md)、[3.1](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase3_01_共通スタイル.md)。

| ID | 現行設計原則 |
|---|---|
| BRUCE-DISPLAY-001 | 文字あふれ方式はWRAP、MARQUEE_BOUNCE、MARQUEE_RESTART、ELLIPSISの4方式を区別する。 |
| BRUCE-DISPLAY-002 | 文字が領域に収まる場合はマーキーを動かさない。文字サイズ縮小を代替手段にしない。 |
| BRUCE-DISPLAY-003 | 画面側からComponent内部へclassContainer/classInput/classLabel/classSpan等の任意CSSを注入しない。Componentの見た目は内部で管理する。 |
| BRUCE-DISPLAY-004 | HeaderのclassContainerとTabBarのclassTabBarは既存見た目を保ちつつComponent内部へ移行して廃止する（実装未実施）。 |
| BRUCE-DISPLAY-005 | iOS/Androidのセーフエリア、表示サイズ、キーボード、テーマ、タップ領域、スクロール競合を後続検証する。 |

## 注意

この文書は関連議事録の全文照合前の暫定整理。マーキーの移動方向・停止・再開の厳密な動作条件や既存例外、各Componentの詳細値は原典抽出・照合を追加する。ここにない項目を「存在しない」と判断してはならない。

## Phase 2.5 任意CSS注入排除：原典照合・移行設計（2026-10-21）

照合元：[Phase 2.5](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_05_任意CSS注入の排除.md) の2.5.1〜2.5.3。**同議事録との照合であり、全旧新議事録の双方向監査完了ではない**。

### 承認された責務境界

画面は**共通Componentの公開仕様で許された表示設定**を指定できる。画面による背景色選択自体は禁止しない。ただし共通Component内部のDOM構造・CSS実現方法・指定可能な値は共通Componentが管理し、画面から任意class文字列を注入しない。外部配置はLayoutManagerが担当する。内部CSS（Radioの選択肢、Alertのアイコン、Textboxのinput、Buttonの文字など）は各Componentが管理する。variant/size等の意味的Inputは**実要件がある場合のみ**追加する。

段階廃止対象の例：classContainer、classInput、classLabel、classSpan、classButton、classRadioItem、classLabelSpan、classMessageContainer、classButtonContainer、classAlertBox、classMessage、classMessageIcon。上記以外の同種APIも同じ原則で扱う。設計承認を理由に即時一括削除して既存画面を破壊しない。

### 2.5.2 ソース調査の事実（2026-10-19時点）

対象は `soracity/bruce` の `feature/feature-20261015`、`src/app` 内の実行時HTML **25ファイル**、Component/Directive/基底TS **27ファイル**（テスト・バックアップ・Enum除外）。**これは当時の議事録記載の調査結果であり、今回の最新ソース再調査を意味しない。**

| 対象 | 当時の検出数 | 呼出元と実際の注入経路 |
|---|---:|---|
| TableCell | 12 | `brf1000/brf1002/ui/components/bru1002.component.html`：`class="bg-base-200"` 11箇所（45,50,55,60,65,71,84,97,111,119,127行）、`[class]="getMatchStatusColor(...)"` 1箇所（39〜43行）。ホストclass→`cellClasses`→内部td/thの[class] |
| Header | 1 | `brf8000/brf8010/ui/components/app-layout/app-layout.component.html`：`[classContainer]`→Header内部header[class] |
| TabBar | 1 | 同AppLayout：`[classTabBar]`→TabBar内部nav[class] |

計 **3経路・14箇所**。主要BRF9020共通Componentの専用class注入Inputは調査範囲内で検出されなかったが、Header/TabBarには残存。ネイティブHTMLのclass、Component内部固定class、限定フラグ由来のclassはこの14件と混同しない。

### 2.5.3 承認済みの置換仕様と作業順

1. **TableCell**：背景色を画面から意味的Enumで指定し、内部CSSに対応付ける。既存の固定11件・動的1件の呼出しを置換してから、`cellClasses` と内部セルへの任意class転送を廃止する。
2. **Header**：`classContainer` Inputを廃止し、既存 `navbar bg-base-300 shadow-sm h-[4rem] shrink-0` 相当の見た目をHeader内部の標準スタイルへ移管する。
3. **TabBar**：`classTabBar` Inputを廃止し、既存 `bg-base-300 h-[4rem] shrink-0 flex items-center justify-around` 相当の見た目をTabBar内部の標準スタイルへ移管する。
4. 置換後に未使用の任意CSS Input・転送処理を削除し、Componentテスト・API利用例を更新する。新しい別名の任意CSS注入APIで代替しない。

**現行仕様（後日承認優先）**：TableCellと一般Componentの背景・文字色は共通`AppUiColorEnum`（11色）で指定し、共通`UiStyleUtil`の固定クラス変換を利用する。未指定は`undefined`。TableCellの状態色ERROR/INFO/WARNING/SUCCESSは従来の20%背景表示を維持し、`backgroundOpacity` Inputは追加しない。`cellClasses`による任意クラス転送とTailwindクラス名の動的組立ては禁止する。

**旧仕様（履歴のみ・実装指示ではない）**：2026-10-20のPhase 2.5.3では専用`AppComponentTableCellBackgroundEnum`（DEFAULT/LABEL/ERROR/INFO/WARNING/SUCCESS）と省略時DEFAULTが承認されていた。その後のPhase 3.1/3.4承認で共通`AppUiColorEnum`に統合されたため、**旧専用Enumの新規ACG生成・新規利用は禁止**する。旧DEFAULTは現行の未指定`undefined`と同一とは断定せず、旧LABELの表示は共通BASE_200との対応を既存表示と照合する。旧画面からの具体的な置換、状態色と通常色の識別、CSS優先順位は設計未決としてPhase 5着手前に解消する。

### 回帰テストと完了条件

| ID | 対象 | 合格条件 |
|---|---|---|
| CSS-01 | TableCell固定背景11箇所 | 置換前後で従来のbg-base-200相当の表示を維持 |
| CSS-02 | TableCell動的背景1箇所 | 試合状態ごとの4色を維持 |
| CSS-03 | TableCell共通状態 | テーマ変更、zebra/selected/stickyとの優先関係を確認 |
| CSS-04 | Header | 既存の高さ・背景色・影・配置を維持 |
| CSS-05 | TabBar | 既存の高さ・背景色・配置を維持 |
| CSS-06 | API廃止 | 呼出し置換後に任意class転送を廃止、画面から内部DOMを操作しない |
| CSS-07 | ACG・利用例 | 最新承認のEnumをACG生成し、Componentテスト・API例を更新 |

**状態**：2.5.1〜2.5.3の基本方針・置換方針は承認済み。実装未着手、回帰検証未実施。最新Enumとの整合、既存コードの再調査、CSS優先順位の実装詳細は未完了。Phase 5開始の許可ではない。

## Phase 2.4 受入条件の追加照合（2026-10-21）

原典：01_ai-document/phase2_04_レスポンシブ・折り返し.md。

- LabelとButtonは文字あふれ方式を同一の4値（WRAP / MARQUEE_BOUNCE / MARQUEE_RESTART / ELLIPSIS）から選択し、省略時はいずれもWRAPとする。
- MARQUEE_BOUNCEは端で反転する往復、MARQUEE_RESTARTは端まで流れて先頭に戻る方式。表示領域に文字列が収まる場合は動作させない。内容・言語・幅の変更後も判定を更新する。
- 画面幅が狭い場合は各Componentの必要幅とgapで折り返し、各行の元Spanの相対比率を維持して再配分する。幅不足時は利用可能幅へ縮小し、フォントサイズを自動縮小しない。
- スマートフォン受入条件No.1：項目の重なりと意図しない画面外はみ出しを防ぐ。内部スクロールを持つTableは例外。
- No.2：Buttonのサイズ・padding・タップ領域・配置は承認済み仕様どおり。AIが独自の最小寸法を追加しない。従来のAI裁量によるタップ領域確保案は否認済み。
- No.3：幅縮小時も文字サイズを自動縮小しない。
- No.4：OSの文字拡大時も内容の参照・操作を維持する。
- No.5：マーキーでButton本体のタップ領域を変更せず、押下を妨げない。
- No.6：省略・マーキーでもスクリーンリーダーが全文を取得でき、「動きを減らす」設定を尊重する。

受入テスト観点：表示方式省略時のWRAP、全文が収まる場合のマーキー停止、表示言語変更時の再判定、Button押下領域の維持、OS文字拡大、スクリーンリーダー全文取得、動きを減らす設定をそれぞれ検証する（未実行）。

未決：正式Input名、幅計測アルゴリズム、マーキー速度・停止時間・フォーカス時挙動、端末別実測。設計承認と実装・検証完了を混同しない。

## Phase 2.5.1〜2.5.3 任意CSS注入の置換判定（2026-10-21）

原典：`01_ai-document/phase2_05_任意CSS注入の排除.md`。2026-10-19 featureブランチ調査の記録を転記するもので、今回のソース再調査ではない。

| ID | 原典の判断・禁止事項 | 実装前の確認 |
|---|---|---|
| INJECT-01 | 画面は許可された表示設定を指定できるが、共通Component内部へ任意CSS文字列を注入しない | 既存呼出しを意味的Inputへ移行 |
| INJECT-02 | TableCell固定背景11件と動的状態色1件を維持し、呼出し置換後にcellClassesを廃止 | 状態別の表示とzebra/selected/stickyの回帰 |
| INJECT-03 | HeaderのclassContainerを廃止し、navbar・背景・影・高さ・shrinkの見た目を内部へ移す | Headerの回帰 |
| INJECT-04 | TabBarのclassTabBarを廃止し、背景・高さ・shrink・flex配置の見た目を内部へ移す | TabBarの回帰 |
| INJECT-05 | 既存画面を壊す一括削除は禁止。利用箇所を移行後、未使用Inputを削除 | Componentテスト・API例も更新 |
| INJECT-06 | 共通Component内部の標準CSSは許容。意味的Inputは具体的要件がある場合だけ追加 | 不要な新Input・Enumを作らない |

**時系列上の注意**：旧2.5.3で専用TableCell背景Enumが承認された事実と、後日のPhase 3.1/3.4で共通AppUiColorEnumへ統合する承認は区別する。現行仕様は後日承認を優先し、旧専用Enumの生成を新たに指示しない。旧DEFAULT/LABELの意味・既定値・状態色20%のAPI境界とCSS優先順位は、後日原典を照合して未決として管理する。

受入観点（未実行）：INJECT-T01〜T06を上記各IDに対応付ける。設計の承認と既存14箇所の実装修正完了を混同しない。
