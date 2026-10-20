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


## 追加設計：静的検査の判定表と検証データ（Phase 2.2原典準拠）

### 入力と出力の契約

入力は**選択されたAngularプロジェクト・構成に属する自作@Componentテンプレート群**。外部HTMLはtemplateUrl、インラインはtemplateから取得する。出力は診断一覧および成功/失敗の終了状態。解析・テンプレート参照解決の失敗も診断に含める。エラーが1件以上あればAngularビルドを開始しない。

| 入力条件 | 検査結果 | 実行時レイアウト |
|---|---|---|
| 兄弟2件ともspan未指定 | PASS | 1:1 |
| 兄弟span 70,30 | PASS | 70:30 |
| 兄弟span 70,20 | FAIL（合計90） | ビルド禁止 |
| 兄弟span 70,未指定 | FAIL（混在） | ビルド禁止 |
| spanに変数式を指定 | FAIL（非リテラル） | ビルド禁止 |
| 独立@if内30,20＋常設50 | PASS（全表示100） | 表示中の比率を再正規化 |
| 排他@if/else if各枝50＋常設50 | PASS（各枝100） | 該当枝だけ表示 |
| LayoutItem直下@if | FAIL（配置禁止） | ビルド禁止 |
| ng-container内@if | 条件付きspan規則で検査 | ng-container自身は幅を持たない |
| LayoutItem内@for | FAIL（子数動的） | ビルド禁止 |
| @for内でLayoutItem全体を反復 | 各Itemを独立に検査 | 各Itemのspan比率を適用 |
| LayoutItem内に静的表示子0件 | FAIL | ビルド禁止 |
| 条件が偽となり実行時表示子0件 | 静的0件とは区別し許容 | 表示する子がない |
| templateUrlが変数参照 | FAIL（参照解決不可） | ビルド禁止 |
| AngularテンプレートAST解析失敗 | FAIL（解析エラー） | ビルド禁止 |

**重要**：上記は既承認ルールの入力・期待結果への具体化であり、検査器のクラス名・正式診断コード・APIシグネチャを新たに承認したものではない。

### 実装に渡す判定アルゴリズム（仕様レベル）

1. ComponentのテンプレートをASTとして読み取り、各LayoutItemを抽出する。
2. LayoutItemの直下にある構造を確認する。ng-containerは透明なコンテナとして内部を展開する。ただし直下@if禁止と内部@if許可は区別する。
3. 禁止された@for、直接テキスト/補間、静的な表示子0件を診断する。
4. 通常兄弟と条件分岐を基に**静的検査対象の表示構成**を組み立てる。独立@ifは全成立構成、排他連鎖は各枝を別構成とする。
5. 各構成の子のspan指定状態を確認する。全省略は均等割り、全指定は数値リテラル・合計100、混在は違反とする。末尾elseなしで全条件が不成立の構成には、表示中のspanを使う再配分規則を適用し、元の全表示構成を不合格にしない。
6. 1件の失敗で探索を止めず、解析可能な他Componentも検査する。
7. 診断を英語でまとめ、少なくとも識別コード、ファイル、行、列、規則を出す。期待値・実際値を表せる場合は併記する。
8. エラー0件のときだけ、検査対象と同じプロジェクト・構成をAngularビルドへ渡す。

### 責務境界と余白（Phase 2.3との照合）

| 対象 | 担当するもの | 禁止・制約 |
|---|---|---|
| LayoutItem | 同一行の横gap、外側の幅配分 | 子Componentへのmr/mlで横間隔を作らない |
| ItemStackLayout | LayoutItem間の縦gap | 行ごとのmt/mbで行間を作らない |
| 上位Container/Layout | 画面外周padding | 外周padding専用の新ScreenLayoutを現時点で増設しない |
| 共通Component | 内部padding、内部gap、内部の100%幅 | 外側の配置をComponent内部のmarginで代替しない |

### 残存する実装阻害事項（未承認を勝手に確定しない）

