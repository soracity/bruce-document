/** 工程③ IMP-16 AlertComponent: UI-09 の独立実装。Enum接続・i18nは別検証。 */
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ComponentBase } from './component-base.js';

export type AlertLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export type AlertBackground = 'NORMAL' | 'SOFT';
export type AlertButtonMode = 'OK_ONLY' | 'OK_CANCEL';
export type AlertButtonColor = 'NORMAL' | 'SOFT' | 'OUTLINE';
export type AlertButtonKey = 'OK' | 'CANCEL';
const LEVEL_CLASSES: Record<AlertLevel,string> = {
  INFO:'alert-info', SUCCESS:'alert-success', WARNING:'alert-warning', ERROR:'alert-error',
};
const BUTTON_CLASSES: Record<AlertButtonColor,string> = {
  NORMAL:'', SOFT:'alert-soft', OUTLINE:'btn-outline',
};

@Component({
  selector:'app-alert',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;min-width:0', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`<div role="alert" class="alert alert-vertical md:alert-horizontal" [class]="alertClasses()">
    <span class="alert-message">{{ message() }}</span>
    <div class="flex gap-2">
      <button type="button" class="btn flex-1 min-w-0" [class]="buttonClasses()" (click)="onClick('OK')">OK</button>
      @if (alertButtonType() === 'OK_CANCEL') {
        <button type="button" class="btn flex-1 min-w-0" [class]="buttonClasses()" (click)="onClick('CANCEL')">CANCEL</button>
      }
    </div>
  </div>`,
})
export class AlertComponent extends ComponentBase {
  readonly alertLevel = input<AlertLevel>('INFO');
  readonly alertBgColor = input<AlertBackground>('NORMAL');
  readonly alertButtonType = input<AlertButtonMode>('OK_ONLY');
  readonly alertButtonColor = input<AlertButtonColor>('NORMAL');
  readonly message = input('');
  readonly buttonClick = output<string>();
  readonly alertClasses = computed(() => {
    const level = LEVEL_CLASSES[this.alertLevel()];
    if (!level) throw new Error('BRUCE_ALERT_LEVEL');
    const bg = this.alertBgColor();
    if (bg !== 'NORMAL' && bg !== 'SOFT') throw new Error('BRUCE_ALERT_BACKGROUND');
    return [level, bg === 'SOFT' ? 'alert-soft' : ''].filter(Boolean).join(' ');
  });
  readonly buttonClasses = computed(() => {
    const color = BUTTON_CLASSES[this.alertButtonColor()];
    if (color === undefined) throw new Error('BRUCE_ALERT_BUTTON_COLOR');
    return color;
  });
  onClick(buttonKey:AlertButtonKey):void {
    if (buttonKey !== 'OK' && buttonKey !== 'CANCEL') throw new Error('BRUCE_ALERT_BUTTON_KEY');
    if (buttonKey === 'CANCEL' && this.alertButtonType() !== 'OK_CANCEL') return;
    this.buttonClick.emit(buttonKey);
  }
}
