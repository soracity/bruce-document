# Bruce ビルドエラー調査・修正プラン

> 目的：ACG再生成後に発生している多数のBruceビルドエラーを、発生ファイル単位ではなく**根本原因単位**で分類し、効率的な修正順序と修正方法を固定する。

> 運用方針：代表的なエラーは理解目的でユーザーが手動修正する。機械的・反復的な修正は、VS Codeのリファクタリング/検索置換、共通Component修正、ACG修正、AIによる横展開を使い分ける。

> 最終更新：2026-10-17。RadioComponentの型契約修正とBRU1001 `matchType` の代表修正まで完了。現在はToggleComponentの設計・修正へ進む段階。

---

## 1. 基準点と現在地

### 1.1 ACG再生成直後のBruce基準点

```text
repository : soracity/bruce
commit     : 31a7e5f6a175a891a777933f57b9e6a9fb3ca1c9
message    : ACG修正に伴うビルドエラー多数発生状態
parent     : 831b496036d8bc1f33ffe3f91fd81131b91b22bb
```

このコミットは、ACG再生成直後かつBruce手修正開始前の基準点として扱う。

### 1.2 現在のBruce到達点

```text
commit : 627b760f94234ea6027c3d81b48f22868ef3c08b
message: 3：Radioがstring専用のままEnum FormControlを受けている
```

この時点までに、以下を完了している。

```text
P0 i18n import問題
  ↓ 完了
共通型 AppComponentValueType / AppComponentEventKeyType
  ↓ 追加済み
RadioComponent string固定解除
  ↓ 完了
BRU1001 matchType の values をEnum object化
  ↓ 完了
matchType比較を Enum === Enum に修正
  ↓ 完了
不要だったmatchType用eventKey引数を削除
  ↓ 完了
build
  ↓
次はToggleComponent
```

---

## 2. 根本原因別の進捗

| No | 根本原因 | 修正責務 | 優先度 | 状態 |
|---:|---|---|---|---|
| 1 | ACG生成のi18n Enum Interface importパス誤り | ACG | P0 | **完了** |
| 2 | Bruce手書きコードの旧i18n Interface import参照 | Bruce手書き部 | P0 | **完了** |
| 3 | Radioが`string`専用のままEnum FormControlを受けている | 共通Component | P1 | **共通契約修正完了** |
| 4 | Toggleが`boolean`専用のままEnum FormControlを受けている | 共通Component | P1 | **現在ここ** |
| 5 | BRU1001がEnum FormControlを旧`string/boolean`前提で扱っている | 画面Component | P2 | 一部修正済み・多数残 |
| 6 | BRU1002がEnum FormControlを旧`string`前提で扱っている | 画面Component | P3 | 未修正 |
| 7 | Enum objectをbooleanとしてtruthy/falsy判定している | 画面Component | P2 | 未修正 |
| 8 | UI Enum object ↔ Application string code境界が未変換 | 画面Component | P2 | 未修正 |

No.5〜8は独立した原因というより、UI Form DTOをEnum object化したことに対して、既存画面ロジックが旧string/boolean前提のまま残っている派生問題である。

---

## 3. P0：i18n Interface import問題【完了】

### 3.1 ACG生成側

ACGのLABEL/MESSAGE Interface importパスを修正し、Bruceを再生成済み。

正しい参照先は以下。

```text
@approot/app/brf9000/brf9011-enum/i18n/app-i18n-label-key.enum-if
@approot/app/brf9000/brf9011-enum/i18n/app-i18n-message-key.enum-if
```

Bruce生成側修正コミット：

```text
edbe596a05e6c1317ef128ce9ddc2cc120159454
```

メッセージInterface側の追従修正：

```text
958e14c88d56cf9b927a9c2e8d5447bcd2ab6f97
```

### 3.2 Bruce手書き部

旧Interface参照を手書きコードから除去済み。

```text
commit : fe1c029e95029e6c2a295a477256a84c685beee1
message: No.2「Bruce手書き部の旧Interface参照修正」
```

以後のbuildではTS2307 / module-not-found / 旧Interface importエラーは出ていないため、No.1 / No.2は完了扱いとする。