- AST APIの実際のバージョン・シグネチャと、ビルド構成に対応するComponent列挙の具体的な手続き。
- 複雑なネスト・複数要素分岐に対する検査対象構成の一般化と診断重複の扱い。
- 正式な診断コード体系、インラインTSの行列変換、CIワークフロー・公開ゲートの具体設定。
- 他のPhase 2議事録・後日承認との**全件双方向照合**。

この残件があるため、本章の「設計書だけで実装可能」判定は**未合格**とする。


## Phase 2.3 余白の責務：原典照合・実装境界（2026-10-21）

照合対象：[phase2_03_余白の責務.md](../01_ai-document/phase2_03_余白の責務.md) の 2.3.1、2.3.2、2.3.3 および2026-10-19追記。これは**当該ファイルとの照合**であり、旧議事録全件との双方向照合完了を意味しない。

| 原典小区分 | 承認済み設計 | 実装上の帰結 | 状態・残件 |
|---|---|---|---|
| 2.3.1 | 横gap=LayoutItem、縦gap=ItemStackLayout、内部padding/gap=共通Component | 画面HTMLはLayoutItem単位で行を分け、共通Componentへのmargin指定で配置を調整しない | 設計承認済み、実装一部、検証は原典の「静的確認済」を超えて主張しない |
| 2.3.2 | 画面外周の上下左右paddingは**上位Container**。LayoutManagerとの二重管理方式は採用しない | 既存上位Containerを確認して外周paddingを一箇所に集約。LayoutItemとItemStackLayoutへ外周paddingを追加しない | 2026-10-19方式A承認、実装未着手・検証未実施 |
| 2.3.3 | 現段階でgapSize等の追加Input/Enumは設けない | 標準gapを共通値として使う。画面固有のgap変更Inputを勝手に追加しない | 設計承認済み。追加APIは対象外 |

**2.3.2の注意**：原典の節冒頭には「作業：完了／設計：承認済」と、同節の古い引継ぎ文中に「作業=未着手／設計=検討中」が併存する。後日の2026-10-19承認記録が基本設計の現在状態を確定しているため、後者を現時点の未承認扱いにしない。ただし、**具体的なContainerクラス名、DOM構造、padding数値、CSS変数名は未確定**。説明用の `app-screen-container` を新規採用済みとみなさない。

### 画面と部品のHTML実装例（承認済み構造の説明）

~~~html
<!-- 画面の上位Containerは既存実装を利用する。ここでは新規タグを仮定しない -->
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

この例の行内gapはLayoutItem、行間gapはItemStackLayoutが担当する。画面全体のpaddingは上位Containerに属し、共通Componentの内部paddingは各Componentに閉じる。幅70/30は配置説明用の例であり、画面ごとの正式幅を一律70/30に決めるものではない。

### Phase 5へ渡す受入試験（設計検証用）

| 試験 | 条件 | 合格基準 |
|---|---|---|
| GAP-01 | 同一LayoutItemにTextboxとDate | 横間隔の管理箇所がLayoutItemのみ |
| GAP-02 | ItemStackLayout内にLayoutItemが2行 | 行間の管理箇所がItemStackLayoutのみ |
| GAP-03 | 共通Button、Alert、Radio、Toggle | 各内部padding/gapを画面CSSから操作しない |
| GAP-04 | 画面上位Containerに外周padding | LayoutItem/ItemStackLayoutと外周paddingを二重管理しない |
| GAP-05 | 画面実装でmr-*/ml-*/mt-*/mb-*を配置目的に追加 | レビューで違反として検出（**現行AST静的検査器で自動検出するとまでは未承認**） |
| GAP-06 | gapSize等の新規Inputを導入する変更 | 追加要件と設計承認なしでは採用しない |

**実装に必要な未確定事項**：既存上位Containerの実体、標準gapの参照元と値、CSSの既存実装、画面別外周paddingの適用位置。これらはソース調査と承認記録照合で確定する。未確認の値を設計済みとして補わない。


## Phase 2.4 レスポンシブ・折り返し：承認仕様と受入契約（2026-10-21）

根拠：[phase2_04_レスポンシブ・折り返し.md](../01_ai-document/phase2_04_レスポンシブ・折り返し.md) 2.4.1〜2.4.3、2026-10-19の時系列承認。**当該原典との照合であり旧新議事録全件の監査完了ではない**。

