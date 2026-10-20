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


## 実装設計追補：HTML・判定・実行経路（2026-10-20）

### 1. 画面HTMLの具体的な配置

LayoutItemは同じ行の子Componentを配置する。全子要素がspan未指定なら均等割り。指定する場合は全子要素に数値リテラルを指定し、合計100とする。gapは幅比率計算から除外する。

正常例：

~~~html
<app-item-stack-layout>
  <app-layout-item>
    <app-textbox [appLayoutSpan]="70" />
    <app-date [appLayoutSpan]="30" />
  </app-layout-item>
  <app-layout-item>
    <app-button />
  </app-layout-item>
</app-item-stack-layout>
~~~

異常例：70+20=90、70と未指定の混在、[appLayoutSpan]="width"の動的式指定。静的検査で拒否し、実行時に暗黙補正して正当化しない。

### 2. 条件分岐と再配分

**LayoutItem直下の@ifは禁止**。条件付き表示はng-container内部に置き、ng-container自体は幅配分対象に数えず、内部の表示項目を再帰的に展開して検査する。

~~~html
<app-layout-item>
  <app-textbox [appLayoutSpan]="50" />
  <ng-container>
    @if (showDate) {
      <app-date [appLayoutSpan]="30" />
    }
    @if (showMemo) {
      <app-textbox [appLayoutSpan]="20" />
    }
  </ng-container>
</app-layout-item>
~~~

全条件成立時の静的合計は50+30+20=100。実行時は次の相対比率で再配分する。

| showDate | showMemo | 表示比率（gap除外） |
|---|---|---|
| true | true | 50:30:20 |
| true | false | 62.5:37.5 |
| false | true | 約71.43:28.57 |
| false | false | 100 |

排他的条件は単一の@if / @else if / @else連鎖とし、共通兄弟と各分岐を個別に検査する。異なる排他分岐のspanは同時合算しない。意味上の排他性を式解析だけで完全自動判定できるとは扱わない。

### 3. 繰返し・子要素

LayoutItem内で@forにより子を増減させることは禁止。ng-container内の@forも同様。繰り返す場合はLayoutItem全体を繰り返す。

~~~html
@for (player of players; track player.id) {
  <app-layout-item>
    <app-textbox [appLayoutSpan]="60" />
    <app-date [appLayoutSpan]="40" />
  </app-layout-item>
}
~~~

空白・改行・コメントは子要素に数えない。ng-containerは自身を数えず、子要素を再帰展開する。LayoutItem直下の非空テキスト・直接のAngular補間は禁止。文字はspan等で包む。静的に表示子が0件のLayoutItemは禁止する。実行時に条件によって0件になる場合は別扱い。

### 4. 静的検査器の処理順序

~~~text
npm run build（公式入口、既定production）
  → 対象Angularプロジェクト・構成の決定
  → TypeScript Compiler APIで自作@Componentを列挙
  → templateUrl/templateの直接リテラルを抽出
  → @angular/compilerでテンプレートAST解析
  → LayoutItemの表示子・span・分岐・繰返しを検査
  → 解析エラーと違反を可能な限り全件収集
  → 英語診断（コード、ファイル、行、列、規則、可能なら期待値/実際値）
  → エラーあり：非ゼロ終了、ng buildを実行しない
  → エラーなし：同一プロジェクト・構成でng build
~~~

対象は自作Componentの外部HTMLとインラインテンプレート。node_modulesとdist等は除外。ACGはAngular HTMLを生成しないため、旧「ACG生成HTMLを別途走査」は撤回済み。

templateUrlは直接文字列リテラル、templateは直接文字列／テンプレート文字列とする。変数参照等の間接指定とTypeScriptテンプレート文字列内の式展開は禁止。Angular補間構文は許可するがLayoutItem直下の補間は禁止。

複数Angularプロジェクトの場合は明示指定が必要。単一で候補が一意の場合だけ省略可能。無効なプロジェクト・構成名はエラー中止。Push時CI自動検査・ビルド、正式公開時CI合格必須。直接のng buildは検査を回避し得るため、公式検査合格の代替としない。

### 5. 実装・テストの具体的な確認項目

- span全省略／70+30／70+20／混在／数値以外の式指定
- ng-containerの多重ネスト／単独@if／複数独立@if／排他的else if／非表示時の再配分
- @forによるLayoutItem内の子増減禁止／LayoutItem全体の反復許可
- 直接文字・補間・コメント・静的0件／実行時0件
- 外部HTML／inline／間接テンプレート参照／AST解析不能
- 複数エラー全件収集／英語診断／非ゼロ終了／ビルド中止
- ビルド構成・複数プロジェクト・Push時CI・公開ゲート

**残件**：正式エラーコード、Angular AST API詳細、CIファイル・リリース保護設定、複雑なネスト・分岐の全件原典照合、実機検証は未完了。実装・検証済みとは記録しない。
