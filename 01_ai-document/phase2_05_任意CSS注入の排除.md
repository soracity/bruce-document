# Phase 2.5 任意CSS注入の排除

> **工程表の中区分：2.5 任意CSS注入の排除**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

classContainer等の任意CSS注入は原則廃止し、既存画面を壊さないよう段階移行。利用箇所の棚卸しと移行順序は未決。

## 2.5.1 classContainer等を原則廃止する方針を決定

- **作業**：完了／**設計**：承認済／**実装**：未確認／**検証**：未検証
- **対象と背景**：classContainer・classInput・classLabel等の画面側からのCSS注入は原則廃止し、既存画面を壊さず段階的に移行する。
- **この小区分で扱う具体事項**：classContainer等を原則廃止する方針を決定。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：一括削除せずPhase 5で段階移行。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=未確認、検証=未検証。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：一括削除せずPhase 5で段階移行
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 旧Phase 2原典の完全な記録（追加照合）

> [2026-10-15〜16の旧議事録](議事録バックアップ/phase2_UI設計思想と責務.md)から移行。当時の**提案・調査事実・承認済み**は各見出しの当時の状態を保持する。後日の承認・変更があれば最新の承認記録が優先する。

#### 承認済みIssue：共通Componentの外部CSS排除

> 状態：**設計承認済み**  
> 承認日：2026-10-16

##### 基本原則

> **画面側から共通Component内部へ任意CSSを注入しない。外側の配置はLayoutManager、内側の見た目は共通Component自身が管理する。**

共通Componentは画面側から見てブラックボックスとして扱う。画面Componentは、共通Component内部のDOM構造や内部class名を前提とした実装を行わない。

##### 任意CSS注入Inputは原則廃止対象

以下のような任意CSS文字列を受け取るInputは、原則として段階的に廃止する。

- `classContainer`
- `classInput`
- `classLabel`
- `classSpan`
- `classButton`
- `classRadioItem`
- `classLabelSpan`
- `classMessageContainer`
- `classButtonContainer`
- `classAlertBox`
- `classMessage`
- `classMessageIcon`

実際のComponentに上記以外の同種APIが存在する場合も、同じ基準で扱う。

##### 外部配置はLayoutManagerへ移す

次のような実装は採用しない。

```html
<app-textbox
  classContainer="m-4"
  classInput="w-full"
/>
```

`m-4`等の外部配置はLayoutManagerの責務とする。

Textbox内部のinputが割り当てられた領域を全面使用する必要がある場合は、画面から`w-full`を注入せず、TextboxComponent内部の標準仕様として実装する。

##### Component内部CSSはComponent自身が管理する

Component内部を成立させるためのCSSは排除対象ではない。

例：

- Radio内部の選択肢を横並び・等幅にするためのflex / gap
- Alert内部のアイコン・メッセージ・アクションの配置
- Toggleとラベルの内部配置
- Textbox内部のinput幅・padding
- Button内部の文字・アイコン配置

判断基準はCSSプロパティ名ではなく、**Componentの外側の配置を調整するものか、Component内部を成立させるものか**とする。

##### 見た目の差分は意味のある限定APIで表現する

画面ごとに見た目の差分が必要な場合でも、任意CSS文字列を渡さない。

必要に応じて、例えば次のような意味のある限定APIで表現する。

- `variant`
- `appearance`
- `size`
- `density`
- `level`
- `color`

ただし、将来必要になる可能性だけを理由にInputやEnumを先行追加しない。実際の画面要件として必要性が確認されたものだけを追加する。

##### 移行方針

既存の任意CSS注入Inputを、設計承認直後に一括削除して既存画面を破壊することはしない。

実装フェーズでは利用箇所を確認しながら段階的に移行する。

1. 外部配置に使われているclass指定をLayoutManagerへ移す。
2. Component内部を成立させる標準CSSはComponent内部へ固定化する。
3. 本当に必要な見た目差分のみ意味のある限定APIへ置き換える。
4. 利用箇所がなくなった任意CSS注入Inputを削除する。
5. component-test / APIドキュメントの利用例を新方式へ更新する。

##### AI実装ルール

AIが画面・共通Componentを実装する場合も次を遵守する。

- `classContainer`等の任意CSS注入APIを新規利用・新規追加しない。
- 画面側から共通Component内部DOMを前提としたclass指定を行わない。
- 外部配置はLayoutManagerを使用する。
- 内部レイアウト・内部デザインは共通Component自身に実装する。
- 見た目変更が必要な場合は既存の意味的APIを優先する。
- 必要なAPIが存在しない場合、勝手にCSS注入で回避せず設計確認を行う。



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 以下は移行時点の原文であり、当時の提案や未決は現在の承認ではありません。後日の正式承認事項を優先してください。
<!-- HISTORICAL-SUMMARY-SECTIONS: 1.5 -->

#### 1.5 任意CSS注入APIの方針

基本方針は合意済み。

`classContainer`、`classInput`、`classLabel`、`classSpan`、`classButton`、`classRadioItem`、`classLabelSpan`、alert内部用class input等の、**画面側から任意CSS文字列を注入するAPIは原則廃止する方向**。

