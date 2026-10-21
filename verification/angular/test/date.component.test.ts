import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateComponent } from '../src/date.component.js';

function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  const component = runInInjectionContext(injector, () => new DateComponent());
  const control = new FormControl<string | null>('2024-01-01', { validators: Validators.required });
  component['onControlBound'](undefined, control);
  return { injector, component, control };
}

describe('IMP-10 DateComponent independent validation', () => {
  it('preserves required validator when attaching and removing Date validator', () => {
    const { injector, component, control } = setup();
    try {
      expect(control.hasValidator(Validators.required)).toBe(true);
      component.ngOnDestroy();
      expect(control.hasValidator(Validators.required)).toBe(true);
    } finally { injector.destroy(); }
  });
  it('preserves parent stored value when date input is incomplete', () => {
    const { injector, component, control } = setup();
    try {
      const raw = 'not-a-date';
      component.onInput({ target: { value: raw, validity: { badInput: false, typeMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false } } } as unknown as Event);
      expect(control.value).toBe('2024-01-01');
      expect(control.dirty).toBe(true);
      expect(control.errors?.['dateInput']).toEqual({ reason: 'incomplete', raw });
      expect(component.displayValue()).toBe(raw);
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('clears only Date validator error after correction', () => {
    const { injector, component, control } = setup();
    try {
      component.onInput({ target: { value: 'bad', validity: { badInput: true } } } as unknown as Event);
      expect(control.hasError('dateInput')).toBe(true);
      component.onInput({ target: { value: '', validity: { badInput: false, typeMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false } } } as unknown as Event);
      expect(control.value).toBe('');
      expect(control.hasError('dateInput')).toBe(false);
      expect(control.hasError('required')).toBe(true);
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('marks parent touched on blur', () => {
    const { injector, component, control } = setup();
    try {
      component.onBlur();
      expect(control.touched).toBe(true);
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('does not replace an externally invalid stored date', () => {
    const { injector, component, control } = setup();
    try {
      control.setValue('2024-02-30');
      component.syncFromControl();
      expect(control.value).toBe('2024-02-30');
      expect(control.hasError('dateInput')).toBe(true);
      expect(component.displayValue()).toBe('');
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });
  it('keeps original stored value on invalid draft and recovers after a valid date', () => {
    const { injector, component, control } = setup();
    try {
      const validity = { badInput: false, typeMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false };
      component.onInput({ target: { value: '2024-02-30', validity } } as unknown as Event);
      expect(control.value).toBe('2024-01-01');
      expect(control.hasError('dateInput')).toBe(true);
      component.onInput({ target: { value: '2024-02-29', validity } } as unknown as Event);
      expect(control.value).toBe('2024-02-29');
      expect(control.hasError('dateInput')).toBe(false);
    } finally { component.ngOnDestroy(); injector.destroy(); }
  });

});
