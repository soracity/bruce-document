import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { ChangeDetectorRef, createEnvironmentInjector, runInInjectionContext, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵEffectScheduler as EffectScheduler } from '@angular/core';
import { GroupComponent } from '../src/group.component.js';
function setup() {
  const injector = createEnvironmentInjector([
    { provide: ChangeDetectionScheduler, useValue: { notify: () => {} } },
    { provide: EffectScheduler, useValue: { add: () => {}, flush: () => {}, remove: () => {} } },
    { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
  ], null as never);
  return { component: runInInjectionContext(injector, () => new GroupComponent()), injector };
}
describe('IMP-15 GroupComponent independent validation', () => {
  it('is a standalone group with the documented selector', () => {
    expect(GroupComponent.ɵcmp.selectors).toEqual([['app-group']]);
    expect(GroupComponent.ɵcmp.standalone).toBe(true);
  });
  it('defaults to showing label and not dimming content', () => {
    const { component, injector } = setup();
    try {
      expect(component.withLabel()).toBe(true);
      expect(component.disabled()).toBe(false);
      expect(component.label()).toBe('');
    } finally { injector.destroy(); }
  });
  it('keeps visibility as a separate common-style concern', () => {
    const { component, injector } = setup();
    try { expect(component.effectiveVisible()).toBe(true); }
    finally { injector.destroy(); }
  });
});
