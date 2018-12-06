import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxSignInRedirectService } from './ngx-sign-in-redirect.service';
import { INgxSignInRedirectConfig, NGX_SIGN_IN_REDIRECT_CONFIG} from './shared';

const defaultConfig: INgxSignInRedirectConfig = {
  defaultRedirect: '/',
  storageKey: 'ngx-sign-in-redirect'
};
@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class NgxSignInRedirectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSignInRedirectModule,
      providers: [
        {provide: NGX_SIGN_IN_REDIRECT_CONFIG, useValue: defaultConfig},
        NgxSignInRedirectService
      ]
    };
  }
}
