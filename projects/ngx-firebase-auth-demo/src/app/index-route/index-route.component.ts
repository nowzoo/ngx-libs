import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-index-route',
  templateUrl: './index-route.component.html',
  styleUrls: ['./index-route.component.scss']
})
export class IndexRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD, auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD);
  }

}
