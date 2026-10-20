# 通常UI・Label・Header・TabBar 詳細設計

## UI-01 共通規約

全通常UIはOnPush。入力系はFormControlComponentBase、非入力系はComponentBaseを継承する。基底Input/型/CSS変換は02章、文字表示は05章、必要幅登録も05章を使用する。各部品の初回描画後にホストの必要幅取得関数をLayoutMetricsServiceへ登録し、破棄で解除する。

ラベルキーがあれば既存Brf9018I18nLabelPipeで解決し、なければlabelを表示する。messageは既存メッセージPipe。画面ごとのラベル型を具体Enumへ固定せず、AppI18nLabelKeyEnumIf/AppI18nMessageKeyEnumIfを受ける。既存キーを再利用し、ハードコードの多言語ラベルを増やさない。翻訳後のDOM変化は必要幅と文字あふれを再計測する。

本章で`C<T>`はFormControl<T>、`K`はAppI18nLabelKeyEnumIfを表す。`?`は未指定undefined。実装では正式な型名を使用する。

## UI-02 TextboxComponent

selector=app-textbox、extends FormControlComponentBase<Nullable<string>>。

| Input | 型/既定値 |
|---|---|
| control | C<Nullable<string>>、使用必須 |
| label / placeholder | string='' |
| labelKey / placeholderKey | K? |
| 共通スタイル | 02章の全Input |

メソッド：初回初期化でrequireControl():C<Nullable<string>>。値変更はAngularの[formControl]で行い、独自のvalueコピー・ngModel・入力Outputを追加しない。表示/placeholderはキー優先。

```html
<label class="floating-label">
  <span [textContent]="labelKey() ? (labelKey() | brf9018I18nLabel) : label()"></span>
  <input type="text" [formControl]="requireControl()"
    [placeholder]="placeholderKey() ? (placeholderKey() | brf9018I18nLabel) : placeholder()"
    class="input text-input font-input textbox-input border focus:border-neutral" />
</label>
```

CSS：host display:block/min-width:0、.textbox-input width:100%、box-sizing:border-box。内部paddingは既存DaisyUI/明示共通Inputが担当。画面のmarginやwidth用classを注入しない。

異常：control未指定はBRUCE_CONTROL_REQUIRED。FormControl.disabledをnative inputへ反映し、別disabled Inputを作らない。テスト：T-UI-01、T-FORM-01/02、T-STYLE-09。

## UI-03 DateComponent

selector=app-date、extends FormControlComponentBase<Nullable<string>>。Inputはcontrol必須、label:string=''、labelKey:K?、type:AppComponentInputTypeDateEnum=DATE、共通スタイル。DATEは暦日YYYY-MM-DD、DATE_TIME（value=datetime-local）はUTC ISOをローカル入力へ変換する用途。Enumの実在する定数/値は既存列挙型定義に従う。

| メソッド | 引数→戻り値 | 処理 |
|---|---|---|
| toInputValue | value:Nullable<string>,type→string | null/''は''。日付は暦日をそのまま、日時はUTCを端末ローカルの入力形式へ変換 |
| fromInputValue | raw:string,type→stringまたは入力異常 | 日付は暦日。日時は端末ローカルからUTC ISOへ変換 |
| onInput | event:Event→void | native validityを確認、変換成功時だけcontrolへ設定、dirty更新 |
| onBlur | なし→void | touched更新 |
| syncFromControl | なし→void | 値・status変更時に表示文字列とdisabledを更新 |

```html
<label class="floating-label">
  <span>{{ labelKey() ? (labelKey() | brf9018I18nLabel) : label() }}</span>
  <input class="input text-input font-input date-input border focus:border-neutral py-2 appearance-none"
    [type]="type().value" [value]="displayValue()" [disabled]="requireControl().disabled"
    (input)="onInput($event)" (blur)="onBlur()" />
</label>
```

UTC ISOをdatetime-localへ直接[formControl]で渡さない。表示状態displayValueはstring Signal。変換中の不完全な入力は表示状態として保持し、既存の正しいUTC値を壊さない。Component自身の`dateInput`検証エラーをFormControlへ反映し、他Validatorのerrorsを消さない。訂正時はdateInputキーのみ除去する。ACGは日付専用Validatorを生成しない。

日付はnew Date('YYYY-MM-DD')経由でタイムゾーン変換しない。日時は年月日時分秒をローカル成分へ分解し、有効な日付/時刻かを往復で検査する。無効日・DST欠落時間は入力異常。DSTの重複時刻の扱いは18章U-03で決める。表示形式はOSのネイティブ入力/ロケールに従い、yyyy/MM/ddを設計書から固定しない。

CSS：host display:block/min-width:0、input width:100%。文字サイズを幅で縮小しない。テスト：T-DATE-01〜07。DST重複処理の未決を隠して実装可能性合格にしない。

## UI-04 RadioComponent

selector=app-radio、`RadioComponent<T extends Nullable<AppComponentValueType>> extends FormControlComponentBase<T>`。Tは値、eventKeyは独立のAppComponentEventKeyType。

