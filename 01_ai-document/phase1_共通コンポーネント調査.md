# フェーズ1：共通コンポーネント調査

> 状態：過去の議論からの復元ドラフト（未レビュー）  
> 対象：`soracity/bruce` / `brf9020-shared-components`

## 目的
既存の共通UIコンポーネントを調査し、AIによる画面開発で再利用すべき部品と責務を明確化する。

## 共通コンポーネントの開発方針（追加決定：2026-10-15）

- **AndroidとiPhoneの両方で、見た目が崩れず美しく表示されること。** 画面サイズ、セーフエリア、文字サイズ、タッチ操作、OS間の描画差を考慮し、両プラットフォームで表示確認する。
- **デザインはTailwind CSSとDaisyUIをベースとすること。** 共通部品のスタイルは原則として両者のユーティリティ・コンポーネント・テーマを活用し、個別CSSの追加は必要性を検討してから行う。

※上記2項目はユーザーが明示的に追加した開発方針。具体的なテスト端末・対応OSバージョン・例外的なCSSの運用は今後決める。

**決定事項（2026-10-15）**：`ToggleButtonComponent` は古い実装のためフェーズ1・3の開発対象から除外。`soracity/bruce` の `feature/feature-20261015` ブランチで `brf9020-shared-components/toggleButton/components/` 配下の4ファイルを削除（commit `5b2800c`）。`brf9014-shared-components` 側も後続コミット `409bc5f` でディレクトリごと削除した。

**旧共通部品ディレクトリの削除（2026-10-15）**：`soracity/bruce` の `feature/feature-20261015` ブランチから `src/app/brf9000/brf9014-shared-components/` 配下の43ファイルを削除（commit `409bc5f`）。以降の共通部品レビュー対象は `brf9020-shared-components` とする。削除に伴う参照切れ・ビルド確認は未実施。

## コンポーネント一覧（調査時点）

| 区分 | 対象 |
|---|---|
| 通常UI | Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle |
| Table | TableContainerLayout / TableRecord / TableRow / TableCell |
| Swipe | SwipeDirective |
| Layout | LayoutItem / ItemStackLayout / LayoutSpan |

※上記は過去の調査内容を復元したものであり、最新ブランチとの再照合は未実施。

## 確認できた設計方針

1. `LayoutItem` は子要素を横方向に並べ、収まらなければ折り返す。
2. `ItemStackLayout` は項目や行を縦に積み重ねる。
3. 要素間の余白は原則 `margin` ではなく `gap` で管理する。
4. 画面全体の外周余白は上位画面コンテナの `padding` で管理する。
5. Layoutは子コンポーネントにCSSクラスを注入せず、子の幅を勝手に変更しない。
6. 既存部品を優先し、不要な抽象化・過剰な汎用化を避ける。

## 通常UI 8コンポーネント：SCSS・基底クラス確認（2026-10-15）

対象：`soracity/bruce` / `feature/feature-20261015`。既存のTypeScript・HTML調査に加え、8部品のSCSSと`FormControlComponentBase`を静的確認。

| 部品 | SCSSの実装 | レビュー観点 |
|---|---|---|
| Alert | host display:block | 狭い画面でのメッセージとボタン配置 |
| Button | host display:block、button width:100% | 幅の責務と親Layoutとの関係 |
| Date | host display:block、date-input width:100% | OS標準の日付UI差 |
| Fab | hostの下部余白、FABのbottom/rightにsafe-area-insetを加算 | 下部ナビ・セーフエリア・画面末尾の操作性 |
| Group | host display:block | disabledの視覚効果と子の操作禁止の区別 |
| Radio | host display:block、width:100%、min-width:0 | 選択肢の折り返し・タップ領域 |
| Textbox | host display:block、textbox-input width:100% | 狭い画面の横幅 |
| Toggle | host display:block | control・checked・disabledの状態管理 |

### FormControlComponentBaseの現状

