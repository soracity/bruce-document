# DTO・Form・Validation・ACG設計（暫定・全件監査前）

根拠：[2.6](../01_ai-document/phase2_06_DTO・Form・Validation.md)、[2.8](../01_ai-document/phase2_08_AI実装制約.md)、[Phase 4仕様表C](../01_ai-document/phase4_02_体系的設計書.md)。

| ID | 確認済み設計方針 |
|---|---|
| BRUCE-ACG-001 | UI Form DTOはclassとし、FormGroupを継承しない。型付きFormGroupをreadonlyプロパティとして直接保持し、宣言時に初期化。別FormGroupクラスを作らない。 |
| BRUCE-ACG-002 | 表示用DTOはACGが1行単位のreadonlyプロパティを持つTypeScript typeとして生成。配列は利用側が保持。画面側で生成対象の型を手書きしない。 |
| BRUCE-ACG-003 | ACG生成済みファイルを直接編集せず、生成元定義・生成器・テストを修正して再生成。 |
| BRUCE-ACG-004 | Mapperの無断追加を禁止。生成物とFormControlの関係・型変換は原典2.6の承認済み規則に従う。 |
| BRUCE-ACG-005 | Nullable、型Enum、型別指定、Validation、形式チェック、空白必須、デフォルト値、日付日時、ヘッダー明細、文字種EnumとDIを原典2.6.1〜2.6.14に従って実装する。 |
| BRUCE-ACG-006 | ACGはAngular HTMLテンプレートを生成しない。HTML生成物の静的検査を前提とした旧提案は撤回。 |

## 詳細抽出未完了

2.6.1〜2.6.14には具体的な型・生成パターン・Validation条件・禁止事項・コード例がある。上記は**全仕様の転記ではない**。各節を仕様原子単位で抽出し、個別の仕様ID、原典行、承認状態、設計書の記載先を作成するまで本書を実装用正本としない。旧議事録のACG各決定ファイルも再照合する。

## Phase 2.6 全14小区分の原典対応と実装契約（第1次照合・2026-10-21）

根拠：[Phase 2.6](../01_ai-document/phase2_06_DTO・Form・Validation.md)。**14節すべての存在と見出しを確認**。以下は優先度の高い承認事項の第1次抽出であり、各節のコード例・例外・旧決定文書との原子単位全件照合は未完了。

| 節 | 対象 | この設計書の状態 |
|---|---|---|
| 2.6.1 | UI Form DTOのComponentスコープDI | 下記ACG-DIに具体化 |
| 2.6.2 | Enum FormControlとApplication string code | 下記ACG-BOUNDARYに具体化 |
| 2.6.3 | FormControl/Domain Validation境界 | 下記ACG-VALIDATIONに具体化 |
| 2.6.4 | UI Form DTOのclass＋formGroup | BRUCE-ACG-001。詳細の再照合は未完 |
| 2.6.5 | 専用Mapper禁止 | BRUCE-ACG-004。詳細の再照合は未完 |
| 2.6.6 | Nullable<T>とglobal.d.ts | 下記ACG-NULLABLEに具体化 |
| 2.6.7 | TypeScriptTypeEnumとEnum実型解決 | 詳細未抽出 |
| 2.6.8 | 型別指定可能パターン | 詳細未抽出 |
| 2.6.9 | 形式・文字種・正規表現 | 下記ACG-FORMATに具体化 |
| 2.6.10 | 空白文字列の必須チェック | 下記ACG-REQUIREDに具体化 |
| 2.6.11 | デフォルト値と予約語 | 下記ACG-DEFAULTに具体化 |
| 2.6.12 | 日付・日時の形式列化 | 下記ACG-DATETIMEに具体化 |
| 2.6.13 | ヘッダー・明細DTO | 下記ACG-DETAILに具体化 |
| 2.6.14 | ACG追加方針 | 詳細未抽出 |

### ACG-DI：画面単位のUI Form DTO