---

## 4. 共通Component用の値型【追加済み】

`src/global.d.ts` に以下を追加した。

```ts
import type { AppCodeEnumIf } from './app/brf9000/brf9011-enum/code/app-code.enum-if';

declare global {
  type Nullable<T> = T | null;

  /** 共通Componentで扱える値 */
  type AppComponentValueType = string | number | boolean | AppCodeEnumIf;

  /** Componentから親へ通知するイベントキー */
  type AppComponentEventKeyType = AppComponentValueType;
}

export {};
```

重要：`AppComponentValueType` 自体へ`null`を含めたわけではない。

Radio側で、

```ts
T extends Nullable<AppComponentValueType>
```

とすることにより、**nullを含む具体型も受けられる**契約にしている。

また、次の2概念は分離する。

```text
FormControl value = Componentが実際に扱う値

eventKey          = 親へ通知する操作識別子
```

同じ許容型を使う場合でも、意味上は別責務である。

---

## 5. P1：RadioComponentの型契約【共通Component修正完了】

### 5.1 修正前

```ts
export class RadioComponent extends FormControlComponentBase<string> {
  readonly values = input<string[]>([]);
  readonly radioChange = output<string>();
  readonly eventKey = input<string>('');
}
```

このため画面側の、

```ts
FormControl<Nullable<AppCodeMatchTypeEnum>>
```

を受けられなかった。

### 5.2 一度検討したが採用しなかった形

```ts
extends FormControlComponentBase<AppComponentValueType>
```

これは親クラスの`T`を広いUnion型へ固定するだけであり、

```text
FormControl<AppCodeMatchTypeEnum | null>
```

という画面側の具体型と一致しないため採用しない。

### 5.3 現在の契約

```ts
export class RadioComponent<T extends Nullable<AppComponentValueType>>
  extends FormControlComponentBase<T> {

  readonly values = input<T[]>([]);
  readonly radioChange = output<AppComponentEventKeyType>();
  readonly eventKey = input<AppComponentEventKeyType>('');
}
```

意味は、Radioごとに`control`から具体的な`T`を推論し、その型を`values`にも連動させること。

`matchType`では概念的に、

```text
T
= AppCodeMatchTypeEnum | null

control
= FormControl<AppCodeMatchTypeEnum | null>

values
= (AppCodeMatchTypeEnum | null)[]
```

となる。

「nullを必ず含む」のではなく、**nullを含む型も受けられる**ようにした。

### 5.4 BRU1001 matchType代表修正

修正前：

```html
[values]="[codeMatchTypeEnum.SINGLES.value, codeMatchTypeEnum.DOUBLES.value]"
```

修正後：

```html
[values]="[codeMatchTypeEnum.SINGLES, codeMatchTypeEnum.DOUBLES]"
```

さらに比較も、

```html
controls.matchType.value === codeMatchTypeEnum.SINGLES
```

へ変更した。

ルールは次。

```text
UI FormControlがEnum
  ↓
Radio valuesもEnum
  ↓
画面内比較もEnum同士
  ↓
Application/API/DB境界だけ .value でstring code化
```

### 5.5 eventKeyの扱い

`matchType`では`onMatchTypeChange()`内でeventKeyを使用していなかったため、

```html
[eventKey]="'matchTypeChange'"
(radioChange)="onMatchTypeChange($event)"
```

を、

```html
(radioChange)="onMatchTypeChange()"
```

へ変更した。

不要なeventKeyを形式的に残さない。

### 5.6 Radioの残作業

共通Component側の型契約は完了。

ただしBRU1001の他Radio利用箇所では、まだ`.value`をvaluesへ渡している。

```text
setType
  SET1.value / SET3.value / SET5.value / SET_NON.value

gameFinalType
  DEUCE.value / NO_AD.value / SEMI_AD.value

tieBreakMode
  NO_TB.value / WITH_TB.value
```

現在のbuildでこれらは明確に型エラーとして検出されている。

これはRadioComponentの再設計ではなく、**BRU1001側の横展開**として後続STEPで修正する。

---

## 6. P1：ToggleComponentの型契約【現在ここ】

