import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxBootstrapNavbarModule } from '@nowzoo/ngx-bootstrap-navbar';
import { AppComponent } from './app.component';
import { AnotherRouteComponent } from './another-route/another-route.component';
import { IndexRouteComponent } from './index-route/index-route.component';

const routes: Routes = [
  {path: 'another', component: AnotherRouteComponent},
  {path: '', component: IndexRouteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AnotherRouteComponent,
    IndexRouteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgxBootstrapNavbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
