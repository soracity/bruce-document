/** 工程③ IMP-15 GroupComponent: UI-08 外観disabledと子操作の責務分離。 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentBase } from './component-base.js';

@Component({
  selector:'app-group',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;min-width:0', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`<fieldset class="fieldset p-2 rounded-lg border ap-grid-border-color" [class.opacity-50]="disabled()">
    @if (withLabel()) { <legend>{{ label() }}</legend> }
    <ng-content />
  </fieldset>`,
})
export class GroupComponent extends ComponentBase {
  readonly label = input('');
  readonly withLabel = input(true);
  readonly disabled = input(false);
}
