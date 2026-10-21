import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { FormControl, Validators } from '@angular/forms';
import { AppInputValidators } from '../src/app-input-validators.js';

describe('IMP-31 / FORMAT-02 requiredTrim', () => {
  it.each([null, undefined, '', ' ', '   ', '\t\n', '　'])
  ('rejects absent or whitespace-only value %s', value => {
    expect(AppInputValidators.requiredTrim(new FormControl(value))).toEqual({ required: true });
  });

  it.each(['abc', 'abc def', '  a  ', '0'])
  ('accepts nonblank string %s without mutation', value => {
    const control = new FormControl(value);
    expect(AppInputValidators.requiredTrim(control)).toBeNull();
    expect(control.value).toBe(value);
  });

  it.each([0, false, true, 15, [], {}])
  ('rejects non-string value %s with stringType', value => {
    expect(AppInputValidators.requiredTrim(new FormControl(value))).toEqual({ stringType: true });
  });
});

describe('IMP-31 / FORMAT-02 ascii', () => {
  it.each([null, undefined, '', 'AZaz09', 'abc def', '\t\n', '\x00', '\x7f'])
  ('allows optional or ASCII value %s', value => {
    expect(AppInputValidators.ascii(new FormControl(value))).toBeNull();
  });

  it.each(['あ', '１２３', 'é', 'A😀', 'a\u0080'])
  ('rejects non-ASCII value %s', value => {
    expect(AppInputValidators.ascii(new FormControl(value))).toEqual({ ascii: true });
  });

  it.each([0, false, true, {}, []])
  ('rejects non-string value %s', value => {
    expect(AppInputValidators.ascii(new FormControl(value))).toEqual({ stringType: true });
  });

  it('is distinct from Angular pattern and required validators', () => {
    const digits = Validators.pattern('^[0-9]+$');
    const empty = new FormControl('');
    expect(AppInputValidators.ascii(empty)).toBeNull();
    expect(digits(empty)).toBeNull();
    expect(AppInputValidators.requiredTrim(empty)).toEqual({ required: true });
    const fullWidth = new FormControl('１２３');
    expect(AppInputValidators.ascii(fullWidth)).toEqual({ ascii: true });
    expect(digits(fullWidth)).toHaveProperty('pattern');
  });
});
