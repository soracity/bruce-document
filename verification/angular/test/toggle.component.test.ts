import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleComponent, AppCodeBooleanEnum } from '../src/toggle.component.js';
function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  return { component: runInInjectionContext(injector, () => new ToggleComponent()), injector };
}
describe('IMP-12 ToggleComponent independent validation', () => {
  it('defaults to no mode and no disabled state', () => {
    const { component, injector } = setup();
    try { expect(component.type()).toBeUndefined(); expect(component.isDisabled()).toBe(false); expect(component.isChecked()).toBe(false); }
    finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('emits eventKey in control-less mode without creating a control', () => {
    const { component, injector } = setup();
    try {
      const callback = vi.fn();
      const sub = component.toggleChange.subscribe(callback);
      component.onChange({ target: { checked: true } } as unknown as Event);
      expect(callback).toHaveBeenCalledExactlyOnceWith('');
      expect(component.control()).toBeUndefined();
      sub.unsubscribe();
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('does not emit or write on invalid input target', () => {
    const { component, injector } = setup();
    try { expect(() => component.onChange({ target: {} } as Event)).toThrow('BRUCE_TOGGLE_TARGET'); }
    finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('provides stable TRUE and FALSE enum objects', () => {
    expect(AppCodeBooleanEnum.TRUE).not.toBe(AppCodeBooleanEnum.FALSE);
    expect(AppCodeBooleanEnum.TRUE.value).toBe('TRUE');
    expect(AppCodeBooleanEnum.FALSE.value).toBe('FALSE');
  });
});
