import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { INgxFormOptions, NGX_FORM_OPTIONS, NgxValidityOn} from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NgxControlInvalidClassDirective } from './ngx-control-invalid-class.directive';
import { NgxControlValidClassDirective } from './ngx-control-valid-class.directive';
import { NgxControlErrorComponent } from './ngx-control-error.component';
import { NgxControlSuccessComponent } from './ngx-control-success.component';
import { NgxControlPendingComponent } from './ngx-control-pending.component';

const defaultOptions: INgxFormOptions = {
  controlInvalidClass: 'is-invalid',
  controlValidClass: 'is-valid',
  errorContainerClass: 'invalid-feedback d-block',
  successContainerClass: 'valid-feedback d-block',
  pendingContainerClass: 'pending-feedback text-muted small',
  showValidityOn: NgxValidityOn.touched
};

@NgModule({
  declarations: [
    NgxControlValidityDirective,
    NgxControlInvalidClassDirective,
    NgxControlValidClassDirective,
    NgxControlErrorComponent,
    NgxControlSuccessComponent,
    NgxControlPendingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxControlValidityDirective,
    NgxControlInvalidClassDirective,
    NgxControlValidClassDirective,
    NgxControlErrorComponent,
    NgxControlSuccessComponent,
    NgxControlPendingComponent,
  ],
  providers: [
    {provide: NGX_FORM_OPTIONS, useValue: defaultOptions}
  ]
})
export class NgxFormModule {

}
