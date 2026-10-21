/** 工程③ IMP-02: 02/27章に基づく独立実装。 */
import { ChangeDetectorRef, Directive, DestroyRef, effect, inject, input, untracked } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComponentBase } from './component-base.js';

@Directive()
export abstract class FormControlComponentBase<T> extends ComponentBase {
  readonly control = input<FormControl<T>>();
  protected readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private currentControl?: FormControl<T>;
  private controlSubscription?: Subscription;
  private destroyed = false;

  protected constructor() {
    super();
    effect(() => {
      const next = this.control();
      untracked(() => this.bindControl(next));
    });
    this.destroyRef.onDestroy(() => this.ngOnDestroy());
  }

  protected requireControl(): FormControl<T> {
    const control = this.control() ?? this.currentControl;
    if (!control) throw new Error('BRUCE_CONTROL_REQUIRED');
    return control;
  }

  protected onControlBound(_previous: FormControl<T> | undefined, _current: FormControl<T> | undefined): void {}
  protected onControlValue(_value: T): void {}
  protected onControlStatus(_status: FormControlStatus): void {}

  private bindControl(next: FormControl<T> | undefined): void {
    if (this.destroyed || this.currentControl === next) return;
    const previous = this.currentControl;
    this.controlSubscription?.unsubscribe();
    this.controlSubscription = undefined;
    this.currentControl = next;
    if (next) {
      const subscriptions = new Subscription();
      subscriptions.add(next.valueChanges.subscribe(value => {
        if (this.destroyed) return;
        this.onControlValue(value);
        this.changeDetectorRef.markForCheck();
      }));
      subscriptions.add(next.statusChanges.subscribe(status => {
        if (this.destroyed) return;
        this.onControlStatus(status);
        this.changeDetectorRef.markForCheck();
      }));
      this.controlSubscription = subscriptions;
    }
    this.onControlBound(previous, next);
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.controlSubscription?.unsubscribe();
    this.controlSubscription = undefined;
    this.currentControl = undefined;
  }
}
