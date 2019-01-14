import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSignInRedirectModule } from '@nowzoo/ngx-sign-in-redirect';

import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { GatedRouteComponent } from './gated-route/gated-route.component';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';
import { SignOutRouteComponent } from './sign-out-route/sign-out-route.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: 'sign-out', component: SignOutRouteComponent},
  {path: 'sign-in', component: SignInRouteComponent},
  {path: 'gated', component: GatedRouteComponent},
  {path: '', component: IndexRouteComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent,
    GatedRouteComponent,
    SignInRouteComponent,
    SignOutRouteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgxSignInRedirectModule.forRoot()

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
