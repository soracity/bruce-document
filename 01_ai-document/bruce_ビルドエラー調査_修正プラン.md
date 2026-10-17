# Bruce ビルドエラー調査・修正プラン

> 目的：ACG再生成後に発生している多数のBruceビルドエラーを、発生ファイル単位ではなく**根本原因単位**で分類し、効率的な修正順序と修正方法を決める。

> 運用方針：代表的なエラーは理解目的でユーザーが手動修正する。機械的・反復的な修正は、VS Codeのリファクタリング/検索置換、共通Component修正、ACG修正、AIによる横展開を使い分ける。

---

## 1. 調査対象

Bruce：

```text
repository : soracity/bruce
commit     : 31a7e5f6a175a891a777933f57b9e6a9fb3ca1c9
message    : ACG修正に伴うビルドエラー多数発生状態
parent     : 831b496036d8bc1f33ffe3f91fd81131b91b22bb
```

ACG：

```text
repository : soracity/alfred
branch     : feature/feature-20261016
commit     : 9495fda143e2796054ed85b05d18c882282df465
message    : Enum生成のSymbol方式の実体Brand
```

Bruceの対象コミットはACG再生成直後の状態であり、手動修正を開始する前の基準点として扱う。

GitHub上には当該コミットのCI/buildログが存在しないため、**現時点の件数はソース静的調査による確認件数**とする。`npx ng build`の全文を取得後、TypeScript/Angularコンパイラが出した正確なエラー件数を追記する。

---

## 2. 調査結論（第1次）

大量のエラーは、現時点では主に次の根本原因へ集約できる。

| No | 根本原因 | 主なエラー形態 | 修正責務 | 修正方法 | 優先度 | 手動理解対象 | 状態 |
|---:|---|---|---|---|---|---|---|
| 1 | ACG生成のi18n Enum Interface importパス誤り | TS2307 module not found | ACG | **A：ACG修正→再生成** | P0 | ACGの該当2行は手動確認推奨 | 未修正 |
| 2 | Bruce手書きコードに旧i18n Interface importパスが残存 | TS2307 module not found | Bruce手書き部 | **B：VS Code検索置換** | P0 | 不要（機械修正） | 未修正 |
| 3 | Radioが`string`専用のままEnum FormControlを受けている | TS2322ほか | 共通Component | **C：Radio設計修正** | P1 | **手動修正推奨** | 未修正 |
| 4 | Toggleが`boolean`専用のままEnum FormControlを受けている | TS2322ほか | 共通Component | **C：Toggle設計修正** | P1 | **手動修正推奨** | 未修正 |
| 5 | BRU1001がEnum FormControlを旧`string/boolean`前提で扱っている | TS2345 / TS2367 / TS2322等 | 画面Component | **D/E：代表項目を手動→横展開** | P2 | **手動修正推奨** | 未修正 |
| 6 | BRU1002がEnum FormControlを旧`string`前提で扱っている | TS2345 / patchValue型不一致等 | 画面Component | **D：BRU1001確立後に横展開** | P3 | BRU1001理解後はAI可 | 未修正 |
| 7 | Enum objectをbooleanとしてtruthy/falsy判定している | ビルドを通ってもロジック誤り | 画面Component | **D/E：明示Enum比較へ変更** | P2 | **手動確認推奨** | 未修正 |
| 8 | 型アサーションがUI→Application境界の型不一致を隠している | ビルドで検出されない可能性 | 画面Component | **D：明示変換へ変更** | P2 | **手動確認推奨** | 未修正 |

現時点では、**8種類の独立したビルドエラーがあるという意味ではない**。No.5〜8は同じ「UI Form DTOのEnum化」に由来する派生問題で、修正順序と責務を分けるために分解している。

---

## 3. P0：ACG生成のi18n Enum Interface importパス誤り

### 3.1 調査結果

生成済みのラベルEnumは次をimportしている。

