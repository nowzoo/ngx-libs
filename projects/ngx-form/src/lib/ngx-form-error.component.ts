import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxInvalidOn } from './shared';
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
  @Input() invalidOn: NgxInvalidOn = NgxInvalidOn.touched;

  /**
   * @ignore
   */
  shown = false;


  constructor() { }



  ngOnInit() {
    const control = this.control;
    combineLatest(control.valueChanges, control.statusChanges)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        switch (this.invalidOn) {
          case NgxInvalidOn.always:
            this.shown = control.hasError(this.key);
            break;
          case NgxInvalidOn.dirty:
            this.shown = control.hasError(this.key) && control.dirty;
            break;
          default:
            this.shown = control.hasError(this.key) && control.touched;
            break;
        }
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
