import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandchildRouteComponent } from './grandchild-route.component';

describe('GrandchildRouteComponent', () => {
  let component: GrandchildRouteComponent;
  let fixture: ComponentFixture<GrandchildRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandchildRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandchildRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
