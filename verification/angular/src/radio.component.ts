/** 工程③ IMP-11 RadioComponent: UI-04 独立検証用の最小実装。 */
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponentBase } from './form-control-component-base.js';

export type RadioMode = 'RADIO' | 'BUTTON';
@Component({
  selector:'app-radio',
  standalone:true,
  imports:[ReactiveFormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;width:100%;min-width:0', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`<div [class.join]="type() === 'BUTTON'" [class.flex]="type() === 'BUTTON'">
    @for (option of values(); track $index; let i = $index) {
      <label [class.join-item]="type() === 'BUTTON'" [class.flex-1]="type() === 'BUTTON'" [class.min-w-0]="type() === 'BUTTON'">
        <input type="radio" [class.sr-only]="type() === 'BUTTON'" [name]="requireGroupName()"
          [value]="option" [formControl]="requireControl()" [attr.aria-label]="optionLabel(i, option)"
          (change)="onChange()" />
        <span>{{ optionLabel(i, option) }}</span>
      </label>
    }
  </div>`,
})
export class RadioComponent<T> extends FormControlComponentBase<T> {
  readonly type = input<RadioMode>('RADIO');
  readonly groupName = input.required<string>();
  readonly label = input<readonly string[]>();
  readonly values = input<readonly T[]>([]);
  readonly eventKey = input('');
  readonly radioChange = output<string>();
  requireGroupName():string {
    const name = this.groupName();
    if (!name.trim()) throw new Error('BRUCE_RADIO_GROUP_REQUIRED');
    return name;
  }
  optionLabel(index:number, option:T):string {
    return this.label()?.[index] ?? String(option);
  }
  onChange():void {
    queueMicrotask(() => this.radioChange.emit(this.eventKey()));
  }
}
