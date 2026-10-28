# 04_画面詳細設計書（AppLayout：共通画面レイアウト）

- 決定日：2026-10-28
- 状態：**レイアウト方式①は承認済み。catw-uiへの移植は未実装・未検証**
- 対象：Bruceの `brf8000/brf8010` にあるAppLayout・Header・TabBarの共通化
- 共通化先：`catw-ui`。HomeComponentおよびBruce固有の画面・ルート定義はBruceに残す。

## 1. 承認済みのレイアウト方式

**方式①「コンテンツ専用領域あり」を標準として採用する。**

```text
AppLayoutComponent（①画面全体）
├── HeaderComponent（②固定高さ、表示切替可能）
├── Content領域（③独立したレイアウト要素、可変高さ）
│   └── 各画面Component（Bruceのルート先画面）
└── TabBarComponent（④固定高さ、表示切替可能）
```

### 高さと配置

- ①の高さ = 表示される②の高さ + ③の高さ + 表示される④の高さ。
- ②・③・④を縦に並べる。**③に②・④を重ねない**。
- ②・④は固定高さ。③は残り高さを自動的に使用する。
- ③のみに縦スクロールを適用し、②・④は③のスクロールによって動かない。
- ②・④を非表示にした場合、その領域が占有していた高さを③が取得する。
- ③はAppLayout内に専用のDOM領域を設ける。独立したAngular Componentを追加することまでは要求しない。
- AppLayout全体への上下Paddingによって②・④との重なりを回避する「方式②（コンテンツ専用領域なし）」は採用しない。

## 2. 表示制御（承認済み）

- Header表示：`showHeader`。
- TabBar表示：`showTabBar`。
- 表示・非表示の判断はBruceのルートデータ等アプリ固有の層が行い、catw-uiのAppLayoutへ渡す。
- AppLayoutは渡された表示状態に従って領域を構成し、表示中の②・④の高さに合わせて③の高さを自動調整する。
- 既存Bruceのルートデータ `title`、`retUrl`、`showHeader`、`showTabBar` の取得処理はBruce側で管理する。
- 既存の `hideHeaderAndNav()`、`showHeaderAndNav()`、`isShowHeaderAndNav()` は、参照有無を確認のうえ削除候補とする。**未使用確認および削除は未実施**。

## 3. 配置・依存方向

| 対象 | 配置先 | 責務 |
|---|---|---|
| AppLayoutComponent | catw-ui | Header・Content・TabBarの3領域の構成、領域サイズ・スクロール管理 |
| HeaderComponent | catw-ui | タイトル・戻る操作・ヘッダー表示 |
| TabBarComponent | catw-ui | タブ表示・選択状態・UI操作 |
| AppShell等のアプリ接続処理 | Bruce | ルートデータ取得、画面タイトル、タブ項目・遷移先を共通UIへ提供（具体的なクラス新設は未確定） |
| HomeComponent | Bruce | ホーム画面固有の表示 |
| 各業務画面・app.routes.ts | Bruce | 画面機能・ルーティング |

- **catw-uiからBruce固有コード・ルートへの依存を禁止する。**
- 現行TabBarの `/home`、`/bru1002`、`/component-test` 等の固定遷移先を共通ライブラリへ直接移植しない。Bruceから設定を渡す。
- `RouterOutlet` の具体的な置き方（AppLayoutへのコンテンツ投影／Bruce側ラッパー）は移植詳細設計時に確定する。catw-uiにBruce固有のルート探索を持ち込まない。

## 4. スタイリング（既存方針）

- catw-uiはTailwind CSS・DaisyUIをビルド時に使用して、生成済み `styles/catw.css` を配布する。
- BruceにTailwind CSS・DaisyUIの生成環境を導入しない。
- Bruce固有の画面スタイルは必要に応じてSCSSで管理する。
- catw-uiへ移す3つの共通コンポーネントのスタイルと配布CSSとの整合を確認する。

## 5. 実装時の確認事項（未完了）

1. HeaderとTabBarの固定高さ・表示ON/OFF、およびContentの自動伸縮。
2. Contentのみスクロールし、上下の固定領域が移動しないこと。
3. 各画面・タブ遷移の動作、ルートデータに基づく画面タイトルと表示制御。
4. catw-uiの配布CSSだけでレイアウトが崩れないこと。BruceにTailwind/DaisyUIを追加しないこと。
5. モバイル画面寸法・セーフエリア対応と画面回転等（具体的なスタイル仕様は未確定）。

※この文書は2026-10-28の承認事項を保存したもの。実装完了やテスト成功を意味しない。
