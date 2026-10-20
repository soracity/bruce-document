# LayoutManager・静的検査設計（暫定・全件監査前）

根拠：[2.2](../01_ai-document/phase2_02_幅の責務.md)、[2.3](../01_ai-document/phase2_03_余白の責務.md)、[2.4](../01_ai-document/phase2_04_レスポンシブ・折り返し.md)。

| ID | 現行承認規則 |
|---|---|
| BRUCE-LAYOUT-001 | LayoutItemの幅比率を明示する兄弟LayoutSpanの合計は100。指定と未指定の混在を禁止し、数値リテラルのみ許可。 |
| BRUCE-LAYOUT-002 | 単独@ifを検査し、排他的条件は@else ifを使用。独立した複数@ifは成立し得る全表示構成を検査し、表示項目のSpan合計を100とする。非表示時は残る項目の比率を維持して再配分。 |
| BRUCE-LAYOUT-003 | LayoutItem直下の@if禁止（承認済み例外・詳細は原典の最終記録を再照合）。@forは原則禁止、反復する場合はItem全体を対象とする。 |
| BRUCE-LAYOUT-004 | ng-containerは幅配分対象とせず内部表示要素を再帰展開して判定。内部の@ifは同じ検査規則、兄弟項目を生成する@forは禁止。 |
| BRUCE-LAYOUT-005 | 静的に子0件のLayoutItemを禁止。条件で実行時に表示子0件となることは許可。直下の非空テキスト・Angular補間は禁止し、HTML要素/Componentで包む。 |
| BRUCE-LAYOUT-006 | 自作Angular Componentの外部HTML/インラインテンプレートを検査し、node_modules・dist等を除外。ACGはAngular HTMLを生成しない。 |
| BRUCE-LAYOUT-007 | Angular公式@angular/compiler ASTとTypeScript Compiler APIを併用。ComponentのtemplateUrl/templateは直接リテラル指定、間接参照禁止。インラインテンプレートのTS式展開は不可（Angular {{...}}は許可）。 |
| BRUCE-LAYOUT-008 | 解析不能もエラーとして可能な範囲で他ファイルの検査を続行し、違反を収集。英語診断で識別コード・ファイル・行列・違反内容を出力。 |
| BRUCE-LAYOUT-009 | 公式npm run buildのAngularビルド前に静的検査。違反時非ゼロ終了でビルド中止。Push時CI検査、公開はCI合格必須。 |
| BRUCE-LAYOUT-010 | npmスクリプトから検査器とAngularビルドへ同じ構成を渡す。既定はproduction。複数Angularプロジェクトは明示指定必須、一意の場合のみ省略可。不正プロジェクト・構成名はエラー。 |
| BRUCE-LAYOUT-011 | Componentの必要幅を基準に折り返し、折り返し後の各行でSpan再配分。Component自身が最小幅を管理し、画面幅不足時に縮小するが文字サイズを自動縮小しない。 |
| BRUCE-LAYOUT-012 | 横gapはLayoutItem、縦gapはItemStackLayout、内部paddingはComponent、画面外周paddingは上位Container。gapSize等の新規Inputは現段階で設けない。 |

## 実装詳細と注意

検査器の正式エラーコード、AST API、対象パスの解決、CI定義、テスト、特殊な@for例外は未確定。LayoutItem直下@ifの後続承認とng-container内分岐の適用範囲は、[2.2.4原典](../01_ai-document/phase2_02_幅の責務.md)の時系列照合を完了するまで要確認。実装・検証は未完了。
