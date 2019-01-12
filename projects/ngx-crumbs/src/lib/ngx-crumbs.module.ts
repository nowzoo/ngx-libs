import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxCrumbsComponent } from './ngx-crumbs.component';
import { NGX_CRUMBS_CONFIG, INgxCrumbsConfig } from './shared';
import { NgxCrumbsWindowTitleComponent } from './ngx-crumbs-window-title.component';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { NgxCrumbDirective } from './ngx-crumb.directive';

const defaultConfig: INgxCrumbsConfig = {
  windowTitleSeparator: ' | '
};
@NgModule({
  declarations: [
    NgxCrumbsComponent,
    NgxCrumbsWindowTitleComponent,
    NgxCrumbDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NgxCrumbsComponent,
    NgxCrumbsWindowTitleComponent,
    NgxCrumbDirective
  ]
})
export class NgxCrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxCrumbsModule,
      providers: [
        {provide: NGX_CRUMBS_CONFIG, useValue: defaultConfig},
        NgxCrumbsService
      ]
    };
  }
}