### 2.4.1・2.4.2 LayoutItemの配置契約

| 項目 | 承認済みの振る舞い | 境界・禁止事項 |
|---|---|---|
| レスポンシブ責務 | 画面は項目の構造と順序を定義し、LayoutItemが幅不足時の折り返しを担当 | 画面HTMLのsm:/md:/lg:、flex-wrap、画面固有メディアクエリで配置調整しない |
| 折り返し単位 | 収まらない項目だけを**表示順を維持して**次行へ送り、同じ行に収まる項目は残す | 全項目の一律縦積みを標準動作にしない |
| 必要幅 | 各共通Component自身が必要最小幅を管理し、表示内容・ラベル・言語・文字サイズで変化する | LayoutItemによるComponent種類共通の固定最小幅押付けは禁止 |
| 折り返し判定 | 表示中の各項目の必要幅、横gap、LayoutItemの実際の利用可能幅を使う | 画面ごとの固定ブレークポイントで代用しない |
| span | テンプレート上の兄弟span合計100規則を維持。折り返し後は**各行の表示項目の相対比率**で利用可能幅を再配分 | 折り返した行ごとに元のspan合計100を要求しない |
| 必要幅が利用可能幅超過 | 当該Componentを利用可能幅まで縮小 | 原則として画面全体に横スクロールを発生させない。意図的な内部スクロールを持つTable等は別仕様 |
| 文字サイズ | 幅縮小に連動して自動縮小しない | OSの文字拡大設定を禁止しない |
| 新規Input | minWidth、responsiveBreakpoint、wrapBreakpointを現段階で追加しない | 未承認の追加APIで逃げない |

**比率例（承認記録にある計算）**：span 50/30/20の3項目を先頭2項目と最後1項目に分けた場合、1行目は50/(50+30)=62.5%、30/(50+30)=37.5%、2行目は100%。計算対象幅は各行の横gapを除いた利用可能幅。元のspanは変更しない。

### Label・Buttonの文字表示方式

| 値 | 文字列値 | 意味 |
|---|---|---|
| WRAP | `wrap` | 折り返し |
| MARQUEE_BOUNCE | `marquee_bounce` | 端で反転する左右往復 |
| MARQUEE_RESTART | `marquee_restart` | 右端到達後に左端へ戻って再び右へ移動 |
| ELLIPSIS | `ellipsis` | 末尾省略 |

- **単一の表示方式Enum**をLabelとButtonで共有する。マーキー方式専用Enum/専用パラメーターは設けない。EnumはACG生成対象であり手書きしない。
- Label・Buttonとも表示方式パラメーター省略時は**WRAP**。
- MARQUEE_BOUNCE / MARQUEE_RESTART指定時も、**実際に文字が表示領域からはみ出すときだけ**アニメーションし、収まれば静止。文字・言語・幅・フォント変更後も再判定する。
- **未確定**：Component Inputの正式名、Enumの物理名・配置と既存設計書の整合、速度・停止時間・実測方式・Button押下時の詳細。具体的なCSS/アニメーションAPIを承認済みとして補わない。

### 2.4.3 スマートフォン操作性：No.1〜6（承認済み）

| No | 受入条件 | 実装・試験での確認観点 |
|---|---|---|
| 1 | 狭い幅でも項目が重ならず画面外にはみ出さない。内部スクロールを意図するTable等は例外 | 幅変化時の折り返し、重なり、意図しない画面全体の横スクロール |
| 2 | Buttonのサイズ・padding・タップ領域・配置は**画面設計書・共通Component仕様・承認済みLayoutManagerルールの通り** | AI判断で最小タップ寸法やpaddingを追加していないこと |
| 3 | Component幅縮小でも文字サイズを自動縮小しない | 幅変更前後のフォントサイズ |
| 4 | 端末の文字サイズ拡大時も内容の参照・操作を維持 | OS文字拡大・言語変更時の操作 |
| 5 | マーキーは超過時のみ。Button本体の配置・タップ領域は固定し、文字移動はタップ/クリックを妨げない | はみ出し前後、マーキー中のButton操作 |
| 6 | 省略・マーキー表示でもスクリーンリーダーから全文を取得可能。端末の「動きを減らす」設定を尊重 | アクセシビリティ読上げ、動作軽減設定 |

