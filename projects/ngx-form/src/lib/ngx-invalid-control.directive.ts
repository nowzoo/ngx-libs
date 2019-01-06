import { Directive, OnInit, OnDestroy, Optional, Host, Renderer2, ElementRef, Input } from '@angular/core';
import { FormControlDirective, FormControlName, AbstractControl } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxInvalidOn } from './shared';

@Directive({
  selector: '[ngxInvalidControl]'
})
export class NgxInvalidControlDirective implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Set ngxInvalidControl="dirty" to show the error class whenvever the input changes.
   * The default, "touched" shows the error class only when the input has been blurred.
   */
  @Input() invalidOn: NgxInvalidOn = NgxInvalidOn.touched;

  /**
   * Set `invalidClass` to change the from the Bootstrap `'is-invalid'`.
   */
  @Input() invalidClass = 'is-invalid';

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
        let shown = false;
        switch (this.invalidOn) {
          case NgxInvalidOn.always:
            shown = control.invalid;
            break;
          case NgxInvalidOn.dirty:
            shown = control.invalid && control.dirty;
            break;
          default:
            shown = control.invalid && control.touched;
            break;
        }
        if (shown) {
          this.renderer.addClass(this.el, this.invalidClass);
        } else {
          this.renderer.removeClass(this.el, this.invalidClass);
        }
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
