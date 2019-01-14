import { Component } from '@angular/core';
import { NgxCrumbsService } from '@nowzoo/ngx-crumbs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'ngx-crumbs-demo';
  crumbs: any[] = [];
  constructor(public svc: NgxCrumbsService) {
    this.svc.crumbs$.subscribe((val) => {
      this.crumbs = val.map((c, i) => {
        return {index: i, url: c.url};
      });
    });
  }
}
