# 表示・レスポンシブ・CSS設計（暫定・全件監査前）

根拠：[2.4](../01_ai-document/phase2_04_レスポンシブ・折り返し.md)、[2.5](../01_ai-document/phase2_05_任意CSS注入の排除.md)、[3.1](../01_ai-document/phase3_01_共通スタイル.md)。

| ID | 現行設計原則 |
|---|---|
| BRUCE-DISPLAY-001 | 文字あふれ方式はWRAP、MARQUEE_BOUNCE、MARQUEE_RESTART、ELLIPSISの4方式を区別する。 |
| BRUCE-DISPLAY-002 | 文字が領域に収まる場合はマーキーを動かさない。文字サイズ縮小を代替手段にしない。 |
| BRUCE-DISPLAY-003 | 画面側からComponent内部へclassContainer/classInput/classLabel/classSpan等の任意CSSを注入しない。Componentの見た目は内部で管理する。 |
| BRUCE-DISPLAY-004 | HeaderのclassContainerとTabBarのclassTabBarは既存見た目を保ちつつComponent内部へ移行して廃止する（実装未実施）。 |
| BRUCE-DISPLAY-005 | iOS/Androidのセーフエリア、表示サイズ、キーボード、テーマ、タップ領域、スクロール競合を後続検証する。 |

## 注意

この文書は関連議事録の全文照合前の暫定整理。マーキーの移動方向・停止・再開の厳密な動作条件や既存例外、各Componentの詳細値は原典抽出・照合を追加する。ここにない項目を「存在しない」と判断してはならない。
