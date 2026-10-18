# AI開発ドキュメント

AIが既存LayoutManager・共通Component・ACGに沿って画面を実装し、人間が解析・保守できるBruce AIフレームワークを設計・実装・運用する。

## 読む順序

1. [AIフレームワーク進捗管理表](AIフレームワーク_進捗管理表.md)：現在位置・残作業・作業状態の**唯一の正本**。
2. 以下の工程別議事録：工程表の中区分名・小区分名に一致。
3. [議事録バックアップ](議事録バックアップ/)：移行前の承認履歴・詳細議論の原文。
4. **全議論終了後**にPhase 4で体系的設計書を作成する。

## 現在位置

**Phase 2.2 幅の責務／2.2.4・2.2.5**。幅の原則は承認済み、実装・検査方式は議論中。ビルド成功と動作検証は別。

## 工程別議事録

### Phase 1：既存資産調査

- **1.1 既存資産棚卸し** — [phase1_01_既存資産棚卸し.md](phase1_01_既存資産棚卸し.md)

### Phase 2：設計思想・責務・AI実装制約の議論

- **2.1 責務境界** — [phase2_01_責務境界.md](phase2_01_責務境界.md)
- **2.2 幅の責務** — [phase2_02_幅の責務.md](phase2_02_幅の責務.md)
- **2.3 余白の責務** — [phase2_03_余白の責務.md](phase2_03_余白の責務.md)
- **2.4 レスポンシブ・折り返し** — [phase2_04_レスポンシブ・折り返し.md](phase2_04_レスポンシブ・折り返し.md)
- **2.5 任意CSS注入の排除** — [phase2_05_任意CSS注入の排除.md](phase2_05_任意CSS注入の排除.md)
- **2.6 DTO・Form・Validation** — [phase2_06_DTO・Form・Validation.md](phase2_06_DTO・Form・Validation.md)
- **2.7 UI・Domain境界** — [phase2_07_UI・Domain境界.md](phase2_07_UI・Domain境界.md)
- **2.8 AI実装制約** — [phase2_08_AI実装制約.md](phase2_08_AI実装制約.md)
- **2.9 Phase 2最終承認** — [phase2_09_Phase 2最終承認.md](phase2_09_Phase 2最終承認.md)

### Phase 3：共通Componentデザインシステムの設計

- **3.1 共通スタイル** — [phase3_01_共通スタイル.md](phase3_01_共通スタイル.md)
- **3.2 UiStyleUtil** — [phase3_02_UiStyleUtil.md](phase3_02_UiStyleUtil.md)
- **3.3 ComponentBase** — [phase3_03_ComponentBase.md](phase3_03_ComponentBase.md)
- **3.4 Table** — [phase3_04_Table.md](phase3_04_Table.md)
- **3.5 Swipe・Layout** — [phase3_05_Swipe・Layout.md](phase3_05_Swipe・Layout.md)
- **3.6 Phase 3最終承認** — [phase3_06_Phase 3最終承認.md](phase3_06_Phase 3最終承認.md)

### Phase 4：議論終了後の体系的設計書作成

- **4.1 議論終了判定** — [phase4_01_議論終了判定.md](phase4_01_議論終了判定.md)
- **4.2 体系的設計書** — [phase4_02_体系的設計書.md](phase4_02_体系的設計書.md)
- **4.3 設計書承認** — [phase4_03_設計書承認.md](phase4_03_設計書承認.md)

### Phase 5：AIフレームワーク実装・移行

- **5.1 LayoutManager実装** — [phase5_01_LayoutManager実装.md](phase5_01_LayoutManager実装.md)
- **5.2 共通UI実装** — [phase5_02_共通UI実装.md](phase5_02_共通UI実装.md)
- **5.3 Table・Swipe実装** — [phase5_03_Table・Swipe実装.md](phase5_03_Table・Swipe実装.md)
- **5.4 ACG・画面の移行** — [phase5_04_ACG・画面の移行.md](phase5_04_ACG・画面の移行.md)
- **5.5 実装テスト** — [phase5_05_実装テスト.md](phase5_05_実装テスト.md)

