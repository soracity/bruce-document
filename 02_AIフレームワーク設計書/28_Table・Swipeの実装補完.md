# Table・Swipeの実装補完

03章の全公開API、21章の幾何計算に対する実装本文。公開Inputを増やさず、固有Inputは既存decorator形式、共通InputはComponentBaseのSignal形式に統一して記述する。固有InputをSignalへ移行する場合は当該テンプレート一式も同時に変更する。

## TABLEIMPL-01 Componentごとの内部メンバー

| 対象／メンバー | 可視性・型・処理 |
|---|---|
| Container.logicalColumns | public getter unknown[]。Number(columns)が有限かつfloor後1以上ならその長さ、他は100。columns変更時のみ配列再生成 |
| Container.resolvedEmptyMessage() | public→string。emptyMessageKey指定なら既存メッセージi18n、それ以外はemptyMessage |
| Container.ownStyleClasses() | public→string。ComponentBaseのstyleClassesのうち背景／文字を除く。色はCellへ伝播し、tableへ二重塗りしない |
| Record.tableLayout | public readonly、祖先Containerをinject。存在しなければ構成エラー |
| Record.ownStyleClasses() | public→string。背景／文字／shadowを除く。色はCellへ、shadowは幾何補助レイヤーへ渡す |
| Record.onClick() | public→void。clickableならrecordClick.emit()。画面の選択処理を自動実行しない |
| Row | sticky:booleanのみ。共通基底・色Inputを新設しない |
| Cell.record／tableLayout／row | private optional ancestor参照。探索は最も近いContainer境界内に限定 |
| Cell.resolvedBackground／resolvedText | ComputedSignal<AppUiColorEnumまたはundefined>。各明示InputをCell→Record→Table→Cell既定の順で解決 |
| Cell.isTopSticky／isLeftSticky | public getter boolean。祖先Row.sticky／自身sticky |
| Cell.resolvedRadius() | public→RadiusPosition。明示rounded=falseならnone、それ以外はradiusPosition.value |
| Cell.cellClassesForStyle() | public→string。共通の限定スタイル計算のみ。旧cellClasses／host.className転送とは別責務 |
| Cell.ngOnChanges() | colSpan／rowSpanの正整数とEnum実体を検査。BRUCE_TABLE_SPANまたはBRUCE_STYLE_VALUE |

Signalの親色をcomputedから読む。decorator固有InputはngOnChangesで変更を検知し、ChangeDetectorRef.markForCheckと幾何再計算のscheduleへ通知する。TableCornersDirectiveはMutationObserverでも装飾属性更新を検出する。色だけ変えて同じclassを再書込みし続けない。

## TABLEIMPL-02 実体HTML

Containerは03章TABLE-05に、wrapperのvisibleと限定スタイルを加えた次の形とする。Header/TabBar以外の画面向けclass入力を新設しない。

```html
<div class="app-table-layout-wrapper" [class.overflow-x-auto]="responsive"
  [class.bruce-hidden]="!effectiveVisible()" data-bruce-style [class]="ownWrapperClasses()">
  <table class="table table-fixed w-full app-table-layout" appTableCorners
    data-bruce-style [class]="ownTableClasses()"
    [class.app-table-layout--zebra]="zebra" [class.min-w-max]="responsive"
    [class.app-table-layout--record-shadow]="recordShadow"
    [style.--app-table-record-gap.px]="recordGap">
    <colgroup>@for (column of logicalColumns; track $index) { <col /> }</colgroup>
    @if (empty) {
      <tbody class="app-table-empty"><tr>
        <td class="app-table-cell" [attr.colspan]="logicalColumns.length"
          data-bruce-style [class]="emptyCellClasses()">{{ resolvedEmptyMessage() }}</td>
      </tr></tbody>
    } @else { <ng-content /> }
  </table>
</div>
```

ownWrapperClasses():stringはContainer自身のrounded／shadowのみ、ownTableClasses():stringはborder／paddingのみ。ownStyleClassesをこの二つに分ける。Container背景／文字はemptyCellClasses()または各Cellでのみ適用。空表示tdの状態背景もCellと同じ20%変換、文字は通常変換。empty=trueで投影データのDOMがAngularの投影制約により生成されても、データを表示する投影口は一つだけとし、幾何処理は可視の実体だけを収集する。

Record：

