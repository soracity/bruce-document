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

## TODO

### [ ] コード列挙型の実体brandをSymbol化するか検討

現状、コード列挙型の識別用として `AppCodeEnumIf` と `__brand` を利用している。

将来的に実行時にもコード列挙型を識別する場合、通常の文字列プロパティとして

```ts
readonly __brand = 'AppCodeEnumIf' as const;
```

を持たせると、`JSON.stringify()`、Object展開、REST通信用DTO化等でbrandがシリアライズ対象に混入する可能性がある。

Bruceは将来的にREST通信を行うため、**通常プロパティの `__brand` ではなく、Symbolによる実体brandにしてシリアライズ対象から自然に外す設計を検討する。**

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

- ACGでSymbol brandを生成する責務を持たせるか
- `AppCodeEnumIf` とSymbol定数を同一ファイルへ置くか
- 実行時型ガード `isAppCodeEnum()` を共通化するか
- `JSON.stringify()` / Object spread / REST Request DTOでbrandが混入しないことを確認する
- 現在の `declare readonly __brand` から移行する場合の影響範囲を確認する
- コンパイル時識別だけで十分な箇所と、実行時識別が必要な箇所を分ける

> 状態：未決。現在のACG/Bruce互換対応を優先し、AIフレームワーク設計の本線再開後に検討する。
