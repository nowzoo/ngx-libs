import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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

  setRedirect(route: ActivatedRoute|ActivatedRouteSnapshot, signInUrl?: string) {
    const snapshot = route instanceof ActivatedRoute ? route.snapshot : route;
    const slugs: string[] = [];
    let current = snapshot;
    while (current) {
      slugs.push(...current.url.map(s => s.path));
      current = current.parent;
    }
    const url = '/' + slugs.filter(s => {
      return typeof s === 'string' && s.length > 0;
    }).reverse().join('/');
    this.redirect = url;
    if (signInUrl) {
      this.router.navigateByUrl(signInUrl);
    }
  }
}
