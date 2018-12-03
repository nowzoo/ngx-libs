import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMessageComponent } from './ngx-message.component';
import { NgxMessageService } from './ngx-message.service';
import { NGX_MESSAGE_HIDE_DELAY } from './shared';

@NgModule({
  declarations: [NgxMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxMessageComponent]
})
export class NgxMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxMessageModule,
      providers: [
        NgxMessageService,
        {provide: NGX_MESSAGE_HIDE_DELAY, useValue: 3000}
      ]
    };
  }
}
