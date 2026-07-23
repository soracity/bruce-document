```text
app
└── brf10-match-state/                         # 【機能グループ】BRF10：試合状態
    └── brf11-match-state/                     # 【機能】BRF11：試合状態
        ├── ui/
        │   ├── components/
        │   │   └── bru1100.component.ts
        │   └── dto/
        │       └── bru1100.dto.ts
        │
        ├── application/
        │   ├── service/
        │   │   └── bra1100.service.ts
        │   └── dto/
        │       ├── bra1100-<method1>-req.dto.ts
        │       ├── bra1100-<method1>-res.dto.ts
        │       ├── bra1100-<method2>-req.dto.ts
        │       └── bra1100-<method2>-res.dto.ts
        │
        ├── domain/
        │   ├── aggregate/
        │   │   └── brd1100.aggregate.ts
        │   ├── models/
        │   │   └── brd1100-<entity-name>.entity.ts
        │   ├── service/
        │   └── repositories/
        │       └── brd1100-<repository-name>.repository.ts
        │
        └── infrastructure/
            ├── repositories/
            │   └── bri1100-<repository-name>.repository.ts
            ├── dao-generate/
            │   └── bri1100-<dao-name>.dao.ts
            ├── dao-dto-generate/
            │   ├── bri1100-<dao-name>-req.dto.ts
            │   └── bri1100-<dao-name>-res.dto.ts
            ├── dao-custom/
            │   └── bri1100-<dao-name>.dao.ts
            └── dao-dto-custom/
                ├── bri1100-<dao-name>-req.dto.ts
                └── bri1100-<dao-name>-res.dto.ts
```

- 「src/app/」と「src/libs/」配下のコンテキストは関連させるべき。
- 例えば「src/app/a1」で追加要件が発生して、「src/libs/a2」に都合の良い処理が存在していた場合、「src/libs/a2」を利用してよいですか？、それとも「src/app/a1」に処理を追加するべきですか？
  - 共通処理に移動してからa1とa2で利用するのが良い
- コンテキストは以下とする
  - メニュー
  - 試合属性
  - 試合ポイント情報
  - 共通


【改良版】
