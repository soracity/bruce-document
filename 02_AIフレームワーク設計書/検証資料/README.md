# 検証資料

現在の範囲：19議事録、159対象内規則、91手動照合単位、39実装対象、194テスト仕様。対象外の9計画規則はrequirements-excluded.json。source-manifest/source-unitsは現在範囲。stage1-review.jsonは工程①の固定調査結果、stage2-changes.jsonは29指摘の反映結果、resume-state.jsonは現在の進捗/承認状態。

audit-design.pyは文書/hash/参照の機械検査であり、意味/実装可能性の完成判定ではない。reference-functions/test-reference-functionsは純粋な計算・Validatorの参照契約。81項目成功をAngular/Java/DOMの成功としない。table-geometry/test-geometryの31項目は幾何純粋計算。実際のComponent/AST/ACG/Browser検証は工程③、手順は19章。

旧audit-result.jsonおよび9189e26以前の検査ログは歴史的な結果で、今回のA/B合格や再実行成功を主張しない。stage2-document-check.jsonが今回の機械確認結果。比較コード156件の固定manifestは既存依存の索引として保持し、最新feature HEAD一致を主張しない。

固定原典のGit履歴を持つcheckoutでは19章の標準コマンドを使用する。疎な取得ではaudit-design.py --source-cache <固定原典root> --repository-tree <同一HEADのrecursive-tree.json>を使用できる。cacheは<commit>/<path>の原文bytesで、改行を変換せずmanifestのSHA-256/Git blobを照合する。現行source-unitsの部分hashは対象行をLF結合し末尾LFを1つ付加したもの。tree指定は外部リンク先の存在確認だけで、設計本文や固定原典の検査を省略しない。
