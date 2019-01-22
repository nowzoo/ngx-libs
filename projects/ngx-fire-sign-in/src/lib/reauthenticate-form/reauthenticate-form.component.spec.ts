import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { auth } from 'firebase/app';

import { ReauthenticateFormComponent } from './reauthenticate-form.component';

describe('ReauthenticateFormComponent', () => {
  let component: ReauthenticateFormComponent;
  let fixture: ComponentFixture<ReauthenticateFormComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ReauthenticateFormComponent ]
    })
    .overrideTemplate(ReauthenticateFormComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(ReauthenticateFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let user: any;
    beforeEach(() => {
      user = {email: 'a@b.c'};
      component.user = user;
    });
    it('should set up fg', () => {
      component.ngOnInit();
      expect(component.fg).toBeTruthy();
    });
    it('should set the value of the email control if there is a user', () => {
      component.ngOnInit();
      expect(component.fg.get('email').value).toBe('a@b.c');
    });
    it('should set the value of the email control if there is no user', () => {
      component.user = null;
      component.ngOnInit();
      expect(component.fg.get('email').value).toBe('');
    });
    it('should correctly assign controls in the fg', () => {
      component.ngOnInit();
      expect(component.fg.get('email')).toBe(component.emailFc);
      expect(component.fg.get('password')).toBe(component.passwordFc);
    });
  });

  describe('createCredential', () => {
    beforeEach(() => {

    });
    it('should ', () => {
      console.log('hey');
    });
  });

  describe('submit', () => {
    let user: any;
    let controller: any;
    let cred: any;
    let userCred: any;
    beforeEach(() => {
      userCred = {};
      user = {
        email: 'a@b.c',
        reauthenticateAndRetrieveDataWithCredential: jasmine.createSpy().and.callFake(() => Promise.resolve(userCred))
      };
      component.user = user;
      controller = {
        showUnhandledError: jasmine.createSpy()
      };
      component.controller = controller;
      component.ngOnInit();
      component.passwordFc.setValue('p');
      cred = {};
      spyOn(component, 'createCredential').and.callFake(() => cred);
      spyOn(component.success, 'emit');
    });
    it('should set submitting to true', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call createCredential', () => {
      component.submit();
      expect(component.createCredential).toHaveBeenCalled();
    });
    it('should call user.reauthenticateAndRetrieveDataWithCredential', () => {
      component.submit();
      expect(user.reauthenticateAndRetrieveDataWithCredential).toHaveBeenCalledWith(cred);
    });
    it('should resolve', fakeAsync(() => {
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should emit the user cred', fakeAsync(() => {
      component.submit();
      tick();
      expect(component.success.emit).toHaveBeenCalledWith(userCred);
    }));
    it('should handle auth/wrong-password', fakeAsync(() => {
      user.reauthenticateAndRetrieveDataWithCredential
        .and.callFake(() => Promise.reject({code: 'auth/wrong-password'}));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.passwordFc.hasError('auth/wrong-password')).toBe(true);
      component.passwordFc.setValue('');
      expect(component.passwordFc.hasError('auth/wrong-password')).toBe(false);
    }));
    it('should pass off other errors', fakeAsync(() => {
      user.reauthenticateAndRetrieveDataWithCredential
        .and.callFake(() => Promise.reject({code: 'auth/foo'}));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
    }));
  });

});
