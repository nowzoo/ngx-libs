import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFormModule } from '@nowzoo/ngx-form';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFireSignInComponent } from './ngx-fire-sign-in.component';
import { UnhandledErrorComponent } from './unhandled-error/unhandled-error.component';
import { OobVerifyEmailComponent } from './oob-verify-email/oob-verify-email.component';
import { OobRecoverEmailComponent } from './oob-recover-email/oob-recover-email.component';
import { OobResetPasswordComponent } from './oob-reset-password/oob-reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxPasswordToggleModule } from '@nowzoo/ngx-password-toggle';
import { OobErrorComponent } from './oob-error/oob-error.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ReauthenticateFormComponent } from './reauthenticate-form/reauthenticate-form.component';

@NgModule({
  declarations: [
    NgxFireSignInComponent,
    UnhandledErrorComponent,
    OobVerifyEmailComponent,
    OobRecoverEmailComponent,
    OobResetPasswordComponent,
    SignInComponent,
    SignUpComponent,
    OobErrorComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    SignOutComponent,
    ReauthenticateFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxFormModule,
    NgxPasswordToggleModule,
    RouterModule
  ],
  exports: [NgxFireSignInComponent]
})
export class NgxFireSignInModule { }
