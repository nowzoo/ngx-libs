import { Component } from '@angular/core';
import { NgxBootstrapModalService } from '@nowzoo/ngx-bootstrap-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(
    public modalService: NgxBootstrapModalService
  ) {}
}
