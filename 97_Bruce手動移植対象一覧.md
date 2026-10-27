# Bruce 手動移植対象一覧（手順19）

> 作成日：2026-10-27  
> 旧：`soracity/bruce` / `feature/feature-20261015`（commit `a7837c23ebf4b96f0ca3fc4ff073acde6e918be2`）  
> 新：`bruce-feature-20261027` / `feature/feature-20261027`  
> 状態：**一覧作成済み／実際の移植は未着手**。本一覧はGitHubの旧ブランチのパス一覧から生成。ファイル内部の依存関係の全数精査は未実施。

## 追加確定事項（2026-10-27）

- **新Bruceには `@angular/animations` を導入しない。**
- 旧 `AppLayoutComponent` / `HeaderComponent` から `@angular/animations` のimportと、旧アニメーションAPI（`trigger`、`transition`、`style`、`animate`）を移植しない。
- `AppLayoutComponent` のデコレーター内 `animations` 指定、HTMLの `[@in.title]` を除去・必要ならCSSへ置換する。
- 既存のフェード効果は機能要件として必要な場合にのみCSSで再実装する。旧APIのために依存追加しない。
- **決定反映のみ完了**。新Bruceローカルソースの修正・ビルド確認は未実施。

## 移植後のビルドNG診断（2026-10-27）

- 2026-10-27 15:48 JSTのユーザー提供ログでは `npm run build` **失敗**。新Bruceブランチのコードも照合したが、ローカル作業ツリーの現在値は取得不可のため、作業を勝手に完了扱いしない。
- `brf9011-enum` は**ACGで自動生成する**（ユーザー決定）。手動コピーしない。生成・出力先・import参照・ビルド成功は未確認。
- `Nullable<T>` を `src/global.d.ts` に型定義として移植。
- `$SESSION_CRITICAL_SERVICE`、`$SESSION_LOG_SERVICE` の参照は `brf9015-sqlite/sqlite-session.tokens.ts` に統一。既存 `src/app/app.config.ts` のprovidersに型付きトークンと `AppSqliteSessionService` を登録する。
- DDLは既存 `sqlite/sql/ddl/ddl.ts` を利用。旧相対パスを修正し、必要ならtsconfig pathsに `@bruce_ddl/*` → `./sqlite/sql/ddl/*` を登録。
- `@angular/animations` は導入しない。header、app-layoutから旧importとtriggerおよびテンプレートの `[@in.title]` を除去。
- `uuid` は `package.json` の依存関係と利用意図を確認し、必要なら明示導入。
- `app-sqlite-test-adapter.ts` と `brf9016-test-base/test-base.service.ts` はNode依存のテスト専用コード。アプリビルドに入れない（移動またはアプリtsconfigから除外。実際のテストは別に維持）。
- 最終確認：`npm run build`、`npm run test -- --watch=false`、SQLite接続・永続化、各機能試験。**いずれも今回の修正では未実施**。

## 原則

- 作業は**手動**。旧Bruceは読み取り専用とし、新Worktreeにのみコピー・修正する。
- UI共通コンポーネント `brf9020-shared-components` はコピーしない。UIに必要な共通部品は `catw-ui` の公開APIを使う。
- 新プロジェクトで検証済みのWeb SQLite起動処理、`capacitor.config.ts`、Angular設定、`package.json`、`angular.json`、CSSを旧版で上書きしない。
- 旧テスト補助・バックアップ・zip・旧`brf9014`・apidoc・component-test・toggleは初期移植から除外。
- 各単位ごとにコピー → import・参照修正 → `npm run build` → 該当機能テスト → チェック。ビルド成功のみでは機能試験完了としない。
- 旧SQLite接続コードの直接上書きは禁止。新Bruceで動作確認済みのWeb実装と旧Bruceのアプリ要件を**統合**する。
- 端末プラグインはDeviceのみ採用、Keyboardは導入しない。

## 手動移植チェックリスト

### 01 基盤型・例外・ユーティリティ（18ファイル：EnumはACG生成対象）

**注意：以下の `brf9011-enum/code` はACGで生成し、旧Bruceから手動コピーしない。チェックは生成結果の確認後に行う。**

