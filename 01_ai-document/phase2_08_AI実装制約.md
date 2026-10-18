# Phase 2.8 AI実装制約

> **工程表の中区分：2.8 AI実装制約**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

AIが独自CSS・Component・Mapper等を無断追加せず、既存LayoutManager・共通部品を利用する。ACG生成物の直接修正も禁止。例外の承認フローはこれから設計。

## 2.8.1 既存LayoutManager・共通部品優先と独自CSS禁止を決定

- **作業**：完了／**設計**：承認済／**実装**：対象外／**検証**：対象外
- **対象と背景**：AIの自由なHTML/CSS、独自Component、ACG生成物の直接修正を制約し、Bruce共通基盤による保守可能な画面実装を目指す。
- **この小区分で扱う具体事項**：既存LayoutManager・共通部品優先と独自CSS禁止を決定。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：実装用のAI向け指示化はPhase 6。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=対象外、検証=対象外。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：実装用のAI向け指示化はPhase 6
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase00_進捗管理と議事録運用_議事録.md](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md)

### 2026-10-16承認済み原典の詳細

> [原典](議事録バックアップ/phase2_UI設計思想と責務.md)から復元。ここに記載した設計承認と実装完了は別である。

#### 承認済みIssue：画面・LayoutManager・共通Componentの責務境界

> 状態：**設計承認済み**  
> 承認日：2026-10-15

##### 決定内容

画面・LayoutManager・共通Componentの責務を次のように分離する。

| 層 | 責務 |
|---|---|
| 画面Component | 何を表示するか、どの順番で置くか、データ・イベントの接続 |
| ItemStackLayout | 行を縦方向に積み重ね、行間のgapを管理する |
| LayoutItem | 1行を構成し、子要素の横並び・gap・wrapを管理する |
| LayoutSpan | 必要な場合のみ子要素の幅比率を指定する |
| TableContainerLayout | テーブル固有の構造・列・横スクロール等を管理する |
| 共通Component | 自身の内部構造・操作性・見た目を管理する |
| styles.scss / design token | アプリ全体の色・文字・サイズ等のデザイン規則を管理する |

基本原則は次のとおりとする。

> **画面は「配置を記述」するが、「配置をCSSで実装」しない。**

画面はLayoutManagerと共通Componentを組み合わせて画面構造を定義する。画面固有CSSによって、共通Componentの外部配置や内部デザインを変更しない。

許可する例：

```html
<app-item-stack-layout>
  <app-layout-item>
    <app-textbox ... />
    <app-date ... />
  </app-layout-item>

  <app-layout-item>
    <app-button ... />
  </app-layout-item>
</app-item-stack-layout>
```

禁止する例：

```html
<div class="flex gap-4 mt-3 w-full">
  ...
</div>
```

```html
<app-textbox class="w-1/2" ... />
<app-textbox classContainer="m-4" ... />
```

幅比率など、レイアウト上必要な指定はLayoutManagerが提供する仕組みを利用する。

```html
<app-layout-item>
  <app-textbox [appLayoutSpan]="70" ... />
  <app-textbox [appLayoutSpan]="30" ... />
</app-layout-item>
```

##### 任意CSS注入に関する方針

`classContainer`、`classInput`、`classLabel`、`classSpan`等、画面側から共通Component内部へ任意CSSを注入するAPIは原則廃止する方向とする。

- コンポーネントの外側配置はLayoutManagerが担当する。
- コンポーネント内部の配置・見た目は共通Component自身が担当する。
- 見た目の差分が必要な場合は、任意CSS文字列ではなく`variant`、`appearance`、`size`等の意味を持つ限定的なAPIを使用する。

##### AIによる画面実装への適用

AIに画面実装を依頼する場合も、自由なCSSレイアウトを生成させず、既存のLayoutManagerと共通Componentを使用させる。

これにより、AI生成コードでも画面間の一貫性と設計思想を維持する。


## 2.8.2 ACG生成物を直接編集しないことを確認

- **作業**：完了／**設計**：承認済／**実装**：対象外／**検証**：対象外
- **対象と背景**：AIの自由なHTML/CSS、独自Component、ACG生成物の直接修正を制約し、Bruce共通基盤による保守可能な画面実装を目指す。
- **この小区分で扱う具体事項**：ACG生成物を直接編集しないことを確認。既存の承認・調査記録で確認された内容をもとに、工程内で扱う責務・設計制約と実装状況を区別する。
- **確認・引継ぎ内容**：AIレビュー手順に取り込む。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=完了、設計=承認済、実装=対象外、検証=対象外。設計上の完了を実装・実機検証済みと読み替えない。
- **次の作業**：AIレビュー手順に取り込む
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase00_進捗管理と議事録運用_議事録.md](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md)

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


## 2.8.3 例外発生時の承認フローの原則を確定

- **作業**：未着手／**設計**：検討中／**実装**：未着手／**検証**：未検証
- **対象と背景**：AIの自由なHTML/CSS、独自Component、ACG生成物の直接修正を制約し、Bruce共通基盤による保守可能な画面実装を目指す。
- **この小区分で扱う具体事項**：例外発生時の承認フローの原則を確定。今後の検討・実施対象であり、具体的な技術方式や受入基準は未承認。
- **確認・引継ぎ内容**：AIが独断実装しないための停止条件を具体化。関連する画面・共通Component・ACG・試験のどこに影響するかを明示し、設計決定は原典とユーザー承認で確認する。
- **状態の区別**：作業=未着手、設計=検討中、実装=未着手、検証=未検証。本記録は作業計画の具体化であり、設計仕様や実装の承認・完了を意味しない。
- **次の作業**：AIが独断実装しないための停止条件を具体化
- **原典**：[phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)、[phase00_進捗管理と議事録運用_議事録.md](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md)

## 旧議事録（原文・承認日・検討経緯）

- [phase2_UI設計思想と責務.md](議事録バックアップ/phase2_UI設計思想と責務.md)
- [phase00_進捗管理と議事録運用_議事録.md](議事録バックアップ/phase00_進捗管理と議事録運用_議事録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
