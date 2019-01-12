import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGX_CRUMBS_CONFIG, INgxCrumbsConfig } from './shared';
import { RouterModule } from '@angular/router';
import { NgxCrumbsWindowTitleComponent } from './ngx-crumbs-window-title.component';
import { BehaviorSubject } from 'rxjs';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { Title } from '@angular/platform-browser';

describe('NgxCrumbsWindowTitleComponent', () => {
  let component: NgxCrumbsWindowTitleComponent;
  let fixture: ComponentFixture<NgxCrumbsWindowTitleComponent>;
  let config: INgxCrumbsConfig;
  let crumbs$: BehaviorSubject<any>;
  let service: any;
  let title: any;


  beforeEach(() => {
    crumbs$ = new BehaviorSubject([]);
    service = {crumbs$: crumbs$.asObservable()};
    config = {windowTitleSeparator: ' | '};
    title = {setTitle: jasmine.createSpy()};
    TestBed.configureTestingModule({
      declarations: [ NgxCrumbsWindowTitleComponent ],
      imports: [RouterModule],
      providers: [
        {provide: NGX_CRUMBS_CONFIG, useValue: config},
        {provide: NgxCrumbsService, useValue: service},
        {provide: Title, useValue: title}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxCrumbsWindowTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('should have config', () => {
      expect(component.config).toEqual(config);
    });
    it('should have service', () => {
      expect(component.service).toEqual(service);
    });
    it('should have title', () => {
      expect(component.title).toEqual(title);
    });
    it('should have el', () => {
      expect(component.el).toBeTruthy();
    });
    it('should have changes', () => {
      expect(component.changes).toBeTruthy();
    });
  });

  describe('ngOnInit() and ngOnDestroy()', () => {
    let changes;
    beforeEach(() => {
      changes = {
        observe: jasmine.createSpy(),
        disconnect: jasmine.createSpy()
      };
      spyOnProperty(component, 'changes').and.returnValue(changes);
    });
    it('should subscribe and unsubscribe from service.crumbs$', () => {
      expect(crumbs$.observers.length).toBe(0);
      component.ngOnInit();
      expect(crumbs$.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(crumbs$.observers.length).toBe(0);
    });
    it('should disconnect from the observer on destroy', () => {
      component.ngOnInit();
      component.ngOnDestroy();
      expect(changes.disconnect).toHaveBeenCalled();
    });

  });
});
