import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit, OnDestroy {
  static idCt = 0;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() controller: INgxFireSignInController;
  user: User;
  fg: FormGroup;
  emailFc: FormControl;
  id: string;
  submitting = false;
  showReauthenticate = false;
  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  get authState(): Observable<User>  {
    return this._afAuth.authState;
  }

  ngOnInit() {
    this.id = `ngx-change-email-${ ++ ChangeEmailComponent.idCt }-`;
    this.emailFc = new FormControl('', this.validateEmail.bind(this));
    this.fg = new FormGroup({email: this.emailFc});
    this.authState
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((user) => {
        this.user = user;
        if (! this.user) {
          this.controller.showSignIn();
        }
      });
  }
  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  submit() {
    const email = this.emailFc.value.trim();
    this.submitting = true;
    this.user.updateEmail(email)
      .then(() => {
        return this.auth.signOut();
      })
      .then(() => {
        this.submitting = false;
        this.controller.email = email;
        this.controller.successMessage = `Your email has been changed to ${email}. Please sign in again.`;
        this.controller.showSignIn();
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/requires-recent-login':
            this.showReauthenticate = true;
            break;
          case 'auth/invalid-email':
          case 'auth/email-already-in-use':
            NgxFormHelpers.setErrorUntilChanged(this.emailFc, error.code);
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });

  }

  onReauthenticated() {
    this.showReauthenticate = false;
  }

  validateEmail(fc: FormControl) {
    const newValue = fc.value.trim().toLowerCase();
    if (newValue.length === 0) {
      return {required: true};
    }
    const emailErr = Validators.email(fc);
    if (emailErr) {
      return emailErr;
    }
    const currentValue = this.user.email.trim().toLowerCase();
    return newValue === currentValue ? {same: true} : null;
  }
}
