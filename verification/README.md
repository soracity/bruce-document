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
