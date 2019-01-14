import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatedRouteComponent } from './gated-route.component';

describe('GatedRouteComponent', () => {
  let component: GatedRouteComponent;
  let fixture: ComponentFixture<GatedRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatedRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatedRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
