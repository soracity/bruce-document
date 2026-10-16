# Phase2 Nullable型 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

Bruceでは、TypeScriptで `null` を許容する型を表現する際、`A | null` を直接記述せず、共通型エイリアス `Nullable<T>` を使用する。

```ts
type Nullable<T> = T | null;
```

以下は同じ型を表す。

```ts
AppCodeMatchStatusEnum | null
```

```ts
Nullable<AppCodeMatchStatusEnum>
```

`Nullable<T>` は型表記を統一するための型エイリアスであり、TypeScript上のnull許容の意味や型安全性は変更しない。

## 共通型の配置

Bruceの `src/global.d.ts` に以下を定義する。

```ts
type Nullable<T> = T | null;
```

`global.d.ts` はモジュール化せず、`import` / `export` を記述しない。

これにより、Bruce配下のTypeScriptソースでは `Nullable<T>` をimportせずに使用可能とする。

## 適用方針

BruceおよびACG生成ソースでは、null許容型を原則以下の形式で表現する。

```text
A | null
↓
Nullable<A>
```

対象例：

```ts
Nullable<number>
Nullable<boolean>
Nullable<Uint8Array>
Nullable<AppCodeMatchStatusEnum>
```

FormControlでも同様とする。

```ts
FormControl<Nullable<AppCodeMatchStatusEnum>>
```

メソッド引数・戻り値・変数・プロパティなど、型として `A | null` を表現する箇所でも `Nullable<A>` を使用する。

## ACG方針

ACGが生成するTypeScriptコードでは、null許容型を `A | null` ではなく `Nullable<A>` として生成する。

`Nullable<T>` はBruceのグローバル型であるため、ACGは `Nullable` 用のimportを生成しない。

生成済みファイルを直接修正せず、ACG本体の型生成処理を修正する。

## 注意事項

`Nullable<T>` は `T | null` の別名であり、nullそのものを禁止・除去する仕組みではない。

そのため、nullが存在し得る箇所では従来どおりnullチェックまたは型の絞り込みが必要となる。

また、`undefined` は `Nullable<T>` の対象外とする。
