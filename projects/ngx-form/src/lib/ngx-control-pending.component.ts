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
  selector: 'ngx-ngx-control-pending',
  template: `
  <div [attr.class]="containerClass" *ngIf="shown">
    <ng-content></ng-content>
  </div>
  `,
  styles: []
})
export class NgxControlPendingComponent extends NgxControlAbstractDirective {
  @Input() containerClass: string;
  shown = false;
  constructor(
    @Inject(NGX_FORM_OPTIONS) options: INgxFormOptions,
    @Host() controlValidity: NgxControlValidityDirective
  ) {
    super(options, controlValidity);
  }

  protected _update(validity: NgxValidity) {
    this.containerClass = this.containerClass || this._options.pendingContainerClass;
    this.shown = NgxValidity.pending === validity;
  }
}
