import {  ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { OobResetPasswordComponent } from './oob-reset-password.component';

describe('OobResetPasswordComponent', () => {
  let component: OobResetPasswordComponent;
  let fixture: ComponentFixture<OobResetPasswordComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OobResetPasswordComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}}
      ]
    })
    .overrideTemplate(OobResetPasswordComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(OobResetPasswordComponent);
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
    let auth: any;
    let info: any;
    let oobCode: string;
    let controller: any;
    beforeEach(() => {
      info = {data: {email: 'foo@bar'}};
      oobCode = 'ajalhalkjlh';
      controller = {
        oobCode: oobCode,
        oobInfo: info,
        showUnhandledError: jasmine.createSpy(),
        showOobError: jasmine.createSpy(),
        showOobSuccess: jasmine.createSpy()
      };

      component.controller = controller;
    });
    it('should set id', () => {
      component.ngOnInit();
      expect(component.id).toBeTruthy();
    });
    it('should set emailFc', () => {
      component.ngOnInit();
      expect(component.emailFc.value).toBe('foo@bar');
    });
    it('should set passwordFc', () => {
      component.ngOnInit();
      expect(component.passwordFc.value).toBe('');
    });
    it('should set up fg', () => {
      component.ngOnInit();
      expect(component.fg).toBeTruthy();
      expect(component.fg.get('email')).toBe(component.emailFc);
      expect(component.fg.get('password')).toBe(component.passwordFc);
    });



  });

  describe('submit()', () => {
    let auth: any;
    let info: any;
    let oobCode: string;
    let passwordFc: FormControl;
    let controller: any;
    beforeEach(() => {

      oobCode = 'ajalhalkjlh';
      info = {data: {email: 'foo@bar'}};
      auth = {
        confirmPasswordReset: jasmine.createSpy().and.callFake(() => Promise.resolve())
      };
      spyOnProperty(component, 'auth').and.returnValue(auth);
      controller = {
        oobCode: oobCode,
        oobInfo: info,
        showUnhandledError: jasmine.createSpy(),
        showOobError: jasmine.createSpy(),
        showOobSuccess: jasmine.createSpy()
      };
      component.controller = controller;
      passwordFc = new FormControl('foo');
      component.passwordFc = passwordFc;
    });
    it('should set submitting', () => {
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call confirmPasswordReset', () => {
      component.submit();
      expect(auth.confirmPasswordReset).toHaveBeenCalledWith(oobCode, passwordFc.value);
    });
    it('should set submitting to false on success', fakeAsync(() => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should call controller.showOobSuccess on success', fakeAsync(() => {
      component.submit();
      tick();
      expect(controller.showOobSuccess).toHaveBeenCalledWith(info, jasmine.any(String));
    }));

    it('should handle auth/weak-password error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/weak-password'}));
      component.submit();
      tick();
      expect(passwordFc.hasError('auth/weak-password')).toBe(true);
      expect(component.submitting).toBe(false);
      passwordFc.setValue('');
      expect(passwordFc.hasError('auth/weak-password')).toBe(false);
    }));

    it('should handle auth/expired-action-code error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/expired-action-code'}));
      component.submit();
      tick();
      expect(controller.showOobError).toHaveBeenCalledWith({code: 'auth/expired-action-code'}, jasmine.any(String));
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/invalid-action-code error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/invalid-action-code'}));
      component.submit();
      tick();
      expect(controller.showOobError).toHaveBeenCalledWith({code: 'auth/invalid-action-code'}, jasmine.any(String));
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/user-not-found error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/user-not-found'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/user-not-found'});
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/user-disabled error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/user-disabled'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/user-disabled'});
      expect(component.submitting).toBe(false);
    }));
    it('should handle an unknown error', fakeAsync(() => {
      auth.confirmPasswordReset.and.callFake(() => Promise.reject({code: 'auth/foo'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
      expect(component.submitting).toBe(false);
    }));


  });
});
