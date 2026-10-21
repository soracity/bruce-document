import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ItemStackLayoutComponent } from '../src/item-stack-layout.component.js';

describe('IMP-07 ItemStackLayoutComponent', () => {
  it('is a state-free layout component', () => {
    expect(Object.keys(new ItemStackLayoutComponent())).toEqual([]);
  });
  it('has no public inputs or outputs', () => {
    const def = (ItemStackLayoutComponent as unknown as { ɵcmp: { inputs: Record<string, unknown>; outputs: Record<string, unknown> } }).ɵcmp;
    expect(def.inputs).toEqual({});
    expect(def.outputs).toEqual({});
  });
});
