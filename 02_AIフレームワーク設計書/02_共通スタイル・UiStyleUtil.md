# 共通スタイル・UiStyleUtil・基底クラス 詳細設計

## STYLE-01 公開型と全Input

`ui-style.types.ts`に次をexportする。数値の単位はpx。任意のCSS文字列を許可する型へ拡張しない。

```ts
export type UiBorderWidth = 0 | 0.5 | 1 | 2 | 4;
export type UiRoundedSize = 0 | 4 | 8 | 16 | 24;
export type UiShadowSize = 'sm' | 'md' | 'lg';
export type UiPadding = 0 | 4 | 8 | 12 | 16 | 24 | 32;
```

全Inputを`@Directive()`の`ComponentBase`へ一度だけ宣言する。子は同名のInputを再宣言しない。`input<T>()`の未指定値はundefinedで保持する。共通の既定値はInput初期値に埋め込まず、protectedメソッドから取得する。

| Input | 型 | 共通既定値 | 実効値メソッド/Signal |
|---|---|---|---|
| border | boolean | true | effectiveBorder |
| borderWidth | UiBorderWidth | 1 | effectiveBorderWidth |
| rounded | boolean | true | effectiveRounded |
| roundedSize | UiRoundedSize | 8 | effectiveRoundedSize |
| shadow | boolean | false | effectiveShadow |
| shadowSize | UiShadowSize | md | effectiveShadowSize |
| padding | UiPadding | 8 | effectivePadding |
| backgroundColor | AppUiColorEnum | undefined | effectiveBackgroundColor |
| textColor | AppUiColorEnum | undefined | effectiveTextColor |
| visible | boolean | true | effectiveVisible |

`disabled`、`control`、Table固有の`zebra/recordGap/colSpan`、SwipeのgestureをComponentBaseへ追加しない。オブジェクト一括指定の`uiStyle` Inputも追加しない。

## STYLE-02 ComponentBaseのプロパティ・メソッド

```ts
@Directive()
export abstract class ComponentBase {
  readonly border = input<boolean>();
  readonly borderWidth = input<UiBorderWidth>();
  readonly rounded = input<boolean>();
  readonly roundedSize = input<UiRoundedSize>();
  readonly shadow = input<boolean>();
  readonly shadowSize = input<UiShadowSize>();
  readonly padding = input<UiPadding>();
  readonly backgroundColor = input<AppUiColorEnum>();
  readonly textColor = input<AppUiColorEnum>();
  readonly visible = input<boolean>();
  readonly effectiveBorder = computed(() => this.border() ?? this.getDefaultBorder());
  readonly effectiveBorderWidth = computed(() => this.borderWidth() ?? this.getDefaultBorderWidth());
  readonly effectiveRounded = computed(() => this.rounded() ?? this.getDefaultRounded());
  readonly effectiveRoundedSize = computed(() => this.roundedSize() ?? this.getDefaultRoundedSize());
  readonly effectiveShadow = computed(() => this.shadow() ?? this.getDefaultShadow());
  readonly effectiveShadowSize = computed(() => this.shadowSize() ?? this.getDefaultShadowSize());
  readonly effectivePadding = computed(() => this.padding() ?? this.getDefaultPadding());
  readonly effectiveBackgroundColor = computed(() => this.backgroundColor() ?? this.getDefaultBackgroundColor());
  readonly effectiveTextColor = computed(() => this.textColor() ?? this.getDefaultTextColor());
  readonly effectiveVisible = computed(() => this.visible() ?? this.getDefaultVisible());
}
```

上のコードに加え、下表のメソッドを全て実装する。副作用なし・引数なし。`false`や数値0を未指定と混同しないため、`||`でフォールバックしない。

| protectedメソッド | 戻り値 | 基底の戻り値 |
|---|---|---|
| getDefaultBorder | boolean | true |
| getDefaultBorderWidth | UiBorderWidth | 1 |
| getDefaultRounded | boolean | true |
| getDefaultRoundedSize | UiRoundedSize | 8 |
| getDefaultShadow | boolean | false |
| getDefaultShadowSize | UiShadowSize | md |
| getDefaultPadding | UiPadding | 8 |
| getDefaultBackgroundColor | AppUiColorEnumまたはundefined | undefined |
| getDefaultTextColor | AppUiColorEnumまたはundefined | undefined |
| getDefaultVisible | boolean | true |

基底コンストラクターからoverrideメソッドを呼び子の未初期化フィールドを参照しない。computedが評価される時点で参照する。既定値メソッドは他の可変状態に依存させない。Input変更はSignalで実効値へ反映する。FormControl値の変更検知はSTYLE-07の責務。

