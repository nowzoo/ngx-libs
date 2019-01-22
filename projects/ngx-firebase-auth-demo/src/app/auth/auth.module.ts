import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxFirebaseAuthModule } from '@nowzoo/ngx-firebase-auth';
import { AuthRouteComponent } from './auth-route/auth-route.component';

const routes: Routes = [
  {path: '**', component: AuthRouteComponent}
];
@NgModule({
  declarations: [AuthRouteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxFirebaseAuthModule
  ]
})
export class AuthModule { }
