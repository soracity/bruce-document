/** 工程③ IMP-06 LayoutItemComponent: LAY-01 投影・幅配分・変更監視の独立検証。 */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import { LayoutMetricsService } from './layout-metrics.service.js';
import { LayoutRowUtil, type LayoutMetric } from './layout-row.util.js';

@Component({
  selector: 'app-layout-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block;min-width:0;width:100%' },
  template: '<div class="bruce-layout-items"><ng-content /></div>',
  styles: [`
    .bruce-layout-items {
      display:flex;
      flex-wrap:wrap;
      gap:0.5rem;
      min-width:0;
      width:100%;
    }
    .bruce-layout-items > * {
      min-width:0;
      box-sizing:border-box;
      flex-grow:var(--bruce-layout-weight,1);
      flex-basis:0;
    }
  `],
})
export class LayoutItemComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly metrics = inject(LayoutMetricsService);
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private unsubscribe?: () => void;
  private frame?: number;
  private disposed = false;

  ngAfterViewInit(): void {
    const wrapper = this.host.nativeElement.querySelector('.bruce-layout-items') as HTMLElement | null;
    if (!wrapper) return;
    const refresh = () => {
      this.unsubscribe?.();
      this.unsubscribe = this.metrics.watch(Array.from(wrapper.children) as HTMLElement[], () => this.schedule(wrapper));
      this.schedule(wrapper);
    };
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.schedule(wrapper));
      this.resizeObserver.observe(wrapper);
    }
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(refresh);
      this.mutationObserver.observe(wrapper, { childList: true, subtree: false, attributes: true, attributeFilter: ['hidden', 'class'] });
    }
    refresh();
  }

  private schedule(wrapper: HTMLElement): void {
    if (this.disposed || this.frame !== undefined) return;
    if (typeof requestAnimationFrame !== 'function') {
      this.distribute(wrapper, element => this.metrics.requiredWidth(element) ?? 0);
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      if (!this.disposed) this.distribute(wrapper, element => this.metrics.requiredWidth(element) ?? 0);
    });
  }

  ngOnDestroy(): void {
    this.disposed = true;
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.unsubscribe?.();
    if (this.frame !== undefined && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(this.frame);
    this.frame = undefined;
  }
  /** Recalculate visible projected siblings after DOM changes. */
  distribute(wrapper: HTMLElement, requiredWidth: (element: HTMLElement) => number = () => 0): void {
    const children = Array.from(wrapper.children) as HTMLElement[];
    const visible = children.filter(element => !element.hidden && element.getClientRects().length > 0 &&
      getComputedStyle(element).display !== 'none');
    for (const element of children) {
      if (!visible.includes(element)) {
        element.style.flexBasis = '';
        element.style.flexGrow = '';
      }
    }
    if (!visible.length) return;
    const metrics: LayoutMetric[] = visible.map(element => {
      const weightText = getComputedStyle(element).getPropertyValue('--bruce-layout-weight').trim();
      const weight = weightText === '' ? 1 : Number(weightText);
      if (!Number.isFinite(weight) || weight <= 0) throw new Error('BRUCE_SPAN_VALUE');
      return {element,weight,required:requiredWidth(element)};
    });
    const wrapperStyle = getComputedStyle(wrapper);
    const px = (value: string): number => {
      if (value === '0') return 0;
      if (!/^(?:\\d+(?:\\.\\d*)?|\\.\\d+)px$/.test(value.trim())) throw new Error('BRUCE_LAYOUT_GAP');
      return Number.parseFloat(value);
    };
    const gap = wrapperStyle.columnGap === 'normal' ? 0 : px(wrapperStyle.columnGap);
    const available = Math.max(0, wrapper.getBoundingClientRect().width -
      px(wrapperStyle.paddingLeft) - px(wrapperStyle.paddingRight) -
      px(wrapperStyle.borderLeftWidth) - px(wrapperStyle.borderRightWidth));
    const rows = LayoutRowUtil.partition(metrics,available,gap);
    if (!rows.length) {
      for (const element of visible) {
        element.style.flexBasis = '';
        element.style.flexGrow = '';
      }
      return;
    }
    for (const row of rows) {
      row.items.forEach((item,index) => {
        item.element.style.flexGrow = '0';
        item.element.style.flexBasis = row.widths[index] + 'px';
      });
    }
  }
}
