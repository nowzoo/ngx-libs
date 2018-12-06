import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ngx-form-error',
  template: `
    <div class="invalid-feedback d-block" *ngIf="shown">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxFormErrorComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _control: AbstractControl;
  @Input() set control(value: AbstractControl) {
      this._control = value;
  }
  get control(): AbstractControl {
    return this._control;
  }
  @Input() key: string;
  @Input() invalidOn: 'touched' | 'dirty' = 'touched';
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
