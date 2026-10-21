import { describe, expect, it, vi } from 'vitest';
import { LayoutMetricsService } from '../src/layout-metrics.service.js';
const element = () => ({} as HTMLElement);
describe('IMP-04 LayoutMetricsService', () => {
  it('returns undefined for unregistered elements', () => {
    expect(new LayoutMetricsService().requiredWidth(element())).toBeUndefined();
  });
  it('preserves zero width and unregisters', () => {
    const s = new LayoutMetricsService(), el = element();
    const stop = s.register(el, () => 0);
    expect(s.requiredWidth(el)).toBe(0);
    stop();
    expect(s.requiredWidth(el)).toBeUndefined();
  });
  it('rejects duplicate registrations but permits prior watch', () => {
    const s = new LayoutMetricsService(), el = element();
    const unwatch = s.watch([el], () => {});
    const stop = s.register(el, () => 12);
    expect(() => s.register(el, () => 10)).toThrow('BRUCE_LAYOUT_MEASURE_DUPLICATE');
    stop(); unwatch();
    expect(s.requiredWidth(el)).toBeUndefined();
  });
  it.each([-1, NaN, Infinity, -Infinity])('rejects invalid measured width %s', value => {
    const s = new LayoutMetricsService(), el = element();
    s.register(el, () => value);
    expect(() => s.requiredWidth(el)).toThrow('BRUCE_LAYOUT_MEASURE_VALUE');
  });
  it('notifies only watched elements and stops after unsubscribe', () => {
    const s = new LayoutMetricsService(), a = element(), b = element();
    const cb = vi.fn(), stop = s.watch([a], cb);
    s.invalidate(b);
    s.invalidate(a);
    expect(cb).toHaveBeenCalledTimes(1);
    stop(); s.invalidate(a);
    expect(cb).toHaveBeenCalledTimes(1);
  });
  it('allows self-unsubscription during notification without skipping other listeners', () => {
    const s = new LayoutMetricsService(), el = element();
    const second = vi.fn();
    let stop = () => {};
    stop = s.watch([el], () => stop());
    s.watch([el], second);
    s.invalidate(el);
    expect(second).toHaveBeenCalledTimes(1);
  });
  it('does not let old unregister remove a later registration', () => {
    const s = new LayoutMetricsService(), el = element();
    const old = s.register(el, () => 1);
    old();
    s.register(el, () => 2);
    old();
    expect(s.requiredWidth(el)).toBe(2);
  });
});
