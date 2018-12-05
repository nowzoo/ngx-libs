import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { NgxBootstrapNavbarService} from './ngx-bootstrap-navbar.service';
declare const jQuery: any;

@Component({
  selector: 'ngx-bootstrap-navbar',
  template: `
  <nav [attr.class]="navbarClass">
    <ng-container *ngTemplateOutlet="brandTemplateRef"></ng-container>
    <button
      class="navbar-toggler"
      type="button"
      [attr.aria-controls]="id + '-collapse'"
      aria-expanded="false"
      aria-label="Toggle navigation"
      (click)="toggle()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" #collapse [attr.id]="id + '-collapse'">
      <div class="mr-auto">
        <ng-container *ngTemplateOutlet="leftTemplateRef"></ng-container>
      </div>
      <div class="ml-auto">
        <ng-container *ngTemplateOutlet="rightTemplateRef"></ng-container>
      </div>
    </div>
  </nav>
  `,
  styles: []
})
export class NgxBootstrapNavbarComponent implements OnInit, OnDestroy {
  static count = 0;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('collapse') collapseElementRef: ElementRef;
  @Input() navbarClass = 'navbar navbar-expand-lg navbar-dark bg-primary';
  brandTemplateRef: TemplateRef<any> = null;
  leftTemplateRef: TemplateRef<any> = null;
  rightTemplateRef: TemplateRef<any> = null;
  id: string;
  constructor(
    private _service: NgxBootstrapNavbarService,
    private _router: Router,
  ) { }

  get service(): NgxBootstrapNavbarService {
    return this._service;
  }
  get $collapse(): any {
    return jQuery(this.collapseElementRef.nativeElement);
  }

  get routerEvents(): Observable<ActivationEnd> {
    return this._router.events
      .pipe(filter(e => e instanceof ActivationEnd)) as Observable<ActivationEnd>;
  }

  ngOnInit() {
    this.id = `ngx-bs-navbar-${++ NgxBootstrapNavbarComponent.count}`;
    this.service.templates$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(val => {
        this.brandTemplateRef = val.brand ? val.brand.templateRef : null;
        this.leftTemplateRef = val.left ? val.left.templateRef : null;
        this.rightTemplateRef = val.right ? val.right.templateRef : null;
      });
    this.$collapse.collapse({toggle: false});
    this.routerEvents
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => this.$collapse.collapse('hide'));
  }
  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  toggle() {
    this.$collapse.collapse('toggle');
  }

}
