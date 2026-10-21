import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { LayoutItemComponent } from '../src/layout-item.component.js';

describe('IMP-06 LayoutItemComponent independent structure', () => {
  it('uses standalone app-layout-item selector', () => {
    expect(LayoutItemComponent.ɵcmp.selectors).toEqual([['app-layout-item']]);
    expect(LayoutItemComponent.ɵcmp.standalone).toBe(true);
  });
  it('projects content into the dedicated layout wrapper', () => {
    const definition = LayoutItemComponent.ɵcmp;
    expect(definition.ngContentSelectors).toEqual(['*']);
  });
  it('does not introduce inputs or outputs for business state', () => {
    const definition = LayoutItemComponent.ɵcmp;
    expect(definition.inputs).toEqual({});
    expect(definition.outputs).toEqual({});
  });
});
