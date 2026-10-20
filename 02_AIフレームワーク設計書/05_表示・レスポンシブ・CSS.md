# 必要幅・レスポンシブ・文字表示 詳細設計

## DISPLAY-01 必要幅の内部契約

各共通Componentが必要幅を管理する。画面向けminWidth/breakpoint Inputは追加しない。Label・Buttonの文字サイズ・タップ領域をLayoutが変更しない。

`LayoutMetricsService`はprovidedIn:root、フォーム値を持たず、WeakMap<HTMLElement,MeasureEntry>で内部通知を管理する。親から子の内部DOMへCSSを注入するサービスではない。

| API | 引数・戻り値 | 処理 |
|---|---|---|
| register | element:HTMLElement, measure:()=>number → ()=>void | 必要幅取得関数を登録。返却関数で解除 |
| requiredWidth | element:HTMLElement → numberまたはundefined | 登録関数の非負の有限値。未登録/未接続はundefined |
| invalidate | element:HTMLElement → void | 当該要素を監視するLayoutへ再計算通知 |
| watch | elements:readonly HTMLElement[], callback:()=>void → ()=>void | 要素集合の通知を購読。返却関数で解除 |

内部MeasureEntryは{measure?:()=>number,listeners:Set<()=>void>}。watchは未登録要素にもlistenersを準備できる。register時に既存measureがある場合だけ二重登録の構成エラーとし、watch用entryの存在だけではエラーにしない。register解除は自分のmeasureを除去し、watch解除は自分のcallbackだけを全要素から除去する。空entryはWeakMapから削除する。invalidateは現在のlistenersを複製して順に通知し、通知中の購読解除で反復を壊さない。破棄時に登録・購読を解除する。呼出し側へ内部Mapを公開しない。measureが負数/非有限値を返す場合は構成エラーとし、grow=1等へ隠して補正しない。

`LayoutMeasureUtil.measure(element:HTMLElement):number`は未登録の通常HTML要素の必要幅を返す。`measureContent(element, targetSelectors):number`はComponent自身が指定した内部対象を計測する。出力はborder-box幅、px。DOMなし/非表示または親の利用可能幅0の間は再計算を保留し、表示後に再測定する。空文字のLabel等で必要幅0になること自体は正常とし、0を不正値や未指定に置換しない。

## DISPLAY-02 測定手順

1. 初回描画後に実行する。現在のfont-family/font-size/font-weight/letter-spacing、border、padding、テーマCSS変数を取得する。
2. 対象の非操作・aria-hidden・inertな測定用複製を作る。ID・name・フォーカス属性を取り除き、投影先の外でdocument.bodyに接続した専用測定領域へ一時配置する。複製上でアプリイベントやフォーム接続を生成しない。
3. width:max-content、max-width:none、transform:none、animation:noneとし、現在の幅割当の影響を除く。inputのvalue/placeholder、選択された表示、アイコンを反映する。元DOMのstyleを一時変更しない。測定領域はposition:fixed、left:-100000px、top:0、visibility:hidden、pointer-events:none。display:noneやDOM未接続の複製では幅0になるため使わない。部品のhostで有効なfont/テーマcustom propertyを領域へコピーし、祖先セレクターに依存する装飾は対象自身のgetComputedStyleから反映する。複製の幅/折返し/animationだけを測定用に上書きし、元の割当済みpx幅を必要幅として循環利用しない。
4. getBoundingClientRect().widthを取得。padding/borderを二重加算しない。測定後、複製を必ずfinallyで除去する。
5. 内容・i18n文字列・フォント読込・OS文字拡大・内部スタイル変更時にinvalidateする。document.fonts.ready、ResizeObserver、MutationObserver、Signal入力の変化を通知源とする。

