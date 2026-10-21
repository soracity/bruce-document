/** 工程③ IMP-17 TextOverflowController: DISPLAY-06 の測定と静止判定を独立検証。 */
import type { TextOverflowMode } from './label.component.js';

export type TextOverflowMeasurement = { viewport:number; text:number; distance:number };
export class TextOverflowController {
  private mode:TextOverflowMode = 'WRAP';
  private animation?:Animation;
  private destroyed = false;
  private state:'idle'|'wrap'|'ellipsis'|'marquee'|'paused'|'destroyed' = 'idle';
  constructor(private readonly viewport:HTMLElement,private readonly track:HTMLElement) {}
  update(text:string,mode:TextOverflowMode):void {
    if (this.destroyed) return;
    if (!['WRAP','ELLIPSIS','MARQUEE_BOUNCE','MARQUEE_RESTART'].includes(mode)) throw new Error('BRUCE_TEXT_OVERFLOW_MODE');
    this.cancel();
    this.mode = mode;
    this.viewport.classList.remove('bruce-text-wrap','bruce-text-ellipsis','bruce-text-marquee');
    this.viewport.classList.add(mode === 'WRAP' ? 'bruce-text-wrap' : mode === 'ELLIPSIS' ? 'bruce-text-ellipsis' : 'bruce-text-marquee');
    this.track.textContent = text;
    this.reconcile();
  }
  measure():TextOverflowMeasurement {
    const css = typeof getComputedStyle === 'function' ? getComputedStyle(this.viewport) : this.viewport.style;
    const left = Number.parseFloat(css.paddingLeft) || 0;
    const right = Number.parseFloat(css.paddingRight) || 0;
    const viewport = Math.max(0,this.viewport.clientWidth - left - right);
    const text = Math.max(0,this.track.scrollWidth);
    return {viewport,text,distance:Math.max(0,text-viewport)};
  }
  reconcile():void {
    if (this.destroyed) return;
    this.cancel();
    if (this.mode === 'WRAP') { this.state = 'wrap';return; }
    if (this.mode === 'ELLIPSIS') { this.state = 'ellipsis';return; }
    const distance = this.measure().distance;
    if (distance === 0) { this.state = 'idle';return; }
    this.state = 'marquee';
    const travel = distance / 30 * 1000;
    const bounce = this.mode === 'MARQUEE_BOUNCE';
    const duration = 1000 + travel * (bounce ? 2 : 1);
    const start = -distance;
    const frames:Keyframe[] = bounce
      ? [
        {transform:`translateX(${start}px)`,offset:0},
        {transform:`translateX(${start}px)`,offset:500/duration},
        {transform:'translateX(0px)',offset:(500+travel)/duration},
        {transform:'translateX(0px)',offset:(1000+travel)/duration},
        {transform:`translateX(${start}px)`,offset:1},
      ]
      : [
        {transform:'translateX(0px)',offset:0},
        {transform:'translateX(0px)',offset:500/duration},
        {transform:`translateX(${start}px)`,offset:(500+travel)/duration},
        {transform:`translateX(${start}px)`,offset:1},
      ];
    this.animation = this.track.animate(frames,{duration,iterations:Infinity,easing:'linear'});
  }
  cancel():void {
    this.animation?.cancel();
    this.animation = undefined;
    this.track.style.transform = '';
  }
  destroy():void {
    if (this.destroyed) return;
    this.cancel();
    this.destroyed = true;
    this.state = 'destroyed';
  }
  getState():string { return this.state; }
}
