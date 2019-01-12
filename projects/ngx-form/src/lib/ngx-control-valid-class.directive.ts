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
  selector: '[ngxControlValidClass]'
})
export class NgxControlValidClassDirective extends NgxControlAbstractDirective {
  @Input() ngxControlValidClass: string;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Inject(NGX_FORM_OPTIONS) options: INgxFormOptions,
    @Host() controlValidity: NgxControlValidityDirective
  ) {
    super(options, controlValidity);
  }

  protected _update(validity: NgxValidity) {
    const validClass = this.ngxControlValidClass || this._options.controlValidClass;
    if (NgxValidity.valid === validity) {
      this._renderer.addClass(this._elementRef.nativeElement, validClass);
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, validClass);
    }
  }
}