**No.2の承認経緯**：AIが提案した「十分なタップ領域を確保」等の独自補完はユーザーが否認。仕様にない寸法を安全・操作性を理由に勝手に加えない。

### Phase 5/7のテスト入力と期待結果

| ID | 試験入力 | 期待結果 |
|---|---|---|
| RESP-01 | 十分な幅でspan 50/30/20 | 50:30:20で同一行 |
| RESP-02 | 幅不足で先頭2件のみ同一行 | 1行目62.5:37.5、2行目100。表示順維持 |
| RESP-03 | 1項目の必要幅がLayoutItem利用可能幅を超える | 利用可能幅まで縮小、フォント自動縮小なし |
| RESP-04 | Label/Buttonの表示方式Input省略 | WRAP |
| RESP-05 | マーキー指定、全文が収まる | アニメーションなし |
| RESP-06 | マーキー指定、全文がはみ出す | 指定した往復/先頭復帰の動作。Button押下可能 |
| RESP-07 | 表示内容・言語・フォント・利用可能幅の変化 | はみ出しを再判定 |
| RESP-08 | OS文字サイズ拡大 | 内容参照・操作が可能 |
| RESP-09 | スクリーンリーダー・動作軽減設定 | 全文読上げ可能、動作軽減設定を尊重 |
| RESP-10 | Buttonを表示した画面 | タップ領域・paddingをAI判断で増減しない |

**未完了・実装阻害**：Componentの必要幅の計測・通知方法、一般HTML要素の必要幅、行分割の詳細アルゴリズム、極端に狭い画面と長文の境界、正式なInput名、マーキー制御の技術方式、既存ソースの照合。2.4.2の**基本動作**と2.4.3の**受入条件**は承認済みだが、Phase 5実装・Phase 7実機検証は未実施。設計書単体での実装可能性は引き続き**未合格**。


## 静的検査と実行時処理の責務分離（2026-10-21、既承認仕様の具体化）

### 入力・出力

| 処理 | 入力 | 出力 | エラー時 |
|---|---|---|---|
| ビルド前静的検査 | Angular ComponentのテンプレートAST、LayoutItem内の構造・Spanリテラル | 違反診断、終了コード | 解析不能・違反があれば非ゼロ終了しビルドしない |
| LayoutItemの実行時配置 | 実際に表示中の子、各子のSpan、各Componentの必要幅、gap、コンテナ利用可能幅 | 表示順を保持した行分割、行ごとの幅配分 | 必要幅超過の単独子は利用可能幅まで縮小 |
| Label/Buttonの文字表示 | 表示文字列、表示方式、描画可能幅、文字サイズ等 | WRAP/ELLIPSIS/条件付きマーキー | 文字全文の読上げと操作性を維持 |

### 静的検査と実行時検査を混同しない

- Span合計100、リテラル制約、禁止された@if/@for、テンプレート解析エラーは**ビルド前静的検査**の対象。
- 文字列・言語・端末文字サイズで変わるComponent必要幅、実際の折り返し位置、マーキー発動有無は**実行時の表示状態**に依存する。固定のビルド時数値で代用しない。
- 元のSpanを変更せず、行に残った表示子のSpan合計で正規化する。表示子が1件の行は100%。全非表示の場合は表示する子がなく、ゼロ除算を起こさない。
- LayoutItemの折り返し判定に画面固有のブレークポイントや新規minWidth Inputを持ち込まない。

### 実装着手前の未確定事項を決定単位で管理

