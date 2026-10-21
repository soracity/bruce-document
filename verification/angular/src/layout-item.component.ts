/** 工程③ IMP-06 LayoutItemComponent: LAY-01 投影と行ラッパーの独立実装（計測は後続）。 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class LayoutItemComponent {}
