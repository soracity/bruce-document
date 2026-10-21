import { describe, expect, it } from 'vitest';
import { imp30TypeCheck } from '../src/app-component-types.typecheck.js';
import { APP_CODE_ENUM_BRAND } from '../src/app/brf9000/brf9011-enum/code/app-code.enum-if.js';
import type { AppCodeEnumIf } from '../src/app/brf9000/brf9011-enum/code/app-code.enum-if.js';

describe('IMP-30 TYPE-01 module/global type boundary', () => {
  it('passes strict compile-time checks for EventKey and Value types', () => {
    expect(imp30TypeCheck).toEqual([true, true, true, true]);
  });
  it('keeps the Symbol brand on the shared enum fixture, not a serialized string brand', () => {
    const value: AppCodeEnumIf = { [APP_CODE_ENUM_BRAND]: true, name: 'ONE', value: '1' };
    const eventKey: AppComponentEventKeyType = value;
    expect(eventKey).toBe(value);
    expect(Object.getOwnPropertySymbols(value)).toContain(APP_CODE_ENUM_BRAND);
    expect(JSON.stringify(value)).toBe('{"name":"ONE","value":"1"}');
  });
});
