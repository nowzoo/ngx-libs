import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  });

  describe('ngOnInit() and ngOnDestroy()', () => {
    it('should subscribe and unsubscribe from service.crumbs$', () => {
      expect(crumbs$.observers.length).toBe(0);
      component.ngOnInit();
      expect(crumbs$.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(crumbs$.observers.length).toBe(0);
    });
    it('should subscribe and unsubscribe from observe', () => {

    });
  });
  it('should ', fakeAsync(() => {
    component.ngOnInit();
    fixture.debugElement.nativeElement.innerText = 'foo';
    tick();
    // setTimeout(() => {
    //   expect(title.setTitle).toHaveBeenCalledWith('foo');
    // }, 1000);
    // tick(1000);

  }));

  it('should reverse the crumbs if reverse = true', () => {
    component.reverse = true;
    component.showAll = false;
    component.ngOnInit();
    crumbs$.next([{label: 'a'}, {label: 'b'}, {label: 'c'}]);
    expect((component.crumbs[0] as any).label).toBe('c');
    expect((component.crumbs[1] as any).label).toBe('a');
  });
  it('should not reverse the crumbs if reverse = false', () => {
    component.reverse = false;
    component.showAll = false;
    component.ngOnInit();
    crumbs$.next([{label: 'a'}, {label: 'b'}, {label: 'c'}]);
    expect((component.crumbs[0] as any).label).toBe('a');
    expect((component.crumbs[1] as any).label).toBe('c');
  });
  it('should shaw all the crumbs if showAll = true', () => {
    component.reverse = true;
    component.showAll = true;
    component.ngOnInit();
    crumbs$.next([{label: 'a'}, {label: 'b'}, {label: 'c'}]);
    expect((component.crumbs[0] as any).label).toBe('c');
    expect((component.crumbs[1] as any).label).toBe('b');
    expect((component.crumbs[2] as any).label).toBe('a');
  });

});
