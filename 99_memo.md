```
// DomainEvent
export interface DomainEvent {
  readonly type: string;
  readonly occurredAt: string;
  readonly payload?: unknown;
}

// Domain側が依存するポート
export interface DomainEventDispatcher {
  publish(event: DomainEvent): Promise<void>; // 非同期を想定
}
```

```
import { Subject } from 'rxjs';
import { DomainEventDispatcher, DomainEvent } from '../../domain/events';

export class RxEventBus implements DomainEventDispatcher {
  private subject = new Subject<DomainEvent>();
  publish(e: DomainEvent): Promise<void> {
    this.subject.next(e);
    return Promise.resolve();
  }
  // projections 用に購読インターフェースを公開
  subscribe(handler: (e: DomainEvent) => void) {
    return this.subject.subscribe(handler);
  }
}
```

```
class MatchAggregate {
  constructor(private readonly events: DomainEventDispatcher) {}

  scorePoint() {
    // ドメインの状態変更...
    this.events.publish({
      type: 'MatchScoreChanged',
      occurredAt: new Date().toISOString(),
      payload: { matchId: 'm1', score: { a: 10, b: 8 } },
    });
  }
}
```

```
// projections 側で RxEventBus を受け取り購読
eventBus.subscribe(ev => {
  if (ev.type === 'MatchScoreChanged') {
    // PointHistoryStore (例: `point-history.store.ts`) の subject を更新
    pointHistoryStore.replaceAll(/* map from ev.payload */);
  }
});
```

```
// イベントマップ
type DomainEventMap = {
  MatchScoreChanged: { matchId: string; score: { a: number; b: number } };
  PointAdded: { matchId: string; pointId: string; winner: 'A' | 'B' };
};

// 汎用 DomainEvent
type DomainEvent<K extends keyof DomainEventMap = keyof DomainEventMap> = {
  type: K;
  occurredAt: string;
  payload: DomainEventMap[K];
};

// ジェネリック EventBus
class TypedRxEventBus {
  private subject = new Subject<DomainEvent>();

  publish<E extends keyof DomainEventMap>(type: E, payload: DomainEventMap[E]) {
    this.subject.next({ type, occurredAt: new Date().toISOString(), payload });
  }

  ofType<E extends keyof DomainEventMap>(type: E) {
    return this.subject.asObservable().pipe(
      filter((e): e is DomainEvent<E> => e.type === type)
    );
  }
}

eventBus.ofType('MatchScoreChanged').subscribe(ev => {
  // ev.payload は { matchId: string; score: { a:number; b:number } } として型安全
});

```

```
SQLiteメモ
/**
 * 初期化
 * アプリの起動時に呼び出すことを想定
 */
async initialize(): Promise<void> {
  this.db = await this.sqlite.createConnection('tennis-db', false, 'no-encryption', 1, false);

  await this.db.open();

  await this.createTables();
}

【async】
メソッドの中に「非同期処理を持つ処理（await）が含まれています。」という意味
さらに言うと、「this.db.open();」は非同期処理である。（処理完了を待たない）
処理完了を待つため「await this.db.open();」のように「await」を記載する。

対象の処理（this.db.open();）が非同期か同期かについて戻り値が Promise かどうかで判断する。
Promiseとは非同期処理を表す。

【Promise】
Promise は一言でいうと「未来で完了する処理」を表すオブジェクト。

【DB作成】
＞DB作成のオプションありますか？

はい、DB 作成時／接続後に指定できるオプションは複数あります。ここでは @capacitor-community/sqlite の createConnection(...) パラメータと、接続後に設定する代表的な SQLite オプション（PRAGMA 等）を短くまとめます。必要なら SqliteService に組み込む例を作りますか？

createConnection(name, encrypted, mode, version, readonly)（あなたのコードで使っている呼び出し）

name：データベース名（ファイル名のキー）。例: 'tennis-db'。
encrypted：boolean。暗号化（SQLCipher 等）を使うか。true のときは暗号化前提のビルドが必要。
mode：プラグイン側の暗号化モードやオプション文字列（プロジェクト依存）。あなたのコードでは 'no-encryption' を指定しています。暗号化を使う場合はプラグインのドキュメントに従ってモードやキー管理を設定してください。
version：アプリ側のスキーマ／バージョン番号（PRAGMA user_version と整合させる運用が一般的）。
readonly：読み取り専用で開くかどうか。バックアップや検査時に有用。
接続後に設定する代表的オプション（db.execute('PRAGMA ...') で設定）

PRAGMA user_version：アプリ定義のスキーマ版（マイグレーション管理に使用）。
PRAGMA journal_mode = WAL：WAL モード。並列読み書きとパフォーマンス向上。
PRAGMA synchronous = NORMAL（または FULL / OFF）：コミットの耐久性と性能のトレードオフ。
PRAGMA foreign_keys = ON：外部キー制約を有効にする（SQLite はデフォルトで無効）。
PRAGMA temp_store = MEMORY：一時ストアをメモリにする（I/O 削減）。
PRAGMA cache_size = -2000：キャッシュサイズ（負数は KB 単位）。
PRAGMA page_size = 4096：ページサイズ（必要に応じてDB新規作成時に設定）。
マイグレーション／トランザクションのオプション

マイグレーションはトランザクション (BEGIN/COMMIT/ROLLBACK) 内で実行して失敗時にロールバックする。
PRAGMA user_version はマイグレーション成功後に更新する（atomic に行う）。
暗号化・セキュリティ

暗号化（SQLCipher 等）を使う場合はプラグインのビルド設定とキー管理（安全な保管・取得）を整備すること。encrypted=true のみでは動かない場合があるのでドキュメント確認必須。
DB ファイルの権限／ストレージ場所はプラットフォームに依存（ネイティブはアプリ領域、Web は IndexedDB）。
プラットフォーム差（注意点）

ブラウザ実行（開発サーバ）の場合ネイティブプラグインが無いのでフォールバック実装かモックが必要。
iOS／Android でファイル場所やパフォーマンス特性が異なるので PRAGMA 調整が有効。
推奨初期化シーケンス（簡潔）

CapacitorSQLite の存在チェック。
this.sqlite = new SQLiteConnection(...)。
createConnection() → open()。
接続直後に PRAGMA（foreign_keys=ON, journal_mode=WAL など）を設定。
PRAGMA user_version を読み、必要ならマイグレーションをトランザクションで実行 → 成功時に PRAGMA user_version = <v>。


```


## DAOテストパターン
- PTN01 検索系（１件検索）：入力プリミティブ、出力プリミティブ
- PTN02 検索系（１件検索）：入力IF、出力プリミティブ
- PTN03 検索系（１件検索）：入力プリミティブ、出力IF
- PTN04 検索系（１件検索）：入力IF、出力IF

- PTN11 検索系（N件検索）：入力プリミティブ、出力プリミティブ
- PTN12 検索系（N件検索）：入力IF、出力プリミティブ
- PTN13 検索系（N件検索）：入力プリミティブ、出力IF
- PTN14 検索系（N件検索）：入力IF、出力IF

- PTN21 更新系：入力プリミティブ、出力プリミティブ
- PTN22 更新系：入力IF、出力プリミティブ

- テストケース１：DTOとDAOが作成さること
- テストケース２：入力がプリミティブの複数項目の場合、DTOではなくて複数パラメータが定義されること


