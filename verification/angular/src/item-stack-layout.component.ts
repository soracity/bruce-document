/** 工程③ IMP-07: 06章LAY-01からの独立実装。 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-stack-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div class="bruce-item-stack"><ng-content /></div>',
  styles: [`.bruce-item-stack { display: flex; flex-direction: column; gap: 1rem; }`],
})
export class ItemStackLayoutComponent {}
