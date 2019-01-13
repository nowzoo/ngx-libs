import { Component, Inject, OnInit, OnDestroy, ElementRef, HostBinding, Input  } from '@angular/core';
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
  @Input() showAll = false;
  @Input() reverse = true;
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

  ngOnInit() {
    this._changes = new MutationObserver(() => {
      this._title.setTitle(this._elementRef.nativeElement.innerText);
    });
    this._changes.observe(this._elementRef.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });

    this._service.crumbs$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(val => {
        let crumbs = val.slice(0);
        if (this.reverse) {
          crumbs = crumbs.reverse();
        }
        if (! this.showAll) {
          const filtered = [];
          if (crumbs.length > 0) {
            filtered.push(crumbs[0]);
          }
          if (crumbs.length > 1) {
            filtered.push(crumbs[crumbs.length - 1]);
          }
          this.crumbs = filtered;
        } else {
          this.crumbs = crumbs;
        }
      });

  }

  ngOnDestroy() {
    this._changes.disconnect();
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
