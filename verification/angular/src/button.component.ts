/** 工程③ IMP-13 ButtonComponent: UI-06 のイベント契約を独立検証。文字あふれcontrollerは後続。 */
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ComponentBase } from './component-base.js';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block;min-width:0', '[class.bruce-hidden]': '!effectiveVisible()' },
  template: `<button type="button" class="btn text-button font-button btn-outline btn-secondary md:btn-md"
      [attr.aria-label]="label()" (click)="onClick()">
    <span class="bruce-text-viewport" aria-hidden="true"><span class="bruce-text-track">{{ label() }}</span></span>
  </button>`,
  styles: [':host button { width:100%; }'],
})
export class ButtonComponent extends ComponentBase {
  readonly label = input('');
  readonly eventKey = input('');
  readonly buttonClick = output<string>();
  onClick(): void { this.buttonClick.emit(this.eventKey()); }
}
