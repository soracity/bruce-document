import { describe, expect, it, vi, afterEach } from 'vitest';
import { AppDateUtil } from '../src/app-date.util.js';

afterEach(() => vi.useRealTimers());

describe('IMP-31 / DEFAULT-02 AppDateUtil', () => {
  it('returns the local calendar date, not the UTC date substring', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-16T23:58:59.123Z'));
    const now = new Date();
    const expected = [
      String(now.getFullYear()).padStart(4, '0'),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');
    expect(AppDateUtil.getSysDateIso8601()).toBe(expected);
    expect(expected).toMatch(/^\d{4,}-\d{2}-\d{2}$/);
  });

  it('returns exact UTC ISO 8601 for the time at method invocation', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-16T06:24:00.000Z'));
    expect(AppDateUtil.getSysDateTimeUtcIso8601()).toBe('2026-10-16T06:24:00.000Z');
  });

  it('uses the current time on every invocation rather than a cached build-time value', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-16T23:59:59.999Z'));
    const first = AppDateUtil.getSysDateTimeUtcIso8601();
    vi.setSystemTime(new Date('2026-10-17T00:00:00.000Z'));
    const second = AppDateUtil.getSysDateTimeUtcIso8601();
    expect(first).toBe('2026-10-16T23:59:59.999Z');
    expect(second).toBe('2026-10-17T00:00:00.000Z');
  });
});