- `@Directive()` の抽象基底クラスで、`readonly control = input.required<FormControl<T>>()` を定義。
- `ngOnInit`で`valueChanges`と`statusChanges`を購読し、`OnPush`の変更検知を`markForCheck()`で要求。
- `takeUntilDestroyed`により破棄時に購読解除。
- Date・Radio・Textboxが継承。Toggleは独自に類似処理を持つ。
- フェーズ3の単一`ComponentBase`案は**未実装・議論中**。現行実装を直ちに変更する決定ではない。

### Android・iPhone対応とデザイン方針

- HTMLではDaisyUIの`btn`、`alert`、`input`、`radio`、`toggle`、`fieldset`等とTailwindユーティリティを利用。
- 独自SCSSは現状、host表示、横幅指定、FABのセーフエリア補正などに使用。
- **FABのセーフエリア対応はコード上で確認済み**。両OSでの表示品質は未検証。
- 重点確認項目：狭い画面、文字サイズ拡大、横長ラベル、タップ領域、キーボード表示、OSネイティブ入力の違い、下部ナビとの重なり。
- `Group`の`disabled`は現行テンプレートでは`opacity-50`を付与するだけで、投影された子コンポーネントの操作を一律に禁止する実装ではない。
- `Toggle`の`checked`が指定された場合は`control.value`より優先して表示される。状態の責務は設計検討対象。

### 検証範囲

GitHub上のソースを静的に確認。ビルド・実機・エミュレーター・単体テストの実行は行っていない。ユーザーから旧`brf9014-shared-components`削除後のビルド成功の報告あり（本レビューでの実行結果ではない）。

## Layout 3部品の現行ソース調査（2026-10-15）

対象：`soracity/bruce` / `feature/feature-20261015`。TypeScript・HTMLを静的確認。

| 部品 | Input/Output | 現行実装 | 注意点 |
|---|---|---|---|
| ItemStackLayout | なし | `<div class="flex flex-col gap-4"><ng-content></ng-content></div>` | 子要素を縦積み、gap-4=16px |
| LayoutItem | なし | `flex gap-2 [&>*]:min-w-0 [&>*]:flex-1 [&>*]:basis-0` | 横並び・gap-2=8px。**flex-wrap指定なし**。直接の子要素を均等幅に制御 |
| LayoutSpan | `appLayoutSpan: number \| string` | `flex-grow`に指定数値、`flex-basis:0px`、`min-width:0px` | 非有限値・0以下はgrow=1。HostBindingによる直接スタイル指定 |

### 設計方針との照合・未決事項

1. 既存の復元ドラフトでは`LayoutItem`が「折り返す」とされているが、現行HTMLには`flex-wrap`がなく、**実装と記録に差異がある**。
2. 復元ドラフトの「子の幅を勝手に変更しない」という記述に対し、現行`LayoutItem`は直接の子要素に`flex-1`・`basis-0`・`min-w-0`を適用する。仕様として意図した動作か、後の設計フェーズで確認する。
3. `LayoutSpan`は均等幅を個別の比率に変更する用途と考えられるが、具体的な利用箇所・画面例との照合は未実施。
4. Tailwind CSS中心で構成。iPhone/Androidの狭い画面での折り返し、ラベル切れ、文字サイズ拡大などの表示確認は未実施。
5. 各部品の単体テスト内容、実際の呼び出し側、ビルド・実機表示は未確認。

※これはフェーズ1の**現状調査記録**。コード修正・仕様変更を承認したものではない。

## 調査成果物と未確認事項

- 「brf9020共通コンポーネント仕様一覧 第1版」が過去の議論で言及されているが、完全な原本との照合は未完了。
- 各コンポーネントの全Input/Output、既定値、使用規則は最新ソースとの照合が必要。
- 角丸OFF時の表示は追加確認が必要。
- ビルド・実機表示確認は本書作成時には実施していない。

## 変更管理
本書は設計の復元記録であり、新たな仕様決定を意味しない。ユーザー確認後に正式版とする。
