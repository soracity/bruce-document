# Bruce プロジェクト開発規則

## 1. 適用範囲

本書は、`soracity/bruce`（アプリケーション）および `soracity/bruce-document`（設計・開発ドキュメント）と、その関連作業に適用する。

## 2. 共通規則の正本

本書自身の正式な正本は、このリポジトリの`main/AGENTS.md`である。他のブランチの同名ファイルは正式な規則を上書きしない。

`soracity` 全体の共通開発規則の正本は、次のファイルとする。

- [soracity/soracity-document/AGENTS.md](https://github.com/soracity/soracity-document/blob/main/AGENTS.md)

作業開始時に上記の最新版を取得し、本書および作業対象リポジトリに存在する追加の `AGENTS.md` と併せて確認する。

Gitブランチの種類・命名・作成・削除・マージの承認条件、AI作業方針、既存成果の保護、検証・完了報告などの共通規則は上記正本に従う。本書へ同じ規則を重複記載しない。

## 3. Bruce固有の取り扱い

- Bruceアプリの機能・画面・データモデル・アーキテクチャなどは、`bruce-document` の承認済み設計書を根拠とする。共通規則の文書をアプリ固有の仕様書として扱わない。
- Bruceの設計書と実装の変更では、承認済み仕様・既存成果・公開API・ライブラリとの責務境界を確認する。未承認の設計判断を承認済みとして扱わない。
- catwライブラリ自体の設計・実装・管理に及ぶ作業では、`soracity/catw-document`の`main/AGENTS.md` も確認する。
- Alfredのコード生成機能に及ぶ作業では、`soracity/alfred-document`の`main/AGENTS.md` も確認する。
- AIフレームワークの議事録・詳細設計書は `soracity/catw-document` へ移管済みである。移管済みの文書を確認なく `bruce-document` に復活・複製しない。必要な参照先は本リポジトリの `README.md` を確認する。

## 4. 規則の優先順位と矛盾

規則の優先順位と変更管理は共通規則に従う。本書はBruce固有の事項のみを補足し、共通規則を緩和しない。

本書、共通規則、承認済み設計の間に矛盾がある場合は、独断で変更せず、矛盾箇所と影響を報告する。
