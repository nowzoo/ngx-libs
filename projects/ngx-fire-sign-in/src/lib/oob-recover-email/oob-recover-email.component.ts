import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-oob-recover-email',
  templateUrl: './oob-recover-email.component.html',
  styleUrls: ['./oob-recover-email.component.css']
})
export class OobRecoverEmailComponent {
  @Input() controller: INgxFireSignInController;
  submitting = false;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  submit() {
    this.submitting = true;
    this.auth.applyActionCode(this.controller.oobCode)
      .then(() => {
        this.submitting = false;
        this.controller.showOobSuccess(
          this.controller.oobInfo,
          `Your email has been changed back to ${this.controller.oobInfo.data.email}.`
        );
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
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
