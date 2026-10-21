import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { ButtonComponent } from '../src/button.component.js';

function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  const component = runInInjectionContext(injector, () => new ButtonComponent());
  return { component, injector };
}
describe('IMP-13 ButtonComponent independent validation', () => {
  it('uses the documented standalone selector', () => {
    expect(ButtonComponent.ɵcmp.selectors).toEqual([['app-button']]);
    expect(ButtonComponent.ɵcmp.standalone).toBe(true);
  });
  it('emits the event key without form control or application calls', () => {
    const { component, injector } = setup();
    try {
      const handler = vi.fn();
      const subscription = component.buttonClick.subscribe(handler);
      component.onClick();
      expect(handler).toHaveBeenCalledExactlyOnceWith('');
      subscription.unsubscribe();
    } finally { injector.destroy(); }
  });
  it('inherits common visibility default', () => {
    const { component, injector } = setup();
    try { expect(component.effectiveVisible()).toBe(true); }
    finally { injector.destroy(); }
  });
});
