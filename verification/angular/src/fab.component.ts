/** 工程③ IMP-14 FabComponent: UI-07 の独立検証。共通スタイル適用は後続。 */
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ComponentBase } from './component-base.js';

@Component({
  selector:'app-fab',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;block-size:calc(4rem + env(safe-area-inset-bottom,0px))', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`<div class="fab">
    <button type="button" class="btn btn-primary btn-circle btn-lg"
      [attr.aria-label]="ariaLabel()" (click)="onClick()">
      <span aria-hidden="true"><ng-content /></span>
    </button>
  </div>`,
  styles:[`.fab { bottom:calc(var(--app-fab-bottom-offset,4rem) + 1rem + env(safe-area-inset-bottom,0px)); right:calc(1rem + env(safe-area-inset-right,0px)); }`],
})
export class FabComponent extends ComponentBase {
  readonly ariaLabel = input.required<string>();
  readonly eventKey = input('');
  readonly buttonClick = output<string>();
  onClick():void { this.buttonClick.emit(this.eventKey()); }
}