```html
@if (tableLayout.recordGap > 0) {
  <tbody class="app-table-record-spacer-group" aria-hidden="true"
    [class.bruce-hidden]="!effectiveVisible()">
    <tr class="app-table-record-spacer"><td [attr.colspan]="tableLayout.logicalColumns.length"></td></tr>
  </tbody>
}
<tbody class="app-table-record" data-bruce-style [class]="ownStyleClasses()"
  [class.bruce-hidden]="!effectiveVisible()" [class.cursor-pointer]="clickable"
  [class.app-table-record--selected]="selected"
  [class.app-table-record--cell-border]="cellBorder"
  [attr.aria-selected]="selected ? true : null" (click)="onClick()">
  <ng-content />
</tbody>
```

Recordには幾何描画用に`data-record-shadow`（true/false/未指定）、`data-record-shadow-size`、`data-record-rounded`、`data-record-rounded-size`を実効値から設定する。これらはDOM内部属性であり公開Inputの追加ではない。roundedSize未指定ではセルCSS変数を削除して既存測定半径へ戻し、明示0は0pxとして保持する。shadowのundefinedをtrue/falseへ潰す前に記録し、recordShadowの互換フォールバックと区別する。自分のスペーサーはRecordと一緒に表示を切り替える。Cell一つの非表示ではスペーサーを消さない。

Row：

```html
<tr class="app-table-row" [class.app-table-row--sticky]="sticky"><ng-content /></tr>
```

Cellは同じcontent TemplateRefをth／tdへ投影する。`content`を2回同時描画しない。

```html
<ng-template #content><ng-content /></ng-template>
@if (header) {
  <th class="app-table-cell font-semibold" data-bruce-style [class]="cellClassesForStyle()"
    [class.app-table-cell--left]="isLeftSticky" [class.app-table-cell--top]="isTopSticky"
    [class.bruce-hidden]="!effectiveVisible()"
    [attr.colspan]="colSpan" [attr.rowspan]="rowSpan"
    [style.text-align]="align.value" [style.vertical-align]="verticalAlign.value"
    [attr.data-table-radius]="resolvedRadius()"
    [attr.data-bruce-border-explicit]="borderExplicit ? 'true' : null"
    [style.--bruce-cell-radius.px]="roundedSize() === undefined ? null : effectiveRoundedSize()">
    <ng-container [ngTemplateOutlet]="content" />
  </th>
} @else {
  <td class="app-table-cell" data-bruce-style [class]="cellClassesForStyle()"
    [class.app-table-cell--left]="isLeftSticky" [class.app-table-cell--top]="isTopSticky"
    [class.bruce-hidden]="!effectiveVisible()"
    [attr.colspan]="colSpan" [attr.rowspan]="rowSpan"
    [style.text-align]="align.value" [style.vertical-align]="verticalAlign.value"
    [attr.data-table-radius]="resolvedRadius()"
    [attr.data-bruce-border-explicit]="borderExplicit ? 'true' : null"
    [style.--bruce-cell-radius.px]="roundedSize() === undefined ? null : effectiveRoundedSize()">
    <ng-container [ngTemplateOutlet]="content" />
  </td>
}
```

ngTemplateOutletを使うComponentのimportsへNgTemplateOutletを加える。03章のInput名cellClasses廃止は、任意CSS転送の廃止を意味する。ここでのcellClassesForStyleは固定値変換結果だけで、ElementRef.classNameを読まない。

## TABLEIMPL-03 CSSと優先順位の実現

```css
app-table-record, app-table-row, app-table-cell { display:contents; }
app-table-container-layout { display:block; min-width:0; }
app-table-container-layout .app-table-layout-wrapper { position:relative; isolation:isolate; }
app-table-container-layout .app-table-layout { border-collapse:collapse; border-spacing:0; }
app-table-container-layout .app-table-cell { padding:0.125rem 0.25rem; }
app-table-container-layout .app-table-record--selected {
  --bruce-record-underlay:var(--color-primary);
  background-color:var(--color-primary); color:var(--color-primary-content);
}
app-table-container-layout .app-table-cell--left { position:sticky; left:0; z-index:10; }
app-table-container-layout .app-table-cell--top { position:sticky; top:0; z-index:20; }
app-table-container-layout .app-table-cell--left.app-table-cell--top { z-index:25; }
app-table-container-layout .app-table-record--cell-border .app-table-cell:not([data-bruce-border-explicit]) {
  border:1px solid var(--color-base-300);
}
app-table-container-layout .app-table-record-spacer > td {
  height:var(--app-table-record-gap,0px); padding:0!important; border:0!important; background:transparent!important;
}
```

