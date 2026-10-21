/** 工程③ IMP-10 DateComponent 独立検証実装（i18n接続は後続検証）。 */
import { ChangeDetectionStrategy, Component, ElementRef, effect, input, signal, viewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControlComponentBase } from './form-control-component-base.js';
import { DateFailure, DateInputType, fromInput, toInput } from './local-date-time-codec.js';

@Component({
  selector: 'app-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block;min-width:0', '[class.bruce-hidden]': '!effectiveVisible()' },
  template: `<label class="floating-label">
    <span>{{ label() }}</span>
    <input #nativeInput class="input text-input font-input date-input border focus:border-neutral py-2 appearance-none"
      step="any" [type]="type() === 'DATE' ? 'date' : 'datetime-local'"
      [disabled]="control()?.disabled ?? true" (input)="onInput($event)" (blur)="onBlur()" />
  </label>`,
  styles: [':host input { width:100%; }'],
})
export class DateComponent extends FormControlComponentBase<string | null> {
  readonly label = input('');
  readonly type = input<DateInputType>('DATE');
  readonly nativeInput = viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  readonly displayValue = signal('');
  private readonly draftError = signal<DateFailure | null>(null);
  private readonly inputValidator: ValidatorFn = (_: AbstractControl): ValidationErrors | null => {
    const failure = this.draftError();
    return failure ? { dateInput: failure } : null;
  };
  private attachedControl?: FormControl<string | null>;
  private original?: { utc: string; input: string };
  private selfWrite = false;
  private disposed = false;
  private previousType?: DateInputType;
  private pendingInput: string | null = null;

  constructor() {
    super();
    effect(() => {
      const nextType = this.type();
      if (this.previousType !== nextType) {
        this.previousType = nextType;
        this.syncFromControl();
      }
    });
    effect(() => {
      const native = this.nativeInput();
      if (native) {
        if (this.pendingInput !== null) {
          native.nativeElement.value = this.pendingInput;
          this.pendingInput = null;
        } else this.syncFromControl();
      }
    });
  }

  protected override onControlBound(previous: FormControl<string | null> | undefined, current: FormControl<string | null> | undefined): void {
    if (previous) {
      previous.removeValidators(this.inputValidator);
      previous.updateValueAndValidity({ emitEvent: false });
    }
    this.attachedControl = current;
    if (current) current.addValidators(this.inputValidator);
    this.syncFromControl();
    current?.updateValueAndValidity({ emitEvent: false });
  }

  protected override onControlValue(_value: string | null): void {
    if (!this.selfWrite) this.syncFromControl();
  }

  protected override onControlStatus(_status: FormControl<string | null>['status']): void {
    // disabled binding only: preserve the native edit buffer
  }

  syncFromControl(): void {
    const control = this.attachedControl;
    if (!control || this.disposed) return;
    this.original = undefined;
    const result = toInput(control.value, this.type());
    if (result.ok) {
      this.draftError.set(null);
      this.displayValue.set(result.value.text);
      this.original = result.value.original;
    } else {
      this.draftError.set(result.error);
      this.displayValue.set('');
    }
    const native = this.nativeInput()?.nativeElement;
    if (native) native.value = this.displayValue();
    else this.pendingInput = this.displayValue();
    control.updateValueAndValidity({ emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  onInput(event: Event): void {
    const control = this.requireControl();
    const native = event.target as HTMLInputElement;
    const raw = native.value;
    this.displayValue.set(raw);
    const validity = native.validity;
    const result = validity.badInput
      ? { ok: false as const, error: { reason: 'incomplete' as const, raw } }
      : validity.typeMismatch || validity.rangeOverflow || validity.rangeUnderflow || validity.stepMismatch
        ? { ok: false as const, error: { reason: 'invalidLocalValue' as const, raw } }
        : fromInput(raw, this.type(), this.original);
    if (!result.ok) {
      this.draftError.set(result.error);
      control.markAsDirty();
      control.updateValueAndValidity({ emitEvent: false });
      this.changeDetectorRef.markForCheck();
      return;
    }
    this.draftError.set(null);
    this.original = undefined;
    this.selfWrite = true;
    try {
      control.setValue(result.value, { emitEvent: true });
      control.markAsDirty();
    } finally {
      this.selfWrite = false;
    }
    control.updateValueAndValidity({ emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  onBlur(): void { this.requireControl().markAsTouched(); }

  override ngOnDestroy(): void {
    this.disposed = true;
    this.attachedControl?.removeValidators(this.inputValidator);
    this.attachedControl?.updateValueAndValidity({ emitEvent: false });
    this.attachedControl = undefined;
    super.ngOnDestroy();
  }
}
