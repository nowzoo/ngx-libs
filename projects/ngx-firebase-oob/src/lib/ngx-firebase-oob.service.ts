import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

export interface NgxFirebaseOobResult extends auth.ActionCodeInfo {
  code: string;
  credential?: auth.UserCredential;
}


@Injectable({
  providedIn: 'root'
})
export class NgxFirebaseOobService {

  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  handleOobRequest(code: string): Promise<NgxFirebaseOobResult> {
    return new Promise((resolve, reject) => {

      this.checkActionCode(code)
        .then((result: NgxFirebaseOobResult) => {
          switch (result.operation) {
            case 'PASSWORD_RESET':
              return result;
            case 'VERIFY_EMAIL':
            case 'RECOVER_EMAIL':
              return this.applyActionCode(result);
            case 'EMAIL_SIGNIN':
              return this.signInWithEmailLink(result);
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

  checkActionCode(code: string): Promise<NgxFirebaseOobResult> {
    return new Promise((resolve, reject) => {
      this.auth.checkActionCode(code)
        .then((result: auth.ActionCodeInfo) => {
          resolve(Object.assign({}, result, {code: code}));
        })
        .catch(reject);
    });
  }

  applyActionCode(info: NgxFirebaseOobResult): Promise<NgxFirebaseOobResult> {
    return new Promise((resolve, reject) => {
      this.auth.applyActionCode(info.code)
        .then(() => {
          resolve(info);
        })
        .catch(reject);
    });
  }

  signInWithEmailLink(info: NgxFirebaseOobResult): Promise<NgxFirebaseOobResult> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailLink(info.data.email)
        .then((cred: auth.UserCredential) => {
          const infoWithCred: NgxFirebaseOobResult = Object.assign({}, info, {credential: cred});
          resolve(infoWithCred);
        })
        .catch(reject);
    });
  }



}

/**
PASSWORD_RESET: password reset code generated via firebase.auth.Auth#sendPasswordResetEmail.
VERIFY_EMAIL: email verification code generated via firebase.User#sendEmailVerification.
RECOVER_EMAIL: email change revocation code generated via firebase.User#updateEmail.
EMAIL_SIGNIN: email sign in code generated via firebase.auth.Auth#sendSignInLinkToEmail.

 */
