import { Directive, Input, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgxBootstrapNavbarService } from './ngx-bootstrap-navbar.service';
import { INgxBsNavbarContentEntry, NgxBsNavbarContext } from './shared';

@Directive({
  selector: '[ngxBsNavbarContent]'
})
export class NgxBootstrapNavbarContentDirective implements OnInit, OnDestroy, INgxBsNavbarContentEntry {
  @Input() ngxBsNavbarContent: NgxBsNavbarContext;
  priority: number;
  constructor(
    private _service: NgxBootstrapNavbarService,
    private _route: ActivatedRoute,
    private _templateRef: TemplateRef<any>
  ) { }

  get service(): NgxBootstrapNavbarService {
    return this._service;
  }

  get route(): ActivatedRouteSnapshot {
    return this._route.snapshot;
  }

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }

  get context(): NgxBsNavbarContext {
    return this.ngxBsNavbarContent;
  }

  ngOnInit() {
    let current: ActivatedRouteSnapshot = this.route;
    let routeCount = 0;
    while (current) {
      routeCount++;
      current = current.parent;
    }
    this.priority = routeCount;
    this.service.setTemplate(this);
  }

  ngOnDestroy() {
    this.service.removeTemplate(this);
  }

}
