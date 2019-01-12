import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { ICrumb } from './shared';

@Component({
  selector: 'ngx-crumbs',
  template: `
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <ng-container *ngFor="let c of crumbs; let isLast = last">
        <ng-container *ngIf="!isLast">
          <li class="breadcrumb-item">
            <a [routerLink]="c.url"><ng-container *ngTemplateOutlet="c.templateRef"></ng-container></a>
          </li>
        </ng-container>
        <ng-container *ngIf="isLast">
          <li class="breadcrumb-item active" aria-current="page">
            <ng-container *ngTemplateOutlet="c.templateRef"></ng-container>
          </li>
        </ng-container>
      </ng-container>
    </ol>
  </nav>
  `,
  styles: []
})
export class NgxCrumbsComponent   implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  crumbs: ICrumb[] = [];

  constructor(
    private _service: NgxCrumbsService
  ) { }

  get service(): NgxCrumbsService {
    return this._service;
  }

  ngOnInit() {
    this.service.crumbs$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(val => this.crumbs = val);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
