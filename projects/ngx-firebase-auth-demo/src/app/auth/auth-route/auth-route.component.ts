import { Component,  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-auth-route',
  templateUrl: './auth-route.component.html',
  styleUrls: ['./auth-route.component.scss']
})
export class AuthRouteComponent implements AfterViewInit {
  @ViewChild('authContainer') container: ElementRef;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }



  ngAfterViewInit() {
    const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          auth.GoogleAuthProvider.PROVIDER_ID,
          auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
          auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '/tos',
        // Privacy policy url/callback.
        privacyPolicyUrl: '/privacy'
      };
      const ui = new firebaseui.auth.AuthUI(this._afAuth.auth);
      ui.start(this.container.nativeElement, uiConfig);
  }

}
