# 共通スタイル・UiStyleUtil設計（暫定・全件監査前）

> 承認済み事項の抽出。実装・検証は未完了。根拠：[3.1](../01_ai-document/phase3_01_共通スタイル.md)、[3.2](../01_ai-document/phase3_02_UiStyleUtil.md)、[3.3](../01_ai-document/phase3_03_ComponentBase.md)。

| ID | 現行仕様 |
|---|---|
| BRUCE-STYLE-001 | ComponentBaseに共通Signal Inputを一元定義し、子で再定義しない。FormControlComponentBase<T>はComponentBaseを継承。 |
| BRUCE-STYLE-002 | 画面明示指定を優先し、未指定時はComponent固有の既定値取得メソッドをoverrideして適用。 |
| BRUCE-STYLE-003 | 基準値：border=true、borderWidth=1px、rounded=true、roundedSize=8px、shadow=false、shadowSize=md、padding=8px、visible=true、backgroundColor/textColor=undefined。DOMに一律強制しない。 |
| BRUCE-STYLE-004 | Button背景SECONDARY、FAB背景PRIMARY・円形・影あり、Textbox/Date/Radio/Group/Alert/Toggleの背景と文字は未指定。TableCellは親指定優先・なければテーマ。 |
| BRUCE-STYLE-005 | 背景・文字色は共通AppUiColorEnumで指定。PRIMARY、SECONDARY、ACCENT、NEUTRAL、BASE_100、BASE_200、BASE_300、INFO、SUCCESS、WARNING、ERRORの11値。未指定はEnum値でなくundefined。 |
| BRUCE-STYLE-006 | 11色はそれぞれ固定のbg-primary/text-primary、bg-secondary/text-secondary、bg-accent/text-accent、bg-neutral/text-neutral、bg-base-100/text-base-100、bg-base-200/text-base-200、bg-base-300/text-base-300、bg-info/text-info、bg-success/text-success、bg-warning/text-warning、bg-error/text-errorに対応。 |
| BRUCE-STYLE-007 | UiStyleUtilは状態なしstaticメソッド。getBorderClass、getRoundedClass、getShadowClass、getPaddingClass、getBackgroundColorClass、getTextColorClass、getVisibleClass、getTableCellStatusColorClassを提供。 |
| BRUCE-STYLE-008 | CSSクラス名の動的連結は禁止。許容値ごとの固定マッピングを使用。色undefinedの変換は空文字列。 |
| BRUCE-STYLE-009 | TableCell状態背景ERROR/INFO/WARNING/SUCCESSは透明度20%相当の固定スタイル。backgroundOpacityは追加しない。 |
| BRUCE-STYLE-010 | iOS/Androidで画面サイズ、セーフエリア、タップ領域、文字あふれ、スクロール競合、キーボード、テーマ、操作一貫性を検証。タップ領域は既存承認値を変更しない。 |

## 保留・検証

既存DaisyUIの見た目を維持し、Signal Input継承、CSS抽出・テーマ切替、実際のDOM適用対象はPhase 5/7で検証する。旧単一ComponentBase+任意control案は撤回済み。重複と例外の全件監査は未完了。

## Phase 3.3 基底クラス継承・既定値解決の実装契約（2026-10-21）

根拠：[Phase 3.3](../01_ai-document/phase3_03_ComponentBase.md) の2026-10-20正式承認と追加承認、[Phase 3.1](../01_ai-document/phase3_01_共通スタイル.md) の共通基準値・Component別既定値承認。**既存議事録の旧単一基底案は撤回済み**。本節は承認済み責務と実装前の確認事項を区別する。

### 継承関係（設計承認済み）

```text
ComponentBase
├─ FormControlComponentBase<T>
│  └─ FormControlを利用するTextbox / Date / Radio等（各対象は実装時確認）
└─ FormControlを利用しないButton / TableCell / Group等（各対象は実装時確認）
```