### 6.1 現在のToggle

```ts
readonly control = input<FormControl<boolean>>();
readonly type = input<AppComponentInputTypeToggleEnum>();
readonly checked = input<boolean>();
...

isChecked(): boolean {
  return this.checked() ?? this.control()?.value ?? false;
}

onChange(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.control()?.setValue(checked);
  this.toggleChange.emit(this.eventKey());
}
```

DOM checkboxとしては`checked: boolean`で正しい。

しかしBRU1001の`matchSetting`は、

```ts
FormControl<Nullable<AppCodeMatchSettingEnum>>
```

であるため、

```html
<app-toggle [control]="controls.matchSetting" />
```

で型不一致になる。

### 6.2 Radioとの違い

Radioは選択値そのものをEnum objectとして扱える。

ToggleはDOMから取得する値が必ずboolean。

```text
HTMLInputElement.checked
= boolean

FormControl.value
= AppCodeMatchSettingEnum | null
```

したがって、Radioと同じジェネリック化だけでは完了しない。

`AppCodeMatchSettingEnum`は、

```text
FALSE -> value "0"
TRUE  -> value "1"
```

というEnum objectである。

必要なのは、

```text
DOM boolean
  ↓ 変換
Enum object
  ↓
FormControl
```

および逆方向の、

```text
FormControl Enum object
  ↓ 変換
checked boolean
```

である。

### 6.3 設計上の注意

`AppCodeMatchSettingEnum.FALSE`もJavaScriptオブジェクトなのでtruthyである。

したがって、

```ts
if (control.value) { ... }
```

や、

```ts
return control.value ?? false;
```

ではFALSE Enumをfalseとして扱えない。

Enumの意味を明示して変換する必要がある。

### 6.4 次の作業

Toggle内部に「boolean ↔ FormControl値」の変換責務をどう持たせるかを決める。

ここは共通Componentの責務変更なので、BRU1001側を先にキャスト等で逃がさない。

---

## 7. 2026-10-17 Radio修正後build結果

`627b760f94234ea6027c3d81b48f22868ef3c08b` 到達後に`npx ng build`を実施。

### 7.1 エラー総数

```text
62 errors
```

TypeScriptエラーコード別：

```text
TS2345 : 36
TS2322 : 25
TS2352 :  1
```

ファイル別：

```text
BRU1001 component.ts   : 29
BRU1001 component.html : 22
BRU1002 component.ts   :  6
BRU1002 component.html :  5
```

重要：エラー数が以前より増減すること自体は問題ではない。

型契約を正しく狭めた結果、今まで隠れていた旧string/boolean前提がコンパイラに検出される場合があるため、**件数ではなく根本原因が減っているか**で判断する。

### 7.2 Radio修正で消えた問題

少なくとも以下は現在のbuildでは主原因から外れた。

```text
[control]="controls.matchType"
  FormControl<Enum|null> vs FormControl<string> 不一致

(radioChange)="onMatchTypeChange($event)"
  AppComponentEventKeyType vs string 不一致

matchTypeのvalues
  string code vs Enum object 不一致

matchTypeの画面比較
  Enum object vs string code 比較
```

### 7.3 現在残っている主分類

```text
A. Toggle
   FormControl<AppCodeMatchSettingEnum|null>
   vs FormControl<boolean>

B. BRU1001 Radio横展開
   setType / gameFinalType / tieBreakMode の values がまだ .value

C. AppCodeCourtSideEnum
   Enum|nullをAppStringUtil.isEmpty()へ渡している
   Enum FormControlへ空文字をsetValueしている
   stringをEnum FormControlへsetValueしている

D. Application -> UI 境界
   response string codeをEnum FormControlへそのままpatchValueしている

E. UI -> Application 境界
   Enum objectをstring契約Request DTOへそのまま入れている
   `as Bra1001SaveMatchInfoReqDto`で型不一致を押し込もうとしている

F. 既にEnumなのにtoEnum()を呼んでいる

G. Enum objectをbooleanとして扱っている

H. BRU1002
   helper引数・patchValue・toEnum()が旧string前提
```

