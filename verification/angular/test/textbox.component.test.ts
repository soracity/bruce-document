import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextboxComponent } from '../src/textbox.component.js';

function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  const component = runInInjectionContext(injector, () => new TextboxComponent());
  return { component, injector };
}
describe('IMP-09 TextboxComponent independent validation', () => {
  it('is a standalone component with ReactiveFormsModule', () => {
    expect(TextboxComponent.ɵcmp.standalone).toBe(true);
    expect(TextboxComponent.ɵcmp.selectors).toEqual([['app-textbox']]);
  });
  it('preserves parent control and validators when binding', () => {
    const { component, injector } = setup();
    try {
      const control = new FormControl<string | null>('original', Validators.required);
      component['bindControl'](control);
      expect(component['requireControl']()).toBe(control);
      expect(control.value).toBe('original');
      expect(control.hasValidator(Validators.required)).toBe(true);
      component.ngOnDestroy();
      expect(control.value).toBe('original');
    } finally { injector.destroy(); }
  });
  it('does not copy or mutate values when control is replaced', () => {
    const { component, injector } = setup();
    try {
      const first = new FormControl<string | null>('first');
      const second = new FormControl<string | null>('second');
      component['bindControl'](first);
      component['bindControl'](second);
      expect(component['requireControl']()).toBe(second);
      expect(first.value).toBe('first');
      expect(second.value).toBe('second');
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
});
