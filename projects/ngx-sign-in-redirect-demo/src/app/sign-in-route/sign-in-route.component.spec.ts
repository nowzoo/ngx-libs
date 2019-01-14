import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRouteComponent } from './sign-in-route.component';

describe('SignInRouteComponent', () => {
  let component: SignInRouteComponent;
  let fixture: ComponentFixture<SignInRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
