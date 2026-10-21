import { describe, expect, it } from 'vitest';
import { parseDate } from '../src/local-date-time-codec.js';
describe('IMP-10 UIIMPL-04 parseDate (partial codec)', () => {
  it.each([
    ['2024-02-29', 2024, 2, 29], ['2000-02-29', 2000, 2, 29],
    ['0001-01-01', 1, 1, 1], ['0000002024-12-31', 2024, 12, 31],
    ['10000-12-31', 10000, 12, 31],
  ])('parses valid calendar date %s', (raw, year, month, day) => {
    expect(parseDate(raw)).toEqual({ ok: true, value: { year, month, day } });
  });
  it.each([
    '1900-02-29', '2023-02-29', '2024-02-30', '2024-04-31',
    '2024-00-01', '2024-13-01', '2024-01-00', '0000-01-01',
    '999999999999999999-01-01',
  ])('rejects invalid calendar date %s', raw => {
    expect(parseDate(raw)).toEqual({ ok: false, error: { reason: 'invalidDate', raw } });
  });
  it.each(['2024-1-01', '2024-01-1', '2024/01/01', '2024-01-01T00:00', '', '2024-01-01Z'])(
    'rejects malformed date %s', raw => {
      expect(parseDate(raw)).toEqual({ ok: false, error: { reason: 'incomplete', raw } });
    });
});
