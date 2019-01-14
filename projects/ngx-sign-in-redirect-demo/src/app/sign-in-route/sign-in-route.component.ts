import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSignInRedirectService } from '@nowzoo/ngx-sign-in-redirect';

@Component({
  selector: 'app-sign-in-route',
  templateUrl: './sign-in-route.component.html',
  styleUrls: ['./sign-in-route.component.scss']
})
export class SignInRouteComponent implements OnInit {

  constructor(
    public redirectService: NgxSignInRedirectService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signedIn = true;
    this.redirectService.redirectOnSignIn();
  }

}
