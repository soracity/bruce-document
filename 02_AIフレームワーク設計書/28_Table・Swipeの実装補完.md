# Table・Swipeの内部実装契約

公開契約は03章、幾何純粋関数は21章。本章が実体構造・CSS・DOM属性・イベント接続の正本。固有Inputは既存decorator、共通InputはComponentBaseのSignalを使用。Rowへ共通Inputを追加しない。内部構造の変更を、固有APIや責務の再議論にしない。

## TABLEIMPL-01 所有境界と内部メンバー

Containerはdocument単位連番ownerId:string、各Recordは同じ規則のrecordId:stringを所有。各実体table/tbody/tr/tdへdata-bruce-owner=ownerId、Recordの自分の実体/セルにはdata-bruce-record=recordId。IDは外部から受け取らず、別Containerを跨がない。

RecordはskipSelf注入の必須Container、CellはskipSelfのnearest Container/optional Record/optional Row。Cellで取得したRecord/RowのContainerがCellのnearest Containerと同一である場合だけ利用。別の場合はrecord/rowをundefinedへ落とす。色はCell raw→同一owner Record raw→Container raw→Cell既定。CSSにもownerごとの任意動的色ルールを生成しない。

Containerの内部関数はownWrapperClasses():string（padding/rounded/shadow）、ownTableClasses():string（border）、emptyCellClasses():string（色）、resolvedEmptyMessage():string、collectRecords():RecordView[]、refreshRecords():void。RecordはownFrameClasses():string（有効な非色群だけを結合し、background/text/visibleは除く）、needsPaddingFrame:boolean、onClick():void、rawDescriptor():RecordStyle、publishDescriptor():void。CellはresolvedBackground/Text:computed、cellClassesForStyle():string、resolvedRadius():RadiusPosition、isTopSticky/isLeftSticky:boolean。descriptorは次の型。

```ts
type Raw<T> = T | undefined;
type RecordStyle = {
 shadow:Raw<boolean>;shadowSize:Raw<UiShadowSize>;
 rounded:Raw<boolean>;roundedSize:Raw<UiRoundedSize>;
 border:Raw<boolean>;borderWidth:Raw<UiBorderWidth>;padding:Raw<UiPadding>;
 effectiveShadow:boolean;effectiveShadowSize:UiShadowSize;
 effectiveRounded:boolean;effectiveRoundedSize:UiRoundedSize;
 effectiveBorder:boolean;effectiveBorderWidth:UiBorderWidth;effectivePadding:UiPadding;
};
type RecordView={ownerId:string;recordId:string;body:HTMLTableSectionElement;
 grid:HTMLTableElement;frame?:HTMLDivElement;spacer?:HTMLTableSectionElement};
```

raw値と実効値は別属性として発行する。undefined属性は削除、falseは文字列false、0は文字列0。raw/effectiveのprefixはdata-record-raw-*/data-record-effective-*。末尾はshadow,shadow-size,rounded,rounded-size,border,border-width,paddingの固定7名（camelCaseをDOM名へそのまま渡さない）。shadowSizeのみ明示でもshadow群のshouldApplyを有効にし、effectiveShadowに従う。shadow未指定かつ群overrideなしの場合だけContainer.recordShadowの互換経路へ進む。Record自身のshadow=falseはrecordShadow=trueより優先。rounded/border/paddingを子Inputへ代入しない。

## TABLEIMPL-02 合法な実体構造

Container: div.app-table-layout-wrapper→table.app-table-layout[appTableCorners]→colgroup（logicalColumns個）と空tbodyまたは投影Record。wrapperにvisible/padding/rounded/shadow、tableにborderを適用。wrapperのpaddingは外側余白でありCellへコピーしない。responsive時wrapper overflow-x:auto/table min-width:max-content、通常table width:100%/table-layout:fixed。empty時tdはcolSpan=logicalColumns.length、背景はCellと同じ状態20%変換。

通常Record: gap>0のspacer tbody→data tbody.app-table-record→投影Row(tr)→Cell(th/td)。spacerはaria-hidden、td colspan=logicalColumns.length、height=recordGap、padding/border0、透明。先頭の可視Recordのspacerだけ非表示。hidden Recordのspacerも非表示。

**Recordのpaddingが有効かつeffectivePadding>0の場合**はtbodyへ効かないpadding classを付けず、同じRecordのテンプレートを次の構造へ切り替える。

