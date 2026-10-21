import { describe, expect, it } from 'vitest';
import { FormControl } from '@angular/forms';
import { AppInputValidators } from '../src/app-input-validators.js';

describe('IMP-31 AppInputValidators independent tests', () => {
  it('treats null, empty and whitespace-only strings as required', () => {
    const validator = AppInputValidators.requiredTrimmed();
    for (const value of [null, '', ' ', '\t\n', '　']) {
      expect(validator(new FormControl(value))).toEqual({ required: true });
    }
  });
  it('does not trim or mutate the control value', () => {
    const control = new FormControl('  a  ');
    expect(AppInputValidators.requiredTrimmed()(control)).toBeNull();
    expect(control.value).toBe('  a  ');
  });
  it('accepts only ASCII digits, while allowing an empty optional field', () => {
    const validator = AppInputValidators.asciiDigits();
    for (const value of ['0', '123456', '007', '']) {
      expect(validator(new FormControl(value))).toBeNull();
    }
    for (const value of ['１２３', '1 2', '1.5', '-1', 'abc']) {
      expect(validator(new FormControl(value))).toHaveProperty('pattern');
    }
  });
});
