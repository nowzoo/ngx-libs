import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTitleRouteComponent } from './dynamic-title-route.component';

describe('DynamicTitleRouteComponent', () => {
  let component: DynamicTitleRouteComponent;
  let fixture: ComponentFixture<DynamicTitleRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTitleRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTitleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