| Component | 自分が測る対象 |
|---|---|
| Button | native buttonの現在の文字・アイコン・既存padding/枠 |
| Label | 文字の非折返し幅。文字サイズは現在値 |
| Textbox | label、inputの既存標準幅、placeholderの必要幅の最大 |
| Date | labelとネイティブdate/datetime-local入力の実測標準幅 |
| Radio | 全選択肢の幅と内部gap。BUTTON形式の等幅なら最大選択肢幅×個数＋gap |
| Toggle | checkbox/ボタン、ラベル、アイコン、既存内部間隔 |
| Group | legendと内容の必要幅。内部Layoutの外部幅を循環参照しない |
| Alert | メッセージと内部アクションが既存内部レスポンシブ規則で成立する幅 |
| TableContainer | 既存テーブルの内部スクロール仕様を保つ。表全体のintrinsic幅を画面最小幅へ強制しない |
| FAB | 通常の横並び配分から独立した既存の固定配置。ボタン寸法を変更しない |

通常HTMLは同じ測定Helperを使う。ユーザーが作った未知Componentの内部をLayoutが推測しない。公開ホストのintrinsic幅だけをフォールバックで測る。display:contentsで独立した配置boxがない特殊な子は18章の例外対象とし、兄弟を勝手に平坦化しない。

## DISPLAY-03 LayoutRowUtilの行分割

純粋Class、HTML/CSS/DIなし。

```ts
type LayoutMetric = { element:HTMLElement; required:number; weight:number };
type LayoutRow = { items:LayoutMetric[]; widths:number[] };
// partition(items:readonly LayoutMetric[], available:number, gap:number):LayoutRow[]
```

表示順を保持したgreedy分割とする。available=A、gap=g、候補行の件数n、重み和Sに対し、gapを除く幅B=max(0,A−g×(n−1))、各割当p[i]=B×w[i]/S。各必要幅はmin(required[i],A)へ制限する。

既存行の末尾へ次要素を仮追加し、全p[i]が必要幅以上なら同じ行に残す。満たさなければ現在行を確定し、次要素から新しい行を始める。単一項目の必要幅がA超過でもその項目はAへ縮小して単独行に置く。割当でフォントや元spanを書き換えない。A=0は描画待ち、空itemsは空配列、負数/非有限の引数・weight<=0は構成エラー。

例：A=600、g=8、重み50/30/20、必要幅200/160/120。3項目なら292/175.2/116.8となり最後が不足。1行目50:30は370/222、2行目20は600。元の静的span合計100は維持し、折返し後の各行へ100を要求しない。

丸めは最終描画直前のみ。計算値は浮動小数のまま保持し、最後の項目に残差を割り当てて行幅を越えない。設計用のspan合計判定は06章の十進厳密計算を使い、px計算と区別する。

## DISPLAY-04 LayoutItemの動的処理

| メソッド | 引数・戻り値 | 順序 |
|---|---|---|
| collectItems | なし→HTMLElement[] | 投影先wrapperの直接DOM子を取得、display:none/hiddenを除外。ng-containerはDOMにない |
| schedule | なし→void | rAF未予約時のみ予約 |
| readMetrics | HTMLElement[]→LayoutMetric[] | serviceの必要幅または通常HTML測定、Directiveの重みまたは1 |
| relayout | なし→void | read→partition→前回との差を比較→write |
| applyRows | LayoutRow[]→void | 各直接子に外側幅のみ設定。内部DOMを変更しない |
| ngOnDestroy | なし→void | Observer、service購読、rAF、追加した外側幅styleを解除 |

applyRowsは各子のflexを`0 0 <計算幅>px`とし、min-width:0、box-sizing:border-box。通常の未計測初期状態では既存flex-grow/basisの配分を使用する。CSSは05章の幅を算出するだけで内部paddingやフォントへ干渉しない。

MutationObserverは投影子の追加削除・hidden変更を監視し、計算器自身が書いた幅変更で無限再計算しない。書込み値が同一なら変更しない。ResizeObserver通知→rAFで読取りをまとめてから書く。表示0件はwrapperのpadding/heightを新設しない。ItemStackの既存行間は維持し、行自体の除去が必要なら画面がLayoutItem全体へ@ifを置く。

