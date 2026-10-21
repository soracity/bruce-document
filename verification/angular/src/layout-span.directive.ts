/** 工程③ IMP-08: 06章LAY-01から独立実装。Bruce本体ソースは参照しない。 */
import { Directive, HostBinding, Input } from '@angular/core';

export function assertLayoutSpan(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new Error('BRUCE_SPAN_VALUE');
  }
}

@Directive({ selector: '[appLayoutSpan]', standalone: true })
export class LayoutSpanDirective {
  private weight = 1;

  @HostBinding('style.--bruce-layout-weight')
  get layoutWeight(): string { return String(this.weight); }

  @Input()
  set appLayoutSpan(value: number) {
    assertLayoutSpan(value);
    this.weight = value;
  }

  get appLayoutSpan(): number { return this.weight; }
}