```ts
@Injectable()
export class Bru1001Dto {
  readonly formGroup = new FormGroup({ /* 画面項目 */ });
}

@Component({
  providers: [Bru1001Dto],
})
export class Bru1001Component {
  readonly dto = inject(Bru1001Dto);
}
```

- `providedIn: 'root'`でUI Form DTOをシングルトン化しない。`new Bru1001Dto()`で画面から直接生成しない。
- 記述短縮だけの`readonly controls = this.dto.formGroup.controls`は持たず、HTMLでは必要に応じ`@let ctrls = dto.formGroup.controls;`を利用する。
- UI Form DTOにFormGroup・FormControl・型・初期値・disabled初期状態・画面入力Validationを持たせる。業務ルールを持たせない。Application DTOにAngular FormGroup/FormControl/Validatorを持ち込まない。
- **状態**：設計承認済み。ACG生成・画面への実装は未着手。

### ACG-BOUNDARY：UI EnumとApplication文字列コード

```text
Application/DBのstring code → toEnum(...) → UI FormControlのEnum object
UI FormControlのEnum object → .value → Application/DBのstring code
```

- 専用Mapper/Converter/Assemblerを機械的に追加せず、画面Componentが明示的に変換する。
- FormControlの値型と`eventKey`の型は**別概念**。Radioのvaluesがstring[]のままならEnum値との一致を確認する。型アサーション`as XxxDto`で不一致を隠さない。
- EnumオブジェクトのTRUE/FALSEを`if (value)`や`!value`で判定しない。EnumのFALSEオブジェクトもtruthyである。ToggleのDOM `checked`はbooleanとして扱い、Enumとの変換境界を別途設計する。
- `AppEventKeyType`のglobal配置・import・適用対象、`toEnum`のnull入力契約、Radio/Toggleの詳細は**未承認／未確定**。
- **原典記録の状態**：2.6.2は実装完了・ビルド確認済みとの記録があるが、保存→再表示などPhase 7の動作検証は未完了。今回のGitHub設計書更新は実装検証ではない。

### ACG-VALIDATION：入力制約と業務不変条件

- UI FormControl側：required、文字数、数値・日付形式、画面入力として完結する範囲。
- Domain側：ポイント／ゲーム／セット成立、サーブ／リターン順、試合状態、戦術・スタッツ等の業務ルール。
- 同一の業務判定をUIとDomainに二重実装しない。Domainの不変条件は画面入力を経由しない経路でも保証する。
- **状態**：責務分離は承認済み。実装・検証は未実施。

### ACG-NULLABLE：共通型と未指定値

```ts
// src/global.d.ts（共通型の承認済み配置）
type Nullable<T> = T | null;
```

`Nullable<T>`は`undefined`を含まない。グローバル宣言として使用し、個々の生成DTOでimportを追加しない。Enum項目のUI FormControlは`FormControl<Nullable<対象Enum>>`、デフォルト未指定時は`null`とする。実際の型生成パターン全件は2.6.6〜2.6.8の再照合が必要。

### ACG-FORMAT／ACG-REQUIRED：形式と必須を分離

- 形式6種：半角数字、半角英数字、半角英数字記号、正規表現、日付、日時。
- `文字種=ASCII`は前4形式のいずれかを指定し、`形式=-`は禁止。`日付`/`日時`は`型=文字列`・`文字種=-`と組み合わせる。
- 半角英数字記号は**ASCII印字可能文字（半角スペースを含む）**を許可する。正規表現指定時は画面設計書の正規表現列を使用。
- **文字列必須**はtrim後の空文字をNGとする。`null`、`''`、`' '`、`'   '`はNG、`'abc'`、`'abc def'`はOK。Angular標準`Validators.required`だけでは空白のみを拒否できないため、別の必須Validatorが必要（クラス名・メソッド名は未決）。
- **数値・Enum必須**は`Validators.required`相当、**真偽必須**は`Validators.requiredTrue`相当。
- 空白の入力可否（形式）と空白だけの必須NGは矛盾しない。