---

## 8. P2：BRU1001のEnum化追従

UI Form DTOはEnum objectを保持する設計になったが、画面Component/HTMLには旧string/boolean前提が残っている。

### パターンA：Enum objectとstring codeを比較

```html
controls.matchType.value === codeMatchTypeEnum.SINGLES.value
```

`matchType`代表箇所は修正済み。

### パターンB：既にEnumなのに`toEnum()`へ渡す

```ts
AppCodeMatchTypeEnum.toEnum(this.controls.matchType.value)
```

UI FormControl内では既にEnum objectであり、`toEnum()`はApplication/API/DB等のraw string codeからUIへ入る境界で使う。

### パターンC：Enum|nullをstring Utilityへ渡す

```ts
AppStringUtil.isEmpty(controls.returnNoDoublesPlayerA1.value)
```

`returnNoDoublesPlayerA1`は`Nullable<AppCodeCourtSideEnum>`であり、文字列空判定ではなくEnum/nullとして判定する。

### パターンD：Enum FormControlへ空文字をセット

```ts
this.controls.returnNoDoublesPlayerA1.setValue(AppStringUtil.EMPTY)
```

Enum項目の未選択値は`null`を使う方針。

### パターンE：Enum|nullをbooleanへ代入

```ts
const toggleValue: boolean = this.controls.matchSetting.value;
```

matchSettingはEnum objectなので、明示的なTRUE/FALSE判定が必要。

### パターンF：Applicationのstring codeをそのままEnum FormControlへpatchValue

```ts
matchType: res.matchType
setType: res.setType
```

境界で、

```ts
EnumType.toEnum(rawCode)
```

へ変換する。

null/空文字等の入力契約は項目仕様に従って明示する。

### パターンG：UI Enum objectをApplication DTOへそのまま渡す

Application DTOがstring code契約の場合、

```text
Application / DB string code
        ↓ toEnum(code)
UI FormControl Enum object
        ↓ enum.value
Application / DB string code
```

とする。

`as`キャストで不一致を隠さない。

### 手動理解対象

BRU1001は以下3系統を代表として理解する。

```text
1. matchType
   通常Enum FormControl
   ※Radio表示部分は代表修正済み

2. returnNoDoublesPlayerA1
   Nullable Enum / nullクリア / string Utility排除

3. matchSetting
   TRUE/FALSE意味を持つEnum + Toggle boolean変換
```

---

## 9. Enum truthiness問題

次はビルドを通っても挙動が誤る可能性がある。

```html
[disabled]="!controls.matchSetting.value"
```

```ts
value.matchSetting ? TRUE.value : FALSE.value
```

Enum objectは`FALSE`インスタンスでもtruthy。

必ず、

```ts
value === AppCodeMatchSettingEnum.TRUE
value === AppCodeMatchSettingEnum.FALSE
value === null
```

のように意味を明示する。

---

## 10. 型アサーションで境界不一致を隠さない

現在の保存処理には、

```ts
const reqDto = { ... } as Bra1001SaveMatchInfoReqDto;
```

がある。

現在のbuildではTS2352として、`matchType: Enum|null`とApplication側`matchType: string`の不一致が検出されている。

修正方針：

```text
UI Enum object
  ↓ .value等で明示変換
Application Request DTOのstring code
```

型アサーションを「エラーを消すため」に使わない。

---

## 11. P3：BRU1002のEnum化追従

BRU1002も同じ旧string前提を持つ。

現在のbuildで確認済みの例：

```text
getMatchStatusColor(ctrls.matchStatus.value)
getMatchStatusLabel(ctrls.matchStatus.value)
getMatchTypeLabel(ctrls.matchType.value)
getNumberOfSetsLabel(ctrls.setType.value)
```

helper側はstring引数だが、テンプレート側はEnum|null。

さらに、

```ts
AppCodeMatchTypeEnum.toEnum(dto.formGroup.controls.matchType.value)
```

のように、既にEnumであるFormControl値を再度`toEnum()`している。

一覧データ取得時にはApplication responseのstring codeをEnum FormControlへそのままpatchしている箇所も残る。

