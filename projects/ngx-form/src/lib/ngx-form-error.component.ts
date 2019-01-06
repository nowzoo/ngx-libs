import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ngx-form-error',
  template: `
    <div [attr.class]="errorClass" *ngIf="shown">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxFormErrorComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _control: AbstractControl;

  /**
   * The reactive form control.
   */
  @Input()
  set control(value: AbstractControl) {
    this._control = value;
  }

  /**
   * The reactive form control.
   */
  get control(): AbstractControl {
    return this._control;
  }

  /**
   * The error key, e.g. 'required'
   */
  @Input() key: string;

  /**
   * The class to apply to the error div. Default: 'invalid-feedback d-block'
   */
  @Input() errorClass = 'invalid-feedback d-block';

  /**
   * When to show the error.
   * Set invalidOn="dirty" to show the error whenvever the input changes.
   * The default, "touched" shows the error only when the input has been blurred.
   */
  @Input() invalidOn: 'touched' | 'dirty' = 'touched';

  /**
   * @ignore
   */
  shown = false;


  constructor() { }

  ngOnInit() {
    const control = this.control;
    control.valueChanges
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        const showError = 'dirty' === this.invalidOn ? control.dirty : control.touched;
        this.shown = (control.hasError(this.key) && showError);
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
