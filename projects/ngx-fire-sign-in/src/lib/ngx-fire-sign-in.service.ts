import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxFireSignInService {
  static signInStorageKey = 'ngx-fire-sign-in';

  constructor() { }

  get savedSignIn(): {email: string, name?: string} {
    const jsonStr = localStorage.getItem(NgxFireSignInService.signInStorageKey);
    if (! jsonStr) {
      return null;
    }
    try {
      const o =  JSON.parse(jsonStr);
      if (typeof o !== 'object') {
        return null;
      }
      return o;
    } catch (e) {
      return null;
    }
  }

  set savedSignIn(o: {email: string, name?: string}) {
    if (! o) {
      localStorage.removeItem(NgxFireSignInService.signInStorageKey);
    } else {
      localStorage.setItem(NgxFireSignInService.signInStorageKey, JSON.stringify(o));
    }
  }
}
