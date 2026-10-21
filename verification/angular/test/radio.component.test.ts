import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { RadioComponent } from '../src/radio.component.js';
function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  return { component: runInInjectionContext(injector, () => new RadioComponent<string>()), injector };
}
describe('IMP-11 RadioComponent independent tests', () => {
  it('has standalone app-radio metadata', () => {
    expect(RadioComponent.ɵcmp.selectors).toEqual([['app-radio']]);
    expect(RadioComponent.ɵcmp.standalone).toBe(true);
  });
  it('defaults to RADIO and empty choices', () => {
    const { component, injector } = setup();
    try { expect(component.type()).toBe('RADIO'); expect(component.values()).toEqual([]); }
    finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('falls back to option text when labels are missing', () => {
    const { component, injector } = setup();
    try { expect(component.optionLabel(5,'CODE')).toBe('CODE'); }
    finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('emits the event key once in a microtask', async () => {
    const { component, injector } = setup();
    try {
      const handler = vi.fn();
      const sub = component.radioChange.subscribe(handler);
      component.onChange();
      expect(handler).not.toHaveBeenCalled();
      await Promise.resolve();
      expect(handler).toHaveBeenCalledExactlyOnceWith('');
      sub.unsubscribe();
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
});
