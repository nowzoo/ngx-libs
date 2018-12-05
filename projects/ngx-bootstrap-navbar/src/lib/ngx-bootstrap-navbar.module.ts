import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBootstrapNavbarComponent } from './ngx-bootstrap-navbar.component';
import { NgxBootstrapNavbarContentDirective } from './ngx-bootstrap-navbar-content.directive';
import { NgxBootstrapNavbarService } from './ngx-bootstrap-navbar.service';

@NgModule({
  declarations: [NgxBootstrapNavbarComponent, NgxBootstrapNavbarContentDirective],
  imports: [
    CommonModule
  ],
  exports: [NgxBootstrapNavbarComponent, NgxBootstrapNavbarContentDirective]
})
export class NgxBootstrapNavbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxBootstrapNavbarModule,
      providers: [NgxBootstrapNavbarService]
    };
  }
 }
