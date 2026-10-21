import { describe, expect, it } from 'vitest';
import { LayoutRowUtil, type LayoutMetric } from '../src/layout-row.util.js';
const m = (required: number, weight: number): LayoutMetric =>
  ({ element: {} as HTMLElement, required, weight });
describe('IMP-05 LayoutRowUtil partition', () => {
  it('preserves greedy split and per-row weights from DISPLAY-03 example', () => {
    const a = m(200, 50), b = m(160, 30), c = m(120, 20);
    const rows = LayoutRowUtil.partition([a,b,c], 600, 8);
    expect(rows.map(r => r.items)).toEqual([[a,b],[c]]);
    expect(rows[0]!.widths[0]).toBeCloseTo(370);
    expect(rows[0]!.widths[1]).toBeCloseTo(222);
    expect(rows[1]!.widths).toEqual([600]);
  });
  it('returns no rows for empty items or zero available width', () => {
    expect(LayoutRowUtil.partition([], 600, 8)).toEqual([]);
    expect(LayoutRowUtil.partition([m(20,1)], 0, 8)).toEqual([]);
  });
  it('clamps oversized item to one row of available width', () => {
    expect(LayoutRowUtil.partition([m(1000,1)], 100, 8)[0]!.widths).toEqual([100]);
  });
  it('splits when gap alone exceeds available width', () => {
    expect(LayoutRowUtil.partition([m(0,1),m(0,1)], 4, 8)).toHaveLength(2);
  });
  it('keeps ordering and width sum including gaps', () => {
    const items = [m(0,1),m(0,2),m(0,3)];
    const rows = LayoutRowUtil.partition(items, 100, 5);
    expect(rows[0]!.items).toEqual(items);
    expect(rows[0]!.widths.reduce((a,b)=>a+b,0) + 10).toBeCloseTo(100);
  });
  it('handles huge finite weights without overflow', () => {
    const rows = LayoutRowUtil.partition([m(0,1e308),m(0,1e308)],100,0);
    expect(rows[0]!.widths).toEqual([50,50]);
  });
  it.each([-1, NaN, Infinity])('rejects invalid gap %s', gap => {
    expect(() => LayoutRowUtil.partition([m(1,1)], 100, gap)).toThrow('BRUCE_LAYOUT_VALUE');
  });
  it.each([-1, NaN, Infinity])('rejects invalid required width %s', required => {
    expect(() => LayoutRowUtil.partition([m(required,1)], 100, 0)).toThrow('BRUCE_LAYOUT_VALUE');
  });
  it('splits after a candidate fails and preserves original input weights', () => {
    const items = [m(50, 1), m(50, 1), m(90, 1)];
    const before = items.map(item => item.weight);
    const rows = LayoutRowUtil.partition(items, 100, 0);
    expect(rows.map(row => row.items)).toEqual([[items[0], items[1]], [items[2]]]);
    expect(items.map(item => item.weight)).toEqual(before);
  });
  it.each([-1, NaN, Infinity])('rejects invalid available %s', n => {
    expect(()=>LayoutRowUtil.partition([m(1,1)],n,0)).toThrow('BRUCE_LAYOUT_VALUE');
  });
  it.each([0,-1,NaN,Infinity])('rejects invalid weight %s', n => {
    expect(()=>LayoutRowUtil.partition([m(1,n)],100,0)).toThrow('BRUCE_LAYOUT_VALUE');
  });
});


describe('IMP-05 LayoutRowUtil partition invariants', () => {
  it('never allocates negative widths and conserves row width', () => {
    for (const available of [1, 10, 99, 200, 600]) {
      for (const gap of [0, 1, 8, 30]) {
        const items = [m(0,1), m(0,3), m(0,5), m(0,7)];
        const rows = LayoutRowUtil.partition(items, available, gap);
        expect(rows.flatMap(row => row.items)).toEqual(items);
        for (const row of rows) {
          expect(row.widths).toHaveLength(row.items.length);
          expect(row.widths.every(width => Number.isFinite(width) && width >= 0)).toBe(true);
          expect(row.widths.reduce((a,b) => a+b,0) + gap * (row.items.length-1)).toBeCloseTo(available, 7);
        }
      }
    }
  });
  it('preserves item identity and never mutates original metrics', () => {
    const items = [m(90,2), m(40,5), m(200,3)];
    const snapshot = items.map(x => ({ required:x.required, weight:x.weight, element:x.element }));
    const rows = LayoutRowUtil.partition(items, 150, 8);
    expect(rows.flatMap(row=>row.items)).toEqual(items);
    expect(items.map(x=>({ required:x.required, weight:x.weight, element:x.element }))).toEqual(snapshot);
  });
});
