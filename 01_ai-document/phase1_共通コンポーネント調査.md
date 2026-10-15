# フェーズ1：共通コンポーネント調査

> 状態：過去の議論からの復元ドラフト（未レビュー）  
> 対象：`soracity/bruce` / `brf9020-shared-components`

## 目的
既存の共通UIコンポーネントを調査し、AIによる画面開発で再利用すべき部品と責務を明確化する。

## コンポーネント一覧（調査時点）

| 区分 | 対象 |
|---|---|
| 通常UI | Alert / Button / Date / Fab / Group / Radio / Textbox / Toggle / ToggleButton |
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

## 調査成果物と未確認事項

- 「brf9020共通コンポーネント仕様一覧 第1版」が過去の議論で言及されているが、完全な原本との照合は未完了。
- 各コンポーネントの全Input/Output、既定値、使用規則は最新ソースとの照合が必要。
- 角丸OFF時の表示は追加確認が必要。
- ビルド・実機表示確認は本書作成時には実施していない。

## 変更管理
本書は設計の復元記録であり、新たな仕様決定を意味しない。ユーザー確認後に正式版とする。
