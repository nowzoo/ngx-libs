import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['.']" fragment="foo">Foo</a>
    |
    <a [routerLink]="['.']" fragment="bar">Bar</a>
    |
    <a [routerLink]="['.']">None</a>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit() {
    this.route.
    this.route.fragment
      .pipe(skip(1))
      .subscribe(val => console.log('fragment', val));
  }
}
