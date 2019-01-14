import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutRouteComponent } from './sign-out-route.component';

describe('SignOutRouteComponent', () => {
  let component: SignOutRouteComponent;
  let fixture: ComponentFixture<SignOutRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
