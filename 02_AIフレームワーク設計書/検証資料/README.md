# 文書監査・純粋計算の再現

リポジトリrootで実行する。Python 3.10以上、Node.js 20以上、gitが必要。外部ライブラリ不要。

```sh
python3 02_AIフレームワーク設計書/検証資料/audit-design.py
node 02_AIフレームワーク設計書/検証資料/test-geometry.mjs
node 02_AIフレームワーク設計書/検証資料/test-reference-functions.mjs
```

原典は`source-manifest.json`の固定Gitコミットから`git show`で読む。バックアップを探索しない。source-unitsは全文の位置と文脈の照合索引、requirementsは規則と本文/実装/テストの対応。これらの件数一致だけでは意味的な網羅性を証明しない。

`table-geometry.mjs`は21章の基準関数、`reference-functions.mjs`は05/12/27/29章の純粋計算用参照実装。実アプリのAngular/Java、DOM描画、Pointer、iOS/Android、CI/公開の試験ではない。結果は`audit-result.json`に実行日時と範囲を記録する。U-01〜03を勝手に選ぶテストは含めない。
