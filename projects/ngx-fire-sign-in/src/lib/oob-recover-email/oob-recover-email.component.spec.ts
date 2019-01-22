import {  ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

import { OobRecoverEmailComponent } from './oob-recover-email.component';
import { INgxFireSignInController } from '../shared';

describe('OobRecoverEmailComponent', () => {
  let component: OobRecoverEmailComponent;
  let fixture: ComponentFixture<OobRecoverEmailComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OobRecoverEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}}
      ]
    })
    .overrideTemplate(OobRecoverEmailComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(OobRecoverEmailComponent);
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



  describe('submit()', () => {
    let auth: any;
    let info: any;
    let oobCode: string;
    let controller: INgxFireSignInController;
    beforeEach(() => {
      oobCode = 'ajalhalkjlh';
      info = {data: {email: 'foo@bar'}};
      auth = {
        applyActionCode: jasmine.createSpy().and.callFake(() => Promise.resolve())
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
    });
    it('should set submitting to true', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);

    });

    it('should call applyActionCode', () => {
      component.submit();
      expect(auth.applyActionCode).toHaveBeenCalledWith(oobCode);
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

    it('should handle auth/expired-action-code error', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject({code: 'auth/expired-action-code'}));
      component.submit();
      tick();
      expect(controller.showOobError).toHaveBeenCalledWith({code: 'auth/expired-action-code'}, jasmine.any(String));
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/invalid-action-code error', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject({code: 'auth/invalid-action-code'}));
      component.submit();
      tick();
      expect(controller.showOobError).toHaveBeenCalledWith({code: 'auth/invalid-action-code'}, jasmine.any(String));
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/user-not-found error', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject({code: 'auth/user-not-found'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/user-not-found'});
      expect(component.submitting).toBe(false);
    }));
    it('should handle auth/user-disabled error', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject({code: 'auth/user-disabled'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/user-disabled'});
      expect(component.submitting).toBe(false);
    }));
    it('should handle an unknown error', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject({code: 'auth/foo'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
      expect(component.submitting).toBe(false);
    }));

  });
});