```ts
import {
  APP_LABEL_KEY_ENUM_BRAND,
  AppLabelKeyEnumIf,
} from '@approot/app/brf9000/brf9011-enum/code/app-label-key.enum-if';
```

しかし実ファイルは次。

```text
src/app/brf9000/brf9011-enum/i18n/app-label-key.enum-if.ts
```

つまり、`code` が誤りで `i18n` が正しい。

生成済みのメッセージEnumは次をimportしている。

```ts
import {
  APP_MESSAGE_KEY_ENUM_BRAND,
  AppMessageKeyEnumIf,
} from '@approot/app/brf9000/brf9011-enum/i18n/brf-message-key.enum-if';
```

しかし実ファイルは次。

```text
src/app/brf9000/brf9011-enum/i18n/app-message-key.enum-if.ts
```

つまり、旧ファイル名 `brf-message-key.enum-if` が残っており、`app-message-key.enum-if` が正しい。

### 3.2 ACG側の原因箇所

ACG最新コミットの以下に原因が残っている。

```text
subproject/AlfredCodeGenerator/src/main/java/
io/github/soracity/alfred/generator/user/enumspec/
AcgEnumSpecCodeGenerator.java
```

`createClassModel()` の `TYPE_LABEL`：

```java
// 現在
classBuilder.addImport(
    "@approot/app/brf9000/brf9011-enum/code/app-label-key.enum-if",
    "APP_LABEL_KEY_ENUM_BRAND", "AppLabelKeyEnumIf");
```

修正候補：

```java
classBuilder.addImport(
    "@approot/app/brf9000/brf9011-enum/i18n/app-label-key.enum-if",
    "APP_LABEL_KEY_ENUM_BRAND", "AppLabelKeyEnumIf");
```

`TYPE_MESSAGE`：

```java
// 現在
classBuilder.addImport(
    "@approot/app/brf9000/brf9011-enum/i18n/brf-message-key.enum-if",
    "APP_MESSAGE_KEY_ENUM_BRAND", "AppMessageKeyEnumIf");
```

修正候補：

```java
classBuilder.addImport(
    "@approot/app/brf9000/brf9011-enum/i18n/app-message-key.enum-if",
    "APP_MESSAGE_KEY_ENUM_BRAND", "AppMessageKeyEnumIf");
```

### 3.3 影響確認

現在確認できた生成対象は以下の6ファイル。

```text
app-i18n-label-key-common.enum.ts
app-i18n-label-key-brf1001.enum.ts
app-i18n-label-key-brf1002.enum.ts
app-i18n-label-key-test.enum.ts
app-i18n-message-key-common.enum.ts
app-i18n-message-key-test.enum.ts
```

### 3.4 修正方法

**Bruce生成ファイルは手修正しない。**

```text
ACGの2つのimportパスを修正
  ↓
ACGをPUSH
  ↓
Bruceを再生成
  ↓
生成された6ファイルのimportを確認
```

この問題を最初に解消してからBruce手書きコードを直す。

---

## 4. P0：Bruce手書きコードの旧i18n Interface importパス

### 4.1 調査結果

Interface本体は現在、以下へ移動・改名済み。

```text
@approot/app/brf9000/brf9011-enum/i18n/app-label-key.enum-if
@approot/app/brf9000/brf9011-enum/i18n/app-message-key.enum-if
```

しかし手書きコードには旧パスが残っている。

確認済み例：

```text
brf9010-i18n/application/service/bra9010.service.ts
brf9018-pipe/brf9018-i18n-label.pipe.ts
brf9018-pipe/brf9018-i18n-message.pipe.ts
brf9020-shared-components/alert/components/alert.component.ts
brf9020-shared-components/button/components/button.component.ts
brf9020-shared-components/date/components/date.component.ts
brf9020-shared-components/group/components/group.component.ts
brf9020-shared-components/radio/components/radio.component.ts
brf9020-shared-components/textbox/components/textbox.component.ts
brf9020-shared-components/toggle/components/toggle.component.ts
```

