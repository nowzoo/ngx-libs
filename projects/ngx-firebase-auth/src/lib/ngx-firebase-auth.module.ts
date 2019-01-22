import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@nowzoo/ngx-form';
import { NgxFirebaseAuthComponent } from './ngx-firebase-auth.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    NgxFirebaseAuthComponent,
    SignInFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxFormModule
  ],
  exports: [
    NgxFirebaseAuthComponent
  ]
})
export class NgxFirebaseAuthModule {}
