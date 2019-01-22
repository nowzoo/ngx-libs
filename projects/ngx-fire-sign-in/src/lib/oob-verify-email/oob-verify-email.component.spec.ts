import {  ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { OobVerifyEmailComponent } from './oob-verify-email.component';

describe('OobVerifyEmailComponent', () => {
  let component: OobVerifyEmailComponent;
  let fixture: ComponentFixture<OobVerifyEmailComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OobVerifyEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}}
      ]
    })
    .overrideTemplate(OobVerifyEmailComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(OobVerifyEmailComponent);
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
    it('should call submit()', () => {
      spyOn(component, 'submit');
      component.ngOnInit();
      expect(component.submit).toHaveBeenCalledWith();
    });
  });

  describe('submit()', () => {
    let auth: any;
    let info: any;
    let oobCode: string;
    let controller: any;
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
