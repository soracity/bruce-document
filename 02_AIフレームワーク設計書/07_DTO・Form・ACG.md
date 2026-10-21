# DTO・Form・Validation・ACG設計（暫定・全件監査前）

根拠：[2.6](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md)、[2.8](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_08_AI実装制約.md)、[Phase 4仕様表C](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase4_02_体系的設計書.md)。

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

根拠：[Phase 2.6](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md)。**14節すべての存在と見出しを確認**。以下は優先度の高い承認事項の第1次抽出であり、各節のコード例・例外・旧決定文書との原子単位全件照合は未完了。

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

## Phase 2.6 第2次一括詳細化：型分類・ACG内部モデル・例外（2026-10-21）

原典：[2.6.4〜2.6.14](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md)および同文書に収録された旧ACG決定原文。**この節の各規則は原典で明示された承認内容に限定する**。前節の第1次抽出に追加する。

### ACG-TYPE：TypeScriptTypeEnumと型解決

- `TypeScriptPrimitiveTypeEnum`を`TypeScriptTypeEnum`へ改称する。
- 型分類は`STRING`、`NUMBER`、`BOOLEAN`、`UINT8ARRAY`、`ENUM`。日付・日時はTypeScript上では文字列のため`DATE`、`DATE_TIME`を削除し、画面設計書の「形式」で表す。
- `ENUM`は固定TypeScript型名を持たない。画面設計書の`Enum型`列から実型を取得する。`型=Enum`・`Enum型=AppCodeMatchTypeEnum`の場合、`FormControl<Nullable<AppCodeMatchTypeEnum>>`を生成する。
- Enum型名が必要なのに型分類Enumだけから固定型名を求めた場合、推測せず**Fail Fast**。
- UI専用の別型分類Enumは新設しない。現行ACGパッケージは`io.github.soracity.alfred`、`com.github.soracity.alfred`は旧パッケージ。

### ACG-MODEL：ACG生成モデルとDI

| `AcgClassModel`項目 | UI Form DTO | root提供が必要なDAO等 |
|---|---|---|
| `isInjectable` | `true` | `true` |
| `providedInRoot` | `false` | `true` |
| 生成デコレータ | `@Injectable()` | `@Injectable({ providedIn: 'root' })` |

`isInjectable`と`providedInRoot`は**別プロパティ**。Injectableだからといって一律root提供しない。

`AcgUiFormCharacterTypeEnum`は`io.github.soracity.alfred.generator.user.uispec.uispecenum`へ配置。旧決定でIssue #8に委ねた**パッケージ全体再編は本件に含めない**。

### ACG-DATE-STRICT：日付・日時のデフォルト許可値を限定

前節の型別初期値表に対する**必須の例外**。通常の文字列は任意のデフォルト文字列を指定できるが、`形式=日付`／`形式=日時`では任意の固定文字列を許可しない。

| 形式 | デフォルト | 判定／生成 |
|---|---|---|
| 日付 | `-` | `''` |
| 日付 | `SYSTEM_DATE` | `AppDateUtil.getSysDateIso8601()` |
| 日付 | `SYSTEM_DATETIME` | Exception |
| 日付 | `2026-10-16` | Exception |
| 日時 | `-` | `''` |
| 日時 | `SYSTEM_DATETIME` | `AppDateUtil.getSysDateTimeUtcIso8601()` |
| 日時 | `SYSTEM_DATE` | Exception |
| 日時 | `2026-10-16T06:24:00.000Z` | Exception |
| 日付・日時以外 | `SYSTEM_DATE`または`SYSTEM_DATETIME` | Exception |

不正な組合せは自動補正・警告継続をせず、**生成停止**する。前節の「明示デフォルト」欄はこの制限を前提に読む。

### ACG-DTO：UI Form DTOと表示DTOの承認履歴の整理

