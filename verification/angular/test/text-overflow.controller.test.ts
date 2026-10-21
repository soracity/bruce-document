import { describe, expect, it, vi } from 'vitest';
import { TextOverflowController } from '../src/text-overflow.controller.js';
function setup(width:number,textWidth:number) {
  const classes = new Set<string>();
  const viewport = {clientWidth:width,classList:{add:(x:string)=>classes.add(x),remove:(...x:string[])=>x.forEach(v=>classes.delete(v))}} as unknown as HTMLElement;
  const cancel = vi.fn();
  const animate = vi.fn(() => ({cancel}));
  const track = {scrollWidth:textWidth,textContent:'',style:{transform:''},animate} as unknown as HTMLElement;
  return {controller:new TextOverflowController(viewport,track),classes,animate,cancel,track};
}
describe('IMP-17 TextOverflowController measurement and lifecycle', () => {
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