理由：

- 画面側が共通Component内部DOMを意識することになる。
- Layout責務とComponent内部デザイン責務が混在する。
- AIが独自CSSを注入して画面ごとの一貫性を崩しやすい。

代替：

- Component内部の固定スタイル
- `variant`
- `appearance`
- `size`
- `density`
- `level`
- `color`

等、意味のある型付き・限定的なAPIを使う。

##### 移行の方向性

過去調査での推奨順：

1. LayoutItemの幅・grow等の仕様決定
2. ItemStackLayoutのdirection/gap/wrap/alignment決定
3. textbox/date等の外側 `m-4` をLayout側へ移行
4. textbox/date等の `w-full` をホスト幅＋内部input標準幅へ整理
5. `classContainer` と専用外周divを削除
6. 未使用class input削除
7. その他任意class inputを段階削除
8. groupのARIA・内部DOM整理
9. radio/toggle内部DOM整理
10. component-test / APIドキュメントをLayoutManager利用例へ更新

---

## 2.5.2 現行のclass注入Inputと呼び出し箇所を棚卸し

- **作業**：完了／**設計**：棚卸し結果確定・基本原則承認済／**実装**：未変更／**検証**：未検証
- **対象と背景**：classContainer・classInput・classLabel等の画面側からのCSS注入は原則廃止し、既存画面を壊さず段階的に移行する。
- **この小区分で扱う具体事項**：現在の実行時UIソースからclass注入Inputと呼び出し箇所を棚卸す（2026-10-19に作業完了）。置換設計の詳細は2.5.3に引き継ぐ。
- **確認・引継ぎ内容**：既存ソースから使用箇所と互換性を把握。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：棚卸し作業=完了、設計原則=承認済、置換の詳細設計=2.5.3で継続、実装=未変更、検証=未検証。
- **次の作業**：2.5.3で置換優先順位・限定入力仕様・既存表示の維持方法を決定
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

### 2026-10-19：開発ブランチのclass注入状況・一次棚卸し（調査結果、設計未承認）

- **調査対象**：`soracity/bruce` の `feature/feature-20261015`、`src/app/brf9000/brf9020-shared-components` 内の主要共通Component TS、およびBRU1001・BRU1002・BRU8011・ComponentTestの画面HTML。ブランチのソースと画面呼出し例をGitHubから実取得。
- **主要共通Componentの現状**：Button、Textbox、Date、Radio、Toggle、Group、Fab、AlertのTS定義から、`classContainer`/`paramClass`/`classInput`等の専用Inputは確認されなかった。LayoutItemとItemStackLayoutにも該当Inputを確認できなかった。調査した範囲に限る結果であり、全ファイルの不在証明ではない。
- **発見した動的なクラス注入**：`table/table-cell/components/table-cell.component.ts` の`get cellClasses()`がホストの`elementRef.nativeElement.className`を返し、`table-cell.component.html`内部のth/tdへ`[class]="cellClasses"`で渡す。これは専用class Inputではないが、画面からの任意CSSクラス注入の実質的な経路。
- **画面側使用の証拠**：`src/app/brf1000/brf1002/ui/components/bru1002.component.html`の行42で`<app-table-cell [class]="getMatchStatusColor(...)">`、45/50/55/60/65行等で`class="bg-base-200"`。動的／静的クラス指定を利用している。
- **区別**：ネイティブ`<button class="...">`のクラス、共通Component内部の静的CSSクラス、共通Componentのホストへ指定して内部セルに転送するクラスは同じではない。廃止・代替の判断を混同しない。
- **現時点の結論**：TableCellに実利用があるため、確認なしの一括削除は既存画面を壊し得る。削除も存続も未承認。画面側独自CSSの禁止方針との整合を別途判断する。
- **未完了**：他のHTMLテンプレート・ディレクティブ・ACG生成箇所を含む網羅的な全件照合、利用件数集計、影響範囲確定。Phase 2.5.2は継続調査。実装変更・検証なし。
- **次の検討**：TableCellの背景色と状態色を、自由class指定のままにするか、Enum/限定パラメーター等の明示仕様へ移行するか。

### 2026-10-19：画面によるデザイン指定の責務境界を承認

- **承認根拠**：ユーザーは「目指している設計思想は『画面がデザインを決めてはいけない』ではなく『画面は仕様で許可された方法でのみデザインを指定できる』という考え方で合っていますか？」という確認に「OK」と回答。
- **承認した原則**：画面は設計書・共通Componentの公開仕様で許された表示設定を指定できる。例えば、特定セルの背景色を画面側で選ぶ責務は残してよい。一方、共通Component内部のCSS実現方法、指定可能範囲・値は共通仕様側で管理する。AIは仕様外の任意クラスや独自CSSで迂回してはならない。
- **AS-ISとの違い**：現在のTableCellはホストの`class`を`cellClasses`で内部`td/th`へ転送するため、背景色以外の見た目も変えられる。TO-BE候補は背景色のような**仕様で許された対象だけ**を公開入力から指定し、実際のCSSは共通Component側に隠蔽する。
- **未承認の設計案**：TableCell専用Enumの採用、Enum名・値、`backgroundColor`等のInput名、`cellClasses`の具体的な削除・置換方法、既存画面への移行方式は今回の「OK」だけでは確定しない。これらは2.5.3で承認を得る。
- **作業区分**：2.5.2は利用箇所の棚卸し継続中。GitHubソースの変更・実装・検証は未着手。
- **次の作業**：class注入経路の実利用を照合し、2.5.3の制限付きスタイル指定API案に必要な対象を整理する。