- **UI Form DTO**：`class`、型付き`readonly formGroup`をプロパティ宣言時に初期化。`FormGroup`を継承せず、FormGroup専用の別クラスを作らない。ComponentスコープDI。
- **表示用DTO**：ACGが**1行分のTypeScript `type`**を生成し、**各プロパティは`readonly`**。一覧全体の配列は利用側で保持。生成対象の型を画面側で手書きしない。
- 2026-10-20の原典には表示用DTOを`class`とする途中承認・`type`推奨・readonly未決の履歴があるが、**同日の後続正式承認（`type`＋`readonly`）を現行仕様として優先**する。
- 既存ACGの`type`生成機構はユーザー申告で実装済み。現行ソースの照合・表示DTO生成結果の検証は未実施であり、実装済み判定の根拠にしない。

### ACG-MAPPER：禁止する無断抽象化

画面ComponentでForm値→Application Request DTOの明示変換と、Application Response→`patchValue`を行う。**項目数・処理行数・重複・一般的DDD推奨**を理由に、`XxxMapper`、`XxxConverter`、`XxxAssembler`等の同等責務の新クラス／サービス／Utilityを無断で追加しない。必要性がある場合は実装前に設計確認する。

### 第2次受入・失敗テスト

| ID | 入力／操作 | 期待 |
|---|---|---|
| ACG-T13 | 型分類ENUM、Enum型指定あり | 指定Enum実型のNullable FormControl |
| ACG-T14 | ENUMに固定TypeScript型名を要求 | Fail Fast |
| ACG-T15 | TypeScriptTypeEnumの分類 | 5値、DATE/DATE_TIMEなし |
| ACG-T16 | UI Form DTOのInjectable生成 | `@Injectable()`、root提供なし |
| ACG-T17 | root提供DAOのInjectable生成 | `@Injectable({ providedIn: 'root' })` |
| ACG-T18 | 日付形式に固定日付文字列 | Exception、生成停止 |
| ACG-T19 | 日時形式に固定UTC日時文字列 | Exception、生成停止 |
| ACG-T20 | 日付形式にSYSTEM_DATE | AppDateUtil日付取得呼出し |
| ACG-T21 | 日付・日時以外にSYSTEM_DATETIME | Exception、生成停止 |
| ACG-T22 | 表示DTOの生成 | 1行分の`type`、全プロパティreadonly |
| ACG-T23 | UI Form DTOの生成 | `class`＋型付きreadonly FormGroup、継承なし |
| ACG-T24 | Mapper等の新設をAIが提案 | 承認前の自動追加をしない |
| ACG-T25 | `Nullable<T>`生成 | `src/global.d.ts`で宣言、import不要、undefinedを含まない |

### 残る詳細照合

2.6.8の**型×文字種×形式×必須×初期値の許容組合せ全件**、2.6.9の形式別正規表現と日付日時入力検査、2.6.13の編集明細の生成契約、2.6.14のACG内部モデル各プロパティの実ソース照合、旧決定文書9件の**仕様原子単位双方向追跡**は未完了。これらを完了したことにはしない。

## Phase 2.6 第3次一括詳細化：型別許容パターンの全11行（2026-10-21）

原典：[2.6.8 画面DTO項目の型別指定可能パターン](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md)。以下の`指定可`は任意指定、`必須`は値の指定必須、`-`は指定不可。**この11行以外の組合せをACGが推測補正してはならず、Exceptionで生成停止**する。

| 型 | Enum型 | 文字種 | 形式 | 必須 | 必須(真偽) | 文字数(最小/最大) | 数値(最小/最大) | 正規表現 |
|---|---|---|---|---|---|---|---|---|
| 文字列 | - | - | - | - | - | - | - | - |
| 文字列 | - | Unicode | - | 指定可 | - | 指定可 | - | - |
| 文字列 | - | ASCII | 半角数字 | 指定可 | - | 指定可 | - | - |
| 文字列 | - | ASCII | 半角英数字 | 指定可 | - | 指定可 | - | - |
| 文字列 | - | ASCII | 半角英数字記号 | 指定可 | - | 指定可 | - | - |
| 文字列 | - | ASCII | 正規表現 | 指定可 | - | 指定可 | - | 必須 |
| 文字列 | - | - | 日付 | 指定可 | - | - | - | - |
| 文字列 | - | - | 日時 | 指定可 | - | - | - | - |
| 数値 | - | - | - | 指定可 | - | - | 指定可 | - |
| 真偽 | - | - | - | - | 指定可 | - | - | - |
| Enum | 必須 | - | - | 指定可 | - | - | - | - |

