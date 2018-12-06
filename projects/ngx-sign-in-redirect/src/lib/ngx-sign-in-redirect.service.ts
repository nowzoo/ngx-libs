import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { INgxSignInRedirectConfig, NGX_SIGN_IN_REDIRECT_CONFIG} from './shared';

@Injectable({
  providedIn: 'root'
})
export class NgxSignInRedirectService {
  constructor(
    @Inject(NGX_SIGN_IN_REDIRECT_CONFIG) private _config: INgxSignInRedirectConfig,
    private _router: Router
  ) { }

  get router(): Router {
    return this._router;
  }
  get storage(): Storage {
    return window.sessionStorage;
  }

  get config(): INgxSignInRedirectConfig {
    return this._config;
  }

  set redirect(url: string) {
    const val = 'string' === typeof url ? url.trim() : '';
    if (val.length > 0) {
      this.storage.setItem(this.config.storageKey, val);
    } else {
      this.storage.removeItem(this.config.storageKey);
    }
  }

  get redirect(): string {
    return this.storage.getItem(this.config.storageKey) || null;
  }

  redirectOnSignIn() {
    const redirect = this.redirect || this.config.defaultRedirect;
    this.redirect = null;
    this.router.navigateByUrl(redirect);
  }
}
