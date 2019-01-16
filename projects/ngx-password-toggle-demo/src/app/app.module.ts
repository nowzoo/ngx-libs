import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPasswordToggleModule } from '@nowzoo/ngx-password-toggle';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    NgxPasswordToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
