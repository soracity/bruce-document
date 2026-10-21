# 工程③：設計単独実装検証の準備記録

2026-10-21。入力設計commit: `5fd8472b382ffe20ea910a90c0c5c991f44ffbb4`。
ユーザー発言「③の実行を承認します」により着手。工程③未完了。

## 実施済み（試験の合格ではない）

- 19章の指定版でangular/package.json、package-lock.json、strict/strictTemplatesのtsconfig.jsonを作成。
- `npm install --no-audit --no-fund`: 75 packagesを導入、終了0。
- ローカルNode実体は22.12.0、ローカルnpm CLIは11.6.2。ホスト既定Nodeは24.19.0、npmは11.9.0のため、今後も指定のローカル実体を使う。
- Playwright1.56.0の`install chromium webkit`を実行。最初のCDNが不完全ZIPを返したが、インストーラの公式ミラーへの自動再試行で取得。終了0でもOS依存欠落の警告あり。ブラウザー起動成功を意味しない。
- ホストJavaはOpenJDK17 runtime。Java21 JDK/javac/Gradle8.9は未準備。

## 中断したコマンドと権限エラー

angularディレクトリで実行：

```sh
./node_modules/node/bin/node node_modules/playwright/cli.js install-deps chromium webkit
```

結果：CLI終了1、内部apt終了100。抜粋：

```text
E: setgroups 65534 failed - setgroups (1: Operation not permitted)
E: setegid 65534 failed - setegid (22: Invalid argument)
E: seteuid 42 failed - seteuid (22: Invalid argument)
E: Method https has died unexpectedly!
Failed to install browser dependencies
Error: Installation process exited with code: 100
```

WebKit用のGStreamer、libavif、libsecret等を含むOSライブラリが不足。権限設定変更、apt sandbox無効化、別ユーザー偽装等の回避は実施しない。依存導入可能な実行環境について指示を受ける。

## 次の実施位置・未実施範囲

S3-01環境準備から再開。node_modulesやブラウザーバイナリは保存対象外で、lockから復元する。初回lock生成はホストnpm11.9.0なので、指定Node/npmでのクリーン`npm ci`再現確認も未実施。

1. 必要OS依存を導入済みの環境でChromium/WebKitの起動を確認し、Java21/Gradle8.9を準備する。
2. 19章に従い09章IMP-01〜39を設計本文だけから独立実装する。現時点で対象sourceは未作成。
3. ngc、実FormControl/DI/Signal、194仕様テストとの対応、ブラウザーの3timezone・2font・theme条件、Java生成→Angular型検査、検査CLI/CI fixtureを実施する。
4. 失敗を設計欠陥と環境欠落に分け、修正・再実行結果を保存する。

**新規の工程③検証合格は0。IMP-01〜39・194仕様テストはすべて未実施。** 工程②の純粋参照81項目・幾何31項目を工程③の実Angular/Java/DOM検証に流用しない。実稼働CI/Store署名/実機は別範囲で未実施。

## 2026-10-21 Vitest方針への変更と再開確認

- ユーザー承認により、工程③ではVitestを使い、PlaywrightとGitHub Actionsは使用しない。
- `verification/angular/package.json` を変更済み（Vitest 4.0.15、`vitest run`、Playwright依存削除）。commit `ebb99ab59657a1e4f0e2b44fa0093d3e4ed3c633`。
- 本再開環境で `node -v` は v22.16.0、`npm -v` は 10.9.2。`npm view vitest@4.0.15 version --fetch-retries=0 --fetch-timeout=5000` は `EAI_AGAIN registry.npmjs.org` で失敗。Vitestキャッシュも確認できず、テストは未実行。
- **重要**: package-lock.json は以前のPlaywright構成のままであり、`package.json` と不整合。ロックファイル更新成功、`npm ci` 成功、`ngc` 成功、Vitest成功のいずれも主張しない。
- 次はnpmレジストリに接続できる環境で、指定Node/npmバージョンと依存解決を確認し、lockを再生成・クリーンインストールした後、設計書単独の実装・検証を開始する。
- ブラウザーを使わない検証は先行できるが、DOM実描画などの未検証条件を合格扱いしない。工程③未完了、合格0。

## S3-02 IMP-03 着手（2026-10-21）

- 詳細設計書02章STYLE-01/04だけを根拠に、独立検証コード `angular/src/ui-style.util.ts` を追加。
- 対応するVitest `angular/test/ui-style.util.test.ts` を追加。CSS固定Map、全11色、数値候補、false/undefined、不正値Fail Fastを確認するテストを記述。
- **テスト実行は未実施・合格0**。この環境では `npm view vitest@4.0.15` が `EAI_AGAIN registry.npmjs.org` で失敗し、lock更新と依存導入も未実施。
- 次はレジストリ接続が復旧した環境でlock更新、クリーンインストール、`ngc`、Vitest実行。結果を記録する。IMP-03も実行合格まで完了扱いしない。

## 2026-10-21 工程③再開・進捗整合

- ユーザー承認済み方針：Vitestを使用。PlaywrightおよびGitHub Actionsは工程③で使用しない。旧Playwright準備記録は過去の履歴であり、今後の必須手順ではない。
- IMP-03: `angular/src/ui-style.util.ts` と `angular/test/ui-style.util.test.ts` を保存済み。
- IMP-01: `angular/src/component-base.ts` と `angular/test/component-base.test.ts` を保存済み。
- いずれも独立実装・テストコード作成の段階。AngularコンパイルおよびVitest実行の成功は未確認。合格0件。
- `angular/package.json` はVitestに変更済みだが `angular/package-lock.json` はPlaywright依存を含む旧状態で不整合。`npm ci` 成功を主張しない。
- 現環境Node v22.16.0、npm 10.9.2、Vitest npmキャッシュなし。指定版Node 22.12.0/npm 11.6.2と異なる。依存再現性を未検証とする。
- 次の順序：package-lock更新→依存再現→IMP-01/03の型検査とテスト→他対象の独立実装。型やEnum実体との整合、Angular DIテスト設定を確認する。未実施条件は合格へ加算しない。

## 2026-10-21 Vitest実行環境の再確認

- 実行環境: Node v22.16.0、npm 10.9.2。
- `npm view vitest@4.0.15 version --fetch-retries=0 --fetch-timeout=8000` は `getaddrinfo EAI_AGAIN registry.npmjs.org` で失敗。
- `getent hosts registry.npmjs.org` も名前解決不可。npmキャッシュ内のVitestも見つからず、現環境ではパッケージをインストールできない。
- Vitest自体の障害、実装コードのテスト失敗、設計書の不合格を意味しない。テスト実行数0、合格数0。
- 対処: npmレジストリに接続できる実行環境で `npm install --package-lock-only --no-audit --no-fund` によりlockを更新し、`npm ci --no-audit --no-fund`、`npm run compile`、`npm test` を順に実施。成功/失敗ログを記録する。DNSや依存導入が復旧するまでは合格を宣言しない。
