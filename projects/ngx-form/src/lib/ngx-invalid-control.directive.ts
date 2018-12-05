import { Directive, OnInit, OnDestroy, Optional, Host, Renderer2, ElementRef } from '@angular/core';
import { FormControlDirective, FormControlName, AbstractControl } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[ngxInvalidControl]'
})
export class NgxInvalidControlDirective implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    @Optional() @Host() private _d1: FormControlDirective,
    @Optional() @Host() private _d2: FormControlName,
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) { }

  get control(): AbstractControl {
    if (this._d1) {
      return this._d1.control;
    }
    if (this._d2) {
      return this._d2.control;
    }
    return null;
  }

  get renderer(): Renderer2 {
    return this._renderer;
  }

  get el(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  ngOnInit() {
    const control = this.control;
    if (! control) {
      return;
    }
    combineLatest(control.valueChanges, control.statusChanges)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        if (control.invalid && control.touched) {
          this.renderer.addClass(this.el, 'is-invalid');
        } else {
          this.renderer.removeClass(this.el, 'is-invalid');
        }
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