BRU1001で境界ルールを確立してから横展開する。

---

## 12. eventKeyの現在の位置づけ

以前はeventKey型設計を保留していたが、現在は以下まで確定・実装済み。

```ts
type AppComponentEventKeyType = AppComponentValueType;
```

Radioの、

```ts
radioChange
eventKey
```

は`AppComponentEventKeyType`へ変更済み。

ただし、FormControl値とeventKeyを同一概念として扱わない。

```text
FormControl<T>
```

の`T`をeventKey型へ置き換える設計は採用しない。

また、イベントキーを使用しない画面イベントでは、今回の`matchType`のように不要な`eventKey`自体を指定しない。

Toggle / Button等へのイベントキー型横展開は、各Component修正時に責務を確認して行う。

---

## 13. 今回のビルド復旧とは分ける事項

### Bru1001DtoのDI方式

既決方針は、

```ts
providers: [Bru1001Dto]
readonly dto = inject(Bru1001Dto);
```

だが、現在の`new Bru1001Dto()`は今回の主ビルドエラー原因ではない。

Enum型追従後に設計整合として修正する。

### Enum以外のBrand

Bruce全体はSymbol方式の実体Brandへ統一する方針だが、今回のACG自動生成対応はEnumクラスが中心。

Application DTO等のBrand設計変更はビルド復旧へ混ぜない。

---

## 14. 修正順序【現在版】

```text
STEP 1  ACG：i18n Interface importパス修正
        【完了】
   ↓
STEP 2  ACG PUSH → Bruce再生成
        【完了】
   ↓
STEP 3  再生成直後をコミット
        【完了】
   ↓
STEP 4  Bruce手書き部の旧i18n参照修正
        【完了】
   ↓
STEP 5  build：module-not-found系消滅確認
        【完了】
   ↓
STEP 6  RadioComponentを設計・修正
        AppComponentValueType / generic T / Enum values
        【完了】
   ↓
STEP 7  BRU1001 matchTypeをRadio代表として修正 → build
        【完了】
        現在 62 errors
   ↓
STEP 8  ToggleComponentを設計・修正
        boolean checked ↔ Enum FormControl
        【現在ここ】
   ↓
STEP 9  build
   ↓
STEP 10 BRU1001：matchTypeの残る境界処理を修正
   ↓
STEP 11 BRU1001：returnNoDoublesPlayerA1を代表として修正
   ↓
STEP 12 BRU1001：matchSettingを代表として修正
   ↓
STEP 13 BRU1001同種項目へ横展開
        setType / gameFinalType / tieBreakMode等を含む
   ↓
STEP 14 BRU1002へ横展開
   ↓
STEP 15 buildして残件を再分類
   ↓
STEP 16 DI等の設計整合を確認
   ↓
STEP 17 AIフレームワーク本線 Phase 2-2「幅の責務」へ戻る
```

**各大分類を直すごとにbuildする。**

大量にまとめて直して最後にbuildすると、新たに入れた不具合と既存不具合の境界が分からなくなるため避ける。

---

## 15. VS Codeを使う箇所 / 使わない箇所

### 一括処理してよい

```text
i18n Interfaceの旧importパス置換
確定済み名称のRename Symbol
意味を変えず参照だけ追従する変更
確立済みパターンの機械的横展開
```

### 単純な一括置換だけで直さない

```text
FormControl<string/boolean> → Enum FormControl
string code ↔ Enum object
boolean ↔ TRUE/FALSE Enum
Nullable Enumのnull処理
Radio/Toggleの責務変更
UI Form DTO ↔ Application DTO境界
Enum truthiness判定
```

意味が変わる箇所は、代表1件を理解してから横展開する。

---

## 16. 次の作業

**STEP 8：ToggleComponentの型契約を決める。**

現在の直接エラーは、

```text
FormControl<Nullable<AppCodeMatchSettingEnum>>
  is not assignable to
FormControl<boolean>
```

である。

先にBRU1001をキャスト等で合わせず、共通Toggle側で、

```text
checked boolean
↔
AppCodeMatchSettingEnum | null
```

の責務をどう表現するかを決定してから実装する。
