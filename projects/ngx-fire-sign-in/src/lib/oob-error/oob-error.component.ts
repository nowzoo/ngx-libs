import { Component, Input } from '@angular/core';
import { NgxFireSignInScreen, INgxFireSignInController } from '../shared';
import { auth } from 'firebase/app';
@Component({
  selector: 'ngx-oob-error',
  templateUrl: './oob-error.component.html',
  styleUrls: ['./oob-error.component.css']
})
export class OobErrorComponent {
  @Input() controller: INgxFireSignInController;
  @Input() error: auth.Error;
  screens = NgxFireSignInScreen;
}
