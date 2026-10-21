import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { FormControl } from '@angular/forms';
import { FormControlComponentBase } from '../src/form-control-component-base.js';

describe('IMP-02 FormControlComponentBase compile contract', () => {
  it('exports an abstract base class without constructing it outside Angular injection', () => {
    expect(typeof FormControlComponentBase).toBe('function');
    type ControlInput = FormControl<string | null>;
    const value: ControlInput = new FormControl<string | null>('');
    expect(value.value).toBe('');
  });
});