```html
<tbody class="app-table-record" [attr.data-bruce-owner]="tableLayout.ownerId"
  [attr.data-bruce-record]="recordId" [class.bruce-hidden]="!effectiveVisible()"
  [attr.aria-selected]="selected ? true : null" (click)="onClick()">
  <tr class="app-table-record-frame-row" role="presentation">
    <td class="app-table-record-frame-cell" role="presentation"
      [attr.colspan]="tableLayout.logicalColumns.length">
      <div class="app-table-record-frame" data-bruce-style [class]="ownFrameClasses()">
        <table class="app-table-record-grid" role="presentation"
          [attr.data-bruce-owner]="tableLayout.ownerId" [attr.data-bruce-record]="recordId">
          <colgroup>@for (c of tableLayout.logicalColumns; track $index) { <col /> }</colgroup>
          <tbody><ng-content /></tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
```

通常構造とframe構造のng-contentを二つ置かない。投影Rowを一つのng-template #recordContentへ収め、両分岐からNgTemplateOutletで排他的に1回描画する。内部tableは別Containerではなく同じownerのgrid。inner native colSpan/rowSpan・100論理列・border-collapseを使うため、結合を手製のdiv格子へ置換しない。padding=0は通常構造とし、Record自体のpaddingなしを実現する。Inputが変わり構造が切り替わった時は旧geometry/監視を解除し、afterNextRenderで再収集する。

frame用td/trは外側の列結合のためだけでdata cellへ数えない。role=presentationのinner tableの投影tr/td/thへそれぞれrow/cell/columnheaderまたはrowheaderの既存意味を明示し、aria-rowindex/aria-colindexをContainer全Record通算で設定する。外側tableはrole=table、aria-rowcount/colcountを表示論理行・列の値にする。header cellにはowner内一意ID、data cellには該当列とrowSpanに対応するheader IDのheaders属性を発行し、別ownerのheaderを混ぜない。frameの有無でheader関連とkeyboard経路を変えない。二重tableの読み上げとsticky挙動は工程③/実機で検証し、記述だけで合格にしない。

Recordのpaddingがない場合のborder/rounded/shadowは幾何補助のRecord自身の枠・clip・影で描画。padding frameがある場合はdiv自身へ同じ固定スタイルを適用し、Recordの幾何影を重ねない。親Recordのroundedは親の描画領域をclipし、CellのroundedSize/radiusPositionそのものを変更しない。影はRecord一つにつき一経路のみ。Tableのshadowはwrapperだけ。

Rowの実体はtr.app-table-row、stickyは対応Cellのtop stickyへ渡す。Cellはng-template #contentを一つ持ち、headerによりth/tdを排他的に生成。data-bruce-owner/record、native colspan/rowspan、align/verticalAlign、data-table-radius、data-cell-radius-px、data-bruce-border-explicitを設定。rounded群が無指定なら既存radiusPosition、群が有効でeffectiveRounded=falseならNONE、trueならradiusPositionがNONEの時だけALL、それ以外は既存maskを使用する。size無指定かつoverrideなしは既存0.5rem、指定/override時はeffectiveRoundedSize。親の半径は渡さない。visibleはtd/th自身だけ。NgTemplateOutletをimportsへ加え、contentを二重描画しない。

## TABLEIMPL-03 CSSと装飾の非漏洩

グローバルCSSは以下の実体クラスに直接付ける。祖先Recordから全descendant Cellへ適用するセレクターは使わない。

```css
app-table-record,app-table-row,app-table-cell { display:contents; }
app-table-container-layout { display:block;min-width:0; }
.app-table-layout-wrapper { position:relative;isolation:isolate; }
.app-table-layout,.app-table-record-grid { border-collapse:collapse;border-spacing:0;table-layout:fixed;width:100%; }
.app-table-cell { padding:.125rem .25rem; }
.app-table-cell--left { position:sticky;left:0;z-index:10; }
.app-table-cell--top { position:sticky;top:0;z-index:20; }
.app-table-cell--left.app-table-cell--top { z-index:25; }
.app-table-cell--record-border:not([data-bruce-border-explicit]) { border:1px solid var(--color-base-300); }
.app-table-record-frame-cell { padding:0!important;border:0!important;background:transparent; }
.app-table-record-spacer > td { height:var(--app-table-record-gap,0px);padding:0!important;border:0!important;background:transparent!important; }
```

