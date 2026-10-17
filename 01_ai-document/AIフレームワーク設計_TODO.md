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

### Brandは実体Brandで統一する

Bruceプロジェクトでは、AIによる実装・ユーザーによる手動実装のどちらであっても、Brandを使用する場合は**実行時にも実体が存在するBrand（実体Brand）で統一する**。

型情報だけに存在し、実行時には消える `declare` Brand は標準方式としない。

例：

```ts
// 標準方式にはしない
// declare readonly __brand: 'AppCodeEnumIf';
```

実体Brandを採用する目的：

- コンパイル時の型識別だけでなく、必要に応じて実行時にも識別できるようにする
- AI実装と手動実装でBrandの意味を統一する
- 共通Componentや汎用処理で、型と実行時の扱いを一致させる
- Bruce全体でBrand実装の揺れをなくす

> 状態：**方針決定**。ただし、実体Brandの表現を通常プロパティにするかSymbolにするかは下記TODOで継続検討する。

---

## TODO

### [ ] 実体Brandの標準表現をSymbolにするか検討

実体Brandの採用自体は決定済み。

一方、通常の文字列プロパティとして

```ts
readonly __brand = 'AppCodeEnumIf' as const;
```

を持たせると、`JSON.stringify()`、Object展開、REST通信用DTO化等でbrandがシリアライズ対象に混入する可能性がある。

Bruceは将来的にREST通信を行うため、**通常プロパティの `__brand` ではなく、Symbolによる実体Brandにしてシリアライズ対象から自然に外す設計を検討する。**

候補イメージ：

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
  readonly [APP_CODE_ENUM_BRAND] = true as const;

  constructor(
    public readonly name: string,
    public readonly value: string,
  ) {}
}
```

検討事項：

- Bruce全体でBrand用Symbolの定義方法を統一するか
- ACGでSymbol Brandを生成する責務を持たせるか
- `AppCodeEnumIf` とSymbol定数を同一ファイルへ置くか
- 実行時型ガード `isAppCodeEnum()` を共通化するか
- `JSON.stringify()` / Object spread / REST Request DTOでBrandが混入しないことを確認する
- 現在の `declare readonly __brand` から実体Brandへ移行する影響範囲を確認する
- コード列挙型以外のBrandにも同じ標準方式を適用するか

> 状態：未決。現在のACG/Bruce互換対応を優先し、AIフレームワーク設計の本線再開後に検討する。
