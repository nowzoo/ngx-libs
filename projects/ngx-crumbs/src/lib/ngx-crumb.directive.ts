import { Directive, TemplateRef, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { ICrumb } from './shared';
@Directive({
  selector: '[ngxCrumb]'
})
export class NgxCrumbDirective implements OnInit, OnDestroy, ICrumb {
  @Input() ngxCrumb: string[] = null;
  constructor(
    private _route: ActivatedRoute,
    private _templateRef: TemplateRef<any>,
    private _service: NgxCrumbsService
  ) { }

  get route(): ActivatedRouteSnapshot {
    return this._route.snapshot;
  }

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }

  get service(): NgxCrumbsService {
    return this._service;
  }

  get url(): string[] {
    if (this.ngxCrumb) {
      return this.ngxCrumb;
    }
    const slugs: string[] = [];
    let route = this.route;
    while (route) {
      slugs.push(...route.url.map(s => s.path));
      route = route.parent;
    }
    return slugs.filter(s => {
      return typeof s === 'string' && s.length > 0;
    }).reverse();
  }




  ngOnInit() {
    this._service.setCrumb(this);
  }

  ngOnDestroy() {
    this._service.removeCrumb(this);
  }

}
