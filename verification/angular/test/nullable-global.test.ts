import { describe, expect, it } from 'vitest';
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;
type NullableIncludesNull = Assert<IsEqual<Nullable<string>, string | null>>;
type NullableDoesNotIncludeUndefined = Assert<IsEqual<undefined extends Nullable<string> ? true : false, false>>;
type NullableNumber = Assert<IsEqual<Nullable<number>, number | null>>;
describe('IMP-30 TYPE-01 Nullable global type', () => {
  it('accepts values and null without runtime transformation', () => {
    const text: Nullable<string> = null;
    const number: Nullable<number> = 5;
    const compileChecks: [NullableIncludesNull, NullableDoesNotIncludeUndefined, NullableNumber] =
      [true, true, true];
    expect([text, number, compileChecks]).toEqual([null, 5, [true, true, true]]);
  });
});
