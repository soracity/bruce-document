# 実装単独性の補足：Table幾何計算・互換HTML

## GEOM-01 正確な入出力

03章TABLE-06を次の契約で具体化する。ブラウザーが解決済みのセル結合矩形を入力し、DOM順から結合を推測しない。これは既存の角丸アルゴリズムを任意の承認済み罫線幅へ拡張する実装詳細。新しい画面Inputではない。

```ts
type RadiusPosition = 'none'|'top-left'|'top-right'|'bottom-left'|'bottom-right'|'left'|'right'|'all';
type TableCornerCell = {
  x:number; y:number; width:number; height:number;
  radiusPosition:RadiusPosition;
  borderWidth:0|0.5|1|2|4;
  radius?:number;
};
type CornerGeometry = {
  clip:string;
  arcs:Array<{strokeWidth:number;path:string}>;
};
// tableCornerGeometry(width:number,height:number,
//   cells:readonly TableCornerCell[],requestedRadius:number):CornerGeometry
```

x/yはtable描画座標。borderWidthはCell明示値とRecord一括罫線の優先順位を解決済みの値。radiusはCell別の指定がある時だけ渡す。rounded=falseはradius=0、NONEも角丸なし。requestedRadiusはtable内の既存CSS変数の測定値。負の座標はスクロールによりあり得るため許可する。寸法/半径/罫線の負数・非有限値、未知positionは構成エラー。

## GEOM-02 純粋計算の基準実装

以下はJavaScript表記。実装時は上記TS型を付ける。DOM/APIへの依存なし。

```js
export function tableCornerGeometry(width, height, cells, requestedRadius) {
  const finiteNonNegative = n => Number.isFinite(n) && n >= 0;
  if (![width,height,requestedRadius].every(finiteNonNegative)) throw Error('BRUCE_TABLE_GEOMETRY');
  let clip = `M0 0H${width}V${height}H0Z`;
  const arcsByWidth = new Map();
  for (const cell of cells) {
    if (![cell.x,cell.y].every(Number.isFinite) || ![cell.width,cell.height,cell.borderWidth].every(finiteNonNegative)) throw Error('BRUCE_TABLE_GEOMETRY');
    if (!['none','top-left','top-right','bottom-left','bottom-right','left','right','all'].includes(cell.radiusPosition)) throw Error('BRUCE_TABLE_RADIUS');
    const desired = cell.radius ?? requestedRadius;
    if (!finiteNonNegative(desired)) throw Error('BRUCE_TABLE_RADIUS');
    const r = Math.min(desired, cell.width/2, cell.height/2);
    if (r === 0 || cell.radiusPosition === 'none') continue;
    const corners = [
      ['top-left','left',cell.x,cell.y,1,1],
      ['top-right','right',cell.x+cell.width,cell.y,-1,1],
      ['bottom-left','left',cell.x,cell.y+cell.height,1,-1],
      ['bottom-right','right',cell.x+cell.width,cell.y+cell.height,-1,-1],
    ];
    for (const [position,side,x,y,sx,sy] of corners) {
      if (![position,side,'all'].includes(cell.radiusPosition)) continue;
      const sweep = sx*sy === 1 ? 0 : 1;
      const half = cell.borderWidth/2, inner = Math.max(0,r-half);
      clip += `M${x-sx*half} ${y-sy*half}`+
        `L${x+sx*r} ${y-sy*half}`+
        `L${x+sx*r} ${y+sy*half}`+
        `A${inner} ${inner} 0 0 ${sweep} ${x+sx*half} ${y+sy*r}`+
        `L${x-sx*half} ${y+sy*r}Z`;
      if (cell.borderWidth > 0) {
        const path = `M${x+sx*r} ${y}A${r} ${r} 0 0 ${sweep} ${x} ${y+sy*r}`;
        arcsByWidth.set(cell.borderWidth,(arcsByWidth.get(cell.borderWidth) ?? '')+path);
      }
    }
  }
  return {clip,arcs:[...arcsByWidth].map(([strokeWidth,path])=>({strokeWidth,path}))};
}
```

clip用pathはfill-rule/clip-rule=evenodd、各arc pathはfill=none・stroke=currentColor・stroke-width=strokeWidth。幅ごとのpathを同一stroke-widthのSVG pathにまとめる。罫線色は既存base-300のCSS変数を使い、opacityを新設しない。角丸の非表示背景パッチを描かない。

ネイティブの四角い罫線をclipの内側まで取り除き、兄弟SVGのarcで欠けた帯を描く。単にtdのborder-radiusを付ける方法ではcollapsed border/結合セルの旧機能を再現できないため採用しない。

## GEOM-03 Directiveからの呼出し

1. visibleなtd/thのgetBoundingClientRectとtable/各tbody矩形を一括readする。
2. tableGridOffsetでグリッド中心とtable border-boxの差を求める。x=cellRect.x−tableRect.x+offset.x、yも同様。
3. data-table-radius、実効borderWidth、実効roundedSizeを読む。display:noneセルは対象外。half幅等の上限制御はpure関数で行う。
4. tableCornerGeometryを1回呼ぶ。生成されたclipと幅別arcsをSVGへwriteする。
5. 角丸対象なしならtable.style.clipPathを空にし、不要pathを除去する。対象ありなら同一document絶対URL#一意clipIDへ設定する。
6. セル/Record追加削除・サイズ・scroll・テーマ変更はrAFへまとめる。破棄時には生成した全path/SVG/影/測定probeを除去し、追加したclip-pathだけを戻す。

