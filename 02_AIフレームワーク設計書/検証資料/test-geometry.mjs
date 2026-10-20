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
for (const borderWidth of [3, -1, Infinity]) { assert.throws(()=>f(100,40,[{...cell,borderWidth}],8)); checks++; }
console.log(JSON.stringify({pureGeometryChecksIncludingRuntimeGuards:checks,result:'passed',browserRendering:'not executed'}));
