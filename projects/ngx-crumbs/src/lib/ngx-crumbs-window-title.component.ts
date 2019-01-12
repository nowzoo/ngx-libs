import { Component, Inject, OnInit, OnDestroy, ElementRef, HostBinding  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { ICrumb, INgxCrumbsConfig, NGX_CRUMBS_CONFIG } from './shared';

@Component({
  selector: 'ngx-crumbs-window-title',
  template: `
    <ng-container *ngFor="let c of crumbs; let isLast = last">
      <ng-container *ngTemplateOutlet="c.templateRef"></ng-container>
      <ng-container *ngIf="!isLast">{{config.windowTitleSeparator}}</ng-container>
    </ng-container>
  `,
  styles: [':host {display: none}'],
})
export class NgxCrumbsWindowTitleComponent implements OnInit, OnDestroy {
  private _changes: MutationObserver = null;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @HostBinding('attr.aria-hidden') ariaHidden = true;
  crumbs: ICrumb[];
  constructor(
    @Inject(NGX_CRUMBS_CONFIG) private _config: INgxCrumbsConfig,
    private _service: NgxCrumbsService,
    private _elementRef: ElementRef,
    private _title: Title
  ) { }

  get config(): INgxCrumbsConfig {
    return this._config;
  }

  get service(): NgxCrumbsService {
    return this._service;
  }

  get title(): Title {
    return this._title;
  }

  get el(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get changes(): MutationObserver {
    if (! this._changes) {
      this._changes = new MutationObserver(() => {
        this._update();
      });
    }
    return this._changes;
  }




  ngOnInit() {
    this.changes.observe(this.el, {
      childList: true,
      characterData: true,
      subtree: true
    });

    this.service.crumbs$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(val => {
        this.crumbs = val.slice(0).reverse();
      });

  }

  ngOnDestroy() {
    this.changes.disconnect();
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  private _update() {
    this.title.setTitle(this.el.innerText);
  }

}
