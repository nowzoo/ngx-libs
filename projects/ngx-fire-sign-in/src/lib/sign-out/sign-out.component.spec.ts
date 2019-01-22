import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { SignOutComponent } from './sign-out.component';

describe('SignOutComponent', () => {
  let component: SignOutComponent;
  let fixture: ComponentFixture<SignOutComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(SignOutComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(SignOutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('getters', () => {
    it('should have auth', () => {
      expect(component.auth).toBeTruthy();
    });
  });
  describe('ngOnInit', () => {
    it('should call submit', () => {
      spyOn(component, 'submit');
      component.ngOnInit();
      expect(component.submit).toHaveBeenCalledWith();
    });
  });
  describe('submit()', () => {
    let controller: any;
    let auth: any;
    beforeEach(() => {
      auth = {signOut: jasmine.createSpy().and.callFake(() => Promise.resolve())};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      controller = {showSignIn: jasmine.createSpy()};
      component.controller = controller;
    });
    it('should set submitting to true', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call signOut', () => {
      component.submit();
      expect(auth.signOut).toHaveBeenCalledWith();
    });
    it('should set submitting to false after signOut resolves', fakeAsync(() => {
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should set signedOut to true after signOut resolves', fakeAsync(() => {
      expect(component.signedOut).toBe(false);
      component.submit();
      tick();
      expect(component.signedOut).toBe(true);
    }));
    it('should call showSignIn', fakeAsync(() => {
      component.submit();
      tick();
      expect(controller.showSignIn).toHaveBeenCalled();
    }));
  });
});