### 検証順序の論理仕様

1. 型分類とEnum型指定の整合を判定する。Enumなら実型列が必須、他型なら指定不可。
2. 文字種と形式の組合せを表の11行に照合する。文字列・文字種`-`・形式`-`は**Validationなし専用**であり、必須や文字数を併用できない。
3. 必須と必須(真偽)を型別に判定。真偽のみ後者、その他の該当型は前者。
4. 文字数・数値範囲・正規表現を各行の許可列に照合。ASCII＋正規表現では正規表現列が必須。
5. デフォルトと無効状態は本表とは別の規則で判定。日付日時の予約語・固定文字列禁止はACG-DATE-STRICTを適用。
6. 1件でも不正な指定があれば推測補完せず**Fail Fast**。エラー時に不正な生成コードを成果物として扱わない。

これは**判定責務の論理順序**であり、Java実装の具体的なメソッド順やException型を承認するものではない。

### 日付・日時のValidation責務（2.6.8）

- `形式=日付`／`日時`の**形式保証は入力Component側**。ACGはFormControlに日付・日時専用形式Validatorを生成しない。
- ACGは当該項目の`必須=〇`に対してのみ、必須Validatorを生成する。`必須=-`なら必須Validatorも生成しない。
- 日付・日時のロケール表示は画面設計書で固定書式を指定しない。

### 許容・拒否テスト（原典の7拒否例を含む）

| ID | 条件 | 期待 |
|---|---|---|
| ACG-T26 | 文字列・文字種-・形式-、Validation列すべて- | OK、Validationなし |
| ACG-T27 | 文字列・文字種-・形式-・必須〇 | Exception |
| ACG-T28 | 文字列・ASCII・形式- | Exception |
| ACG-T29 | 文字列・Unicode・半角数字 | Exception |
| ACG-T30 | 文字列・ASCII・日付 | Exception |
| ACG-T31 | 数値・文字種ASCII | Exception |
| ACG-T32 | 真偽・必須〇（必須(真偽)ではない） | Exception |
| ACG-T33 | Enum・Enum型- | Exception |
| ACG-T34 | 文字列・ASCII・正規表現、正規表現列指定 | OK |
| ACG-T35 | 文字列・ASCII・正規表現、正規表現列- | Exception |
| ACG-T36 | 日付・必須- | 日付形式Validatorも必須Validatorも生成しない |
| ACG-T37 | 日時・必須〇 | 日時形式Validatorを生成せず必須Validatorのみ生成 |
| ACG-T38 | 文字列・ASCII・半角英数字記号、空白を含む文字列 | 形式として許可、必須判定は別処理 |
| ACG-T39 | 数値・数値範囲を指定 | 表に従い許可 |
| ACG-T40 | Enum・Enum型指定、必須〇 | 許可、Enum用必須Validatorを生成 |

**状態**：型別11行の原典→本書転記と対応テスト観点は作成済み。表の全組合せの自動生成テスト、実コード・旧文書との双方向照合、ACG例外型・診断メッセージは未検証／未決。Phase 5実装禁止を維持する。

## Phase 2.6 原典対照台帳：承認規則・禁止事項・残差（2026-10-21）

