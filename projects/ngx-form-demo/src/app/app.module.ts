import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxFormModule } from '@nowzoo/ngx-form';

import { AppComponent } from './app.component';
import { ReactiveDemoComponent } from './reactive-demo/reactive-demo.component';
import { TemplateDemoComponent } from './template-demo/template-demo.component';
import { OptionsProviderDemoComponent } from './options-provider-demo/options-provider-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveDemoComponent,
    TemplateDemoComponent,
    OptionsProviderDemoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
     NgxFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