| Input/Output | 型/既定値 |
|---|---|
| control | C<T>必須 |
| type | AppComponentInputTypeRadioEnum=RADIO |
| groupName | string必須 |
| label | string[]? |
| labelKey | K[]? |
| values | T[]= [] |
| eventKey | AppComponentEventKeyType='' |
| radioChange | Output<AppComponentEventKeyType> |

onChange():voidは、FormControlがnative radioで更新された後、eventKeyを1回emitする。選択値をeventKeyへ置き換えない。Enum値はvalues配列へEnumインスタンスを渡し、FormControlも同じインスタンス群を保持する。`.value`のコード文字列とEnumインスタンスを混在させない。

選択肢iの表示はlabelKey[i]→label[i]→String(option)の順。ラベル配列が短い場合のフォールバックを明示し、undefinedを表示しない。groupNameは同一ラジオ群で共通、別群とは別名。@forは部品内部なのでLayoutItem直下反復禁止と混同しない。

RADIO：各input type=radio、[value]=option、[formControl]=control、同じname、aria-labelを設定。BUTTON：join flexの中に等幅label、sr-only radio、表示span。選択状態はoption===control.value、disabledはcontrol.disabled。controlの型をas string等で隠さない。

CSS：host display:block/width:100%/min-width:0。BUTTONの選択肢はflex:1/min-width:0、内部gapと折返しはRadio自身が管理する。背景・文字の明示色は02章、選択状態の既定色は現行secondary。既存のButton型radioのkeyboard不足は、native inputをフォーカス対象として維持してSpace/矢印で操作できるようにし、同じ操作でイベントを二重発火しない。

異常：control/groupName未指定は構成エラー。nullを「未選択」とするEnum群ではnullを選択肢として追加しない。テスト：T-UI-03/04、T-FORM-04、T-DEVICE-03。

## UI-05 ToggleComponent

selector=app-toggle、extends FormControlComponentBase<Nullable<AppCodeBooleanEnum>>。既存のcontrol省略モードを維持する。

| Input/Output | 型/既定値 |
|---|---|
| control | C<Nullable<AppCodeBooleanEnum>>? |
| type | AppComponentInputTypeToggleEnum?（SLIDE/BUTTON） |
| checked | boolean? |
| disabled | boolean=false |
| label / icon | string='' |
| labelKey | K? |
| eventKey | string=''（現行互換） |
| toggleChange | Output<string>（現行互換） |

isChecked():boolean=`checked() ?? (control()?.value === AppCodeBooleanEnum.TRUE)`。isDisabled():boolean=`control()?.disabled ?? disabled()`。Enum.FALSEオブジェクトをif(value)でtrue扱いしない。

onChange(event):void：isDisabledなら何もしない。event.targetがHTMLInputElementであることを検査しcheckedをbooleanで取得。controlがあればTRUE/FALSEのEnumインスタンスをsetValueしdirtyを更新。親へeventKeyを通知。controlなしでchecked指定の場合、親がOutputを受けてcheckedを更新する制御方式を維持する。勝手にboolean FormControlへ型を変えない。

SLIDEはcheckbox.toggleとラベル、BUTTONはlabel.btn内のsr-only checkbox、任意iconとlabel。native checked/disabledへ上記計算値をバインドし、blurでcontrolがあればtouched。内部CSSは既存toggle/btn-outline/btn-secondary、host display:block。controlとcheckedの両方を指定した際の既存優先順位を変更しない。type未指定は現行どおり描画なし。テスト：T-UI-05/06。

## UI-06 ButtonComponent

selector=app-button、extends ComponentBase。Inputはlabel:string=''、labelKey:K?、eventKey:string=''、textOverflowMode（05章）、共通スタイル。buttonClick:Output<string>。onClick():voidはeventKeyを通知するだけで、Applicationを呼ばない。既存にないFormControlを持たせない。

```html
<button type="button" class="btn text-button font-button btn-outline btn-secondary md:btn-md"
  [attr.aria-label]="labelKey() ? (labelKey() | brf9018I18nLabel) : label()"
  (click)="onClick()">
  <span class="bruce-text-viewport" aria-hidden="true">
    <span class="bruce-text-track">{{ labelKey() ? (labelKey() | brf9018I18nLabel) : label() }}</span>
  </span>
</button>
```

host display:block/min-width:0、button width:100%。共通スタイルはnative buttonへ適用。文字あふれのviewport/trackだけを動かし、native buttonのサイズ・padding・タップ領域をAI判断で追加・変更しない。表示方式省略はWRAP。Font/label/width変化でcontrollerを更新、破棄でdestroy。テスト：T-UI-07、T-TEXT-01〜08。

## UI-07 FabComponent

selector=app-fab、extends ComponentBase。Input ariaLabel:string必須、eventKey:string=''、buttonClick:Output<string>。onClick():voidはeventKey通知のみ。ng-contentにアイコンを投影する。FormControl不要。

HTML：div.fab→button[type=button].btn.btn-primary.btn-circle.btn-lg.shadow-lg→aria-hiddenのアイコン。ボタンaria-labelはariaLabel。既定PRIMARY、円形、影lgを維持する。