### 2026-10-19：TableCell置換方針の承認

- ユーザー承認：TableCellの背景色指定をEnum化する。
- ユーザー承認：任意のCSSクラスを内部セルへ転送する`cellClasses`を廃止する。
- 責務分離：画面が仕様で許可されたEnum値を指定し、TableCellがEnumに対応する実際のCSSを管理する。
- 段階移行：既存の固定背景色と試合状態別の動的色分けは維持し、画面の呼び出しを置換してから`cellClasses`を削除する。zebra・selected・stickyの表示も回帰確認する。
- 未決：Enumの物理名・値・初期値、Input名、CSSマッピング、色の優先順位、静的検査方法。これらは2.5.3で決める。
- ACGでEnumを生成する。現在は設計方針の承認のみで、ソース変更・実装・検証は行わない。
- 2.5.2の棚卸しは継続中。2.5.3全体の完了扱いにはしない。

### 2026-10-19：実行時UIテンプレート・Componentの全件棚卸しを完了

- **GitHubの対象ブランチ**：`soracity/bruce` の `feature/feature-20261015`。
- **照合した範囲と件数**：`src/app`配下のHTMLテンプレート25ファイルと実行時のComponent／Directive／基底ComponentのTypeScript 27ファイルを照合（.spec.ts、バックアップ／コピー、Enum定義を除く）。画面側の`<app-*>`呼出しについて、直接`class`・`[class]`指定やclass系Inputを照合し、受け手のTS／HTML実装まで確認した。
- **経路① TableCell（12箇所）**：`brf1000/brf1002/ui/components/bru1002.component.html`の`app-table-cell`で、`class="bg-base-200"`による固定背景色11箇所（45、50、55、60、65、71、84、97、111、119、127行）、`[class]="getMatchStatusColor(...)"`による動的色1箇所（39-43行）。受け手は`table-cell.component.ts`の`cellClasses`→`table-cell.component.html`内部`td/th`の`[class]`。
- **経路② Header（1箇所）**：`brf8000/brf8010/ui/components/app-layout/app-layout.component.html`から`<app-header [classContainer]="'navbar bg-base-300 shadow-sm h-[4rem] shrink-0'">`を指定。受け手は`header.component.ts`の`classContainer = input<string>('')`と`header.component.html`の`<header [class]="classContainer()">`。
- **経路③ TabBar（1箇所）**：同`app-layout.component.html`から`<app-tab-bar [classTabBar]="'bg-base-300 h-[4rem] shrink-0 flex items-center justify-around'">`を指定。受け手は`tab-bar.component.ts`の`classTabBar = input<string>('')`と`tab-bar.component.html`の`<nav [class]="classTabBar()">`。
- **合計**：今回照合した実行時UIテンプレート内で自由なクラス文字列を渡す経路は3種類・14箇所。主要なBRF9020共通Componentの`classContainer`・`classInput`・`classLabel`などの専用Inputは見つからなかった。ただしHeader／TabBarはBRF8010であり、こちらには上記Inputが残存する。
- **対象外との区別**：共通Component内部の静的クラス、`selected`・`sticky`・`zebra`等の限定されたフラグ由来のクラス適用、画面のネイティブHTMLへの直接class指定は、「共通Component内部への任意class注入」と同一ではない。ネイティブHTMLのレイアウト方針は必要に応じ別途レビュー対象。
- **重要な制約**：この全件棚卸しは現在の`src/app`実行時UIソースに限定する。別リポジトリのACG生成元、未利用のテスト・バックアップファイル、将来追加される画面まで不在を保証したものではない。
- **承認との整合**：TableCellのEnum化と`cellClasses`廃止はユーザー承認済み。Header／TabBarに対する具体的な廃止・置換APIは未承認。2.5.3で検討する。既存ソースは変更していない。
- **工程判定**：2.5.2の棚卸し作業は完了。2.5.3で置換設計を続け、Phase 5の実装とPhase 7の検証へ引き継ぐ。

## 2.5.3 段階的廃止の優先順位・置換先を決定

- **作業**：進行中／**設計**：TableCellの基本方針承認済・その他と詳細検討中／**実装**：未着手／**検証**：未検証
- **対象と背景**：classContainer・classInput・classLabel等の画面側からのCSS注入は原則廃止し、既存画面を壊さず段階的に移行する。
- **この小区分で扱う具体事項**：段階的廃止の優先順位・置換先を決定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：Layout移行／内部標準CSS／限定APIを整理。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=検討中、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：Layout移行／内部標準CSS／限定APIを整理
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

## 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
