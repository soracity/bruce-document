# ⚡️ MatchForge — Live Tennis Scoring

> **AIフレームワーク議事録の移動先**：[catw-document / 01_ai-document](https://github.com/soracity/catw-document/tree/main/01_ai-document)（2026-10-21移動済み）。[詳細設計書](https://github.com/soracity/bruce-document/tree/docs/bruce-detail-20261020/02_AIフレームワーク設計書)は引き続きこのリポジトリで管理します。

<!-- Badges -->
![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-sky?logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-Vitest-9900ff)

洗練されたリアルタイム・テニススコアリングのプロトタイプ。Angular 21 を核に、Tailwind/DaisyUI、IndexedDB（Dexie）、イベント駆動のプロジェクションを組み合わせたアーキテクチャを採用しています。

**Tech & Tools**
- **Framework:** Angular 21
- **Styling:** Tailwind CSS (+ DaisyUI)
- **Storage:** Dexie (IndexedDB) for offline/edge persistence
- **Testing:** Vitest + Angular spec files
- **Utilities:** `scripts/generate-class-interface-table.mjs` (docs helper)

**特徴**
- **リアルタイムスコア**: `match-scoring.service.ts` と `tennis-score-engine.ts` によるドメイン駆動のスコア計算。
- **イベント駆動設計**: `event-bus.ts` → projection によりビューを構築（履歴・統計など）。
- **オフライン対応**: Dexie を使ったローカル永続化でネットワーク切断時も動作。
- **コンポーネント志向**: `src/app/component` 配下にページと再利用コンポーネントを整理。

　
---
Made with ❤️ and a little obsession for beautiful, reliable scoring.
