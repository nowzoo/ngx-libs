import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherRouteComponent } from './another-route.component';

describe('AnotherRouteComponent', () => {
  let component: AnotherRouteComponent;
  let fixture: ComponentFixture<AnotherRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