refreshRecordsは同一ownerのdata tbodyだけを表示順収集。各RecordのCellへ**構造状態**の固定class app-table-cell--selected/--zebra/--record-borderと、内部underlayを直接発行する（公開スタイルInputの継承ではない）。Cell収集はowner/record一致を条件にし、内側別Containerを除外。先頭可視spacerを隠し、可視Record index奇数だけzebra。selectedのunderlay=primary、未選択zebra=base-200、他=base-100。Cell明示/解決背景と文字を先に保ち、未指定の場合だけunderlay/text-primary-contentを使う。Cell textColor明示はselectedより優先。

stickyの無指定背景はunderlay。状態20%背景はunderlayの上に同じ20%色のlinear-gradientを重ねる。4状態×left/top用固定classで定義し、動的CSS名を作らない。通常の不透明指定色はそのまま。Record frameの背景へ同じ状態20%を重ね塗りしない。共通明示padding/borderは27章の高特異性CSS、Record一括罫線は明示のないセルだけ。unknown Enumやspan不正は03章の構成エラー。

## TABLEIMPL-04 read/write・座標・復元

private observedCells:Set、originalStyles:Map<Element,Map<property,{value,priority,lastWritten}>>、recordLayers:Map<recordId,HTMLElement>、frame?:number、destroyed=falseを所有。collectOwnedCellsはowner一致・data cell・可視のみ、nested Containerは除外。collectRecordsは通常tbodyまたはframe RecordViewで、内部gridをouterの別Recordへ二重計数しない。

MutationObserver attributeFilterはrowspan,colspan,class,style,hidden,data-table-radius,data-cell-radius-px,data-bruce-owner,data-bruce-record、およびdescriptor全14属性。属性名は上記固定型のキーから作る内部固定リストで、公開CSS文字列を解釈しない。ResizeObserverはouter table、各grid、全data cell、radiusProbe。削除要素はunobserve。scroll/resizeをrAF1件に集約し、全read→pure geometry→差分write。自分のSVG/layerへの更新は監視対象外にし、同一属性値を再設定しない。

