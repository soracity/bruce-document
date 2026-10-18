# AIフレームワーク 進捗管理表

> **正本：GitHub `soracity/bruce-document/01_ai-document`**  
> 初版：2026-10-18（Excel「AIフレームワーク_進捗管理表_20261018.xlsx」から転記）  
> 最終更新：2026-10-18  
> 対象：Bruce / Alfred Code Generator  
> 進捗は、**設計／実装／検証の3軸を独立に管理**する。

## 目的・定義

ユーザーによるAIフレームワークの定義：

> **AIが画面実装で使用するフレームワーク。AIが独自のCSSやコンポーネントを自由に作ると人間の解析が困難になるため、その自由実装を制約する。**

Bruceの設計思想・既存LayoutManager・共通Component・ACG生成物・AI実装ルールを用い、**AIによる実装効率と、人間によるコードの解析・保守のしやすさを両立する。**

AIモデルやLLM基盤そのものを開発することではない。新規ComponentやCSSが必要になった場合は、AIが独断で実装するのではなく共通基盤の設計確認を行う。

## 進捗サマリー（2026-10-18）

| 指標 | 件数 | 補足 |
|---|---:|---|
| 管理対象 | 21 | 以下の全工程 |
| 設計承認済み | 8 | 「方針合意」を含めない |
| 実装完了 | 2 | 機能・実機検証まで完了した意味ではない |
| 一部実装 | 5 | 承認設計との差分が残る |
| ビルド確認済み | 2 | 同一ビルドが複数項目の根拠となることがある |
| 未検証 | 13 | 静的確認・ビルド確認済みとは区別 |

**現在の焦点：Phase 2-2「幅の責務」の承認済み設計と現行実装の差分整理。**

既定の幅均等割り／LayoutSpan比率は一部実装済み。一方、LayoutItemの折り返しは未実装であり、具体的な幅不足判定方法は未決。合計100・明示／省略の混在禁止をどのように検証するかも確認が必要。

## 工程別進捗

