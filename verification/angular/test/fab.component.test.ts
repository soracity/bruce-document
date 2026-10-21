import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { FabComponent } from '../src/fab.component.js';
function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  return { component: runInInjectionContext(injector, () => new FabComponent()), injector };
}
describe('IMP-14 FabComponent independent validation', () => {
  it('uses documented selector and standalone component', () => {
    expect(FabComponent.ɵcmp.selectors).toEqual([['app-fab']]);
    expect(FabComponent.ɵcmp.standalone).toBe(true);
  });
  it('emits the event key without application side effects', () => {
    const { component, injector } = setup();
    try {
      const handler = vi.fn();
      const subscription = component.buttonClick.subscribe(handler);
      component.onClick();
      expect(handler).toHaveBeenCalledExactlyOnceWith('');
      subscription.unsubscribe();
    } finally { injector.destroy(); }
  });
  it('uses the common visible default', () => {
    const { component, injector } = setup();
    try { expect(component.effectiveVisible()).toBe(true); }
    finally { injector.destroy(); }
  });
});