SVGは各gridに対応するclipPath/arcを持ち、gridのrectを基準に21章tableGridOffset補正を同じgridのgroupRectsへ適用。SVG overlayのwrapper基準原点はleft=gridRect.left-wrapperRect.left-wrapper.clientLeft+wrapper.scrollLeft、topも同様。width/height/viewBoxはgrid実測寸法。clipPathUnits=userSpaceOnUseでgridだけへclip-path=url(絶対document URL#ID)を設定。tableLocal座標とwrapperLocal座標を混ぜない。

paddingなしRecordのown border/rounded/shadow layerはRecordView.bodyのrectを同じwrapper座標へ変換し描画。rounded=falseは0、明示sizeは指定px、overrideなしは既存0.5rem。shadowはraw明示/群override→effective値、どちらもなしだけContainer.recordShadow/mdへ。padding frameはdivが描くためこのlayerから除外する。Layerのpointer-events:none、Record影はtable背面、arcはz-index30。削除/非表示のRecord/gridのlayer/clipを除去する。

restoreは現値===lastWrittenの場合だけ元value/priorityへ戻す。別処理の変更を上書きしない。destroyはflag→rAF取消→全Observer/event解除→全gridのclip/style復元→自分のDOM除去→Map.clear。width0/非接続時は旧layerを非表示にして再測定を保留する。

## SWIPEIMPL-01 portal・Geometryの完全式

既存依存ElementRef、TemplateRef、ApplicationRef、DOCUMENT、DestroyRef、optional Table単位SwipeCoordinatorを使う。createEmbeddedView({close:()=>close()})→attachView→bodyへoverlay/panel→rootNodes append→detectChanges。旧viewはdetach→destroy、旧DOM remove。host/table本体を移動しない。

```ts
type Rect={left:number;top:number;right:number;bottom:number};
type Geometry={host:Rect;clip:Rect;panelWidth:number};
```

hostがdisplay:contentsなら同ownerのdata領域union（spacer除外）、通常hostは実rect。clipはhost∩viewport∩全scroll祖先client矩形∩visualViewport可視矩形。祖先client矩形はrect.left+clientLeft/top+clientTopを原点、clientWidth/Heightを寸法とする。visualViewportはoffsetLeft/offsetTop/width/height。空交差ならclose/操作不可。panelWidth=min(host.right-host.left,自然panel幅)。

overlayはfixed、left=clip.left、top=clip.top、width=clip.right-clip.left、height=clip.bottom-clip.top、overflow:hidden、pointer-events:none、z-index40。panelはabsolute、**right=clip.right-host.right、top=host.top-clip.top、height=host.bottom-host.top**、width=panelWidth。従ってpanelの右端は常にhost.rightで、overlayだけが可視領域でclipする。閉translateX(panelWidth)、開0、dragはpanelWidth-offset。幾何更新はtransition:noneでsnap、通常settleだけ180ms、reduce時none。

themeはroot/hostの全--custom-property/font/color/directionをoverlayへコピーし、コピー済みSetにない旧値を削除。host祖先class/data-theme変化、visualViewport resize/scroll、window resize、capture scroll、ResizeObserverをrAF1件へ集約。Geometry read後にまとめてwrite。

## SWIPEIMPL-02 イベント接続・排他・抑止

全登録はaddListener(target,type,handler,options)で解除関数をlisteners:Array<()=>void>へ格納。host pointerdown、document pointermove/up/cancel（capture,passive:false）、host lostpointercapture、document click（capture）、document keydown（capture）、panel click/keydownを登録。document側はactive gesture idまたは自分のopen状態に該当する時だけ処理。panel内イベントをhostの誤クリック抑止へ流さない。

pointerdownはprimary/左button/template/geometry/別gestureなしを確認。panel内部・native入力操作中は新規dragを開始しない。開始座標/startOffset/wasOpenとpreviousFocusを保存。moveで8px、方向比1.25を判定。縦はcaptureもpreventDefaultもせず終了。横はnewOffset=clamp(startOffset-dx,0,width)、newOffset>0になる**前**にclaim(this)。claim失敗なら取消/0へ戻し露出しない。成功ならcaptureを試み、cancelable時のみpreventDefault→offset反映。単独カードはclaim相当をtrueとする。

pointerupは最後の座標まで反映、閾値min(48,width/2)。閉開始はoffset-startOffset>=閾値、開開始は差>-閾値でopen。cancel/lostcaptureはwasOpenへ復元し、初期closedへ戻る場合はrelease。up後に自分でreleasePointerCaptureして届いたlostイベントはgesture終了後なので無視。Eventの二重配送はWeakSet<Event>で抑止。settleはclaimを再確認し状態確定→offset/render/inert/aria確定→状態差がある場合だけswipeOpenChange.emit。

横drag成立後のpointer clickは700ms、detail>0かつ元内容由来だけpreventDefault/stopImmediatePropagation。keyboard detail0は通す。open中の元内容tapはcloseしRecord clickへ流さない。panel内buttonのclick/Enter/Spaceは通常到達し、Escapeだけclose。panelはclosed/drag中inert=true/aria-hidden=true/pointer-events:none、静止openだけ解除。closeでfocusがpanel内なら接続済みpreviousFocusへpreventScroll復元。

SwipeCoordinator.claimはactiveを新ownerへ設定→旧close→active===ownerを返す。releaseは同一ownerの場合だけ解除。reentrantなOutputから別ownerが開いても最後の所有者を保持。destroyはflag→gesture取消→close/release→capture解除→全listener/Observer/rAF解除→view detach/destroy→DOM remove。解除は複数回呼べる。template変更は同じcleanup後に再生成。

## SWIPEIMPL-03 横scrollとの境界（P-02設計案）

responsive Containerでwrapper.scrollWidth-wrapper.clientWidth>1 CSS pxの場合、pointer Swipeを開始しない。touch-actionはpan-x pan-y pinch-zoom、capture/preventDefaultをしない。overflowがない場合/単独カードは現行pan-y pinch-zoomのSwipeを維持。ResizeObserverでoverflowを更新し、drag中にscroll優先へ変わった場合はcancelして元状態へ戻す。

既存open()/close()はどちらの状態でも有効。利用画面はCell内の既存Buttonから同じDirectiveのopen()を呼ぶ操作経路を持つ。共通側で新しい列/タップ寸法/業務ラベルを自動挿入しない。Actionsの既存英語ラベルは互換値、未承認の新i18n Inputを追加しない。P-02は原典の横scroll競合を閉じる具体案であり工程②全体の承認対象。実機で動いたとは記載しない。
