import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRouteComponent } from './child-route.component';

describe('ChildRouteComponent', () => {
  let component: ChildRouteComponent;
  let fixture: ComponentFixture<ChildRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