- `ComponentBase`は共通スタイルのSignal Inputを**一度だけ宣言**する。子Componentで同名Inputを再宣言しない。
- `FormControlComponentBase<T>`は`ComponentBase`を継承し、FormControlとその変更検知の既存責務を持つ。
- FormControlを使用しないComponentにダミーFormControl Inputやインスタンスを持たせない。
- 旧議事録の`ComponentBase`単体に`control = input<FormControl>()`を置くコード例は**撤回された案**であり、実装例として採用しない。

### 既定値の解決規則（承認済み）

1. 画面からの**明示Input指定値**を優先。
2. 未指定の場合、子Componentでoverrideした`protected`既定値取得メソッドを使用。
3. 子固有のoverrideがない場合は基底の共通基準値を使用。

概念コード（**API名・型・Angular実動作を確定するコードではない**）：

```ts
abstract class ComponentBase {
  readonly roundedSize = input<UiRoundedSize>();

  protected getDefaultRoundedSize(): UiRoundedSize {
    return 8 as UiRoundedSize; // 基準値8pxの意味表現。実型・生成Enum値は要照合
  }

  protected getEffectiveRoundedSize(): UiRoundedSize {
    return this.roundedSize() ?? this.getDefaultRoundedSize();
  }
}

class ExampleCell extends ComponentBase {
  protected override getDefaultRoundedSize(): UiRoundedSize {
    return 0 as UiRoundedSize; // 角丸なしの例。実Enum型との整合は要確認
  }
}
```

上記の`??`は**未指定`undefined`と明示値の区別**を表す。特に`false`や`0`を未指定扱いしない。実装では既存のACG生成Enumの型・値を確認し、型キャストで仕様不一致を隠さない。

### 共通基準値とComponent例外

| Input | 基準既定値 | 備考 |
|---|---|---|
| border | true | Component固有の上書き可 |
| borderWidth | 1px | Enumの実型と値は生成定義書照合 |
| rounded | true | Component固有の上書き可 |
| roundedSize | 8px | FABの円形を24pxと確定しない |
| shadow | false | FABは影あり |
| shadowSize | md | FABはlgを候補とする旧記録あり、正式値は個別照合 |
| padding | 8px | 画面固有の任意CSS注入は不可 |
| backgroundColor | undefined | Button=SECONDARY、FAB=PRIMARY、その他はComponent別 |
| textColor | undefined | 未指定なら既存テーマを尊重 |
| visible | true | falseは非表示 |

共通基準値をすべてのDOMへ無条件に適用することは**承認されていない**。既存DaisyUIの見た目とComponent固有のデザインを維持する。

### 受入テスト（仕様から導いた検証観点）

| ID | 入力・状態 | 期待結果 |
|---|---|---|
| BASE-01 | 共通Inputを子Componentから利用 | 子による同名Signal Input再宣言なしで参照可能 |
| BASE-02 | roundedSize未指定、子overrideあり | 子の既定値が選択される |
| BASE-03 | roundedSize明示0、子既定8 | 明示0を優先 |
| BASE-04 | border明示false、基準true | falseを優先 |
| BASE-05 | backgroundColor未指定、Button | SECONDARYの既定色 |
| BASE-06 | backgroundColor未指定、FAB | PRIMARYの既定色 |
| BASE-07 | FormControl不要のButton等 | 不要なcontrol Inputを継承しない |
| BASE-08 | FormControl使用のTextbox等 | 既存FormControl変更検知を維持 |
| BASE-09 | iOS/Androidのテーマ切替 | 意図しない既存表示の変化なし |

**実装阻害・未決**：Angular Signal Inputの継承下での具体的な宣言・overrideの動作、既存`FormControlComponentBase<T>`の変更検知、各Componentの実際の継承対象、各Enumの実型、スタイルのDOM適用先、Component別既定値の網羅的な確認。Phase 5のソース変更・Phase 7の実機検証は未実施。
