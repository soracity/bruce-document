/** 工程③の独立検証用。設計書02章STYLE-01/04にのみ基づく。Bruce本体ソースではない。 */
export type UiBorderWidth = 0 | 0.5 | 1 | 2 | 4;
export type UiRoundedSize = 0 | 4 | 8 | 16 | 24;
export type UiShadowSize = 'sm' | 'md' | 'lg';
export type UiPadding = 0 | 4 | 8 | 12 | 16 | 24 | 32;
export type AppUiColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'base-100' | 'base-200' | 'base-300' | 'info' | 'success' | 'warning' | 'error';
const border: Readonly<Record<UiBorderWidth,string>> = {0:'border-0',0.5:'border-[0.5px]',1:'border',2:'border-2',4:'border-4'};
const rounded: Readonly<Record<UiRoundedSize,string>> = {0:'rounded-none',4:'rounded',8:'rounded-lg',16:'rounded-2xl',24:'rounded-3xl'};
const shadow: Readonly<Record<UiShadowSize,string>> = {sm:'shadow-sm',md:'shadow-md',lg:'shadow-lg'};
const padding: Readonly<Record<UiPadding,string>> = {0:'p-0',4:'p-1',8:'p-2',12:'p-3',16:'p-4',24:'p-6',32:'p-8'};
const bg: Readonly<Record<AppUiColor,string>> = {'primary':'bg-primary','secondary':'bg-secondary','accent':'bg-accent','neutral':'bg-neutral','base-100':'bg-base-100','base-200':'bg-base-200','base-300':'bg-base-300','info':'bg-info','success':'bg-success','warning':'bg-warning','error':'bg-error'};
const fg: Readonly<Record<AppUiColor,string>> = {'primary':'text-primary','secondary':'text-secondary','accent':'text-accent','neutral':'text-neutral','base-100':'text-base-100','base-200':'text-base-200','base-300':'text-base-300','info':'text-info','success':'text-success','warning':'text-warning','error':'text-error'};
const status: Readonly<Partial<Record<AppUiColor,string>>> = {info:'bg-info/20',success:'bg-success/20',warning:'bg-warning/20',error:'bg-error/20'};
function select<T extends string | number>(map: Readonly<Record<T,string>>, value: T): string {
  if (!Object.prototype.hasOwnProperty.call(map,value)) throw new Error('BRUCE_STYLE_VALUE: '+String(value));
  return map[value];
}
export class UiStyleUtil {
  private constructor() {}
  static getBorderClass(enabled:boolean,width:UiBorderWidth):string {const widthClass=select(border,width);return enabled===false?'border-0':enabled===true?widthClass:invalid(enabled);}
  static getRoundedClass(enabled:boolean,size:UiRoundedSize):string {const sizeClass=select(rounded,size);return enabled===false?'rounded-none':enabled===true?sizeClass:invalid(enabled);}
  static getShadowClass(enabled:boolean,size:UiShadowSize):string {const sizeClass=select(shadow,size);return enabled===false?'shadow-none':enabled===true?sizeClass:invalid(enabled);}
  static getPaddingClass(value:UiPadding):string {return select(padding,value);}
  static getBackgroundColorClass(value:AppUiColor|undefined):string {return value===undefined?'':select(bg,value);}
  static getTextColorClass(value:AppUiColor|undefined):string {return value===undefined?'':select(fg,value);}
  static getVisibleClass(value:boolean):string {return value===true?'':value===false?'hidden':invalid(value);}
  static getTableCellStatusColorClass(value:AppUiColor|undefined):string {if(value===undefined)return ''; const base=select(bg,value);return status[value]??base;}
}
function invalid(value:unknown):never {throw new Error('BRUCE_STYLE_VALUE: '+String(value));}
