```text
src/app/
  ├── AKC01000/             # メニュー表示
  │    ├── read-models/    # Read Models（Signalで扱う表示専用のデータ型）
  │    └── components/     # Angular Components（画面、テンプレート）
  ├── AKC02000/             # 試合属性
  │    ├── read-models/    # Read Models（Signalで扱う表示専用のデータ型）
  │    └── components/     # Angular Components（画面、テンプレート）
  ├── AKC03000/             # ポイント入力
  │    ├── read-models/    # Read Models（Signalで扱う表示専用のデータ型）
  │    └── components/     # Angular Components（画面、テンプレート）
  └── AKC09000/             # 共通
       ├── read-models/    # Read Models（Signalで扱う表示専用のデータ型）
       └── components/     # Angular Components（画面、テンプレート）
       
src/libs/
  ├── AKC01000/                     # メニュー表示
  │       ├── store/          　　　# 画面のキャッシュデータ
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── application/         # 【アプリケーション層】
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── domain/              # 【ドメイン層】業務ルールと事実の定義
  │       │    ├── services/       # Domain Services
  │       │    └── models/         # Entity, Value Object
  │       ├── projections/    　　　# Projections（イベントを検知してSignalを更新）
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       └── infrastructure/      # 【インフラ層】
  │            ├── repositories/   # DB保存（Event Store）の実装
  │            └── gate-api/       # ACL
  ├── AKC02000/                     # 試合属性
  │       ├── store/          　　　# 画面のキャッシュデータ
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── application/         # 【アプリケーション層】
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── domain/              # 【ドメイン層】業務ルールと事実の定義
  │       │    ├── services/       # Domain Services
  │       │    └── models/         # Entity, Value Object
  │       ├── projections/    　　　# Projections（イベントを検知してSignalを更新）
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       └── infrastructure/      # 【インフラ層】
  │            ├── repositories/   # DB保存（Event Store）の実装
  │            └── gate-api/       # ACL
  ├── AKC03000/                     # ポイント入力
  │       ├── store/          　　　# 画面のキャッシュデータ
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── application/         # 【アプリケーション層】
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       ├── domain/              # 【ドメイン層】業務ルールと事実の定義
  │       │    ├── services/       # Domain Services
  │       │    └── models/         # Entity, Value Object
  │       ├── projections/    　　　# Projections（イベントを検知してSignalを更新）
  │       │    ├── service/        # 
  │       │    └── dto/            # 
  │       └── infrastructure/      # 【インフラ層】
  │            ├── repositories/   # DB保存（Event Store）の実装
  │            └── gate-api/       # ACL
  └── AKC09000/                     # 共通
          ├── store/          　　　# 画面のキャッシュデータ
          │    ├── service/        # 
          │    └── dto/            # 
          ├── application/         # 【アプリケーション層】
          │    ├── service/        # 
          │    └── dto/            # 
          ├── domain/              # 【ドメイン層】業務ルールと事実の定義
          │    ├── services/       # Domain Services
          │    └── models/         # Entity, Value Object
          ├── projections/    　　　# Projections（イベントを検知してSignalを更新）
          │    ├── service/        # 
          │    └── dto/            # 
          └── infrastructure/      # 【インフラ層】
               ├── repositories/   # DB保存（Event Store）の実装
               └── gate-api/       # ACL

【簡易版】
src/libs/
  ├── AKC0100/                     # メニュー表示
  │       ├── projections/    　　　# Projections（イベントを検知してSignalを更新）
  │       ├── domain/              # 【ドメイン層】業務ルールと事実の定義
  │       ├── application/         # 【アプリケーション層】
  │       └── infrastructure/      # 【インフラ層】
```

- 「src/app/」と「src/libs/」配下のコンテキストは関連させるべき。
- 例えば「src/app/a1」で追加要件が発生して、「src/libs/a2」に都合の良い処理が存在していた場合、「src/libs/a2」を利用してよいですか？、それとも「src/app/a1」に処理を追加するべきですか？
  - 共通処理に移動してからa1とa2で利用するのが良い
- コンテキストは以下とする
  - メニュー
  - 試合属性
  - 試合ポイント情報
  - 共通