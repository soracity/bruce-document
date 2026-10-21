/** 工程③ IMP-31: 詳細設計書12章FORMAT-02準拠の独立実装。
 * 必須性と文字種チェックを分離し、元のcontrol.valueは変更しない。
 */
import type { AbstractControl, ValidationErrors } from '@angular/forms';

export class AppInputValidators {
  private constructor() {}

  static requiredTrim(control: AbstractControl): ValidationErrors | null {
    const value: unknown = control.value;
    if (value === null || value === undefined) return { required: true };
    if (typeof value !== 'string') return { stringType: true };
    return value.trim().length === 0 ? { required: true } : null;
  }

  static ascii(control: AbstractControl): ValidationErrors | null {
    const value: unknown = control.value;
    if (value === null || value === undefined || value === '') return null;
    if (typeof value !== 'string') return { stringType: true };
    return /^[\x00-\x7F]*$/.test(value) ? null : { ascii: true };
  }
}
