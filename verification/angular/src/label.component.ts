/** 工程③ IMP-17 LabelComponent: UI-10/DISPLAY-05 基本表示契約。 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentBase } from './component-base.js';

export type TextOverflowMode = 'WRAP' | 'ELLIPSIS' | 'MARQUEE_BOUNCE' | 'MARQUEE_RESTART';

@Component({
  selector:'app-label',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{ style:'display:block;min-width:0', '[class.bruce-hidden]':'!effectiveVisible()' },
  template:`<span class="bruce-text-viewport" [attr.aria-label]="label()"
      [class.bruce-text-wrap]="textOverflowMode() === 'WRAP'"
      [class.bruce-text-ellipsis]="textOverflowMode() === 'ELLIPSIS'"
      [class.bruce-text-marquee]="isMarquee()">
    <span class="bruce-text-track" aria-hidden="true">{{ label() }}</span>
  </span>`,
  styles:[`
    .bruce-text-viewport { display:block;min-width:0;max-width:100%; }
    .bruce-text-track { display:inline; }
    .bruce-text-wrap { white-space:normal;overflow-wrap:anywhere; }
    .bruce-text-ellipsis { white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
    .bruce-text-marquee { overflow:hidden;white-space:nowrap; }
    .bruce-text-marquee .bruce-text-track { display:inline-block;white-space:nowrap;pointer-events:none; }
  `],
})
export class LabelComponent extends ComponentBase {
  readonly label = input('');
  readonly textOverflowMode = input<TextOverflowMode>('WRAP');
  isMarquee():boolean {
    return this.textOverflowMode() === 'MARQUEE_BOUNCE' || this.textOverflowMode() === 'MARQUEE_RESTART';
  }
}
