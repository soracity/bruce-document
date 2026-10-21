/** 工程③ IMP-09 TextboxComponent: UI-02 の設計書単独検証。 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponentBase } from './form-control-component-base.js';

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block;min-width:0', '[class.bruce-hidden]': '!effectiveVisible()' },
  template: `<label class="floating-label">
    <span>{{ label() }}</span>
    <input type="text" [formControl]="requireControl()" [placeholder]="placeholder()"
      class="input text-input font-input textbox-input border focus:border-neutral" />
  </label>`,
  styles: [':host .textbox-input { width:100%; box-sizing:border-box; }'],
})
export class TextboxComponent extends FormControlComponentBase<string | null> {
  readonly label = input('');
  readonly placeholder = input('');
}