## DISPLAY-05 文字表示APIとHTML/CSS

LabelとButtonに`textOverflowMode: InputSignal<AppCodeTextOverflowModeEnum>`、既定WRAPを定義する。別のmarqueeMode Input/Enumを作らない。EnumはACG生成し手書きしない。正式Input名は今回の実装詳細としてこの名前に統一する。

| mode | CSS/表示 |
|---|---|
| WRAP | white-space:normal、overflow-wrap:anywhere、文字全文を複数行 |
| ELLIPSIS | white-space:nowrap、overflow:hidden、text-overflow:ellipsis |
| MARQUEE_BOUNCE | viewportをclip、trackを非折返し、端で反転 |
| MARQUEE_RESTART | viewportをclip、trackを非折返し、端で先頭へ戻り再開 |

```html
<span class="bruce-text-viewport" [attr.aria-label]="resolvedText()">
  <span class="bruce-text-track" aria-hidden="true">{{ resolvedText() }}</span>
</span>
```

```css
.bruce-text-viewport { display:block; min-width:0; max-width:100%; }
.bruce-text-track { display:inline-block; }
.bruce-text-wrap { white-space:normal; overflow-wrap:anywhere; }
.bruce-text-ellipsis { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bruce-text-marquee { overflow:hidden; white-space:nowrap; }
.bruce-text-marquee .bruce-text-track { white-space:nowrap; pointer-events:none; }
```

Buttonでは外側native buttonのaria-labelに全文を置き、内部viewportをaria-hidden=trueにする。button自身をtransformしない。文字用trackのtransformだけを変える。文字レイヤーにpointer capture/click handlerを付けない。

## DISPLAY-06 TextOverflowController

Componentではない内部Class。DOMの所有者はLabel/Button。controllerは画面へ新APIを公開しない。

| API/状態 | 契約 |
|---|---|
| constructor(viewport,track) | HTMLElementを2個受領。測定Observer・メディア設定を準備 |
| update(text,mode)→void | 表示内容とmodeを受け、前Animationをcancelし再判定 |
| measure()→{viewport:number,text:number,distance:number} | D=max(0,T−V)。フォント読込後も再計測 |
| reconcile()→void | mode・D・visible・reduced-motionから停止/再開を決定 |
| cancel()→void | Animationと保留rAFを停止しtransformを既定位置へ戻す |
| destroy()→void | 全Observer/リスナー/rAF/Animationを解除 |
| animation / frame / destroyed | private、他Component間で共有しない |

D<=0ならモードがMARQUEEでも静止する。境界は実測小数pxで判定し、往復しながら超過幅が増減するループを作らない。非表示、document.hidden、reduced-motion時には動きを止める。reduced-motion時は静止した全文のアクセシブル名を維持し、WRAPまたは省略への切替方式は18章U-01で判断する。幅・文字・言語・フォント変更時は旧Animationを破棄し、新しいDで再開始する。

**未承認の動作詳細**：右方向の移動の座標解釈、速度、端の停止時間、初期表示位置は原典で未確定。これらをコードへ任意の値で埋め込まない。18章U-01に、実装可能な二案と定数・影響・推奨を記載する。選択後にこの節とテストT-TEXT-03/04/06へ反映する。それまではマーキー2方式の実装可能性監査を合格にしない。

## DISPLAY-07 受入条件

文字が収まれば動かない、幅縮小でも文字サイズを下げない、文字拡大時も内容を参照できる、省略時も全文アクセシブル、Button本体・タップ領域は仕様どおり、文字移動が押下を妨げないこと。テーブルの内部スクロールは画面全体の横はみ出しと区別する。

テスト：T-LAY-01〜12、T-TEXT-01〜08、T-DEVICE-01〜08。実機・スクリーンリーダーの結果は未実施として管理する。