```css
:host { display:block; block-size:calc(4rem + env(safe-area-inset-bottom,0px)); }
.fab { bottom:calc(var(--app-fab-bottom-offset,4rem) + 1rem + env(safe-area-inset-bottom,0px)); right:calc(1rem + env(safe-area-inset-right,0px)); }
```

既存の4rem下部ナビ回避・末尾スクロール余白を保持する。24pxを円形半径の確定値にしない。文字/タップ寸法は既存仕様どおり。テスト：T-UI-08、T-DEVICE-02。

## UI-08 GroupComponent

selector=app-group、extends ComponentBase。Input label:string=''、labelKey:K?、withLabel:boolean=true、disabled:boolean=false、共通スタイル。Outputなし。HTMLはfieldset.fieldset→withLabel時legend→ng-content。CSSは既存p-2/rounded-lg/border/ap-grid-border-color、host display:block。

disabledは**現行のopacity-50による外観のみ**を維持する。子controlを一括disableしたと誤認しない。子操作の無効化は画面が各FormControlで行う。fieldsetのnative disabledやinertへ変更する場合は振る舞い変更なので別承認が必要。legendの内部余白はGroup自身の責務。テスト：T-UI-09、T-STYLE-03。

## UI-09 AlertComponent

selector=app-alert、extends ComponentBase。公開契約は既存型を維持する。

| Input | 型/既定値 |
|---|---|
| alertLevel | AppComponentInputTypeAlertLevelEnum=INFO |
| alertBgColor | AppComponentInputTypeAlertBgColorEnum=NORMAL |
| alertButtonType | AppComponentInputTypeAlertButtonMsgTypeEnum=OK_ONLY |
| alertButtonColor | AppComponentInputTypeAlertButtonTypeEnum=NORMAL |
| message | string='' |
| messageKey | AppI18nMessageKeyEnumIf? |
| buttonClick | Output<string> |

onClick(buttonKey:'OK'または'CANCEL'):voidは既存文字列をemitする。HTMLはrole=alert、アイコン、キー優先メッセージ、OK、OK_CANCEL時だけCANCEL。内部はalert-vertical/md:alert-horizontal、アクションgap-2、各ボタンflex-1/min-w-0の既存配置を保持する。

levelの固定対応：INFO→alert-info、SUCCESS→alert-success、WARNING→alert-warning、ERROR→alert-error。bg=SOFT→alert-soft、NORMAL→追加なし。buttonColorは既存定義どおりNORMAL→追加なし、SOFT→alert-soft、OUTLINE→btn-outlineの固定対応とする。DASH値を新設しない。Enumオブジェクトを文字列連結してclass化せず、.valueまたは固定Mapから解決する。汎用backgroundColor/textColorの明示指定はこれらの既定色より優先し、未指定時は既存表示を維持する。

Alertから保存や画面遷移を実行しない。テスト：T-UI-10/11、T-STYLE-05。

## UI-10 LabelComponent

selector=app-label、extends ComponentBase。Input label:string=''、labelKey:K?、textOverflowMode=WRAP、共通スタイル。Outputなし。内部HTML/CSSは05章のviewport/track。文字全文はアクセシブル名へ提供する。初回描画後にTextOverflowControllerを作成し、文字/モード/実幅変化をupdate、破棄時destroy。FormControl不要。新しい別マーキーEnumは作らない。テスト：T-TEXT-01〜08。

## UI-11 Header・TabBarのCSS注入廃止

Headerのtitle:string=''、backUrl:string?とnavigateBack():voidを維持する。navigateBackはbackUrlがある場合のみRouter.navigate([backUrl],{replaceUrl:true})。classContainer Inputを廃止し、header内部へ**固定**`navbar bg-base-300 shadow-sm h-[4rem] shrink-0`を移す。hostにもheight:4rem/flex-shrink:0を設定し、AppLayoutのflex子として実際の高さを保持する。

TabBarのclassTabBar Inputを廃止。nav内部へ**固定**`bg-base-300 h-[4rem] shrink-0 flex items-center justify-around`を移す。hostもheight:4rem/flex-shrink:0。既存の各routerLink/Activeとボタン表示を維持する。通常UI共通スタイルInputの追加をCSS注入廃止の条件にしない。

AppLayout側の二つのclass入力だけを削除する。Header/TabBarの高さ・色・配置、Header表示条件、TabBar表示条件、route dataのtitle/back情報を変えない。外側AppLayoutの独自flexはアプリ全体Containerの責務であり、画面独自レイアウト禁止を理由に削除しない。

mainは既存flex-1/min-h-0/overflowを維持する。外周paddingを管理する場所はこの上位Containerとし、今回未承認の16px等を追加せず既存値を維持する。safe-areaを二重加算しない。テスト：T-UI-12/13、T-MIG-01〜04。

## UI-12 異常処理と後片付け

構成エラーは明示Error、入力異常はFormControl errors、Application異常は画面へ委譲する。全部品でdestroy後のobserver callbackがDOMへ書かない。ComponentテストにHTML/CSSの実体・イベント・値・disabled・ARIA・幅を含め、createできるだけのテストを合格根拠にしない。
