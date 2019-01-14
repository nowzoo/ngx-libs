import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxBootstrapModalService} from './ngx-bootstrap-modal.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class NgxBootstrapModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxBootstrapModalModule,
      providers: [NgxBootstrapModalService]
    };
  }
}