この台帳は原典の小区分ごとの**代表的な仕様原子**と本書の対応箇所を双方向に確認するための索引。全原子の機械照合ではない。旧決定文書の本文は[Phase 2.6](https://github.com/soracity/catw-document/blob/main/01_ai-document/phase2_06_DTO・Form・Validation.md)に原文保存されている。

| 原典節 | 追跡する仕様原子（例外・禁止含む） | 07の対応 | 未解決／要実証 |
|---|---|---|---|
| 2.6.1 | Component単位DI、root禁止、`new`禁止、`controls`別名禁止 | ACG-DI | 生成物のproviders/inject照合 |
| 2.6.2 | UI Enum／Application code分離、`toEnum`／`.value`、Enum FALSEのtruthy禁止 | ACG-BOUNDARY | ToggleとRadioの実値契約 |
| 2.6.3 | 入力ValidationとDomain不変条件分離 | ACG-VALIDATION | Domain経路のテスト |
| 2.6.4 | `class`＋型付き`readonly formGroup`、表示行`type`＋`readonly`、後続承認優先 | ACG-DI／ACG-DTO | 実ACG生成の照合 |
| 2.6.5 | Mapper/Converter/Assemblerの無断新設禁止 | ACG-MAPPER | 画面実装の監査 |
| 2.6.6 | `Nullable<T>`はnullのみ、global.d.ts非module、import不要 | ACG-NULLABLE | 生成ソース型検査 |
| 2.6.7 | TypeScriptTypeEnumの5値、DATE系削除、ENUM実型列必須 | ACG-TYPE | DAO等全参照点の検査 |
| 2.6.8 | 許容11行、7拒否例、日付日時形式ValidatorをACG生成しない | 第3次一括詳細化 | 全組合せ自動試験 |
| 2.6.9 | 6形式、ASCIIスペース許容、正規表現列の指定 | ACG-FORMAT／第3次 | 正規表現の生成と実行 |
| 2.6.10 | 文字列trim後必須、数値/Enum required、真偽requiredTrue | ACG-REQUIRED | 共通Validatorの実型とAPI |
| 2.6.11 | 型別初期値、予約語1対1、物理名による推測禁止 | ACG-DEFAULT／ACG-DATE-STRICT | 生成結果 |
| 2.6.12 | 日付は暦日、日時はUTC ISO8601、ロケール表示 | ACG-DATETIME | 入力Component／表示試験 |
| 2.6.13 | 検索条件と明細分離、表示はDTO配列、編集はFormArray/FormGroup、同一項目のngModel混用禁止 | ACG-DETAIL | 編集明細のACG生成範囲 |
| 2.6.14 | 文字種Enum配置、DIフラグ分離、ENUM型解決、日付デフォルトFail Fast | ACG-MODEL／ACG-TYPE／ACG-DATE-STRICT | ACG本体ソース照合 |

### 追加の原典明示事項

- `src/global.d.ts`は**import/exportを置かず非モジュールのグローバル宣言**とする。単にファイルに型を書くことだけでは条件を満たさない。
- 検索結果は**同一Componentインスタンスの生存中**にクライアントメモリで保持。画面を跨いだ永続化やグローバルキャッシュはこの承認から導かない。
- **1画面内の複数FormGroupは許可**。検索条件と編集明細を無理に統合しない。**同一入力項目でReactive Formsと`[(ngModel)]`を併用しない**。
- 自動生成ファイルは直接編集せず、ACG本体・設計書解析・内部モデル・生成・チェック・テスト側を修正対象とする。
- `形式=日付`は**非推奨だが許容**。日時と日付の両方を一律禁止にしない。

### 双方向検査の範囲

- **原典→07**：14小区分ごとに代表規則と対応節を確認。
- **07→原典**：上表の規則は各原典節に対応する。ただし07内の擬似コード、受入テスト、説明用の型名は**承認済み実装APIではなく設計補助**。
- **未実施**：旧決定原典の全文を仕様・設計理由・禁止・例外・コード例・未決事項へ分解した全原子ID採番、旧→新／新→旧の機械的な全件突合、旧議事録16件／新議事録との横断照合。したがって「全件移行完了」と判定しない。