### ACG-DEFAULT：型別初期値とFail Fast

| 型・形式 | デフォルト `-` | 明示デフォルト |
|---|---|---|
| 文字列 | `''` | 指定文字列 |
| 数値 | `null` | 指定数値 |
| 真偽 | `false` | `true`または`false` |
| Enum | `null` | `Enum型.toEnum('コード値')` |
| 文字列＋日付 | `''` | `SYSTEM_DATE` → `AppDateUtil.getSysDateIso8601()` |
| 文字列＋日時 | `''` | `SYSTEM_DATETIME` → `AppDateUtil.getSysDateTimeUtcIso8601()` |

- `必須=〇`でも`デフォルト=-`を勝手に補完しない。
- `SYSTEM_DATE`は日付形式のみ、`SYSTEM_DATETIME`は日時形式のみ。逆指定・その他形式への指定は**Exceptionで生成停止**。予約語をそのまま文字列初期値にしない。
- 日付Utility：`src/app/brf9000/brf9017-utils/app-date.util.ts`。ACGが現在日時取得を独自実装しない。
- `createDateTime`、`updateDateTime`、`deleteDateTime`等の物理名を見て初期値を特別扱いしない。

### ACG-DATETIME：型と形式を区別

- 画面設計書の型列は**文字列・数値・真偽・Enum**。`日付`/`日時`は型列から除き、**文字列の形式列**に置く。TypeScript型は`string`。
- 日時はUTC ISO 8601で保持し、閲覧者のタイムゾーン・ロケールに合わせて表示する。例：`2026-10-16T06:24:00.000Z`。
- 日付は`2026-10-16`等の暦日で、タイムゾーン変換しない。`形式=日付`は原則非推奨（暦日自体を保持する要件のみ）。
- 画面設計書に`yyyy/MM/dd`等の国別固定表示書式を埋め込まない。
- ACGの`TypeScriptTypeEnum`からDATE/DATE_TIMEを除去し、該当生成分岐とDAO参照をSTRING前提に整理する。**実装状況は別途確認**。

### ACG-DETAIL：ヘッダーと明細

- 検索条件の`HeaderDto`/`ConditionDto`と明細行の`DetailDto`/`ResultDto`は別DTOを基本とし、単に包むだけの親DTOは原則作成しない。
- 表示専用の明細は通常のDTO配列（例：`Bru1002ResultDto[]`）として画面が保持。編集可能な明細はReactive Formsの`FormArray`／行単位`FormGroup`を使用する。

### 第1次受入テスト

| ID | 条件 | 期待 |
|---|---|---|
| ACG-T01 | 同一UI DTOを画面2インスタンスで使用 | Form状態を共有しない |
| ACG-T02 | Enum FALSEをToggleに渡す | オブジェクトのtruthyをcheckedと誤認しない |
| ACG-T03 | 必須文字列が半角空白のみ | NG |
| ACG-T04 | 半角英数字記号に`'abc def'` | 形式OK |
| ACG-T05 | 必須Enumがnull | 必須NG |
| ACG-T06 | 必須真偽がfalse | requiredTrue相当でNG |
| ACG-T07 | Enumデフォルト`-` | null |
| ACG-T08 | 日時形式にSYSTEM_DATE | Exception、生成停止 |
| ACG-T09 | 日時形式にSYSTEM_DATETIME | AppDateUtilのUTC ISO 8601取得呼出しを生成 |
| ACG-T10 | createDateTimeのデフォルト`-` | 項目名による推測補完なし |
| ACG-T11 | 日時の表示 | 内部UTCを閲覧ロケールに変換 |
| ACG-T12 | 表示専用明細 | 通常DTO配列で保持しFormArrayを強制しない |

**監査判定**：AUD-001は**一部補完・未解決**。2.6.6〜2.6.14の型別全組合せ、コード例、例外条件、ACG生成詳細と旧決定原典9件との双方向照合は残る。全14節を照合済み・実装可能と称さない。Phase 5着手は禁止のまま。
