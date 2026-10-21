import { describe, expect, it } from 'vitest';
import { parseDate, parseLocal } from '../src/local-date-time-codec.js';
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

describe('IMP-10 UIIMPL-04 parseLocal (partial codec)', () => {
  it.each([
    ['2024-02-29T23:59', 23, 59, 0, 0],
    ['2024-02-29T00:00:01', 0, 0, 1, 0],
    ['2024-02-29T12:30:45.1', 12, 30, 45, 100],
    ['2024-02-29T12:30:45.12', 12, 30, 45, 120],
    ['2024-02-29T12:30:45.123', 12, 30, 45, 123],
  ])('parses local datetime %s', (raw, hour, minute, second, millisecond) => {
    expect(parseLocal(raw)).toEqual({
      ok: true, value: { year: 2024, month: 2, day: 29, hour, minute, second, millisecond },
    });
  });
  it.each(['2024-02-29T24:00', '2024-02-29T23:60', '2024-02-29T23:59:60'])(
    'rejects invalid time %s', raw => {
      expect(parseLocal(raw)).toEqual({ ok: false, error: { reason: 'invalidLocalValue', raw } });
    });
  it.each(['2024-02-29 12:30', '2024-02-29T12', '2024-02-29T12:30.1', '2024-02-29T12:30:00.1234'])(
    'rejects malformed datetime %s', raw => {
      expect(parseLocal(raw)).toEqual({ ok: false, error: { reason: 'incomplete', raw } });
    });
  it('rejects nonexistent leap date in local datetime', () => {
    expect(parseLocal('2023-02-29T12:30')).toEqual({
      ok: false, error: { reason: 'invalidDate', raw: '2023-02-29T12:30' },
    });
  });
});
