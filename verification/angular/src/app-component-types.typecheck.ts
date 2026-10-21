/** 工程③ IMP-30: ngc(strict)に含まれるコンパイル時の型契約テスト。 */
import type { AppCodeEnumIf } from './app/brf9000/brf9011-enum/code/app-code.enum-if.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type Value = Assert<Equal<AppComponentValueType, string | number | boolean | AppCodeEnumIf>>;
type Event = Assert<Equal<AppComponentEventKeyType, AppComponentValueType>>;
type NoUndefined = Assert<Equal<undefined extends AppComponentEventKeyType ? true : false, false>>;
type NoNull = Assert<Equal<null extends AppComponentValueType ? true : false, false>>;
export const imp30TypeCheck: [Value, Event, NoUndefined, NoNull] = [true, true, true, true];
