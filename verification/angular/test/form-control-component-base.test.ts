import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { FormControlComponentBase } from '../src/form-control-component-base.js';

class Probe extends FormControlComponentBase<string | null> {
  readonly observedValues: (string | null)[] = [];
  readonly observedStatuses: FormControlStatus[] = [];
  readonly bindings: [FormControl<string | null> | undefined, FormControl<string | null> | undefined][] = [];
  public attach(control?: FormControl<string | null>): void { this['bindControl'](control); }
  public required(): FormControl<string | null> { return this.requireControl(); }
  protected override onControlBound(previous: FormControl<string | null> | undefined, current: FormControl<string | null> | undefined): void {
    this.bindings.push([previous, current]);
  }
  protected override onControlValue(value: string | null): void { this.observedValues.push(value); }
  protected override onControlStatus(status: FormControlStatus): void { this.observedStatuses.push(status); }
}

function setup() {
  let marked = 0;
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => { marked++; } } },
  ], null as never);
  const probe = runInInjectionContext(injector, () => new Probe());
  return { injector, probe, marked: () => marked };
}

describe('IMP-02 FormControlComponentBase lifecycle and notifications', () => {
  it('reports required control when none is bound', () => {
    const { injector, probe } = setup();
    try { expect(() => probe.required()).toThrow('BRUCE_CONTROL_REQUIRED'); }
    finally { injector.destroy(); }
  });
  it('subscribes to value and status, and avoids duplicate subscription for same control', () => {
    const { injector, probe, marked } = setup();
    try {
      const control = new FormControl<string | null>('a');
      probe.attach(control);
      probe.attach(control);
      expect(probe.bindings).toHaveLength(1);
      control.setValue('b');
      expect(probe.observedValues).toEqual(['b']);
      expect(probe.observedStatuses).toContain('VALID');
      expect(marked()).toBeGreaterThan(0);
    } finally { injector.destroy(); }
  });
  it('unsubscribes previous control on replacement and detachment', () => {
    const { injector, probe } = setup();
    try {
      const first = new FormControl<string | null>('a');
      const second = new FormControl<string | null>('x');
      probe.attach(first);
      probe.attach(second);
      first.setValue('ignored');
      second.setValue('observed');
      expect(probe.observedValues).toEqual(['observed']);
      expect(probe.bindings).toEqual([[undefined, first], [first, second]]);
      probe.attach(undefined);
      second.setValue('ignored-too');
      expect(probe.observedValues).toEqual(['observed']);
    } finally { injector.destroy(); }
  });
  it('stops notifications after destroy and remains idempotent', () => {
    const { injector, probe } = setup();
    const control = new FormControl<string | null>('a');
    try {
      probe.attach(control);
      probe.ngOnDestroy();
      probe.ngOnDestroy();
      control.setValue('b');
      expect(probe.observedValues).toEqual([]);
      probe.attach(new FormControl<string | null>('c'));
      expect(probe.bindings).toHaveLength(1);
    } finally { injector.destroy(); }
  });
});
