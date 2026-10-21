/** 工程③ IMP-01: 設計書02/27章のみから独立実装。Bruce本体ソースを参照しない。 */
import {Directive,computed,input} from '@angular/core';
import type {UiBorderWidth,UiRoundedSize,UiShadowSize,UiPadding,AppUiColor} from './ui-style.util.js';
import {UiStyleUtil} from './ui-style.util.js';
type Group='border'|'rounded'|'shadow'|'padding';
const widths=[0,0.5,1,2,4],roundings=[0,4,8,16,24],shadows=['sm','md','lg'],paddings=[0,4,8,12,16,24,32];
const colors=['primary','secondary','accent','neutral','base-100','base-200','base-300','info','success','warning','error'];
function check(value:unknown,valid:readonly unknown[]):void {
  if(value!==undefined && !valid.includes(value))throw new Error('BRUCE_STYLE_VALUE: '+String(value));
}
@Directive()
export abstract class ComponentBase {
  readonly border=input<boolean>();
  readonly borderWidth=input<UiBorderWidth>();
  readonly rounded=input<boolean>();
  readonly roundedSize=input<UiRoundedSize>();
  readonly shadow=input<boolean>();
  readonly shadowSize=input<UiShadowSize>();
  readonly padding=input<UiPadding>();
  readonly backgroundColor=input<AppUiColor>();
  readonly textColor=input<AppUiColor>();
  readonly visible=input<boolean>();
  protected assertInputs():void {
    check(this.border(),[true,false]);check(this.borderWidth(),widths);
    check(this.rounded(),[true,false]);check(this.roundedSize(),roundings);
    check(this.shadow(),[true,false]);check(this.shadowSize(),shadows);
    check(this.padding(),paddings);check(this.backgroundColor(),colors);
    check(this.textColor(),colors);check(this.visible(),[true,false]);
  }
  protected getDefaultBorder():boolean{return true;}
  protected getDefaultBorderWidth():UiBorderWidth{return 1;}
  protected getDefaultRounded():boolean{return true;}
  protected getDefaultRoundedSize():UiRoundedSize{return 8;}
  protected getDefaultShadow():boolean{return false;}
  protected getDefaultShadowSize():UiShadowSize{return 'md';}
  protected getDefaultPadding():UiPadding{return 8;}
  protected getDefaultBackgroundColor():AppUiColor|undefined{return undefined;}
  protected getDefaultTextColor():AppUiColor|undefined{return undefined;}
  protected getDefaultVisible():boolean{return true;}
  readonly effectiveBorder=computed(()=>{this.assertInputs();return this.border()??this.getDefaultBorder();});
  readonly effectiveBorderWidth=computed(()=>{this.assertInputs();return this.borderWidth()??this.getDefaultBorderWidth();});
  readonly effectiveRounded=computed(()=>{this.assertInputs();return this.rounded()??this.getDefaultRounded();});
  readonly effectiveRoundedSize=computed(()=>{this.assertInputs();return this.roundedSize()??this.getDefaultRoundedSize();});
  readonly effectiveShadow=computed(()=>{this.assertInputs();return this.shadow()??this.getDefaultShadow();});
  readonly effectiveShadowSize=computed(()=>{this.assertInputs();return this.shadowSize()??this.getDefaultShadowSize();});
  readonly effectivePadding=computed(()=>{this.assertInputs();return this.padding()??this.getDefaultPadding();});
  readonly effectiveBackgroundColor=computed(()=>{this.assertInputs();return this.backgroundColor()??this.getDefaultBackgroundColor();});
  readonly effectiveTextColor=computed(()=>{this.assertInputs();return this.textColor()??this.getDefaultTextColor();});
  readonly effectiveVisible=computed(()=>{this.assertInputs();return this.visible()??this.getDefaultVisible();});
  protected shouldApply(group:Group):boolean {
    switch(group) {
      case 'border':return this.border()!==undefined||this.borderWidth()!==undefined||this.getDefaultBorder!==ComponentBase.prototype.getDefaultBorder||this.getDefaultBorderWidth!==ComponentBase.prototype.getDefaultBorderWidth;
      case 'rounded':return this.rounded()!==undefined||this.roundedSize()!==undefined||this.getDefaultRounded!==ComponentBase.prototype.getDefaultRounded||this.getDefaultRoundedSize!==ComponentBase.prototype.getDefaultRoundedSize;
      case 'shadow':return this.shadow()!==undefined||this.shadowSize()!==undefined||this.getDefaultShadow!==ComponentBase.prototype.getDefaultShadow||this.getDefaultShadowSize!==ComponentBase.prototype.getDefaultShadowSize;
      case 'padding':return this.padding()!==undefined||this.getDefaultPadding!==ComponentBase.prototype.getDefaultPadding;
    }
  }
  readonly styleClasses=computed(()=>{
    this.assertInputs();
    const result:string[]=[];
    if(this.shouldApply('border'))result.push(UiStyleUtil.getBorderClass(this.effectiveBorder(),this.effectiveBorderWidth()));
    if(this.shouldApply('rounded'))result.push(UiStyleUtil.getRoundedClass(this.effectiveRounded(),this.effectiveRoundedSize()));
    if(this.shouldApply('shadow'))result.push(UiStyleUtil.getShadowClass(this.effectiveShadow(),this.effectiveShadowSize()));
    if(this.shouldApply('padding'))result.push(UiStyleUtil.getPaddingClass(this.effectivePadding()));
    const bg=UiStyleUtil.getBackgroundColorClass(this.backgroundForStyle());
    const fg=UiStyleUtil.getTextColorClass(this.textForStyle());
    if(bg)result.push(bg);if(fg)result.push(fg);
    return result.join(' ');
  });
  protected backgroundForStyle():AppUiColor|undefined{return this.effectiveBackgroundColor();}
  protected textForStyle():AppUiColor|undefined{return this.effectiveTextColor();}
}
