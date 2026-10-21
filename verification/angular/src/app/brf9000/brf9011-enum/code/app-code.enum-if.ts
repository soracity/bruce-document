/** 工程③ IMP-30依存の検証用Enum境界。TYPE-03の公開形だけを再現。
 * ACG Enum生成器(IMP-35)の実装済み証跡とはしない。
 */
export const APP_CODE_ENUM_BRAND = Symbol('AppCodeEnumIf');
export interface AppCodeEnumIf {
  readonly [APP_CODE_ENUM_BRAND]: true;
  readonly name: string;
  readonly value: string;
}
