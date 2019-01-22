import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}},
      ]
    })
    .overrideTemplate(ChangePasswordComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('getters', () => {
    it('should have auth', () => {
      expect(component.auth).toBeTruthy();
    });
    it('should have authState', () => {
      expect(component.authState).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    let authState$: BehaviorSubject<any>;
    let controller: any;
    beforeEach(() => {
      authState$ = new BehaviorSubject({email: 'a@b.c'});
      spyOnProperty(component, 'authState').and.returnValue(authState$.asObservable());
      controller = {
        showSignIn: jasmine.createSpy()
      };
      component.controller = controller;
    });
    it('should set up fg', () => {
      component.ngOnInit();
      expect(component.fg).toBeTruthy();
      expect(component.fg.get('password')).toBe(component.passwordFc);
    });

    it('should call controller.showSignIn if the user is signed out', () => {
      component.ngOnInit();
      expect(controller.showSignIn).not.toHaveBeenCalled();
      authState$.next(null);
      expect(controller.showSignIn).toHaveBeenCalled();
    });
    it('should sub and unsub from authState', () => {
      component.ngOnInit();
      expect(authState$.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(authState$.observers.length).toBe(0);
    });
  });

  describe('submit', () => {
    let user: any;
    let controller: any;
    let auth: any;
    beforeEach(() => {
      user = {
        email: 'orig@email.com',
        updatePassword: jasmine.createSpy().and.callFake(() => Promise.resolve())
      };
      component.user = user;
      controller = {
        showUnhandledError: jasmine.createSpy(),
        showHome: jasmine.createSpy()
      };
      component.controller = controller;
      component.passwordFc = new FormControl('pass');
    });
    it('should set submitting', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call updatePassword', () => {
      component.submit();
      expect(user.updatePassword).toHaveBeenCalledWith('pass');
    });
    it('should set submitting to false', fakeAsync(() => {
      component.submit();
      expect(component.submitting).toBe(true);
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should call controller.showHome', fakeAsync(() => {
      component.submit();
      tick();
      expect(controller.showHome).toHaveBeenCalledWith();
    }));
    it('should deal with auth/weak-password', fakeAsync(() => {
      user.updatePassword.and.callFake(() => Promise.reject({code: 'auth/weak-password'}));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.passwordFc.hasError('auth/weak-password')).toBe(true);
      component.passwordFc.setValue('');
      expect(component.passwordFc.hasError('auth/weak-password')).toBe(false);
    }));

    it('should deal with auth/requires-recent-login', fakeAsync(() => {
      user.updatePassword.and.callFake(() => Promise.reject({code: 'auth/requires-recent-login'}));
      expect(component.showReauthenticate).toBe(false);
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.showReauthenticate).toBe(true);
    }));
    it('should deal with unknown error', fakeAsync(() => {
      user.updatePassword.and.callFake(() => Promise.reject({code: 'auth/foo'}));
      expect(component.showReauthenticate).toBe(false);
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.showReauthenticate).toBe(false);
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
    }));
  });

  describe('onReauthenticated', () => {
    it('should set showReauthenticate to false', () => {
      component.showReauthenticate = true;
      component.onReauthenticated();
      expect(component.showReauthenticate).toBe(false);
    });
  });
});