- [ ] `src/app/brf9000/brf9011-enum/code/app-code-boolean.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-court-side.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-game-final.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-logical-team-name.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-match-setting.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-match-status.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-match-type.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-number-of-sets.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-player.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-sequence-key.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-serve-number.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code-tie-break.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/code/app-code.enum-if.ts`
- [ ] `src/app/brf9000/brf9013-exception/app-dao-exception.ts`
- [ ] `src/app/brf9000/brf9013-exception/app-exception.ts`
- [ ] `src/app/brf9000/brf9017-utils/app-date.util.ts`
- [ ] `src/app/brf9000/brf9017-utils/app-string.util.ts`
- [ ] `src/app/brf9000/brf9017-utils/app-uuid.util.ts`

### 02 SQLite接続・セッション・トランザクション（11ファイル）

- [ ] `sqlite/sql/ddl/ddl.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-connection.service.spec.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-connection.service.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-session.service-if.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-session.service.spec.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-session.service.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-test-adapter.ts`（テスト専用・必要性を判断）
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-transaction-session.service.if.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-transaction-session.service.spec.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/app-sqlite-transaction.service.ts`
- [ ] `src/app/brf9000/brf9015-sqlite/sqlite-session.tokens.ts`

### 03 共通アプリサービス（ログ・採番）（10ファイル）

- [ ] `src/app/brf9000/brf9012-log/app-log-insert-request.dto.ts`
- [ ] `src/app/brf9000/brf9012-log/app-log-insert.dao.ts`
- [ ] `src/app/brf9000/brf9012-log/app-log-search-response.type.ts`
- [ ] `src/app/brf9000/brf9012-log/app-log-search.dao.ts`
- [ ] `src/app/brf9000/brf9012-log/app-log.ts`
- [ ] `src/app/brf9000/brf9021-sequence/application/service/bra9021.service.ts`
- [ ] `src/app/brf9000/brf9021-sequence/domain/repositories/brd9021.repository-if.ts`
- [ ] `src/app/brf9000/brf9021-sequence/infrastructure/dao-generate/bri9021-sequence-select.dao.ts`
- [ ] `src/app/brf9000/brf9021-sequence/infrastructure/dao-generate/bri9021-sequence-update.dao.ts`
- [ ] `src/app/brf9000/brf9021-sequence/infrastructure/repositories/bri9021.repository.ts`

### 04 多言語（28ファイル）

**注意：以下の `brf9011-enum/i18n` もACG生成対象として扱う。ACGの生成範囲・出力結果を確認し、生成対象外のみ別途移植判断する。**

- [ ] `src/app/brf9000/brf9010-i18n/application/dto/bra9010-label-key.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/application/dto/bra9100-label-language.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/application/service/bra9010.service.spec.ts`
- [ ] `src/app/brf9000/brf9010-i18n/application/service/bra9010.service.ts`
- [ ] `src/app/brf9000/brf9010-i18n/domain/aggregate/brd9010.aggregate.ts`
- [ ] `src/app/brf9000/brf9010-i18n/domain/models/brd9010-label-key.entity.ts`
- [ ] `src/app/brf9000/brf9010-i18n/domain/models/brd9010-label-language.entity.ts`
- [ ] `src/app/brf9000/brf9010-i18n/domain/models/brd9010-label-text.entity.ts`
- [ ] `src/app/brf9000/brf9010-i18n/domain/repositories/brd9010.repository.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dao-generate/bri9010-label-key-select.dao.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dao-generate/bri9010-label-language-select.dao.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dao-generate/bri9010-label-text-select.dao.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dto-generate/bri9010-label-key-select-res.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dto-generate/bri9010-label-language-select-res.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dto-generate/bri9010-label-text-select-req.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/dto-generate/bri9010-label-text-select-res.dto.ts`
- [ ] `src/app/brf9000/brf9010-i18n/infrastructure/repositories/bri9010.repository.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-key-brf1001.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-key-brf1002.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-key-common.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-key-test.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-key.enum-if.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-label-language.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-message-key-common.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-message-key-test.enum.ts`
- [ ] `src/app/brf9000/brf9011-enum/i18n/app-i18n-message-key.enum-if.ts`
- [ ] `src/app/brf9000/brf9018-pipe/brf9018-i18n-label.pipe.ts`
- [ ] `src/app/brf9000/brf9018-pipe/brf9018-i18n-message.pipe.ts`

### 05 端末（1ファイル）

- [ ] `src/app/brf9000/brf9019-device/brf9019-device.service.ts`

### 06 試合情報登録（20ファイル）

- [ ] `src/app/brf1000/brf1001/application/dto/bra1001-save-Match-Info-req.dto.ts`
- [ ] `src/app/brf1000/brf1001/application/dto/bra1001-save-Match-Info-res.dto.ts`
- [ ] `src/app/brf1000/brf1001/application/dto/bra1001-select-Match-Info-res.dto.ts`
- [ ] `src/app/brf1000/brf1001/application/service/bra1001.service.ts`
- [ ] `src/app/brf1000/brf1001/domain/aggregate/brd1001.aggregate.ts`
- [ ] `src/app/brf1000/brf1001/domain/models/brd1001-match-info.entity.ts`
- [ ] `src/app/brf1000/brf1001/domain/repositories/brd1001.repository-if.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dao-generate/bri1001-match-info-insert.dao.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dao-generate/bri1001-match-info-logical-delete.dao.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dao-generate/bri1001-match-info-select-by-matchid.dao.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dao-generate/bri1001-match-info-update.dao.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dto-generate/bri1001-match-info-insert-req.dto.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dto-generate/bri1001-match-info-select-by-matchid-res.dto.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/dto-generate/bri1001-match-info-update-req.dto.ts`
- [ ] `src/app/brf1000/brf1001/infrastructure/repositories/bri1001.repository.ts`
- [ ] `src/app/brf1000/brf1001/ui/components/bru1001/bru1001.component.html`
- [ ] `src/app/brf1000/brf1001/ui/components/bru1001/bru1001.component.scss`
- [ ] `src/app/brf1000/brf1001/ui/components/bru1001/bru1001.component.spec.ts`
- [ ] `src/app/brf1000/brf1001/ui/components/bru1001/bru1001.component.ts`
- [ ] `src/app/brf1000/brf1001/ui/dto/bru1001.dto.ts`

### 07 試合情報一覧（15ファイル）

- [ ] `src/app/brf1000/brf1002/application/dto/bra1002-select-Match-Info-all-res.dto.ts`
- [ ] `src/app/brf1000/brf1002/application/service/bra1002.service.ts`
- [ ] `src/app/brf1000/brf1002/domain/aggregate/brd1002.aggregate.ts`
- [ ] `src/app/brf1000/brf1002/domain/models/brd1002-match-info.entity.ts`
- [ ] `src/app/brf1000/brf1002/domain/repositories/brd1002.repository-if.ts`
- [ ] `src/app/brf1000/brf1002/infrastructure/dao-generate/bri1002-match-info-select-all-dao.ts`
- [ ] `src/app/brf1000/brf1002/infrastructure/dao-generate/bri1002-match-info-select-dao.ts`
- [ ] `src/app/brf1000/brf1002/infrastructure/dto-generate/bri1002-match-info-select-all-res-dto.ts`
- [ ] `src/app/brf1000/brf1002/infrastructure/dto-generate/bri1002-match-info-select-res-dto.ts`
- [ ] `src/app/brf1000/brf1002/infrastructure/repositories/bri1002.repository.ts`
- [ ] `src/app/brf1000/brf1002/ui/components/bru1002.component.html`
- [ ] `src/app/brf1000/brf1002/ui/components/bru1002.component.scss`
- [ ] `src/app/brf1000/brf1002/ui/components/bru1002.component.spec.ts`
- [ ] `src/app/brf1000/brf1002/ui/components/bru1002.component.ts`
- [ ] `src/app/brf1000/brf1002/ui/dto/bru1002.dto.ts`

### 08 ログ参照（14ファイル）

- [ ] `src/app/brf8000/brf8011/application/dto/bra8011-logs-search-res.dto.ts`
- [ ] `src/app/brf8000/brf8011/application/service/bra8011-logs-search.service.spec.ts`
- [ ] `src/app/brf8000/brf8011/application/service/bra8011-logs-search.service.ts`
- [ ] `src/app/brf8000/brf8011/domain/aggregate/Brd8011-logs.aggregate.ts`
- [ ] `src/app/brf8000/brf8011/domain/models/Brd8011-logs-search.entity.ts`
- [ ] `src/app/brf8000/brf8011/domain/repositories/Brd8011-logs-search.repository.ts`
- [ ] `src/app/brf8000/brf8011/infrastructure/repositories/bri8011-logs-search.repository.ts`
- [ ] `src/app/brf8000/brf8011/ui/components/bru8011.component-bak.ts`（バックアップのため移植除外）
- [ ] `src/app/brf8000/brf8011/ui/components/bru8011.component.html`
- [ ] `src/app/brf8000/brf8011/ui/components/bru8011.component.scss`
- [ ] `src/app/brf8000/brf8011/ui/components/bru8011.component.spec.ts`
- [ ] `src/app/brf8000/brf8011/ui/components/bru8011.component.ts`
- [ ] `src/app/brf8000/brf8011/ui/dto/bru8011-system-log-dto.ts`
- [ ] `src/app/brf8000/brf8011/ui/dto/bru8011.dto.ts`

### 09 アプリナビゲーション・レイアウト（15ファイル）

- [ ] `src/app/brf8000/brf8010/ui/components/app-layout/app-layout.component.html`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/app-layout/app-layout.component.scss`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/app-layout/app-layout.component.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/header/header.component.html`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/header/header.component.scss`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/header/header.component.spec.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/header/header.component.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/home/home.component.html`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/home/home.component.scss`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/home/home.component.spec.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/home/home.component.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/tab-bar/tab-bar.component.html`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/tab-bar/tab-bar.component.scss`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/tab-bar/tab-bar.component.spec.ts`（catw-uiとの重複・責務確認後に移植）
- [ ] `src/app/brf8000/brf8010/ui/components/tab-bar/tab-bar.component.ts`（catw-uiとの重複・責務確認後に移植）

### 10 起動・ルーティング（5ファイル）

- [ ] `src/app/app.config.ts`
- [ ] `src/app/app.html`
- [ ] `src/app/app.routes.ts`
- [ ] `src/app/app.scss`
- [ ] `src/app/app.ts`

## 非移植対象（共通UIの旧実装）

`src/app/brf9000/brf9020-shared-components/` 以下 **70ファイル**は原則コピーしない。共通UIコンポーネントのスタイル・レイアウトはcatw-uiに置換する。

特に `alert`、`button`、`date`、`radio`、`textbox`、`table`、`layout`、`swipe`、`component-base` は旧版移植禁止。旧 `toggle`、`apidoc`、`component-test` も除外。

## ほかに確認が必要な資産

- `src/styles.scss`：コピーせず必要なアプリ固有設定だけ差分適用
- `src/main.ts`：既存SQLite初期化処理を比較し、新側は上書きしない
- `src/index.html`、`public/`：アプリ固有アセットだけ選択
- `tsconfig*.json`：旧エイリアス等を必要な場合のみ追加
- `sqlite/sql/ddl/ddl.ts`：テーブル定義を確認し、必要なスキーマを新環境に適用
- `src/app/brf9011-enum/component/` は旧UI専用enumが混在。アプリ専用enum（ライブスコアなど）は必要性を確認し、旧UI固有enumを除外
- `src/app/brf9016-test-base/`、`src/app/test-support/`：実装移植後のテスト方針に沿って必要なら取り込む
- `src/app/brf8000/brf8010`：ナビゲーションはアプリ固有だが、旧UI部品依存・キーボード関連の想定は移さない
- `src/app/brf8000/brf8011` の `bru8011.component-bak.ts` はコピーしない

## 完了条件

1. 移植対象を必要性に応じてチェックし、除外対象をコピーしていない。
2. `catw-ui` 公開APIに置換済みで、旧 `brf9020-shared-components` への参照がゼロ。
3. `npm run build` 成功、該当するユニットテスト成功。
4. ブラウザで既存画面・i18n・試合登録/一覧・ログ機能の動作確認。
5. SQLiteの登録・更新・照会・トランザクションと永続化を確認。Android側DBテストも別途実施。
6. この文書のチェックと実行記録を更新し、未検証事項は残したまま明示。

