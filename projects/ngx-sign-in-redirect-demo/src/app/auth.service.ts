import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signedIn = false;

  constructor() { }

  get signedIn(): boolean {
    return this._signedIn;
  }

  set signedIn(b: boolean) {
    this._signedIn = b;
  }
}
