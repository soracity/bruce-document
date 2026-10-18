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

### 2026-10-16承認済み原典の詳細

> [原典](議事録バックアップ/phase2_UI設計思想と責務.md)から復元。ここに記載した設計承認と実装完了は別である。

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



### 旧再開サマリの検討詳細とスナップショット（2026-10-15）

> [旧再開サマリ](議事録バックアップ/phase2_phase3_再開用完全サマリ.md)の内容。当時の未決・提案・再開指示を履歴として収録。後日にユーザーが承認した事項は最新記録を優先する。

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

- **作業**：未着手／**設計**：検討中／**実装**：未確認／**検証**：未検証
- **対象と背景**：classContainer・classInput・classLabel等の画面側からのCSS注入は原則廃止し、既存画面を壊さず段階的に移行する。
- **この小区分で扱う具体事項**：現行のclass注入Inputと呼び出し箇所を棚卸し。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：既存ソースから使用箇所と互換性を把握。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=検討中、実装=未確認、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：既存ソースから使用箇所と互換性を把握
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)

## 2.5.3 段階的廃止の優先順位・置換先を決定

- **作業**：未着手／**設計**：検討中／**実装**：未着手／**検証**：未検証
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