zebraはDOMのtbody nth-childでは判定しない。スペーサーやcolgroupが数えられるため、Container内の可視データRecordを表示順に収集し、index奇数のRecordに固定クラス`app-table-record--zebra`を付ける。ネストした別ContainerのRecordは除外する。未選択zebraの下地をbase-200、通常をbase-100にする。selectedの限定セレクターをzebraより後に置く。hoverによる既存base-200は選択色を消さない。先頭の**表示Record**に対応するスペーサーは非表示にし、hidden Recordによって余計な先頭gapを作らない。これらは構造・非表示処理の具体化であり、色継承対象の追加ではない。

border明示クラスは27章のlayer外限定CSS、Recordの一括罫線は明示属性のないセルのみ。Cellの明示paddingクラスは上記既定paddingより優先する特異性で定義する。roundedは実効data-table-radiusとセル半径を幾何計算へ渡し、collapsed borderへborder-radiusだけを設定して済ませない。

stickyの背景：通常色指定がある場合はその不透明なbg-*を維持。追加色なしの場合は`background-color:var(--bruce-record-underlay,var(--color-base-100))`。20%状態色の場合は同じ下地をbackground-colorへ設定し、状態色20%のlinear-gradientをbackground-imageへ設定する。4状態×top／leftのセレクターを固定記述し、Cellの色指定をbase-100で消さない。通常セルの20%は従来どおり透過背景。textColor明示はselectedの継承文字より優先する。

## TABLEIMPL-04 幾何描画のread／writeと影

TableCornersDirectiveは一つのtableに一つ。03章の状態に、private originalClipPath:string、private generatedClipPath:string、private recordLayers:Map<HTMLTableSectionElement,HTMLElement>、private uniqueId:stringを加える。IDはdocument単位の増分番号で発行し、view再生成でも別IDを使う。

initializeでoriginalClipPathを退避し、wrapper直下にSVG（clipPathと弧）・shadowLayer・radiusProbeを作る。SVGのwidth／height／viewBoxは現在tableの実測寸法。clipPathUnitsはuserSpaceOnUse、clip-rule=evenodd。arcsは21章のstrokeWidthごとにpathを一つ作る。pathへfill=none／stroke=var(--color-base-300)／pointer-events=noneを設定。

updateの順序は、(1)対象tableに直接属する可視tbodyと可視td/thを収集、(2)全getBoundingClientRect／computedStyleを読み終える、(3)21章のtableGridOffset→tableCornerGeometry、(4)差のあるpath／位置／clipだけwrite。Recordの選択／zebra／Cellの実効border-widthと--bruce-cell-radiusもread段階で解決。data-table-radius=noneまたはrounded=falseなら半径0。書込みで再発火したObserverは値同一なら再書込みしない。

影を必要とするRecordは、Record.shadow明示→Container.recordShadowの順で判定する。RecordのshadowSize明示またはRecord既定mdを使用する。recordShadowだけがtrueの互換経路は従来shadow-md／rounded-lg。Record.rounded=falseなら四角、roundedSize明示なら指定px、それ以外は既存0.5rem。Cellへ影をコピーしない。

shadowLayerはwrapperのabsolute子、pointer-events:none、tableより背面。Record矩形から`left=rect.left-wrapperRect.left+wrapper.scrollLeft`、topも同様、width／heightを設定。Record一つにつき一要素。削除／非表示Recordの古い要素はremoveしてMapから除去。Table共通shadowはwrapper自身で描画するため、この処理でRecordへ伝播しない。

scroll／resize／ResizeObserver／MutationObserverはscheduleでrAF一つへ集約。ngOnDestroyはフラグ→cancelAnimationFrame→全Observer.disconnect→全イベント解除→自身のDOM除去。clip-pathが自分のgeneratedClipPathのままの場合だけoriginalClipPathへ戻す。別処理が変更した値を無条件に上書きしない。

## SWIPEIMPL-01 Portal生成・位置計測の全手順

SwipeDirectiveの依存はElementRef<HTMLElement>、TemplateRef Input、ApplicationRef、DOCUMENT、DestroyRef、optional SwipeCoordinator。TemplateRef.createEmbeddedView({close:()=>close()})→ApplicationRef.attachView(view)→bodyへoverlay／panelを生成→view.rootNodesをpanelへappend→view.detectChanges。旧viewはdetachView→destroy、旧overlayをremoveする。元tableのtbody／tr／tdのDOMを移動しない。

