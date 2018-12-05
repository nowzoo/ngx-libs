import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxInvalidControlDirective } from './ngx-invalid-control.directive';
import { NgxFormErrorComponent } from './ngx-form-error.component';

@NgModule({
  declarations: [
    NgxInvalidControlDirective,
    NgxFormErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxInvalidControlDirective,
    NgxFormErrorComponent
  ]
})
export class NgxFormModule { }
