import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { LayoutItemComponent } from '../src/layout-item.component.js';

describe('IMP-06 LayoutItemComponent independent structure', () => {
  it('reallocates 60:40 across the available width after subtracting gap', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const first = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const second = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[first,second],clientWidth:210,getBoundingClientRect:()=>({width:210})} as unknown as HTMLElement;
    const previous = globalThis.getComputedStyle;
    vi.stubGlobal('getComputedStyle',(element:HTMLElement) => ({
      display:'block',columnGap:'10px',paddingLeft:'0px',paddingRight:'0px',borderLeftWidth:'0px',borderRightWidth:'0px',
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
    const wrapper = {children:[first,hidden],clientWidth:210,getBoundingClientRect:()=>({width:210})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',(element:HTMLElement) => ({
      display:'block',columnGap:'10px',paddingLeft:'0px',paddingRight:'0px',borderLeftWidth:'0px',borderRightWidth:'0px',
      getPropertyValue:() => element === first ? '60' : '40',
    }));
    try {
      component.distribute(wrapper);
      expect(first.style.flexBasis).toBe('210px');
      expect(hidden.style.flexBasis).toBe('20px');
      expect(hidden.style.flexGrow).toBe('0');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('defers allocation writes when container shrinks to zero', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'200px',flexGrow:'0'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],clientWidth:0,getBoundingClientRect:()=>({width:0})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(child.style.flexBasis).toBe('200px');
      expect(child.style.flexGrow).toBe('0');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('restores the original inline allocation after redistribution and destroy', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'24px',flexGrow:'2'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(child.style.flexBasis).toBe('200px');
      expect(child.style.flexGrow).toBe('0');
      component.ngOnDestroy();
      expect(child.style.flexBasis).toBe('24px');
      expect(child.style.flexGrow).toBe('2');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('does not overwrite externally modified inline allocation on destroy', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'24px',flexGrow:'2'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      child.style.flexBasis = '88px';
      component.ngOnDestroy();
      expect(child.style.flexBasis).toBe('88px');
      expect(child.style.flexGrow).toBe('2');
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('restores original !important priorities after layout destruction', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const values = new Map([['flex-basis', '24px'], ['flex-grow', '2']]);
    const priorities = new Map([['flex-basis', 'important'], ['flex-grow', 'important']]);
    const style = {
      get flexBasis() { return values.get('flex-basis') ?? ''; },
      set flexBasis(value: string) { values.set('flex-basis', value); },
      get flexGrow() { return values.get('flex-grow') ?? ''; },
      set flexGrow(value: string) { values.set('flex-grow', value); },
      getPropertyPriority: (name: string) => priorities.get(name) ?? '',
      setProperty: (name: string, value: string, priority = '') => {
        values.set(name, value);
        priorities.set(name, priority);
      },
    };
    const child = {style,getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(style.flexBasis).toBe('200px');
      expect(style.getPropertyPriority('flex-basis')).toBe('');
      component.ngOnDestroy();
      expect(style.flexBasis).toBe('24px');
      expect(style.flexGrow).toBe('2');
      expect(style.getPropertyPriority('flex-basis')).toBe('important');
      expect(style.getPropertyPriority('flex-grow')).toBe('important');
    } finally { vi.unstubAllGlobals(); }
  });
  it('skips redundant inline flex writes when allocation has not changed', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const values = new Map([['flex-basis', ''], ['flex-grow', '']]);
    const setProperty = vi.fn((name:string,value:string) => values.set(name,value));
    const style = {
      get flexBasis(){return values.get('flex-basis') ?? '';},
      get flexGrow(){return values.get('flex-grow') ?? '';},
      getPropertyPriority:()=>'',setProperty,
    };
    const child = {style,getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(setProperty).toHaveBeenCalledTimes(2);
      component.distribute(wrapper);
      expect(setProperty).toHaveBeenCalledTimes(2);
      component.ngOnDestroy();
    } finally { vi.unstubAllGlobals(); }
  });
  it('rejects unsupported computed gap units', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'',flexGrow:''},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'1rem',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      expect(() => component.distribute(wrapper)).toThrow('BRUCE_LAYOUT_GAP');
    } finally { vi.unstubAllGlobals(); }
  });
  it('defers writes for nonfinite container geometry', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'11px',flexGrow:'3'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:Number.NaN})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(child.style.flexBasis).toBe('11px');
      expect(child.style.flexGrow).toBe('3');
    } finally { vi.unstubAllGlobals(); }
  });
  it('restores original min-width and box-sizing after layout destruction', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const child = {style:{flexBasis:'',flexGrow:'',minWidth:'24px',boxSizing:'content-box'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[child],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    try {
      component.distribute(wrapper);
      expect(child.style.minWidth).toBe('0px');
      expect(child.style.boxSizing).toBe('border-box');
      component.ngOnDestroy();
      expect(child.style.minWidth).toBe('24px');
      expect(child.style.boxSizing).toBe('content-box');
    } finally { vi.unstubAllGlobals(); }
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
      expect(mutationObserve).toHaveBeenCalledWith(wrapper,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class','style']});
      expect(resizeObserve).toHaveBeenCalledWith(wrapper);
      wrapper.children = [second] as unknown as HTMLCollection;
      mutationCallback!([{type:'childList',target:wrapper} as MutationRecord],{} as MutationObserver);
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
  it('schedules direct-child hidden changes without resubscribing metrics', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const wrapper = {children:[]} as unknown as HTMLElement;
    const child = {parentElement:wrapper} as HTMLElement;
    wrapper.children = [child] as unknown as HTMLCollection;
    const watch = vi.fn(() => vi.fn());
    let mutationCallback: MutationCallback | undefined;
    const observe = vi.fn();
    const raf = vi.fn((_callback:FrameRequestCallback) => 9);
    vi.stubGlobal('requestAnimationFrame',raf);
    vi.stubGlobal('MutationObserver',class {
      constructor(callback:MutationCallback){mutationCallback=callback;}
      observe=observe;
      disconnect=vi.fn();
    });
    try {
      Object.assign(component,{
        host:{nativeElement:{querySelector:()=>wrapper}},
        metrics:{watch,requiredWidth:vi.fn(() => 0)},disposed:false,
      });
      component.ngAfterViewInit();
      expect(watch).toHaveBeenCalledOnce();
      expect(observe).toHaveBeenCalledWith(wrapper, expect.objectContaining({attributeFilter:['hidden','class','style']}));
      mutationCallback!([{type:'attributes',target:child,attributeName:'hidden'} as MutationRecord],{} as MutationObserver);
      expect(watch).toHaveBeenCalledOnce();
      mutationCallback!([{type:'attributes',target:child,attributeName:'style'} as MutationRecord],{} as MutationObserver);
      expect(watch).toHaveBeenCalledOnce();
      const pending = (component as unknown as {frame?:number}).frame;
      expect(pending).toBe(9);
      component.ngOnDestroy();
    } finally { vi.unstubAllGlobals(); }
  });
  it('restores allocated flex styles when a projected child is removed', () => {
    const component = Object.create(LayoutItemComponent.prototype) as LayoutItemComponent;
    const first = {style:{flexBasis:'25px',flexGrow:'3'},getClientRects:()=>[{}]} as unknown as HTMLElement;
    const wrapper = {children:[first],getBoundingClientRect:()=>({width:200})} as unknown as HTMLElement;
    let mutationCallback: MutationCallback | undefined;
    vi.stubGlobal('getComputedStyle',() => ({
      display:'block',columnGap:'8px',paddingLeft:'0px',paddingRight:'0px',
      borderLeftWidth:'0px',borderRightWidth:'0px',getPropertyValue:() => '1',
    }));
    vi.stubGlobal('MutationObserver',class {
      constructor(callback:MutationCallback){mutationCallback=callback;}
      observe=vi.fn();
      disconnect=vi.fn();
    });
    try {
      Object.assign(component,{
        host:{nativeElement:{querySelector:()=>wrapper}},
        metrics:{watch:vi.fn(() => vi.fn()),requiredWidth:vi.fn(() => 0)},disposed:false,
      });
      component.ngAfterViewInit();
      expect(first.style.flexBasis).toBe('200px');
      wrapper.children = [] as unknown as HTMLCollection;
      mutationCallback!([{type:'childList',target:wrapper} as MutationRecord],{} as MutationObserver);
      expect(first.style.flexBasis).toBe('25px');
      expect(first.style.flexGrow).toBe('3');
      component.ngOnDestroy();
    } finally { vi.unstubAllGlobals(); }
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
