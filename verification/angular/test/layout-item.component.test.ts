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
