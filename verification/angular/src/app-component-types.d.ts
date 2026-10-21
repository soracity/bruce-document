/** 工程③ IMP-30: TYPE-01。importを持つ型はmodule + declare globalへ分離。 */
import type { AppCodeEnumIf } from './app/brf9000/brf9011-enum/code/app-code.enum-if.js';
declare global {
  type AppComponentValueType = string | number | boolean | AppCodeEnumIf;
  type AppComponentEventKeyType = AppComponentValueType;
}
export {};
