# DB設計書（移管先への参照）

- 論理名：言語マスタ
- 物理名：`t_m_label_language`
- 現在の管理元：`soracity/catw-document` の `catw-i18n/07_DB設計書/`
- [DB設計書の正本](https://github.com/soracity/catw-document/blob/main/catw-i18n/07_DB%E8%A8%AD%E8%A8%88%E6%9B%B8/07_DB%E8%A8%AD%E8%A8%88%E6%9B%B8(t_m_label_language%EF%BC%9A%E8%A8%80%E8%AA%9E%E3%83%9E%E3%82%B9%E3%82%BF).md)
- DDL実装の正本：`soracity/catw/projects/catw-i18n/sqlite/sql/ddl/ddl.ts`
- 利用アプリ（Bruce）はmigration適用とBruce固有の初期ラベル・翻訳データを担当する。

旧Bruce側の詳細定義はGit履歴に残し、本ファイルには複製しない。
