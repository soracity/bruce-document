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
