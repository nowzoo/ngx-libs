import { Component } from '@angular/core';
import { NgxSignInRedirectService } from '@nowzoo/ngx-sign-in-redirect';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  inputRedirect = '';
  constructor(
    public redirectService: NgxSignInRedirectService,
    public authService: AuthService
  ) {}

}
