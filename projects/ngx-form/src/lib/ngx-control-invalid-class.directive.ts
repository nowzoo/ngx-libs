import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  Inject,
  Host
} from '@angular/core';
import { NGX_FORM_OPTIONS, INgxFormOptions, NgxValidity } from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NgxControlAbstractDirective } from './ngx-control-abstract-directive';

@Directive({
  selector: '[ngxControlInvalidClass]'
})
export class NgxControlInvalidClassDirective extends NgxControlAbstractDirective {
  @Input() ngxControlInvalidClass: string;
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Inject(NGX_FORM_OPTIONS) options: INgxFormOptions,
    @Host() controlValidity: NgxControlValidityDirective
  ) {
    super(options, controlValidity);
  }

  protected _update(validity: NgxValidity) {
    const invalidClass = this.ngxControlInvalidClass || this._options.controlInvalidClass;
    if (NgxValidity.invalid === validity) {
      this._renderer.addClass(this._elementRef.nativeElement, invalidClass);
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, invalidClass);
    }
  }

}
