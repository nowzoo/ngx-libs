import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  static idCt = 0;
  @Input() controller: INgxFireSignInController;

  fg: FormGroup;
  nameFc: FormControl;
  emailFc: FormControl;
  passwordFc: FormControl;
  rememberFc: FormControl;
  id: string;
  submitting = false;
  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }



  ngOnInit() {
    this.id = `ngx-sign-up-${ ++ SignUpComponent.idCt }-`;
    this.nameFc = new FormControl('', Validators.required);
    this.emailFc = new FormControl(this.controller.email, [Validators.required, Validators.email]);
    this.passwordFc = new FormControl('', Validators.required);
    this.rememberFc = new FormControl(true);
    this.fg = new FormGroup({
      name: this.nameFc,
      email: this.emailFc,
      password: this.passwordFc,
      remember: this.rememberFc
    });
    this.emailFc.valueChanges.subscribe(val => {
      if (this.emailFc.valid) {
        this.controller.email = val;
      }
    });
  }


  submit() {
    this.submitting = true;
    let cred: auth.UserCredential;
    this.auth.createUserWithEmailAndPassword(this.emailFc.value.trim(), this.passwordFc.value)
      .then((result: auth.UserCredential) => {
        cred = result;
        return this.auth.setPersistence(
          this.rememberFc.value === false ?
          auth.Auth.Persistence.SESSION : auth.Auth.Persistence.LOCAL
        );
      })
      .then(() => {
        return cred.user.updateProfile({displayName: this.nameFc.value.trim(), photoURL: null});
      })
      .then(() => {
        return cred.user.reload();
      })
      .then(() => {
        this.controller.showSignInSuccess(cred, `Welcome, ${cred.user.displayName}! You are signed in.`);
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            NgxFormHelpers.setErrorUntilChanged(this.emailFc, error.code);
            break;
          case 'auth/weak-password':
            NgxFormHelpers.setErrorUntilChanged(this.passwordFc, error.code);
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });
  }

}
