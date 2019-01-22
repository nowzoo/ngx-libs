import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { auth, User } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';
import { INgxFireSignInController } from '../shared';


@Component({
  selector: 'ngx-reauthenticate-form',
  templateUrl: './reauthenticate-form.component.html',
  styleUrls: ['./reauthenticate-form.component.css']
})
export class ReauthenticateFormComponent implements OnInit {
  static idCt = 0;
  @Input() user: User;
  @Input() controller: INgxFireSignInController;
  @Output() success: EventEmitter<auth.UserCredential> = new EventEmitter();
  fg: FormGroup;
  emailFc: FormControl;
  passwordFc: FormControl;
  id: string;
  submitting = false;
  constructor() { }

  ngOnInit() {
    this.id = `ngx-reauthenticate-form-${ ++ ReauthenticateFormComponent.idCt }-`;
    this.emailFc = new FormControl(this.user ? this.user.email : '', Validators.required);
    this.passwordFc = new FormControl('', Validators.required);
    this.fg = new FormGroup({
      email: this.emailFc,
      password: this.passwordFc,
    });
  }

  createCredential(): auth.AuthCredential {
    return auth.EmailAuthProvider.credential(this.user.email, this.passwordFc.value);
  }


  submit() {
    this.submitting = true;
    this.user.reauthenticateAndRetrieveDataWithCredential(this.createCredential())
      .then((userCred: auth.UserCredential) => {
        this.submitting = false;
        this.success.emit(userCred);
      })
      .catch((error: auth.Error) => {
        this.submitting = false;
        switch (error.code) {
          case 'auth/wrong-password':
            NgxFormHelpers.setErrorUntilChanged(this.passwordFc, error.code);
            break;
          default:
            this.controller.showUnhandledError(error);
            break;
        }
      });
  }
}
