// 設計本文05/12/27/29章の純粋計算用参照実装。Angular/Java実装ではない。
export function partition(items, available, gap) {
  if (![available,gap].every(v=>Number.isFinite(v)&&v>=0) || items.some(i=>!Number.isFinite(i.required)||i.required<0||!Number.isFinite(i.weight)||i.weight<=0)) throw Error('BRUCE_LAYOUT_METRIC');
  if (available===0 || items.length===0) return [];
  const widths=xs=>{const maxWeight=xs.reduce((v,i)=>Math.max(v,i.weight),0),sum=xs.reduce((s,i)=>s+i.weight/maxWeight,0),base=Math.max(0,available-gap*(xs.length-1));const out=xs.map(i=>base*(i.weight/maxWeight)/sum);if(out.length)out[out.length-1]=Math.max(0,base-out.slice(0,-1).reduce((a,b)=>a+b,0));return out;};
  const result=[];let row=[];
  const finish=()=>{if(row.length)result.push({items:row,widths:widths(row)});};
  for(const i of items) {
    const candidate=[...row,i],ws=widths(candidate);
    if(row.length && (gap*(candidate.length-1)>available || candidate.some((x,j)=>ws[j]+1e-7<Math.min(x.required,available)))) {finish();row=[i];}
    else row=candidate;
  }
  finish();return result;
}
export function decimalTotal(raws) {
  const parts=raws.map(raw=>{
    const m=/^(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/.exec(raw);
    if(!m || !Number.isFinite(Number(raw)) || Number(raw)<=0)throw Error('BRUCE_SPAN_LITERAL');
    const frac=m[2]??m[3]??'',whole=m[1]??'';
    return {n:BigInt(whole+frac),scale:frac.length-Number(m[4]??0)};
  });
  const scale=Math.max(0,...parts.map(p=>p.scale));
  const n=parts.reduce((n,p)=>n+p.n*10n**BigInt(scale-p.scale),0n);
  let digits=n.toString().padStart(scale+1,'0');
  let actual=scale?digits.slice(0,-scale)+'.'+digits.slice(-scale):digits;
  if(scale)actual=actual.replace(/0+$/,'').replace(/\.$/,'');
  return {equals100:n===100n*10n**BigInt(scale),actual};
}
// AbstractControl.value相当を受ける。Angularの型検査を代用しない。
export function requiredTrim(control) {
 const value=control.value;
 if(value===null||value===undefined)return {required:true};
 if(typeof value!=='string')return {stringType:true};
 return value.trim().length===0?{required:true}:null;
}
export function ascii(control) {
 const value=control.value;
 if(value===null||value===undefined||value==='')return null;
 if(typeof value!=='string')return {stringType:true};
 return /^[\x00-\x7F]*$/.test(value)?null:{ascii:true};
}
export const resolveColor=(cell,record,table,defaultColor)=>[cell,record,table,defaultColor].find(v=>v!==undefined);
export function parseDate(raw) {
 const m=/^(\d{4,})-(\d{2})-(\d{2})$/.exec(raw);if(!m)return null;
 const [y,mo,day]=m.slice(1).map(Number);
 if(!Number.isSafeInteger(y)||y<=0||mo<1||mo>12)return null;
 const leap=y%400===0 || y%4===0&&y%100!==0;
 const days=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
 return day>=1 && day<=days[mo-1]?{year:y,month:mo,day}:null;
}
export function assertReleaseEvidence(manifest,requested,run) {
 const sha=/^[0-9a-f]{40}$/i,digest=/^[0-9a-f]{64}$/i;
 const text=v=>typeof v==='string'&&v.trim().length>0;
 for(const e of [manifest,run]) {
  if(!e||!sha.test(e.commit)||!digest.test(e.artifactSha256)||!digest.test(e.lockfileSha256)||!text(e.project)||!text(e.configuration)||!text(e.runId)||e.layout!=='success'||e.angular!=='success')throw Error('BRUCE_RELEASE_EVIDENCE');
 }
 if(!requested || !sha.test(requested.commit)||!digest.test(requested.artifactSha256)||!text(requested.project)||!text(requested.configuration)||!sha.test(manifest.designCommit)||!sha.test(manifest.acgCommit))throw Error('BRUCE_RELEASE_MANIFEST');
 for(const field of ['commit','project','configuration','artifactSha256'])if(manifest[field]!==requested[field]||run[field]!==requested[field])throw Error('BRUCE_RELEASE_MISMATCH:'+field);
 for(const field of ['runId','lockfileSha256'])if(manifest[field]!==run[field])throw Error('BRUCE_RELEASE_MISMATCH:'+field);
}
