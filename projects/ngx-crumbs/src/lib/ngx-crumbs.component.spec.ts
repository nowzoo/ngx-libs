import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgxCrumbsComponent } from './ngx-crumbs.component';
import { NgxCrumbsService } from './ngx-crumbs.service';

describe('NgxCrumbsComponent', () => {
  let component: NgxCrumbsComponent;
  let fixture: ComponentFixture<NgxCrumbsComponent>;
  let crumbs$: BehaviorSubject<any>;
  beforeEach(async(() => {
    crumbs$ = new BehaviorSubject([]);
    TestBed.configureTestingModule({
      declarations: [ NgxCrumbsComponent ],
      imports: [ RouterModule ],
      providers: [
        {provide: NgxCrumbsService, useValue: {crumbs$: crumbs$.asObservable()}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and unsubscribe from service.crumbs$', () => {
    expect(crumbs$.observers.length).toBe(0);
    component.ngOnInit();
    expect(crumbs$.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(crumbs$.observers.length).toBe(0);
  });

  it('should set crumbs', () => {
    component.ngOnInit();
    crumbs$.next([{foo: 8}]);
    expect(component.crumbs as any).toEqual([{foo: 8}]);
  });
});
