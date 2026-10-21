import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { LayoutItemComponent } from '../src/layout-item.component.js';

describe('IMP-06 LayoutItemComponent independent structure', () => {
  it('reallocates 60:40 across the available width after subtracting gap', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const first = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const second = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[first,second],clientWidth:210} as unknown as HTMLElement;
    const previous = globalThis.getComputedStyle;
    vi.stubGlobal('getComputedStyle',(element:HTMLElement) => ({
      display:'block',columnGap:'10px',
      getPropertyValue:() => element === first ? '60' : '40',
    }));
    try {
      component.distribute(wrapper);
      expect(Number.parseFloat(first.style.flexBasis)).toBeCloseTo(120, 8);
      expect(Number.parseFloat(second.style.flexBasis)).toBeCloseTo(80, 8);
    } finally {
      if (previous) vi.stubGlobal('getComputedStyle',previous);
      else vi.unstubAllGlobals();
    }
  });
  it('excludes hidden children and reallocates remaining weight', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const first = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const hidden = {style:{flexBasis:'20px',flexGrow:'0'},getClientRects:()=>[]} as unknown as HTMLElement;
    const wrapper = {children:[first,hidden],clientWidth:210} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',(element:HTMLElement) => ({
      display:'block',columnGap:'10px',
      getPropertyValue:() => element === first ? '60' : '40',
    }));
    try {
      component.distribute(wrapper);
      expect(first.style.flexBasis).toBe('210px');
      expect(hidden.style.flexBasis).toBe('');
      expect(hidden.style.flexGrow).toBe('');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('clears stale allocated widths when container shrinks to zero', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'200px',flexGrow:'0'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],clientWidth:0} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(child.style.flexBasis).toBe('');
      expect(child.style.flexGrow).toBe('');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('schedules redistribution when required-width notification fires', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {} as HTMLElement;
    const wrapper = {children:[child]} as unknown as HTMLElement;
    let metricsChanged: (() => void) | undefined;
    const watch = vi.fn((_children:HTMLElement[], callback:()=>void) => {
      metricsChanged = callback;
      return vi.fn();
    });
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame',vi.fn((callback:FrameRequestCallback) => {
      frames.push(callback);
      return frames.length;
    }));
    const distribute = vi.spyOn(component,'distribute').mockImplementation(() => {});
    try {
      Object.assign(component,{
        host:{nativeElement:{querySelector:()=>wrapper}},
        metrics:{watch,requiredWidth:vi.fn(() => 75)},
        disposed:false,
      });
      component.ngAfterViewInit();
      expect(frames).toHaveLength(1);
      frames[0]!(0);
      expect(distribute).toHaveBeenCalledOnce();
      metricsChanged!();
      expect(frames).toHaveLength(2);
      frames[1]!(1);
      expect(distribute).toHaveBeenCalledTimes(2);
      expect(distribute.mock.calls[1]![1]!(child)).toBe(75);
      component.ngOnDestroy();
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('refreshes metric subscriptions when projected children change', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const first = {} as HTMLElement;
    const second = {} as HTMLElement;
    const wrapper = {children:[first]} as unknown as HTMLElement;
    const host = {querySelector:vi.fn(() => wrapper)};
    const unsubscribeFirst = vi.fn();
    const unsubscribeSecond = vi.fn();
    const watch = vi.fn()
      .mockReturnValueOnce(unsubscribeFirst)
      .mockReturnValueOnce(unsubscribeSecond);
    let mutationCallback: MutationCallback | undefined;
    const mutationDisconnect = vi.fn();
    const resizeDisconnect = vi.fn();
    const mutationObserve = vi.fn();
    const resizeObserve = vi.fn();
    const raf = vi.fn((_callback:FrameRequestCallback) => 7);
    vi.stubGlobal('requestAnimationFrame',raf);
    vi.stubGlobal('MutationObserver',class {
      constructor(callback:MutationCallback){mutationCallback=callback;}
      observe=mutationObserve;
      disconnect=mutationDisconnect;
    });
    vi.stubGlobal('ResizeObserver',class {
      observe=resizeObserve;
      disconnect=resizeDisconnect;
    });
    try {
      Object.assign(component,{
        host:{nativeElement:host},
        metrics:{watch,requiredWidth:vi.fn(() => 0)},
        disposed:false,
      });
      component.ngAfterViewInit();
      expect(watch).toHaveBeenCalledWith([first],expect.any(Function));
      expect(raf).toHaveBeenCalledOnce();
      expect(mutationObserve).toHaveBeenCalledWith(wrapper,{childList:true,subtree:false});
      expect(resizeObserve).toHaveBeenCalledWith(wrapper);
      wrapper.children = [second] as unknown as HTMLCollection;
      mutationCallback!([],{} as MutationObserver);
      expect(unsubscribeFirst).toHaveBeenCalledOnce();
      expect(watch).toHaveBeenCalledWith([second],expect.any(Function));
      component.ngOnDestroy();
      expect(unsubscribeSecond).toHaveBeenCalledOnce();
      expect(mutationDisconnect).toHaveBeenCalledOnce();
      expect(resizeDisconnect).toHaveBeenCalledOnce();
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('coalesces repeated resize notifications into one animation frame', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const pending: Array<FrameRequestCallback> = [];
    const raf = vi.fn((callback:FrameRequestCallback) => {
      pending.push(callback);
      return pending.length;
    });
    const distribute = vi.spyOn(component,'distribute').mockImplementation(() => {});
    vi.stubGlobal('requestAnimationFrame',raf);
    try {
      Object.assign(component,{disposed:false});
      const schedule = (component as unknown as {schedule:(wrapper:HTMLElement)=>void}).schedule.bind(component);
      const wrapper = {} as HTMLElement;
      schedule(wrapper);
      schedule(wrapper);
      expect(raf).toHaveBeenCalledOnce();
      pending[0]!(0);
      expect(distribute).toHaveBeenCalledOnce();
      schedule(wrapper);
      expect(raf).toHaveBeenCalledTimes(2);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('disconnects observers, unsubscribes metrics and cancels pending frame on destroy', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const resizeDisconnect = vi.fn();
    const mutationDisconnect = vi.fn();
    const unsubscribe = vi.fn();
    const cancel = vi.fn();
    vi.stubGlobal('cancelAnimationFrame',cancel);
    try {
      Object.assign(component, {
        resizeObserver:{disconnect:resizeDisconnect},
        mutationObserver:{disconnect:mutationDisconnect},
        unsubscribe,
        frame:42,
        disposed:false,
      });
      component.ngOnDestroy();
      expect(resizeDisconnect).toHaveBeenCalledOnce();
      expect(mutationDisconnect).toHaveBeenCalledOnce();
      expect(unsubscribe).toHaveBeenCalledOnce();
      expect(cancel).toHaveBeenCalledWith(42);
      expect((component as unknown as {disposed:boolean}).disposed).toBe(true);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('does not recalculate after destruction', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    Object.assign(component,{disposed:true});
    const distribute = vi.spyOn(component,'distribute');
    (component as unknown as {schedule:(wrapper:HTMLElement)=>void}).schedule({} as HTMLElement);
    expect(distribute).not.toHaveBeenCalled();
  });
  it('uses standalone app-layout-item selector', () => {
    expect(LayoutItemComponent.ɵcmp.selectors).toEqual([['app-layout-item']]);
    expect(LayoutItemComponent.ɵcmp.standalone).toBe(true);
  });
  it('projects content into the dedicated layout wrapper', () => {
    const definition = LayoutItemComponent.ɵcmp;
    expect(definition.ngContentSelectors).toEqual(['*']);
  });
  it('does not introduce inputs or outputs for business state', () => {
    const definition = LayoutItemComponent.ɵcmp;
    expect(definition.inputs).toEqual({});
    expect(definition.outputs).toEqual({});
  });
});
