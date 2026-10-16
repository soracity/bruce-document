# Phase2 ACG実装追加方針 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

Phase2のACG実装修正にあたり、未確定だった以下4点を正式決定する。

## 1. 文字種Enumの配置

画面設計書の `文字種` 列を解釈するEnumとして `AcgUiFormCharacterTypeEnum` を追加する。

今回の実装では、既存のUI設計書用Enumと同じ以下のパッケージへ配置する。

```text
io.github.soracity.alfred.generator.user.uispec.uispecenum
```

対象イメージ：

```text
AcgUiFormFormatCheckEnum
AcgUiFormCharacterTypeEnum
```

パッケージ全体の再編は今回のACG実装では行わない。

共通EnumとUI専用Enumの最終的なパッケージ構成は、AlfredCodeGeneratorのGitHub Issue #8「設計書列用Enumのパッケージ構成を整理する」で別途検討する。

Issue #8が未決の間、今回決定した配置を暫定的な正式配置として使用する。

## 2. Injectableのroot提供有無

`AcgClassModel` では、Injectableであるかどうかと、root提供するかどうかを分離して表現する。

以下の2項目を持つ方針とする。

```text
isInjectable
providedInRoot
```

UI Form DTOは以下とする。

```text
isInjectable = true
providedInRoot = false
```

生成結果：

```ts
@Injectable()
export class Bru1001Dto {
  // ...
}
```

DAO等、従来どおりroot提供するクラスは以下とする。

```text
isInjectable = true
providedInRoot = true
```

生成結果：

```ts
@Injectable({ providedIn: 'root' })
export class XxxDao {
  // ...
}
```

これにより、`isInjectable=true` の場合に必ず `providedIn: 'root'` を生成する現行仕様を変更し、UI Form DTOをComponentスコープDIで利用できるようにする。

## 3. TypeScriptTypeEnum.ENUMのTypeScript型

`TypeScriptTypeEnum.ENUM` は固定のTypeScript型名を持たない。

画面設計書では、実際のTypeScript型は `Enum型` 列から取得する。

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
```

生成側では以下を使用する。

```ts
FormControl<AppCodeMatchTypeEnum | null>
```

`ENUM` に対して共通処理から固定のTypeScript型名を取得しようとした場合、ACGは推測値を返さずFail Fastで停止する。

つまり、`ENUM` の実型解決は `Enum型` 列を解釈できる処理の責務とする。

## 4. 日付・日時のデフォルト値

`形式=日付` / `形式=日時` は、任意の固定文字列をデフォルト値として許可しない。

許可する組み合わせは以下のみとする。

```text
形式=日付
デフォルト=-
→ ''

形式=日付
デフォルト=SYSTEM_DATE
→ AppDateUtil.getSysDateIso8601()

形式=日時
デフォルト=-
→ ''

形式=日時
デフォルト=SYSTEM_DATETIME
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

以下は不正とする。

```text
形式=日付
デフォルト=2026-10-16
→ Exception

形式=日時
デフォルト=2026-10-16T06:24:00.000Z
→ Exception
```

`形式=日付` / `形式=日時` に対して、`-` または対応する予約語以外が指定された場合、ACGは自動補正せずFail Fastで停止する。

一般の `型=文字列` に対する「任意文字列をデフォルト値として指定可能」というルールは維持するが、`形式=日付` / `形式=日時` はこの一般ルールの対象外とする。

## 実装対象

今回のACG実装修正では、上記4点を既存のPhase2確定仕様と合わせて実装する。

生成済みファイルを直接修正せず、ACG本体・設計書解析・内部モデル・コード生成・仕様チェック・テストを修正対象とする。
