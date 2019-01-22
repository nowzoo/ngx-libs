import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-oob-verify-email',
  templateUrl: './oob-verify-email.component.html',
  styleUrls: ['./oob-verify-email.component.css']
})
export class OobVerifyEmailComponent implements OnInit {
  @Input() controller: INgxFireSignInController;
  submitting = false;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }



  ngOnInit() {

    this.submit();
  }

  submit() {
    this.submitting = true;
    this.auth.applyActionCode(this.controller.oobCode)
      .then(() => {
        this.submitting = false;
        this.controller.showOobSuccess(
          this.controller.oobInfo,
          `The email ${this.controller.oobInfo.data.email} has been verified.`
        );
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/expired-action-code':
          case 'auth/invalid-action-code':
            this.controller.showOobError(error, 'The verify email link you used is expired or invalid.');
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });

  }

}

/**
auth/expired-action-code
Thrown if the action code has expired.
auth/invalid-action-code
Thrown if the action code is invalid. This can happen if the code is malformed or has already been used.
auth/user-disabled
Thrown if the user corresponding to the given action code has been disabled.
auth/user-not-found
 */
