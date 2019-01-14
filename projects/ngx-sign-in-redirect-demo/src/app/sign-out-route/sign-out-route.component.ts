import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-out-route',
  templateUrl: './sign-out-route.component.html',
  styleUrls: ['./sign-out-route.component.scss']
})
export class SignOutRouteComponent implements OnInit {

  constructor(
    private auth: AuthService

  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.auth.signedIn = false;
    });

  }

}
