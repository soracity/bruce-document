# DTO・Form・Validation・ACG設計（暫定・全件監査前）

根拠：[2.6](../01_ai-document/phase2_06_DTO・Form・Validation.md)、[2.8](../01_ai-document/phase2_08_AI実装制約.md)、[Phase 4仕様表C](../01_ai-document/phase4_02_体系的設計書.md)。

| ID | 確認済み設計方針 |
|---|---|
| BRUCE-ACG-001 | UI Form DTOはclassとし、FormGroupを継承しない。型付きFormGroupをreadonlyプロパティとして直接保持し、宣言時に初期化。別FormGroupクラスを作らない。 |
| BRUCE-ACG-002 | 表示用DTOはACGが1行単位のreadonlyプロパティを持つTypeScript typeとして生成。配列は利用側が保持。画面側で生成対象の型を手書きしない。 |
| BRUCE-ACG-003 | ACG生成済みファイルを直接編集せず、生成元定義・生成器・テストを修正して再生成。 |
| BRUCE-ACG-004 | Mapperの無断追加を禁止。生成物とFormControlの関係・型変換は原典2.6の承認済み規則に従う。 |
| BRUCE-ACG-005 | Nullable、型Enum、型別指定、Validation、形式チェック、空白必須、デフォルト値、日付日時、ヘッダー明細、文字種EnumとDIを原典2.6.1〜2.6.14に従って実装する。 |
| BRUCE-ACG-006 | ACGはAngular HTMLテンプレートを生成しない。HTML生成物の静的検査を前提とした旧提案は撤回。 |

## 詳細抽出未完了

2.6.1〜2.6.14には具体的な型・生成パターン・Validation条件・禁止事項・コード例がある。上記は**全仕様の転記ではない**。各節を仕様原子単位で抽出し、個別の仕様ID、原典行、承認状態、設計書の記載先を作成するまで本書を実装用正本としない。旧議事録のACG各決定ファイルも再照合する。
