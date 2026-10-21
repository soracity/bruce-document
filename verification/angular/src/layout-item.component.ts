/** 工程③ IMP-06 LayoutItemComponent: LAY-01 投影と行ラッパーの独立実装（計測は後続）。 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class LayoutItemComponent {
  /** Recalculate visible projected siblings after DOM changes. */
  distribute(wrapper: HTMLElement, requiredWidth: (element: HTMLElement) => number = () => 0): void {
    const children = Array.from(wrapper.children) as HTMLElement[];
    const visible = children.filter(element => element.getClientRects().length > 0 &&
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
    const gap = Number.parseFloat(getComputedStyle(wrapper).columnGap) || 0;
    const rows = LayoutRowUtil.partition(metrics,wrapper.clientWidth,gap);
    for (const row of rows) {
      row.items.forEach((item,index) => {
        item.element.style.flexGrow = '0';
        item.element.style.flexBasis = row.widths[index] + 'px';
      });
    }
  }
}
