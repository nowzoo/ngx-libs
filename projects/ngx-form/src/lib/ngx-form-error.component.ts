import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ngx-form-error',
  template: `
    <div class="is-invalid d-block" *ngIf="shown">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxFormErrorComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() control: AbstractControl;
  @Input() key: string;
  shown = false;
  constructor() { }

  ngOnInit() {
    const control = this.control;
    combineLatest(control.valueChanges, control.statusChanges)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        this.shown = (control.hasError(this.key) && control.touched);
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
