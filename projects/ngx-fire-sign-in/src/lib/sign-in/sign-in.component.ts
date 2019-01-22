import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';


@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  static idCt = 0;
  @Input() controller: INgxFireSignInController;

  fg: FormGroup;
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
    this.id = `ngx-sign-in-${ ++ SignInComponent.idCt }-`;
    this.emailFc = new FormControl(this.controller.email, [Validators.required, Validators.email]);
    this.passwordFc = new FormControl('', Validators.required);
    this.rememberFc = new FormControl(true);
    this.fg = new FormGroup({
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
    this.auth.signInWithEmailAndPassword(this.emailFc.value.trim(), this.passwordFc.value)
      .then((result: auth.UserCredential) => {
        cred = result;
        return this.auth.setPersistence(
          this.rememberFc.value === false ?
          auth.Auth.Persistence.SESSION : auth.Auth.Persistence.LOCAL
        );
      })
      .then(() => {
        this.controller.showSignInSuccess(cred, `Welcome, ${cred.user.displayName}! You are signed in.`);
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/user-disabled':
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            NgxFormHelpers.setErrorUntilChanged(this.emailFc, error.code);
            break;
          case 'auth/wrong-password':
            NgxFormHelpers.setErrorUntilChanged(this.passwordFc, error.code);
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });
  }

}