| ID | 区分 | 管理項目 | 設計状態 | 実装状態 | 検証状態 | 次のアクション | 根拠・現状 | 参照 | 更新日 |
|---|---|---|---|---|---|---|---|---|---|
| P1-01 | Phase 1 | 共通Component 16部品の一次調査 | 対象外 | 対象外 | 静的確認済 | 実機確認と残課題の取扱いは別工程で管理 | 通常UI 8・Layout 3・Table 4・Swipe 1をGitHub静的調査 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase1_共通コンポーネント調査.md) | 2026-10-15 |
| P2-01 | Phase 2 | 画面・LayoutManager・共通Componentの責務 | 承認済み | 一部実装 | 静的確認済 | 既存画面の独自CSS利用箇所を照合 | 画面は配置を記述するが、配置をCSSで実装しない | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-02A | Phase 2 | 幅の責務：均等割りとLayoutSpan比率 | 承認済み | 一部実装 | 静的確認済 | 合計100・指定混在ルールを実装と照合 | 未指定は均等割り／明示は全兄弟・合計100／gapを除いた重み | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-18 |
| P2-02B | Phase 2 | 幅の責務：外側割当幅と内部100% | 承認済み | 一部実装 | 静的確認済 | Textbox・Date・Button・Radioのホスト／内部幅を照合 | 画面側w-full指定は禁止。共通Component内部の100%幅は許容 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-18 |
| P2-03 | Phase 2 | 余白の責務（gap／padding／margin） | 承認済み | 一部実装 | 静的確認済 | 外周paddingの配置と不要なmargin注入を確認 | LayoutItem gap-2／ItemStackLayout gap-4を現行ソースで確認 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-04 | Phase 2 | レスポンシブ／折り返し | 承認済み | 未着手 | 静的確認済 | LayoutItemの折り返し判定（必要幅・しきい値）を設計 | 現行LayoutItemにはflex-wrapなし。具体的判定方式は未決 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-18 |
| P2-05 | Phase 2 | 任意CSS注入Inputの段階的廃止 | 承認済み | 未確認 | 未検証 | 現行利用箇所を棚卸しし段階的な移行順を整理 | classContainer等は新規利用せず、既存利用の一括削除はしない | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-06A | Phase 2 | UI Form DTOのComponentスコープDI | 承認済み | 未着手 | 未検証 | ACG／画面側のproviders・inject・controls別名を整理 | 設計承認済み。BRU1001のnew Bru1001Dtoは移行対象 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-06B | Phase 2 | UI／Application DTOのEnum値境界変換 | 承認済み | 完了 | ビルド確認済 | フォーム保存・再表示の動作テスト | BRU1001・BRU1002のEnum対応後、2026-10-17にng build成功 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_20261017追記_再開情報.md) | 2026-10-17 |
| P2-06C | Phase 2 | 入力ValidationとDomain Validationの具体的分離 | 検討中 | 未着手 | 未検証 | 具体例でUIとDomainの判定分担を確定 | required等の方針はあるが細部は継続検討 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-07 | Phase 2 | サーブ順・リターン側ロジックのDomain責務 | 検討中 | 未着手 | 未検証 | BRU1001処理を業務ルールと表示制御に分類 | Domainモデル／APIは未決。画面にルール処理が存在 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md) | 2026-10-16 |
| P2-08 | Phase 2 | AI画面実装ルール・禁止事項の整備 | 方針合意 | 一部実装 | 未検証 | 設計書からAI実装への指示テンプレートを整備 | AIは独自CSS／Componentを無断生成しない。人間による解析・保守を重視 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_20261017追記_再開情報.md) | 2026-10-18 |
| P3-01 | Phase 3 | 共通デザイン属性（個別Input）の標準化 | 方針合意 | 未着手 | 未検証 | 最終レビューで属性と既定値を確認 | border／rounded／shadow／padding／color／visible等。最終承認前 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-15 |
| P3-02 | Phase 3 | UiStyleUtilの仕様 | 方針合意 | 未着手 | 未検証 | Tailwindの静的クラス対応を実装前レビュー | 状態を持たない静的ユーティリティ案。未実装 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-15 |
| P3-03 | Phase 3 | ComponentBase統一仕様 | 方針合意 | 未着手 | 未検証 | Angular Input継承と既存FormControlComponentBaseとの整合確認 | 単一基底クラス案。実装未承認 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-15 |
| P3-04 | Phase 3 | Tableスタイル継承 | 未決 | 未着手 | 未検証 | 子の未指定と明示falseを区別する方式を設計 | Cell > Record > Table > 既定値の方向。技術方式は未決 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-15 |
| P3-05 | Phase 3 | 最終レビュー・実装承認 | 未着手 | 未着手 | 未検証 | Table継承の決定後にPhase 3全体を最終審査 | 正式承認前にPhase 3実装へ進まない | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-15 |
| POC-01 | 今後の検証案 | 画面設計書からAIによる1画面実装 | 未着手 | 未着手 | 未検証 | 既存LayoutManager・共通部品のみで試行 | 進捗管理用の追加工程案。実施範囲・画面は未承認 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_20261017追記_再開情報.md) | 2026-10-18 |
| POC-02 | 今後の検証案 | 人間による解析・変更のしやすさ評価 | 未着手 | 未着手 | 未検証 | AI実装画面をレビューし独自CSSの有無と可読性を検証 | AIフレームワークの定義に直結する受入検証（追加案） | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_20261017追記_再開情報.md) | 2026-10-18 |
| POC-03 | 今後の検証案 | Android／iPhoneの表示・操作確認 | 未着手 | 未着手 | 未検証 | 折り返し・セーフエリア・長文・タップを実機確認 | 両OS表示品質の方針あり。検証工程は追加案 | [設計・議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md) | 2026-10-18 |
| BASE-01 | 基盤修正 | ACG Enum／FormControl互換とBRU1001/1002ビルド | 対象外 | 完了 | ビルド確認済 | 実機動作と保存・再取得を別途確認 | 2026-10-17 ng build成功。bundle size警告のみ | [コミット](https://github.com/soracity/bruce/commit/86583cba759f6775ee876b3e8de8562e4b420599) | 2026-10-17 |

## 管理ルール

| 分類 | 状態 | 意味・更新ルール |
|---|---|---|
| 設計 | 承認済み | ユーザーが承認し、設計正本へ記載された。実装未完成でも維持する |
| 設計 | 方針合意 | 方向性は合意。最終承認とは区別する |
| 設計 | 検討中／未決 | 重要な仕様・方式が未確定。勝手に決定しない |
| 設計 | 対象外／未着手 | 設計承認の対象外、または設計作業未開始 |
| 実装 | 完了 | 対象範囲のソース修正が済んだ。検証完了とは別 |
| 実装 | 一部実装 | 現行実装があるが、承認設計との差分が残る |
| 実装 | 未確認 | 全使用箇所の照合が済んでいない。未着手と断定しない |
| 実装 | 未着手／対象外 | まだ着手していない、または実装工程の対象外 |
| 検証 | 静的確認済 | ソース・設計記録の照合済み。ビルド・実機検証は別 |
| 検証 | ビルド確認済 | ビルド成功ログを確認済み。機能動作・UI品質は未保証 |
| 検証 | 未検証 | 受入条件を定め、別途検証する |
| 資料 | 設計正本 | `bruce-document/01_ai-document` の承認記録。古いサマリと不一致なら新しい承認記録を優先 |
| 更新 | 証跡・更新日 | 状態を変えるたびに根拠URLと最終更新日を残す |
| 注意 | 今後の検証案 | POCは提案であり、設計・実施の承認事項ではない |

## 更新手順

1. 進捗が動いたIDの **設計・実装・検証** をそれぞれ更新する。
2. 「次のアクション」「根拠・現状」「参照」「更新日」を実際の変更内容に合わせて更新する。
3. サマリー件数を工程別進捗に合わせて再集計する。
4. 設計事項が新たに承認された場合は、**該当する設計正本にも承認内容と根拠を反映**する。
5. Excelは必要に応じてGitHub正本から配布用に出力する。**ExcelとGitHubを別々の正本として更新しない。**

## 関連ドキュメント

- [Phase 2：UI設計思想と責務](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_UI設計思想と責務.md)
- [Phase 1：共通Component一次調査](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase1_共通コンポーネント調査.md)
- [Phase 2/3：再開用完全サマリ](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_再開用完全サマリ.md)
- [2026-10-17追記：ACGから本線への復帰](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase2_phase3_20261017追記_再開情報.md)
- [Phase 3：UIデザインシステム標準化 議論記録](https://github.com/soracity/bruce-document/blob/main/01_ai-document/phase3_UIデザインシステム標準化_議論記録.md)
