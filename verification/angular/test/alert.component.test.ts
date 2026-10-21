import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { AlertComponent } from '../src/alert.component.js';

function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  const component = runInInjectionContext(injector, () => new AlertComponent());
  return { component, injector };
}
describe('IMP-16 AlertComponent independent validation', () => {
  it('has the correct standalone selector and initial semantic classes', () => {
    const { component, injector } = setup();
    try {
      expect(AlertComponent.ɵcmp.selectors).toEqual([['app-alert']]);
      expect(AlertComponent.ɵcmp.standalone).toBe(true);
      expect(component.alertClasses()).toBe('alert-info');
      expect(component.buttonClasses()).toBe('');
    } finally { injector.destroy(); }
  });
  it('emits OK only without application side effects', () => {
    const { component, injector } = setup();
    try {
      const callback = vi.fn();
      const subscription = component.buttonClick.subscribe(callback);
      component.onClick('OK');
      component.onClick('CANCEL');
      expect(callback).toHaveBeenCalledExactlyOnceWith('OK');
      subscription.unsubscribe();
    } finally { injector.destroy(); }
  });
  it('rejects invalid button keys', () => {
    const { component, injector } = setup();
    try {
      expect(() => component.onClick('UNKNOWN' as 'OK')).toThrow('BRUCE_ALERT_BUTTON_KEY');
    } finally { injector.destroy(); }
  });
});
