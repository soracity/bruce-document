import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { LabelComponent } from '../src/label.component.js';
function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  return { component: runInInjectionContext(injector, () => new LabelComponent()), injector };
}
describe('IMP-17 LabelComponent initial independent tests', () => {
  it('uses the documented standalone selector', () => {
    expect(LabelComponent.ɵcmp.selectors).toEqual([['app-label']]);
    expect(LabelComponent.ɵcmp.standalone).toBe(true);
  });
  it('defaults to WRAP and an empty label', () => {
    const { component, injector } = setup();
    try {
      expect(component.label()).toBe('');
      expect(component.textOverflowMode()).toBe('WRAP');
      expect(component.isMarquee()).toBe(false);
    } finally { injector.destroy(); }
  });
  it('inherits common visibility defaults', () => {
    const { component, injector } = setup();
    try { expect(component.effectiveVisible()).toBe(true); }
    finally { injector.destroy(); }
  });
});