### Phase 6：AI向け実装ルール・開発手順整備

- **6.1 AI利用規則** — [phase6_01_AI利用規則.md](phase6_01_AI利用規則.md)
- **6.2 AI作業手順** — [phase6_02_AI作業手順.md](phase6_02_AI作業手順.md)
- **6.3 AIレビュー** — [phase6_03_AIレビュー.md](phase6_03_AIレビュー.md)

### Phase 7：AI画面実装による検証・受入

- **7.1 AI画面試作** — [phase7_01_AI画面試作.md](phase7_01_AI画面試作.md)
- **7.2 人間による保守性評価** — [phase7_02_人間による保守性評価.md](phase7_02_人間による保守性評価.md)
- **7.3 実機・品質検証** — [phase7_03_実機・品質検証.md](phase7_03_実機・品質検証.md)
- **7.4 受入判定** — [phase7_04_受入判定.md](phase7_04_受入判定.md)

### Phase 8：運用準備・運用開始

- **8.1 運用準備** — [phase8_01_運用準備.md](phase8_01_運用準備.md)
- **8.2 変更管理** — [phase8_02_変更管理.md](phase8_02_変更管理.md)
- **8.3 本格運用** — [phase8_03_本格運用.md](phase8_03_本格運用.md)

## 旧議事録バックアップ

2026-10-18、従来の`phase*.md`全**16件**をGitの原文blobを保持したままバックアップへ移動。

- [phase00_議事録と工程ID_対応一覧.md](議事録バックアップ/phase00_議事録と工程ID_対応一覧.md)
- [phase00_進捗管理と議事録運用_議事録.md](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md)
- [phase1_共通コンポーネント調査.md](議事録バックアップ/phase1_共通コンポーネント調査.md)
- [phase2_ACGデフォルト値_決定.md](議事録バックアップ/phase2_ACGデフォルト値_決定.md)
- [phase2_ACG実装追加方針_決定.md](議事録バックアップ/phase2_ACG実装追加方針_決定.md)
- [phase2_ACG形式チェック_決定.md](議事録バックアップ/phase2_ACG形式チェック_決定.md)
- [phase2_ACG必須チェック_空白文字列_決定.md](議事録バックアップ/phase2_ACG必須チェック_空白文字列_決定.md)
- [phase2_Nullable型_決定.md](議事録バックアップ/phase2_Nullable型_決定.md)
- [phase2_TypeScriptTypeEnum_決定.md](議事録バックアップ/phase2_TypeScriptTypeEnum_決定.md)
- [phase2_UIヘッダー明細DTO分離_決定.md](議事録バックアップ/phase2_UIヘッダー明細DTO分離_決定.md)
- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)
- [phase2_phase3_20261017追記_再開情報.md](議事録バックアップ/phase2_phase3_20261017追記_再開情報.md)
- [phase2_phase3_再開用完全サマリ.md](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)
- [phase2_画面DTO項目_型別指定可能パターン_決定.md](議事録バックアップ/phase2_画面DTO項目_型別指定可能パターン_決定.md)
- [phase2_画面設計書_日付日時の形式列化_決定.md](議事録バックアップ/phase2_画面設計書_日付日時の形式列化_決定.md)
- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 継続運用

- 中区分の工程名・議事録ファイル名を一字一句一致させる。小区分見出しも工程ID・名称に一致させる。
- 議論・決定・承認・実装・検証の区切りで関連議事録と進捗管理表を同時に更新する。
- **既承認／提案／未決／調査事実**を混同しない。旧議事録は削除せず歴史的原典として保全する。
- すべての設計議論終了後、原典・議事録から体系的設計書を作成する。
- AIの独自CSS・独自Componentの無断実装とACG生成物の直接修正を制約する。
