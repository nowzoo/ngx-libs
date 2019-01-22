import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';
@Component({
  selector: 'ngx-oob-reset-password',
  templateUrl: './oob-reset-password.component.html',
  styleUrls: ['./oob-reset-password.component.css']
})
export class OobResetPasswordComponent implements OnInit {
  static idCt = 0;
  @Input() controller: INgxFireSignInController;


  fg: FormGroup;
  emailFc: FormControl;
  passwordFc: FormControl;
  id: string;
  submitting = false;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  get authState(): Observable<User> {
    return this._afAuth.authState;
  }

  ngOnInit() {
    this.id = `ngx-oob-reset-password-${ ++ OobResetPasswordComponent.idCt }-`;
    this.emailFc = new FormControl(this.controller.oobInfo.data.email);
    this.emailFc.disable();
    this.passwordFc = new FormControl('', Validators.required);
    this.fg = new FormGroup({
      email: this.emailFc,
      password: this.passwordFc
    });
  }


  submit() {
    this.submitting = true;
    this.auth.confirmPasswordReset(this.controller.oobCode, this.passwordFc.value)
    .then(() => {
      this.submitting = false;
      this.controller.showOobSuccess(this.controller.oobInfo, `The password has been saved for ${this.controller.oobInfo.data.email}.`);
    })
    .catch((error: auth.Error) => {
      this.submitting = false;
      switch (error.code) {
        case 'auth/weak-password':
          NgxFormHelpers.setErrorUntilChanged(this.passwordFc, error.code);
          break;
        case 'auth/expired-action-code':
        case 'auth/invalid-action-code':
          this.controller.showOobError(error, 'The recover email link you used is expired or invalid.');
          break;
        default:
          this.controller.showUnhandledError(error);
          break;
      }
    });
  }

}
