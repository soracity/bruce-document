/** 工程③ IMP-12 ToggleComponent: UI-05 のcontrol優先・外部checked制御を独立実装。 */
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControlComponentBase } from './form-control-component-base.js';

export class AppCodeBooleanEnum {
  private constructor(readonly value: 'TRUE' | 'FALSE') {}
  static readonly TRUE = new AppCodeBooleanEnum('TRUE');
  static readonly FALSE = new AppCodeBooleanEnum('FALSE');
}
export type ToggleMode = 'SLIDE' | 'BUTTON';

@Component({
  selector:'app-toggle',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;min-width:0', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`@if (type() === 'SLIDE') {
    <label><input type="checkbox" class="toggle" [checked]="isChecked()" [disabled]="isDisabled()" (change)="onChange($event)" (blur)="onBlur()" />{{ label() }}</label>
  } @else if (type() === 'BUTTON') {
    <label class="btn btn-outline btn-secondary"><input type="checkbox" class="sr-only" [checked]="isChecked()" [disabled]="isDisabled()" (change)="onChange($event)" (blur)="onBlur()" />{{ icon() }} {{ label() }}</label>
  }`,
})
export class ToggleComponent extends FormControlComponentBase<AppCodeBooleanEnum | null> {
  readonly type = input<ToggleMode>();
  readonly checked = input<boolean>();
  readonly disabled = input(false);
  readonly label = input('');
  readonly icon = input('');
  readonly eventKey = input('');
  readonly toggleChange = output<string>();

  isChecked():boolean {
    return this.checked() ?? (this.control()?.value === AppCodeBooleanEnum.TRUE);
  }
  isDisabled():boolean {
    return this.control()?.disabled ?? this.disabled();
  }
  onChange(event:Event):void {
    if (this.isDisabled()) return;
    const target = event.target;
    if (!target || typeof (target as HTMLInputElement).checked !== 'boolean') throw new Error('BRUCE_TOGGLE_TARGET');
    const control = this.control();
    if (control) {
      control.setValue((target as HTMLInputElement).checked ? AppCodeBooleanEnum.TRUE : AppCodeBooleanEnum.FALSE);
      control.markAsDirty();
    }
    this.toggleChange.emit(this.eventKey());
  }
  onBlur():void { this.control()?.markAsTouched(); }
}
