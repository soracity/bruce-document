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
  private originalStyles?: Map<HTMLElement, {
    basis: string; grow: string; basisPriority: string; growPriority: string;
    lastBasis: string; lastGrow: string; lastBasisPriority: string; lastGrowPriority: string;
  }>;

  private allocations(): NonNullable<LayoutItemComponent['originalStyles']> {
    return this.originalStyles ??= new Map();
  }

  private priority(element: HTMLElement, name: string): string {
    return element.style.getPropertyPriority?.(name) ?? '';
  }

  private setFlex(element: HTMLElement, name: 'flex-basis' | 'flex-grow', value: string, priority: string): void {
    if (element.style.setProperty) element.style.setProperty(name, value, priority);
    else if (name === 'flex-basis') element.style.flexBasis = value;
    else element.style.flexGrow = value;
  }

  private writeAllocation(element: HTMLElement, basis: string, grow: string): void {
    let saved = this.allocations().get(element);
    if (!saved) {
      saved = {
        basis: element.style.flexBasis, grow: element.style.flexGrow,
        basisPriority: this.priority(element, 'flex-basis'),
        growPriority: this.priority(element, 'flex-grow'),
        lastBasis: element.style.flexBasis, lastGrow: element.style.flexGrow,
        lastBasisPriority: this.priority(element, 'flex-basis'),
        lastGrowPriority: this.priority(element, 'flex-grow'),
      };
      this.allocations().set(element, saved);
    }
    if (element.style.flexBasis === saved.lastBasis &&
        this.priority(element, 'flex-basis') === saved.lastBasisPriority) {
      this.setFlex(element, 'flex-basis', basis, '');
      saved.lastBasis = basis;
      saved.lastBasisPriority = '';
    }
    if (element.style.flexGrow === saved.lastGrow &&
        this.priority(element, 'flex-grow') === saved.lastGrowPriority) {
      this.setFlex(element, 'flex-grow', grow, '');
      saved.lastGrow = grow;
      saved.lastGrowPriority = '';
    }
  }

  private restoreAllocation(element: HTMLElement): void {
    const saved = this.allocations().get(element);
    if (!saved) return;
    if (element.style.flexBasis === saved.lastBasis &&
        this.priority(element, 'flex-basis') === saved.lastBasisPriority)
      this.setFlex(element, 'flex-basis', saved.basis, saved.basisPriority);
    if (element.style.flexGrow === saved.lastGrow &&
        this.priority(element, 'flex-grow') === saved.lastGrowPriority)
      this.setFlex(element, 'flex-grow', saved.grow, saved.growPriority);
    this.allocations().delete(element);
  }

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
      this.mutationObserver = new MutationObserver(records => {
        const childrenChanged = records.some(record => record.type === 'childList' && record.target === wrapper);
        if (childrenChanged) refresh();
        else if (records.some(record => record.type === 'attributes' &&
          (record.target as HTMLElement).parentElement === wrapper)) this.schedule(wrapper);
      });
      this.mutationObserver.observe(wrapper, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'class'] });
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
    for (const element of this.allocations().keys()) this.restoreAllocation(element);
  }
  /** Recalculate visible projected siblings after DOM changes. */
  distribute(wrapper: HTMLElement, requiredWidth: (element: HTMLElement) => number = () => 0): void {
    const children = Array.from(wrapper.children) as HTMLElement[];
    const visible = children.filter(element => !element.hidden && element.getClientRects().length > 0 &&
      getComputedStyle(element).display !== 'none');
    for (const element of children) {
      if (!visible.includes(element)) {
        this.restoreAllocation(element);
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
      if (!/^(?:\d+(?:\.\d*)?|\.\d+)px$/.test(value.trim())) throw new Error('BRUCE_LAYOUT_GAP');
      return Number.parseFloat(value);
    };
    const gap = wrapperStyle.columnGap === 'normal' ? 0 : px(wrapperStyle.columnGap);
    const available = Math.max(0, wrapper.getBoundingClientRect().width -
      px(wrapperStyle.paddingLeft) - px(wrapperStyle.paddingRight) -
      px(wrapperStyle.borderLeftWidth) - px(wrapperStyle.borderRightWidth));
    const rows = LayoutRowUtil.partition(metrics,available,gap);
    if (!rows.length) {
      for (const element of visible) this.restoreAllocation(element);
      return;
    }
    for (const row of rows) {
      row.items.forEach((item,index) => {
        this.writeAllocation(item.element, row.widths[index] + 'px', '0');
      });
    }
  }
}