## STYLE-03 既定値と適用要素

共通基準値を全DOMへ無条件に追加するとDaisyUIの既存表示が変わるため、**既存内部スタイルは省略時に維持し、明示された属性群だけを共通変換で上書きする**。既存仕様で固定されている既定色・FABの影は省略時も適用する。

| 部品 | スタイル適用先 | 省略時の表示/個別既定 |
|---|---|---|
| Button | native button | btn-outline/btn-secondary。背景既定SECONDARY、文字色は既存テーマ |
| Textbox・Date | native input | 現行inputの枠線・padding。背景/文字色未指定 |
| Radio | RADIOでは各input、BUTTONでは各選択肢label | 既存の選択色・等幅。背景/文字色未指定 |
| Toggle | SLIDEではcheckbox、BUTTONではlabel | 既存toggle/btn表示。背景/文字色未指定 |
| Group | fieldset | 既存fieldset・padding・legend構造を維持 |
| Alert | alert外枠 | 既存level/背景種別が未指定色を解決 |
| FAB | native button | PRIMARY、円形、shadow=true、shadowSize=lg |
| Label | テキストviewport | 枠・影・paddingを省略時に追加しない |
| TableContainer | table/外側wrapper | 色の指定はCellへ伝播。影はwrapper自身 |
| Record | tbody/専用影レイヤー | 色はCellへ伝播。影は当該Recordのみ |
| Cell | td/th | 色は親継承、角丸なし、既存padding 0.125rem 0.25rem |
| Row | tr | 構造・上固定のみ。色継承の中継者にしない |

明示時の適用単位：border群＝borderまたはborderWidthの指定、rounded群＝roundedまたはroundedSize、shadow群＝shadowまたはshadowSize、padding群＝padding、色群＝各色の指定/継承。明示`border=false`なら幅0、`rounded=false`なら半径0、`shadow=false`なら影なし。真偽をfalseにしても他の群を消さない。

FABの円形は既存`btn-circle`を維持する。24pxを「円形の承認値」として設定しない。明示roundedSizeがある場合だけ固定半径指定を適用する。visible=falseはレイアウトボックス自体を消し、操作・フォーカス対象から外す。display:contentsのTable部品は実体のtbody/tr/tdとRecordスペーサーにも同じ非表示を反映する。

## STYLE-04 UiStyleUtilの完全契約

状態・DI・DOM参照なしのstatic Class。コンストラクターはprivate。戻り値はCSSクラス文字列。未指定色は空文字。不正値は`Error('BRUCE_STYLE_VALUE: ...')`、黙った補正なし。

| メソッド | 引数 | 戻り値の決定 |
|---|---|---|
| getBorderClass | border:boolean, width:UiBorderWidth | false→border-0、true→下表 |
| getRoundedClass | rounded:boolean, size:UiRoundedSize | false→rounded-none、true→下表 |
| getShadowClass | shadow:boolean, size:UiShadowSize | false→shadow-none、true→下表 |
| getPaddingClass | padding:UiPadding | 下表 |
| getBackgroundColorClass | color:AppUiColorEnumまたはundefined | 通常背景表、undefined→'' |
| getTextColorClass | color:AppUiColorEnumまたはundefined | 通常文字表、undefined→'' |
| getVisibleClass | visible:boolean | true→''、false→hidden |
| getTableCellStatusColorClass | color:AppUiColorEnumまたはundefined | ERROR/INFO/WARNING/SUCCESS→20%背景、他の有効色→通常背景、undefined→'' |

| 属性 | 許容値→固定クラス |
|---|---|
| 枠幅 | 0→border-0、0.5→border-[0.5px]、1→border、2→border-2、4→border-4 |
| 角丸 | 0→rounded-none、4→rounded、8→rounded-lg、16→rounded-2xl、24→rounded-3xl |
| 影 | sm→shadow-sm、md→shadow-md、lg→shadow-lg |
| padding | 0→p-0、4→p-1、8→p-2、12→p-3、16→p-4、24→p-6、32→p-8 |

