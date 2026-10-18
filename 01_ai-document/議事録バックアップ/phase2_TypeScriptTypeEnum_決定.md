# Phase2 TypeScript型Enum 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

既存の `TypeScriptPrimitiveTypeEnum` は、実際には画面設計書・DAO設計・列挙型設計・データモデル設計などで「TypeScript上の型分類」を表す共通Enumとして利用されている。

名称中の `Primitive` は実際の責務に対して狭すぎるため、以下のように名称変更する。

```text
TypeScriptPrimitiveTypeEnum
↓
TypeScriptTypeEnum
```

## 型分類

`TypeScriptTypeEnum` では、TypeScript上の型として意味のある分類のみを持つ。

```text
STRING
NUMBER
BOOLEAN
UINT8ARRAY
ENUM
```

`DATE` / `DATE_TIME` はTypeScript上では `string` であり、`STRING` と型として区別する意味がないため削除する。

日付・日時という意味は、画面設計書では `型` ではなく `形式` で表現する。

```text
型=文字列 / 形式=日付
型=文字列 / 形式=日時
```

## Enum型の追加

画面設計書の `型` 列で `Enum` を指定可能にするため、同Enumへ `ENUM` を追加する。

`ENUM` の具体的なTypeScript型名は、画面設計書の `Enum型` 列で指定されたクラス名を使用するため、`TypeScriptTypeEnum` 自体で固定のTypeScript型名を持つ前提にはしない。

## ACG改修方針

今回の改修で以下を実施する。

- `TypeScriptPrimitiveTypeEnum` を `TypeScriptTypeEnum` へリネームする
- `ENUM` を追加する
- `DATE` を削除する
- `DATE_TIME` を削除する
- DAO生成などで `DATE` / `DATE_TIME` を直接判定している箇所を削除し、文字列は `STRING` として扱う
- UI DTO生成側の `DATE` / `DATE_TIME` 分岐を削除する
- 画面設計書の形式Enumに `日付` / `日時` を追加する

自動生成ファイルを直接修正せず、ACG本体の参照箇所を修正する。

## 方針

UI専用の別型Enumは新設せず、既存の型分類Enumを汎用名称へリネームして拡張する。

## 現行パッケージの扱い

ACGの現行パッケージは `io.github.soracity.alfred` とする。

`com.github.soracity.alfred` は旧パッケージとして扱い、今後の設計検討・コード調査・修正対象・コード例から除外する。
