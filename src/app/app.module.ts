import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { AnotherRouteComponent } from './another-route/another-route.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent,
    AnotherRouteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
