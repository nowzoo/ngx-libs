import {
  Component,
  Input,
  Inject,
  Host
} from '@angular/core';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NGX_FORM_OPTIONS, INgxFormOptions, NgxValidity } from './shared';
import { NgxControlAbstractDirective } from './ngx-control-abstract-directive';
@Component({
  selector: 'ngx-control-error',
  template: `
    <div [attr.class]="containerClass" *ngIf="shown">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class NgxControlErrorComponent extends NgxControlAbstractDirective {
  @Input() key: string | string[];
  @Input() containerClass: string;
  shown = false;
  constructor(
    @Inject(NGX_FORM_OPTIONS) options: INgxFormOptions,
    @Host() controlValidity: NgxControlValidityDirective
  ) {
    super(options, controlValidity);
  }

  protected _update(validity: NgxValidity) {
    this.containerClass = this.containerClass || this._options.errorContainerClass;
    let hasError = false;
    const arrKeys = Array.isArray(this.key) ? this.key : [this.key];
    arrKeys.forEach(key => {
      if (this._controlValidity.control.hasError(key)) {
        hasError = true;
      }
    });
    this.shown = NgxValidity.invalid === validity && hasError;
  }
}