少なくとも10ファイルを確認済み。正確な全件数は修正直前にVS Code workspace検索で確定する。

### 4.2 修正方法

これは意味を変えない機械修正なので、手作業で1ファイルずつ直さない。

**Rename Symbol(F2)より、今回はimportパス自体が古いのでVS Codeの全体検索置換が適切。**

検索1：

```text
@approot/app/brf9000/brf9011-enum/i18n/brf-label-key.enum-If
```

置換1：

```text
@approot/app/brf9000/brf9011-enum/i18n/app-label-key.enum-if
```

検索2：

```text
@approot/app/brf9000/brf9011-enum/i18n/brf-message-key.enum-If
```

置換2：

```text
@approot/app/brf9000/brf9011-enum/i18n/app-message-key.enum-if
```

大文字小文字も正規化する。

この変更は**ACG再生成後**に実施する。

---

## 5. P1：RadioComponentの型契約

### 5.1 現状

現在のRadioは次の契約。

```ts
export class RadioComponent extends FormControlComponentBase<string> {
  readonly values = input<string[]>([]);
  readonly eventKey = input<string>('');
}
```

一方、ACG生成後のBRU1001は例えば次。

```ts
matchType: FormControl<Nullable<AppCodeMatchTypeEnum>>
setType: FormControl<Nullable<AppCodeNumberOfSetsEnum>>
gameFinalType: FormControl<Nullable<AppCodeGameFinalEnum>>
tieBreakMode: FormControl<Nullable<AppCodeTieBreakEnum>>
```

BRU1001にはRadio利用が4か所あり、`FormControl<string>` と Enum FormControl が一致しない。

### 5.2 重要な設計条件

次を混同しない。

```text
FormControlの値型 = 選択値そのもの

eventKey = 親へ通知する操作識別子
```

したがって、以前検討したような

```ts
FormControlComponentBase<AppEventKeyType>
```

で逃げない。

また画面側で`as`キャストしてRadioへ押し込まない。

### 5.3 修正方法

Radioは共通Componentなので、**最初の重要な手動修正対象**とする。

ここではまだ実装方式を確定しない。以下を確認してから1案に決める。

- string FormControlも今後サポートするか
- Enum FormControlを型安全に受ける方法
- `values` をEnum objectとして持たせるか
- Angularテンプレートでのgeneric Component適用可否
- null未選択をどう扱うか
- `eventKey` は別契約として維持する

Radioの契約を確定後、BRU1001側の4利用箇所を横展開する。

---

## 6. P1：ToggleComponentの型契約

### 6.1 現状

現在のToggleは次。

```ts
readonly control = input<FormControl<boolean>>();
readonly checked = input<boolean>();
```

DOM checkboxの`checked`はbooleanなので、これはUI状態としては正しい。

しかしBRU1001の`matchSetting`は現在、

```ts
FormControl<Nullable<AppCodeMatchSettingEnum>>
```

であり、次の利用は型不一致になる。

```html
<app-toggle [control]="controls.matchSetting" ... />
```

### 6.2 重要な設計条件

次を分離する。

```text
HTMLInputElement.checked = boolean
FormControl.value          = Enum|null
```

`AppCodeMatchSettingEnum.FALSE`はオブジェクトなのでJavaScriptではtruthyである。

Enum化したから`checked`までEnumにする、という修正はしない。

### 6.3 修正方法

ToggleもRadioの次に**手動で共通Component設計を理解しながら修正する**。

候補として、Toggle内部で「checked boolean ↔ FormControl値」の変換契約を持たせる方法を検討する。具体案はRadio修正後に現利用箇所を確認して決定する。

---

## 7. P2：BRU1001のEnum化追従

### 7.1 根本原因

UI Form DTOは正しくEnum objectを保持するようになったが、BRU1001 Component/HTMLが再生成前の`string/boolean`前提のまま。

