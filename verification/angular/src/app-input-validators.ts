/** 工程③ IMP-31: VALID/FORMAT/DEFAULT の純粋関数検証。 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppInputValidators {
  /** 空白のみを空として扱う必須チェック。入力値自体は書き換えない。 */
  static requiredTrimmed(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: unknown = control.value;
      if (value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0)) {
        return { required: true };
      }
      return null;
    };
  }

  /** ASCII数字だけを許可。空値の必須性は別Validatorの責務。 */
  static asciiDigits(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: unknown = control.value;
      if (value === null || value === '') return null;
      return typeof value === 'string' && /^[0-9]+$/.test(value)
        ? null : { pattern: { requiredPattern: '^[0-9]+$', actualValue: value } };
    };
  }
}