| Enum | value | 背景 | 文字 | Cell背景 |
|---|---|---|---|---|
| PRIMARY | primary | bg-primary | text-primary | bg-primary |
| SECONDARY | secondary | bg-secondary | text-secondary | bg-secondary |
| ACCENT | accent | bg-accent | text-accent | bg-accent |
| NEUTRAL | neutral | bg-neutral | text-neutral | bg-neutral |
| BASE_100 | base-100 | bg-base-100 | text-base-100 | bg-base-100 |
| BASE_200 | base-200 | bg-base-200 | text-base-200 | bg-base-200 |
| BASE_300 | base-300 | bg-base-300 | text-base-300 | bg-base-300 |
| INFO | info | bg-info | text-info | bg-info/20 |
| SUCCESS | success | bg-success | text-success | bg-success/20 |
| WARNING | warning | bg-warning | text-warning | bg-warning/20 |
| ERROR | error | bg-error | text-error | bg-error/20 |

CSS名はswitchまたは固定Mapに完全なリテラルで記載する。`'bg-' + color.value`等は禁止。戻った既知のクラスを空白で結合することは許可する。Enum値にCSSクラスを格納しない。backgroundOpacityは追加しない。

## STYLE-05 CSS生成と優先順位

Tailwindの自動検出だけへ依存せず、styles.scssから読まれる共通スタイル定義に固定クラスを明記する。通常色11値×背景/文字、Cell20%4値、数値全候補、hiddenをビルド成果物で検査する。動的文字列からのsafelist生成は行わない。

SCSSで定義する場合も同じクラスを静的定義する。例：`.bg-error`の値は`var(--color-error)`、Cell用の固定クラスは`color-mix(in oklab,var(--color-error) 20%,transparent)`相当。既存Tailwindの20%混色結果と比較し一致させる。テーマ値を固定RGBへ変換しない。

DaisyUIの基底クラスは残し、明示スタイルは当該適用要素の固定セレクターで優先する。競合する同一属性のクラスを複数残し「HTML内のclass順」で解決しない。Tableの罫線・選択・stickyは03章の優先順位に従う。文字用フォントにはMaterial Symbolsを一括上書きしない。

## STYLE-06 フォントとvisible

既存styles.scssの役割別トークンを維持する。本文/table=0.8125rem、title=1.125rem、button=0.875rem、input=1rem、caption=0.75rem、行間1.4、既存の役割別font-weightを維持。これらはソース調査で確認した値であり、新しい端末最小寸法の承認ではない。幅縮小とフォント縮小を連動させない。

rootフォント100%案は旧提案。現行ソースの16px設定をこの作業で勝手に変更しない。OS文字拡大時の品質は14章で検証する。visibleをfalseにするためのフォーム値クリア、disable、Application呼出しは行わない。

## STYLE-07 FormControlComponentBase

`@Directive()`、`extends ComponentBase`。型引数Tはフォーム値専用。入力項目の初期値をこの基底で生成しない。

| メンバー | 型・可視性 | 内容 |
|---|---|---|
| control | public InputSignal<FormControl<T>またはundefined> | 親のインスタンス。必須入力部品はrequireControl()で検査 |
| changeDetectorRef | protected ChangeDetectorRef | OnPush通知 |
| destroyRef | private DestroyRef | 破棄フック |
| controlSubscription | private Subscriptionまたはundefined | 現在のcontrolのvalue/status購読 |
| requireControl() | protected、引数なし→FormControl<T> | undefinedならBRUCE_CONTROL_REQUIREDをthrow |
| bindControl(control) | private、FormControl<T>またはundefined→void | 旧購読解除、新controlのvalueChanges/statusChangesをmerge購読 |
| ngOnDestroy() | public→void | 購読解除。派生クラスがoverrideする場合superを呼ぶ |

Inputの参照が変わる場合にも追従するため、effectからbindControlを呼ぶ。control参照が同じなら再購読しない。購読の各通知でmarkForCheck。undefinedを許すのは既存Toggleのcontrol省略モードを維持するためであり、Textbox/Date/Radioは初回描画前にrequireControlで必須検査する。required inputへ切替えてToggleの既存契約を壊さない。ダミーcontrol・不要なnon-null assertionは使わない。

値更新やdisabled変更の際に基底からOutputを発火しない。値とeventKeyを同じ型パラメーターにしない。ComponentBaseにFormControlを戻さない。

## STYLE-08 異常処理・検証

型を迂回した不正値も許容表で検査する。undefinedは既定/継承、nullはスタイル未指定値として採用しない。純粋UtilにHTML/CSSはない。基底のHTMLはなく、13章・03章の実体要素へ適用する。

テスト：T-STYLE-01〜10。全数値・11色・false/0・未指定・override・Table色・影非継承・Input再接続・破棄を検査する。Angular Signal Input継承とCSS生成の実測はPhase 5で実行し、文書レビューのみで合格扱いしない。
