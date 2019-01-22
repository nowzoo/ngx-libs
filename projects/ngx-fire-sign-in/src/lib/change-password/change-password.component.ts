import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  static idCt = 0;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() controller: INgxFireSignInController;
  user: User;
  fg: FormGroup;
  passwordFc: FormControl;
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
    this.id = `ngx-change-password-${ ++ ChangePasswordComponent.idCt }-`;
    this.passwordFc = new FormControl('', Validators.required);
    this.fg = new FormGroup({password: this.passwordFc});
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
    const password = this.passwordFc.value.trim();
    this.submitting = true;
    this.user.updatePassword(password)
      .then(() => {
        this.submitting = false;
        this.controller.email = this.user.email;
        this.controller.successMessage = `Your password has been saved. Please sign in again.`;
        this.controller.showHome();
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/requires-recent-login':
            this.showReauthenticate = true;
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

  onReauthenticated() {
    this.showReauthenticate = false;
  }
}
