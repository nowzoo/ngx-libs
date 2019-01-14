import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSignInRedirectService } from '@nowzoo/ngx-sign-in-redirect';

@Component({
  selector: 'app-gated-route',
  templateUrl: './gated-route.component.html',
  styleUrls: ['./gated-route.component.scss']
})
export class GatedRouteComponent implements OnInit {

  constructor(
    private _redirectService: NgxSignInRedirectService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (! this._authService.signedIn) {
      this._redirectService.setRedirect(this._route, '/sign-in');
    }
  }

}