overlayはposition:fixed／overflow:hidden／pointer-events:none／z-index:40。panelはabsolute／right:0／top:0／height:100%／display:flex。背景・枠・影はパネル内部の既存固定styleのみ。gesture判定をComponentBaseに入れない。閉状態のpanelはtranslateX(width)、開状態はtranslateX(0)、drag中はtranslateX(width-offset)。動かすのはpanelで、元のButtonやTable全体をtransformしない。

measureGeometry():Geometryまたはundefinedはhost実体rectを取得。display:contentsの場合は所有hostの可視データ子のrect union（スペーサー除外）。viewportの{left:0,top:0,right:innerWidth,bottom:innerHeight}と各scroll祖先のclient矩形の共通領域を求める。visualViewportがあればoffsetLeft／offsetTop／width／heightの可視矩形も交差する。交差幅／高さ0ならcloseし操作不可。panel自然幅を一度readしmin(host幅,panel幅)を採用。overlayのclip矩形は共通領域、panelのright位置はhost右端から共通領域右端の差で補正する。

Geometry型は`{host:{left,top,right,bottom},clip:{left,top,right,bottom},panelWidth:number}`。updateGeometry():voidは前回との差だけ書き、geometry変更中のtransitionを一時noneにする。resize／scrollによるpanelの位置変更で180msの追従遅れを作らない。root／hostの全`--*` custom properties、font、color、directionをoverlayへコピーし、テーマ属性class/data-themeの変化で再コピーする。コピーしなくなった旧custom propertyは削除する。

## SWIPEIMPL-02 Pointer・通知・解除

03章のgesture状態と閾値を使う。private listeners:Array<()=>void>、private previousFocus:HTMLElementまたはundefined、private suppressClickUntil:number=0、private animationFrame:numberまたはundefinedを所有する。

pointerdownはprimary pointer／左button／templateあり／有効Geometry／他gestureなしで開始。inputなど本来操作可能な対象を勝手にdisabledにしない。座標・開始offset・wasOpenを保存する。moveで8px以上かつ方向比1.25を超えたときだけaxisを確定。縦なら元状態へ戻してgesture終了、preventDefault／captureを行わない。

横のoffset=clamp(startOffset-dx,0,width)。pointerupも最後の座標でoffsetを更新し、delta=offset-startOffset、t=min(48,width/2)として、閉開始はdelta>=tでopen、開開始はdelta>-tでopen維持。cancelはwasOpenへ戻す。captureが失敗してもdocumentのpointermove/up/cancelで同じgesture idを追跡。二重に同じイベントを処理しないため処理済みEventをWeakSetへ記録する。

横drag終了時にsuppressClickUntil=performance.now()+700。capture clickのdetail>0かつ期限内ならpreventDefault／stopImmediatePropagation。detail=0のkeyboard clickは通す。開状態で元内容をtapした場合はcloseしてRecordのクリックへ進めない。closed状態の通常tapは止めない。panel内部のアクションclickは元内容の誤クリック抑止と分離する。

settle(open)は、開く場合coordinator.claim(this)に失敗したら閉状態へ戻す。状態が変化した場合にだけswipeOpenChangeをemit。通知前にopened／offset／inert／aria-hiddenを確定し、通知から別ownerがopenする再入でもcoordinator.activeを壊さない。閉じたpanel内にfocusがあった場合だけ、接続済みpreviousFocusへfocus({preventScroll:true})を行う。Escapeはopen時だけclose。gesture中やclosedはpanelをinert／aria-hidden／pointer-events:none、静止openだけ解除する。

`prefers-reduced-motion:reduce`は既存の180ms transitionをnoneにする。TemplateRef変更時はgesture取消→close→旧viewとDOM破棄→新view生成。ngOnDestroyはdestroyed=true→close/release→pointer capture解放→全イベント解除→Observer.disconnect→rAF取消→view detach/destroy→DOM除去。破棄後callbackは何もしない。

横scrollとSwipeの優先規則はU-02の選択待ちであり、この手順だけで両方の競合が解消済みと扱わない。SwipeのActionsラベル多言語APIも原典の検討事項として残し、英語固定値の互換実装を勝手な新規公開Inputへ変更しない。

## 検証

T-TABLE-15：先頭Recordを非表示にし次の可視Record先頭に余計なgapが出ないこと。T-SWIPE-13：同じPointerEventがhost／document両方へ届いても移動・通知は1回。T-TABLE-16：自身のclip-path設定後に別処理が変更した値を、破棄時に上書きしない。既存のT-TABLE-01〜14／T-SWIPE-01〜12と合わせて実行する。今回、実ブラウザーでこれらの操作試験は行っていない。
