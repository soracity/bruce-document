# Phase2 TypeScript型Enum 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

既存の `TypeScriptPrimitiveTypeEnum` は、実際には画面設計書・DAO設計・列挙型設計・データモデル設計などで「TypeScript上の型分類」を表す共通Enumとして利用されている。

また、既存値には文字列・数値・真偽・日付・日時・バイナリが含まれており、名称中の `Primitive` は実際の責務に対して狭すぎる。

そのため、以下のように名称変更する。

```text
TypeScriptPrimitiveTypeEnum
↓
TypeScriptTypeEnum
```

## Enum型の追加

画面設計書の `型` 列で `Enum` を指定可能にするため、同Enumへ `ENUM` を追加する。

概念上は以下の型分類を持つ。

```text
STRING
NUMBER
BOOLEAN
DATE
DATE_TIME
UINT8ARRAY
ENUM
```

`ENUM` の具体的なTypeScript型名は、画面設計書の `Enum型` 列で指定されたクラス名を使用するため、`TypeScriptTypeEnum` 自体で固定のTypeScript型名を持つ前提にはしない。

## 方針

UI専用の別型Enumは新設せず、既存の型分類Enumを汎用名称へリネームして拡張する。

自動生成ファイルを直接修正せず、ACG本体の参照箇所を `TypeScriptTypeEnum` へ変更する。
