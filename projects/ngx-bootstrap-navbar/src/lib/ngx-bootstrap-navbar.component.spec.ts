import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivationEnd } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgxBootstrapNavbarService} from './ngx-bootstrap-navbar.service';
import { INgxBsNavbarContentEntries } from './shared';

import { NgxBootstrapNavbarComponent } from './ngx-bootstrap-navbar.component';

describe('NgxBootstrapNavbarComponent', () => {
  let component: NgxBootstrapNavbarComponent;
  let fixture: ComponentFixture<NgxBootstrapNavbarComponent>;
  let router: any;
  let routerEvents$: Subject<any>;
  let templates$: BehaviorSubject<INgxBsNavbarContentEntries>;
  let service: any;
  let jQuery: any;
  let jqCollapse;
  beforeEach(() => {
    jqCollapse = jasmine.createSpy();
    jQuery = jasmine.createSpy().and.returnValue({
      collapse: jqCollapse
    });
    window['jQuery'] = jQuery;
    routerEvents$ = new Subject();
    router = {events: routerEvents$.asObservable()};
    templates$ = new BehaviorSubject({brand: null, left: null, right: null});
    service = { templates$: templates$.asObservable()};
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapNavbarComponent ],
      providers: [
        {provide: NgxBootstrapNavbarService, useValue: service},
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxBootstrapNavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sub and unsub from templates$', () => {
    expect(templates$.observers.length).toBe(0);
    component.ngOnInit();
    expect(templates$.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(templates$.observers.length).toBe(0);
  });
  it('should sub and unsub from router events', () => {
    expect(routerEvents$.observers.length).toBe(0);
    component.ngOnInit();
    expect(routerEvents$.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(routerEvents$.observers.length).toBe(0);
  });

  describe('setting templates', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should set the brand template', () => {
      const entry: any = {templateRef: {}};
      templates$.next({brand: entry, left: null, right: null});
      expect(component.brandTemplateRef).toBe(entry.templateRef);
    });
    it('should set the left template', () => {
      const entry: any = {templateRef: {}};
      templates$.next({brand: null, left: entry, right: null});
      expect(component.leftTemplateRef).toBe(entry.templateRef);
    });
    it('should set the right template', () => {
      const entry: any = {templateRef: {}};
      templates$.next({brand: null, left: null, right: entry});
      expect(component.rightTemplateRef).toBe(entry.templateRef);
    });
  });
  it('should hide on ActivationEnd', () => {
    component.ngOnInit();
    routerEvents$.next(new ActivationEnd({} as any));
    expect(jqCollapse).toHaveBeenCalledWith('hide');
  });

  it('should call collapse with the el', () => {
    component.ngOnInit();
    expect(jqCollapse).toHaveBeenCalledWith({toggle: false});
  });

  describe('toggle()', () => {
    it('should toggle', () => {
      component.ngOnInit();
      component.toggle();
      expect(jqCollapse).toHaveBeenCalledWith('toggle');
    });
  });

});
