import { describe, it, expect } from 'vitest';
import { ComponentBase } from '../src/component-base.js';
import { createEnvironmentInjector, runInInjectionContext } from '@angular/core';
class Probe extends ComponentBase {}
describe('IMP-01 ComponentBase', () => {
  it('uses documented defaults', () => {
    const injector = createEnvironmentInjector([], null as never);
    try {
      const component = runInInjectionContext(injector, () => new Probe());
      expect(component.effectiveBorder()).toBe(true);
      expect(component.effectiveBorderWidth()).toBe(1);
      expect(component.effectiveRounded()).toBe(true);
      expect(component.effectiveRoundedSize()).toBe(8);
      expect(component.effectiveShadow()).toBe(false);
      expect(component.effectiveShadowSize()).toBe('md');
      expect(component.effectivePadding()).toBe(8);
      expect(component.effectiveVisible()).toBe(true);
      expect(component.styleClasses()).toBe('');
    } finally { injector.destroy(); }
  });
});

class OverrideProbe extends ComponentBase {
  protected override getDefaultPadding(): 8 { return 8; }
  protected override getDefaultShadow(): boolean { return true; }
  inspect(group: 'border' | 'rounded' | 'shadow' | 'padding'): boolean { return this.shouldApply(group); }
}

describe('IMP-01 override checks', () => {
  it('activates overridden groups', () => {
    const injector = createEnvironmentInjector([], null as never);
    try {
      const p = runInInjectionContext(injector, () => new OverrideProbe());
      expect(p.inspect('padding')).toBe(true);
      expect(p.inspect('shadow')).toBe(true);
      expect(p.inspect('border')).toBe(false);
      expect(p.styleClasses()).toBe('shadow-md p-2');
    } finally { injector.destroy(); }
  });
  it('keeps unspecified colors undefined', () => {
    const injector = createEnvironmentInjector([], null as never);
    try {
      const p = runInInjectionContext(injector, () => new Probe());
      expect(p.effectiveBackgroundColor()).toBeUndefined();
      expect(p.effectiveTextColor()).toBeUndefined();
    } finally { injector.destroy(); }
  });
});
