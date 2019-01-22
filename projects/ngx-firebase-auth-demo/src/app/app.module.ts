import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';

const routes: Routes = [
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '', component: IndexRouteComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
