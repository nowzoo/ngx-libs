import { Component, OnInit, Input } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { INgxFireSignInController } from '../shared';


@Component({
  selector: 'ngx-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {
  @Input() controller: INgxFireSignInController;
  submitting = false;
  signedOut = false;
  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  ngOnInit() {
    this.submit();
  }

  submit() {
    this.submitting = true;
    this.auth.signOut()
      .then(() => {
        this.submitting = false;
        this.signedOut = true;
        this.controller.showSignIn('Thanks! You’re signed out.');
      });
  }

}
