# Bruce AIフレームワーク設計 TODO

> 目的：Bruceの設計思想を維持したまま、LayoutManager・共通Component・ACG・AI実装ルールを組み合わせて、AI主体で画面開発できる仕組みを整備するための設計TODOを管理する。

## AIフレームワークの意味

ここでいう「AIフレームワーク」は、AIモデルそのものやLLM基盤を指すのではない。

BruceにおいてAIへ画面実装を任せる際に、AIが自由実装へ逸脱しないようにするための、以下をまとめた開発基盤・設計ルール群を指す。

- LayoutManager（`LayoutItem` / `ItemStackLayout` / `LayoutSpan` / `TableContainerLayout`）
- 既存共通Component
- UI Form DTO / ACG生成仕様
- UI / Application / Domain等の責務境界
- 共通型・Enum等の型設計
- AIが従う画面実装ルール
- 禁止事項（独自CSSレイアウト、生成物直接修正等）
- 設計書からAI実装へ渡す指示形式
- AI生成後のレビュー・フィードバック手順

最終目的は、画面設計書からAIがBruceの設計思想に沿った実装を安定して生成できる状態にすること。

---

## 決定事項

### BrandはSymbol方式の実体Brandで統一する

Bruceプロジェクトでは、AIによる実装・ユーザーによる手動実装のどちらであっても、Brandを使用する場合は**Symbol方式の実体Brandで統一する**。

型情報だけに存在し、実行時には消える `declare` Brand は標準方式としない。

通常の文字列プロパティとして `__brand` を実体化する方式も標準方式としない。

標準イメージ：

```ts
export const APP_CODE_ENUM_BRAND = Symbol('AppCodeEnumIf');

export interface AppCodeEnumIf {
  readonly [APP_CODE_ENUM_BRAND]: true;
  readonly name: string;
  readonly value: string;
}
```

実装例：

```ts
export class AppCodeCourtSideEnum implements AppCodeEnumIf {
  readonly [APP_CODE_ENUM_BRAND] = true;

  constructor(
    public readonly name: string,
    public readonly value: string,
  ) {}
}
```

採用目的：

- コンパイル時だけでなく必要に応じて実行時にも識別できるようにする
- AI実装と手動実装でBrand方式を統一する
- 共通Componentや汎用処理で、型と実行時の扱いを一致させる
- `JSON.stringify()` 等の通常のシリアライズへBrandを混入させない
- Bruce全体でBrand実装の揺れをなくす

> 状態：**方針決定**。

---

## 2026-10-17 対応済み

今回のACG/Bruce対応では、以下まで完了済み。

- 修正版ACGをPUSH済み
- ACGによる全クラスの自動生成結果をBruceへ反映済み
- Enumインターフェースの名称修正済み
- EnumインターフェースをSymbol方式の実体Brandへ変更済み
- ACGのEnumクラス生成でSymbol方式の実体Brandを生成するよう反映済み

注意：今回ACGへ実装した実体Brand自動生成は**Enumクラス生成が対象**。Bruce全体のBrand方針自体はSymbol方式の実体Brandで統一するが、Enum以外へのACG自動生成対応まで実装したという意味ではない。

---

## TODO

### [ ] Enum以外でBrandを使用する箇所が発生した場合の標準適用

Bruce全体のBrand方式は決定済みなので、今後Enum以外でBrandが必要になった場合もSymbol方式の実体Brandを使用する。

必要に応じて、以下をその時点で設計・実装する。

- Brand用Symbolの配置・命名ルール
- 実行時型ガードの共通化
- ACGによる自動生成対象へ追加するか
- REST/JSON/Object spread等への影響確認

> 状態：将来対応。現時点ではEnumクラス生成への反映まで完了。
