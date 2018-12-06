import { InjectionToken } from '@angular/core';
export interface INgxSignInRedirectConfig {
  defaultRedirect: string;
  storageKey: string;
}

export const NGX_SIGN_IN_REDIRECT_CONFIG: InjectionToken<INgxSignInRedirectConfig> = new InjectionToken(
  `config for NgxSignInRedirectModule`
);
