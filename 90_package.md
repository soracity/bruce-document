```text
└─app
   └─ <コンテキストID>
      ├─ui
      │  ├─components    # Angular Components（画面、テンプレート）
      │  └─read-models   # Read Models（Signalで扱う表示専用のデータ型）
      ├─application      # 【アプリケーション層】
      │  ├─dto
      │  └─service       # CQRS (Command Query(Projection) Responsibility Segregation)
      ├─domain           # 【ドメイン層】業務ルールと事実の定義
      │  ├─aggregate
      │  ├─models        # Entity, Value Object
      │  ├─service       # Domain Services（業務処理の補助的な役割）
      │  └─repositories  # DB処理のInterface
      ├─infrastructure   # 【インフラ層】
      │  ├─gate-api      # ACL
      │  ├─repositories  # DB処理のInterfaceの実装
      │  ├─dao-generated # 自動生成DAO
      │  └─dao-custom    # 手動生成DAO
      └─store           # 画面のキャッシュデータ
          ├─dto
          └─service
以下に共通処理
shared
├─sqlite
├─di
├─logger
└─utils

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
