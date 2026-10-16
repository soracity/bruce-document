# Phase2 ACGデフォルト値 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

画面設計書の `デフォルト` 列では、`-` を「デフォルト未指定」とする。

`-` のときに生成するFormControl初期値は型ごとに決める。

| 型 | デフォルト列 | FormControl初期値 |
|---|---|---|
| 文字列 | `-` | `''` |
| 文字列 | 任意文字列 | 指定文字列 |
| 数値 | `-` | `null` |
| 数値 | 数値 | 指定数値 |
| 真偽 | `-` | `false` |
| 真偽 | `true` | `true` |
| 真偽 | `false` | `false` |
| Enum | `-` | `null` |
| Enum | コード値 | `Enum型.toEnum('コード値')` |
| 文字列＋日付 | `-` | `''` |
| 文字列＋日付 | `SYSTEM_DATE` | `AppDateUtil.getSysDateIso8601()` |
| 文字列＋日時 | `-` | `''` |
| 文字列＋日時 | `SYSTEM_DATETIME` | `AppDateUtil.getSysDateTimeUtcIso8601()` |

## Enumのデフォルト値

例：

```text
型=Enum
Enum型=AppCodeMatchTypeEnum
デフォルト=0
```

生成イメージ：

```ts
new FormControl<AppCodeMatchTypeEnum | null>(
  AppCodeMatchTypeEnum.toEnum('0')
)
```

`デフォルト=-` の場合は `null` とする。

```ts
new FormControl<AppCodeMatchTypeEnum | null>(null)
```

## 必須項目との関係

`必須=〇` であっても、`デフォルト=-` の場合にACGが値を補完しない。

```text
必須=〇 + デフォルト=-
```

の場合、初期状態は未入力とし、Validationで必須エラーになり得る状態とする。

ACGは必須だからという理由で推測して初期値を設定しない。

## 日付・日時

`形式=日付`、`形式=日時` も `デフォルト=-` の場合は空文字 `''` とする。

現在日付・現在日時をデフォルト値として設定する場合は、画面設計書の `デフォルト` 列に以下の予約語を指定する。

```text
SYSTEM_DATE
SYSTEM_DATETIME
```

### 日時

画面設計書：

```text
形式=日時
デフォルト=SYSTEM_DATETIME
```

ACG生成：

```ts
AppDateUtil.getSysDateTimeUtcIso8601()
```

UTCのISO 8601形式で取得する。

返却値例：

```text
2026-10-16T06:24:00.000Z
```

### 日付

画面設計書：

```text
形式=日付
デフォルト=SYSTEM_DATE
```

ACG生成：

```ts
AppDateUtil.getSysDateIso8601()
```

ISO 8601の日付形式で取得する。

返却値例：

```text
2026-10-16
```

`形式=日付` は非推奨とする既存方針を維持する。

## AppDateUtil

利用する既存Utilityは以下とする。

```text
src/app/brf9000/brf9017-utils/app-date.util.ts
```

ACGは現在日付・現在日時の取得処理を独自実装せず、`AppDateUtil` の上記メソッドを利用する。

## 予約語

画面設計書の `デフォルト` 列で使用する日付・日時の予約語は以下とする。

```text
SYSTEM_DATE
→ 形式=日付 で使用
→ AppDateUtil.getSysDateIso8601()

SYSTEM_DATETIME
→ 形式=日時 で使用
→ AppDateUtil.getSysDateTimeUtcIso8601()
```

ACGはこれらの予約語を固定値文字列としてFormControlへ設定せず、対応する `AppDateUtil` 呼び出しへ変換する。

## 予約語と形式の組み合わせチェック

`SYSTEM_DATE` と `SYSTEM_DATETIME` は、対応する形式と1対1で使用する。

```text
形式=日付
デフォルト=SYSTEM_DATE
→ OK

形式=日時
デフォルト=SYSTEM_DATETIME
→ OK

形式=日付
デフォルト=SYSTEM_DATETIME
→ Exception

形式=日時
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATE
→ Exception

形式が日付・日時以外
デフォルト=SYSTEM_DATETIME
→ Exception
```

ACGは不正な組み合わせを自動補正せず、検出した時点でExceptionを発生させてコード生成を停止する。

この方針をFail Fastとする。
