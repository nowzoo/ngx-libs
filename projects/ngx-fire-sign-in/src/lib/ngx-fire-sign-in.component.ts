import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import { NgxFireSignInScreen, INgxFireSignInController } from './shared';
@Component({
  selector: 'ngx-fire-sign-in',
  templateUrl: './ngx-fire-sign-in.component.html',
  styles: []
})
export class NgxFireSignInComponent implements OnInit, OnDestroy, INgxFireSignInController {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  controller: INgxFireSignInController;
  user: User;
  screen: NgxFireSignInScreen = NgxFireSignInScreen.wait;
  oobCode: string = null;
  oobInfo: auth.ActionCodeInfo = null;
  oobError: auth.Error = null;
  constructor(
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  get authState(): Observable<User> {
    return this._afAuth.authState;
  }

  get route(): ActivatedRoute {
    return this._route;
  }

  get queryParams(): {[key: string]: any} {
    return this._route.snapshot.queryParams;
  }

  get router(): Router {
    return this._router;
  }


  ngOnInit() {
    this.controller = this;
    this.oobCode = this.queryParams.oobCode || null;
    if (this.queryParams.oobCode && this.queryParams.mode) {
      this.initOob();
    } else {
      const fragment = this.route.snapshot.fragment || null;
      this.setScreenFromFragment(fragment);
    }
  }
  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  initOob() {
    this.router.navigate(['.'], {replaceUrl: true})
      .then(() => {
        return this.auth.checkActionCode(this.oobCode);
      })
      .then((result: auth.ActionCodeInfo) => {
        this.oobInfo = result;
        switch (this.oobInfo.operation) {
          case 'PASSWORD_RESET':
            this.screen = NgxFireSignInScreen.oobResetPassword;
            break;
          case 'VERIFY_EMAIL':
            this.screen = NgxFireSignInScreen.oobVerifyEmail;
            break;
          case 'RECOVER_EMAIL':
            this.screen = NgxFireSignInScreen.oobRecoverEmail;
            break;
          default:
            this.oobError = {
              code: 'unhandled-operation',
              message: `Could not handle the operation "${this.oobInfo.operation}".`
            };
            this.screen = NgxFireSignInScreen.oobError;
            break;
        }
      })
      .catch((error: auth.Error) => {
        this.oobError = error;
        this.screen = NgxFireSignInScreen.oobError;
      });
  }

  setScreenFromFragment(fragment: string) {
    switch (fragment) {
      case NgxFireSignInScreen.home:
      case NgxFireSignInScreen.signIn:
      case NgxFireSignInScreen.signUp:
      case NgxFireSignInScreen.signOut:
      case NgxFireSignInScreen.resetPassword:
      case NgxFireSignInScreen.verifyEmail:
      case NgxFireSignInScreen.changeEmail:
      case NgxFireSignInScreen.changePassword:
        this.screen = fragment;
        return;
    }
    this.authState
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          this.screen = NgxFireSignInScreen.home;
        } else {
          this.screen = NgxFireSignInScreen.signUp;
        }
      });
  }
}
