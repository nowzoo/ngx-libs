import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { auth, User } from 'firebase/app';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { INgxFireSignInController } from '../shared';

@Component({
  selector: 'ngx-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() controller: INgxFireSignInController;

  submitting = false;
  sent: string = null;
  user: User = null;

  constructor(
    private _afAuth: AngularFireAuth
  ) { }



  get authState(): Observable<User> {
    return this._afAuth.authState;
  }



  ngOnInit() {
    this.authState
      .pipe(take(1))
      .subscribe(result => {
        this.user = result;
        if (this.user) {
          this.submit();
          this.authState
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(result1 => {
              this.user = result1;
              if (! this.user) {
                this.controller.showSignIn();
              }
            });

        } else {
          this.controller.showSignIn();
        }
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }




  submit() {
    this.sent = null;
    this.submitting = true;
    this.user.sendEmailVerification()
      .then(() => {
        this.submitting = false;
        this.sent = this.user.email;
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        this.controller.showUnhandledError(error);
      });
  }

}
