import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';


@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  static idCt = 0;
  @Input() controller: INgxFireSignInController;

  fg: FormGroup;
  emailFc: FormControl;
  id: string;
  submitting = false;
  sent: string = null;

  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }



  ngOnInit() {
    this.id = `ngx-reset-password-${ ++ ResetPasswordComponent.idCt }-`;
    this.emailFc = new FormControl(this.controller.email, [Validators.required, Validators.email]);

    this.fg = new FormGroup({
      email: this.emailFc,
    });
    this.emailFc.valueChanges.subscribe(val => {
      if (this.emailFc.valid) {
        this.controller.email = val;
      }
    });
  }


  submit() {
    this.submitting = true;
    const email = this.emailFc.value.trim();
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.submitting = false;
        this.sent = email;
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            NgxFormHelpers.setErrorUntilChanged(this.emailFc, error.code);
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });
  }

}
