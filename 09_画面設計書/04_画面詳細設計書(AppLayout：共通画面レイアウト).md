# AppLayout・Header・TabBar 詳細設計書（移管案内）

2026-10-28、共通UIコンポーネントの設計書の正本を `soracity/catw` に移管した。

- **正本**：[catw-ui AppLayout・Header・TabBar 詳細設計書](https://github.com/soracity/catw/blob/main/docs/design/app-layout.md)
- Bruce側はアプリ固有のルートデータ取得、表示状態やタブ情報の提供、画面内容を管理する。
- catw-ui側は共通レイアウトとHeader・TabBarを管理する。
- 採用方式：方式①（Header固定高さ＋Content専用領域＋TabBar固定高さ）。
- catw-uiへの実装移植・検証は**未実施**。

※このファイルは移管先への参照のみを示す。仕様の修正はcatw側の正本で行い、二重管理しない。