### 7.2 確認済みパターン

#### パターンA：Enum objectとstring codeを比較

```html
controls.matchType.value === codeMatchTypeEnum.SINGLES.value
```

左は`Enum|null`、右は`string`。

#### パターンB：既にEnumなのに`toEnum()`へ渡す

```ts
AppCodeMatchTypeEnum.toEnum(this.controls.matchType.value)
```

`toEnum()`はstring codeをEnumへ変換する境界処理であり、UI FormControl内では既にEnumになっている。

#### パターンC：Enum|nullをstring Utilityへ渡す

```ts
AppStringUtil.isEmpty(controls.returnNoDoublesPlayerA1.value)
```

returnNoは`Nullable<AppCodeCourtSideEnum>`。

#### パターンD：Enum FormControlへ空文字をセット

```ts
this.controls.returnNoDoublesPlayerA1.setValue(AppStringUtil.EMPTY)
```

未選択は`null`を使う方針。

#### パターンE：Enum|nullをbooleanへ代入

```ts
const toggleValue: boolean = this.controls.matchSetting.value;
```

#### パターンF：Applicationからのraw stringをそのままEnum FormControlへpatchValue

```ts
matchType: res.matchType
setType: res.setType
...
```

境界で`EnumType.toEnum(rawCode)`が必要。

#### パターンG：UIのEnum objectをApplication DTOへそのまま渡す

Application DTOは現在string code契約。

```text
Application / DB string code
        ↓ toEnum(code)
UI FormControl Enum object
        ↓ enum.value
Application / DB string code
```

この境界をComponentで明示する。

### 7.3 手動修正対象

理解目的で、BRU1001は次の3系統を代表として手動修正するのが効率的。

```text
1. matchType
   → 通常のEnum FormControl

2. returnNoDoublesPlayerA1
   → Nullable Enum / nullクリア / string Utility排除

3. matchSetting
   → TRUE/FALSE意味を持つEnum + Toggleとの変換
```

この3パターンを理解すれば、残りのEnum項目はAIによる横展開が可能。

---

## 8. P2：ビルドを通っても残るEnum truthiness問題

次はTypeScriptが必ずしもビルドエラーにしないが、動作が誤る。

```html
[disabled]="!controls.matchSetting.value"
```

および保存処理のような、

```ts
value.matchSetting ? TRUE.value : FALSE.value
```

Enum objectは`FALSE`を表すインスタンスでもtruthy。

したがって、

```ts
value === AppCodeMatchSettingEnum.TRUE
value === AppCodeMatchSettingEnum.FALSE
value === null
```

のように意味を明示する。

ビルド修正時に同時に直す。後回しにすると「ビルド成功したが挙動が壊れる」ため、BRU1001修正完了条件へ含める。

---

## 9. P2：型アサーションで境界不一致を隠さない

BRU1001保存処理にはApplication Request DTO生成時に型アサーションが存在する。

```ts
const reqDto = { ... } as Bra1001SaveMatchInfoReqDto;
```

UI側Enum objectとApplication側string codeの不一致が、この`as`により見えなくなる可能性がある。

修正時は先に各プロパティを正しいApplication型へ明示変換し、`as`を「ビルドエラーを黙らせる用途」に使わない。

Application DTO自体のBrand設計変更は今回のビルドエラー修正と混ぜず、AIフレームワーク側の別TODOとして扱う。

---

## 10. P3：BRU1002のEnum化追従

BRU1002も同じ原因を持つ。

確認済み：

```ts
AppCodeMatchTypeEnum.toEnum(dto.formGroup.controls.matchType.value)
```

現在の`matchType.value`は既に`Nullable<AppCodeMatchTypeEnum>`。

また以下のhelperは現在`string`引数。

```ts
getNumberOfSetsLabel(numberOfSets: string)
getMatchTypeLabel(matchType: string)
getMatchStatusColor(matchStatus: string)
getMatchStatusLabel(matchStatus: string)
```