| ID | 決定が必要な項目 | 現時点の状態 |
|---|---|---|
| RESP-PEND-01 | Componentの内容依存必要幅の測定とLayoutItemへの伝達手段 | 未承認 |
| RESP-PEND-02 | 必要幅と行内Span再配分が競合する場合の行分割・再評価手順 | 未承認 |
| RESP-PEND-03 | 非Componentの標準HTML要素を含むときの必要幅取得 | 未承認 |
| RESP-PEND-04 | 長文表示・極小幅・OS文字拡大の境界動作と計測手段 | 未承認 |
| RESP-PEND-05 | Label/Button表示方式Inputの正式名、マーキーの速度・停止・再開制御 | 未承認 |
| RESP-PEND-06 | Angular AST API、インラインソース位置変換、診断コードとCI設定の具体化 | 未承認 |

**設計レビュー上の判定**：本追補は責務境界と入出力を整理したもので、未確定の実装アルゴリズム・APIを承認したものではない。全件監査・実装可能性の合格判定は変更しない。

## Phase 2.3 余白責務の原典照合（2026-10-21）

根拠：`01_ai-document/phase2_03_余白の責務.md` 2.3.1〜2.3.3。

| ID | 現行承認事項 | 禁止・注意 |
|---|---|---|
| GAP-01 | 同一LayoutItem内の兄弟間の横gapはLayoutItemが管理 | 個別Componentにmr-*／ml-*で代用しない |
| GAP-02 | LayoutItem同士の縦gapはItemStackLayoutが管理 | 個別行・Componentのmt-*／mb-*で代用しない |
| GAP-03 | 共通Component内部のpadding／gapは当該Componentが管理 | 画面側から内部CSSを注入しない |
| GAP-04 | 画面上下左右の外周paddingは上位Containerが管理 | LayoutItem／ItemStackLayoutが外周paddingを重複管理しない |
| GAP-05 | 標準gapを使い、現段階でgapSize等の追加Input／Enumを新設しない | 要件が具体化した場合のみ再検討 |

外周Containerの名称（原典のapp-screen-container）は仮称。新規ScreenLayoutComponentやpadding=16pxなどの数値は未承認。既存上位Containerで担保できるかの実装時確認が必要。2.3.2の管理位置は2026-10-19承認済みだが、具体的実装・実機検証は未実施。原典の節冒頭に残る古い「外周位置未決」という引継ぎ文より後日の明示承認を優先する。

受入テスト観点（設計のみ）：GAP-T01 横gapの所有者、GAP-T02 縦gapの所有者、GAP-T03 内部paddingの所有者、GAP-T04 外周Containerの責務、GAP-T05 個別marginでの代替禁止、GAP-T06 不要なgapSize Input追加禁止。実行0件。

## Phase 2.2.1〜2.2.3 幅の責務：原典対照（2026-10-21）

根拠：`01_ai-document/phase2_02_幅の責務.md` の2.2.1〜2.2.3（2026-10-16承認済み）。

- WIDTH-01：同一LayoutItem内の全兄弟でSpan未指定ならgapを除いた領域を均等割り。2項目50:50、3項目は各約3分の1。
- WIDTH-02：Spanを明示する場合は全兄弟に指定し、元の構成の合計を100とする。指定・未指定の混在を禁止。
- WIDTH-03：SpanはCSSのwidthパーセントではなく、gapを除いた幅を分配する重み。70+30+gapを70%+30%+gapとしてはみ出させない。
- WIDTH-04：LayoutItemはComponentホストへの割当幅を管理し、内部のinput等が割当領域の100%を使うのはComponentの責務として許容。
- WIDTH-05：Radio内部の選択肢等幅、Button内部の全面幅・内容幅はそれぞれ共通Componentの責務。画面からw-fullやclassInputで内部幅を指定しない。
- WIDTH-06：元のSpanが70+20=90のように不正なら、実行時の再配分で静的な設計違反を隠さない。

原典にある古い7:3表記は承認前の履歴であり、現行の100等分（70:30）へ読み替えて採用する。既存LayoutSpanDirectiveの不正値補正・flex-grow設定という調査事実は、静的検査の完成を意味しない。

検証観点（未実行）：WIDTH-T01 均等幅2/3項目、T02 明示合計100、T03 混在拒否、T04 gap除外、T05 Component内部100%許容、T06 Button/Radio内部幅の責務、T07 元の合計不正を拒否。実装・実機検証は未完了。
