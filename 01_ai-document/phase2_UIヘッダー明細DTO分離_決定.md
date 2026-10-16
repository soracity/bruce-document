# Phase2 UIヘッダー・明細DTO分離 決定

> 状態：設計承認済み  
> 承認日：2026-10-16

## 決定内容

ヘッダー（検索条件）と明細（検索結果）は、それぞれ別DTOとして定義することを基本形とする。

```text
画面Component
├─ HeaderDto / ConditionDto
│   └─ 検索条件用 FormGroup
│
└─ DetailDto / ResultDto
    └─ 明細1行分
```

画面全体を包むだけの親DTOは原則作成しない。

## 表示専用明細

表示専用の明細は通常のDTO配列として保持する。

```ts
resultList: Bru1002ResultDto[] = [];
```

検索後の結果は、同一Componentインスタンスが生存している間、クライアント側メモリに保持される。

## 編集可能明細

画面上で明細行を編集する場合はReactive Formsを使用する。

```text
FormArray
└─ FormGroup  // 1明細行
   ├─ FormControl
   ├─ FormControl
   └─ ...
```

編集可能明細では、FormControl/FormGroup/FormArrayにより画面入力状態・Validation・dirty/touched等を管理する。

## Reactive Forms方針

1画面・1Component内に複数のFormGroupが存在してよい。

責務が異なる入力単位は無理に1つのFormGroupへまとめず、必要に応じて分離する。

例：

```text
Bru1002Component
├─ 検索条件FormGroup
└─ 編集明細FormArray / FormGroup
```

同一入力項目でReactive Formsと`[(ngModel)]`を併用しない。

## 基本原則

```text
表示専用明細
→ DTO[]

編集可能明細
→ FormArray<FormGroup<...>>

検索条件
→ 独立したUI Form DTO / FormGroup
```