テンプレートからはEnum|nullを渡している。

さらに`ngOnInit()`ではApplication responseのstring codeをEnum FormControlへそのまま`patchValue()`している。

### 修正方法

BRU1001で、

```text
raw code → Enum object
Enum objectの画面内利用
Enum object → raw code
```

のルールを手動で理解・確立してから、BRU1002へ横展開する。

BRU1002は一覧表示中心なので、BRU1001確立後はAI修正比率を高くしてよい。

---

## 11. 今回はまだ触らない事項

### eventKey

現時点で確認した主ビルドエラーの直接原因ではない。

```text
FormControl value
```

と

```text
eventKey
```

を混同しないことを優先し、Radio/Toggle修正に便乗してeventKeyの型設計まで変更しない。

必要性が確認された時点で別途整理する。

### Bru1001DtoのDI方式

現在は画面Component側で`new Bru1001Dto()`を使っているが、既決方針はscreen scopeの`providers:[Bru1001Dto]` + `inject(Bru1001Dto)`。

これはビルドエラーの根本原因ではないため、Enum追従後に設計整合として実施する。

### Enum以外のBrand

Bruce全体ではSymbol方式の実体Brandに統一する方針だが、今回ACGへ実装した自動生成はEnumクラスが対象。

Application DTO等の既存Brand方式変更は今回のビルド復旧へ混ぜない。

---

## 12. 推奨修正順序

今回の調査結果から、次の順番に固定する。

```text
STEP 1  ACG：TYPE_LABEL / TYPE_MESSAGE のimportパスを修正
   ↓
STEP 2  ACGをPUSHし、Bruceを再生成
   ↓
STEP 3  再生成直後をコミット（手修正との境界を作る）
   ↓
STEP 4  Bruce手書き部の旧i18n importパスをVS Codeで一括置換
   ↓
STEP 5  npx ng build
         → module-not-found系が消えたことを確認
   ↓
STEP 6  RadioComponentを手動で設計・修正
   ↓
STEP 7  npx ng build
   ↓
STEP 8  ToggleComponentを手動で設計・修正
   ↓
STEP 9  npx ng build
   ↓
STEP 10 BRU1001：matchTypeを代表として手動修正
   ↓
STEP 11 BRU1001：returnNoDoublesPlayerA1を代表として手動修正
   ↓
STEP 12 BRU1001：matchSettingを代表として手動修正
   ↓
STEP 13 BRU1001の同種項目へ横展開
   ↓
STEP 14 BRU1002へ横展開
   ↓
STEP 15 npx ng buildして残件を再分類
   ↓
STEP 16 DI等の設計整合を確認
   ↓
STEP 17 AIフレームワーク本線 Phase 2-2「幅の責務」へ戻る
```

**ポイント：各大分類を直すごとにbuildする。**

大量にまとめて直して最後にbuildすると、どの修正で新しい問題を入れたか分からなくなるため避ける。

---

## 13. VS Codeを使う箇所 / 使わない箇所

### VS Codeで一括処理してよい

- i18n Interfaceの旧importパス置換
- 最終的に確定した名称のRename Symbol
- 同じ意味のまま参照だけ追従する変更

### VS Codeの一括置換だけで直さない

- `FormControl<string>` → Enum FormControl
- `string code` ↔ `Enum object`
- `boolean` ↔ TRUE/FALSE Enum
- nullable Enumの`null`処理
- Radio/Toggleの責務変更
- UI Form DTO ↔ Application DTO境界

これらは意味が変わるため、代表1件を理解してから横展開する。

---

## 14. 次の作業

最初に着手するのは**STEP 1：ACGのi18n Interface importパス修正**。

Bruce側のRadio/Toggle/BRU1001にはまだ手を入れない。

STEP 1〜5完了後に再度build結果を取得し、残ったエラーの件数をこの文書へ追記する。