戻り値arcsは旧stringから幅別配列へ変更する。Directive側も同時に切り替え、旧string前提のjoinや1px固定strokeを残さない。影レイヤーは別であり、このpure関数でRecord影まで計算しない。

## HTML-01 Headerの完全な構造

```html
<header class="navbar bg-base-300 shadow-sm h-[4rem] shrink-0">
  @if (backUrl) {
    <button type="button" class="flex-none" (click)="navigateBack()">&lt;戻る</button>
  } @else { <div></div> }
  <div class="flex-1"><a class="btn btn-ghost text-title font-title">{{ title }}</a></div>
  <div class="flex-none">
    <button type="button" class="btn btn-square btn-ghost" aria-label="メニュー">
      <svg viewBox="0 0 24 24" fill="none" class="inline-block h-5 w-5 stroke-current" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
      </svg>
    </button>
  </div>
</header>
```

selector=app-header、OnPush、host role=banner。title/backUrlは既存@Inputを維持し、勝手にSignalへ半分だけ切り替えない。constructorはRouterを受ける。navigateBackはbackUrl未指定ならreturn、指定ありならRouter.navigate([backUrl],{replaceUrl:true})。未実装のメニュー業務処理を新設しない。戻るdivをbuttonへするのは同じ動作をkeyboardからも起動できるための内部実装。追加の寸法/paddingは設けない。

host CSSはdisplay:block; height:4rem; flex-shrink:0。内部headerは上記固定class。旧classContainer Input/呼出しは削除。日本語表示は既存互換値であり新たな多言語キー体系をこの変更だけで発明しない。既存ラベルキーへ移せる場合は13章UI-01を使う。

## HTML-02 TabBarの全リンク

selector=app-tab-bar、OnPush、imports=[RouterLink,RouterLinkActive]、host role=navigation/aria-label=メインタブ。外側nav classはbg-base-300 h-[4rem] shrink-0 flex items-center justify-around、各buttonはtype=button・flex-1 h-full flex flex-col items-center justify-center gap-1 text-base-content/70。routerLinkActiveは全てtext-primary font-semibold。アイコンspanはmaterial-symbols-outlined leading-none、aria-hidden=true。表示spanはtext-caption。内容は下表を順序通り固定する。

| routerLink | icon | 表示 | aria-label追加 | exact |
|---|---|---|---|---|
| /home | home | ホーム | なし | true |
| /bru1002 | edit | 試合一覧 | なし | false |
| /component-test | inbox | コンポーネントテスト | なし | false |
| /settings | settings | 設定 | 設定 | false |
| /system-log | history | システムログ | システムログ | false |

これは現在アプリの既存ナビ互換仕様であり、共通基盤の全利用者にテニスrouteを要求するものではない。今回の改修ではナビ設定API/routeを新設しない。host CSSはHeaderと同じ4rem/flex-shrink:0。classTabBarのInputとAppLayout呼出しだけを除去する。

## 検証

今回、上記pure計算をNodeで実行し28検査を通過した。空セル、左上1pxの完全path、0/0.5/1/2/4pxと全4隅、半径上限、NONE/0半径、幅別arc分離、不正引数を確認した。ブラウザーのSVG描画/スクロール/結合/実機試験は未実施。14章T-TABLE-10〜14とT-UI-12/13で実装時に確認する。

### 28検査の再現コード

GEOM-02のJSをtable-geometry.mjsへ保存し、以下を同じディレクトリのtest-geometry.mjsとしてNodeで実行する。これは純粋関数のテストでありSVGの実描画試験ではない。

```js
import assert from 'node:assert/strict';
import {tableCornerGeometry as f} from './table-geometry.mjs';
let checks=0;
const check=(v,expected)=>{assert.deepEqual(v,expected);checks++};
const cell={x:0,y:0,width:100,height:40,borderWidth:1,radiusPosition:'top-left'};
check(f(100,40,[],8),{clip:'M0 0H100V40H0Z',arcs:[]});
check(f(100,40,[cell],8),{clip:'M0 0H100V40H0ZM-0.5 -0.5L8 -0.5L8 0.5A7.5 7.5 0 0 0 0.5 8L-0.5 8Z',arcs:[{strokeWidth:1,path:'M8 0A8 8 0 0 0 0 8'}]});
for(const borderWidth of [0,0.5,1,2,4]) {
 const r=f(100,40,[{...cell,borderWidth,radiusPosition:'all'}],100);
 check(r.arcs.length,borderWidth===0?0:1);
 check((r.clip.match(/A/g)||[]).length,4);
 assert(!/NaN|Infinity/.test(r.clip));checks++;
 if(borderWidth>0){check((r.arcs[0].path.match(/A20 20/g)||[]).length,4);}
}
check(f(100,40,[{...cell,radiusPosition:'none'}],8).arcs,[]);
check(f(100,40,[{...cell,radius:0}],8).clip,'M0 0H100V40H0Z');
check(f(100,40,[{...cell,borderWidth:0.5},{...cell,x:50,borderWidth:4}],8).arcs.map(v=>v.strokeWidth),[0.5,4]);
for(const patch of [{width:-1},{borderWidth:NaN},{radiusPosition:'bad'},{radius:-1}]){assert.throws(()=>f(100,40,[{...cell,...patch}],8));checks++;}
console.log(JSON.stringify({pureGeometryChecks:checks,result:'passed',browserRendering:'not executed'}));
```
