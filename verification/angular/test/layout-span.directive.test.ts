import { describe, expect, it } from 'vitest';
import { LayoutSpanDirective, assertLayoutSpan } from '../src/layout-span.directive.js';

describe('IMP-08 LayoutSpanDirective', () => {
  it('uses weight 1 before explicit input', () => {
    const directive = new LayoutSpanDirective();
    expect(directive.appLayoutSpan).toBe(1);
    expect(directive.layoutWeight).toBe('1');
  });
  it.each([0.5, 1, 20, 100, 120])('accepts finite positive weight %s', value => {
    const directive = new LayoutSpanDirective();
    directive.appLayoutSpan = value;
    expect(directive.appLayoutSpan).toBe(value);
    expect(directive.layoutWeight).toBe(String(value));
  });
  it.each([0, -1, -0.5, Infinity, -Infinity, NaN, null, undefined, '20'])(
    'rejects invalid weight %s without silently defaulting', value => {
      const directive = new LayoutSpanDirective();
      expect(() => { directive.appLayoutSpan = value as number; }).toThrow('BRUCE_SPAN_VALUE');
      expect(directive.layoutWeight).toBe('1');
    }
  );
  it('keeps prior valid value after rejected change', () => {
    const directive = new LayoutSpanDirective();
    directive.appLayoutSpan = 30;
    expect(() => { directive.appLayoutSpan = 0; }).toThrow('BRUCE_SPAN_VALUE');
    expect(directive.layoutWeight).toBe('30');
  });
  it('validates weight without enforcing runtime sum 100', () => {
    expect(() => assertLayoutSpan(35)).not.toThrow();
    expect(() => assertLayoutSpan(150)).not.toThrow();
  });
});
