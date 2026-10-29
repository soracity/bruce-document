# AppLayout・Header・TabBar 詳細設計書（移管案内）

2026-10-28、共通UIコンポーネントの詳細設計書の正本は **soracity/catw-document** に移管した。

- **正本**：[catw-document：AppLayout・Header・TabBar 共通化詳細設計](https://github.com/soracity/catw-document/blob/main/catw-ui/02_AIフレームワーク設計書/33_AppLayout・Header・TabBar_共通化詳細設計.md)
- 共通UIの詳細仕様はcatw-document側で一元管理し、このファイルに重複記述しない。
- Bruce側はアプリ固有のルート情報、タブ情報、画面内容を管理する。
- レイアウト採用方式：方式①（Header＋Content専用領域＋TabBar）。
- catw-uiへのソース移植・テストは未実施。
