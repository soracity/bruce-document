import { describe, expect, it, vi } from 'vitest';
import { TextOverflowController } from '../src/text-overflow.controller.js';
function setup(width:number,textWidth:number,padding=0) {
  const classes = new Set<string>();
  const viewport = {clientWidth:width,style:{paddingLeft:`${padding}px`,paddingRight:`${padding}px`},classList:{add:(x:string)=>classes.add(x),remove:(...x:string[])=>x.forEach(v=>classes.delete(v))}} as unknown as HTMLElement;
  const cancel = vi.fn();
  const animate = vi.fn((_frames:Keyframe[], _options:KeyframeAnimationOptions) => ({cancel}));
  const track = {scrollWidth:textWidth,textContent:'',style:{transform:''},animate} as unknown as HTMLElement;
  return {controller:new TextOverflowController(viewport,track),classes,animate,cancel,track};
}
describe('IMP-17 TextOverflowController measurement and lifecycle', () => {
  it('preserves 8px padding on both sides while calculating exact endpoints', () => {
    const {controller,animate} = setup(200,300,8);
    controller.update('sample','MARQUEE_RESTART');
    expect(controller.measure()).toEqual({viewport:184,text:300,distance:116});
    const [frames] = animate.mock.calls[0];
    expect(frames[0].transform).toBe('translateX(0px)');
    expect(frames[frames.length-1].transform).toBe('translateX(-116px)');
    controller.destroy();
  });
  it('does not animate when text fits the viewport', () => {
    const {controller,animate} = setup(100,80);
    controller.update('abc','MARQUEE_BOUNCE');
    expect(controller.measure().distance).toBe(0);
    expect(animate).not.toHaveBeenCalled();
    controller.destroy();
  });
  it('measures overflow and starts a repeating bounce', () => {
    const {controller,animate} = setup(100,160);
    controller.update('long','MARQUEE_BOUNCE');
    expect(controller.measure()).toEqual({viewport:100,text:160,distance:60});
    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate.mock.calls[0]).toBeDefined();
    controller.destroy();
  });
  it('RESTART travels left from the first character to the last without overshoot', () => {
    const {controller,animate} = setup(200,300);
    controller.update('sample','MARQUEE_RESTART');
    const [frames,options] = animate.mock.calls[0];
    expect(frames.map(frame => frame.transform)).toEqual([
      'translateX(0px)','translateX(0px)','translateX(-100px)','translateX(-100px)',
    ]);
    expect(options.duration).toBeCloseTo(1000+100/30*1000);
    expect(options.iterations).toBe(Infinity);
    controller.destroy();
  });
  it('BOUNCE preserves rightward first travel and reverses at the exact edges', () => {
    const {controller,animate} = setup(200,300);
    controller.update('sample','MARQUEE_BOUNCE');
    const [frames] = animate.mock.calls[0];
    expect(frames.map(frame => frame.transform)).toEqual([
      'translateX(-100px)','translateX(-100px)','translateX(0px)','translateX(0px)','translateX(-100px)',
    ]);
    controller.destroy();
  });
  it('cancels active animation when switching to wrap and on destroy', () => {
    const {controller,cancel,classes} = setup(100,200);
    controller.update('long','MARQUEE_RESTART');
    controller.update('short','WRAP');
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(classes.has('bruce-text-wrap')).toBe(true);
    controller.destroy();
    expect(controller.getState()).toBe('destroyed');
  });
  it('rejects an unknown overflow mode', () => {
    const {controller} = setup(100,200);
    expect(() => controller.update('x','BAD' as 'WRAP')).toThrow('BRUCE_TEXT_OVERFLOW_MODE');
    controller.destroy();
  });
});
