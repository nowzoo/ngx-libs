import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxBootstrapModalModule } from '@nowzoo/ngx-bootstrap-modal';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxBootstrapModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
