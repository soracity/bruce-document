```text
└─app
   └─ <コンテキストID>
      ├─ui
      │  ├─components    # Angular Components（画面、テンプレート）
      │  └─read-models   # Read Models（Signalで扱う表示専用のデータ型）
      ├─application      # 【アプリケーション層】
      │  ├─dto
      │  └─service
      ├─domain           # 【ドメイン層】業務ルールと事実の定義
      │  ├─models        # Entity, Value Object
      │  ├─service       # Domain Services
      │  ├─repositories  # DB保存（Event Store）のInterface
      │  └─aggregate
      ├─infrastructure   # 【インフラ層】
      │  ├─gate-api      # ACL
      │  ├─repositories  # DB保存（Event Store）の実装
      │  ├─dao-generated # 自動生成DAO
      │  └─dao-custom    # 手動生成DAO
      ├─projections      # Projections（イベントを検知してSignalを更新）
      │  ├─dto           
      │  └─service       
      └─store           # 画面のキャッシュデータ
          ├─dto
          └─service
以下に共通処理
shared
├─sqlite
├─di
├─logger
└─utils

または
└─platform
    ├─sqlite
    │   ├─sqlite.service.ts
    │   ├─sqlite.dao.ts
    │   ├─sqlite.config.ts
    │   └─migration
    │
    ├─di
    │   └─tokens
    │
    ├─logger
    │
    ├─utils
    │
    └─http

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
