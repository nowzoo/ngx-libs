import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { auth } from 'firebase/app';
import { NgxFormHelpers } from '@nowzoo/ngx-form-helpers';

@Component({
  selector: 'ngx-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  static idCtr = 0;
  private _submitting: boolean;
  @Output() busy: EventEmitter<boolean> = new EventEmitter();
  @Output() signedIn: EventEmitter<auth.UserCredential> = new EventEmitter();
  id: string;
  fg: FormGroup;
  emailControl: FormControl;
  unhandledAuthError: auth.Error = null;
  hasAccount = false;
  methodsFetched = false;
  constructor(
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _zone: NgZone
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  get submitting(): boolean {
    return this._submitting;
  }

  set submitting(b: boolean) {
    this._submitting = b;
    this.busy.emit(b);
  }

  ngOnInit() {
    this.submitting = false;
    this.id = `ngx-sign-in-form-${++ SignInFormComponent.idCtr}-`;
    this.emailControl = new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'});
    this.fg = new FormGroup({
      email: this.emailControl
    });
    this.emailControl.valueChanges.subscribe(() => this.update());
  }

  update() {
    this.hasAccount = false;
    this.methodsFetched = false;
    this._zone.runOutsideAngular(() => {
      if (! this.emailControl.valid) {
        this._zone.run(() => {});
        return;
      }
      this.auth.fetchSignInMethodsForEmail(this.emailControl.value.trim())
        .then(result => {
          this._zone.run(() => {
            this.hasAccount = result.length > 0;
            this.methodsFetched = true;
          });
        });
    });



  }

  submit() {

  }



}
