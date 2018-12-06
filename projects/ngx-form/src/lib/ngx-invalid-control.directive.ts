import { Directive, OnInit, OnDestroy, Optional, Host, Renderer2, ElementRef, Input } from '@angular/core';
import { FormControlDirective, FormControlName, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[ngxInvalidControl]'
})
export class NgxInvalidControlDirective implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() ngxInvalidControl: 'touched' | 'dirty' = 'touched';
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
    control.valueChanges
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        const showError = 'dirty' === this.ngxInvalidControl ? control.dirty : control.touched;
        if (control.invalid && showError) {
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
