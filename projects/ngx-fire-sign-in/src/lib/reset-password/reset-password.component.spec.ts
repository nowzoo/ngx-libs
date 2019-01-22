import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(ResetPasswordComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
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

  describe('ngOnInit()', () => {
    let controller: any;
    beforeEach(() => {
      controller = {
        email: 'foo@bar.com'
      };
      component.controller = controller;
    });
    it('should set up id', () => {
      component.ngOnInit();
      expect(component.id).toBeTruthy();
    });
    it('should set up fg', () => {
      component.ngOnInit();
      expect(component.fg).toBeTruthy();
      expect(component.fg.get('email')).toBe(component.emailFc);
      expect(component.fg.get('email').value).toBe('foo@bar.com');
    });
    it('should set controller.email when the email changes and is valid', () => {
      component.ngOnInit();
      component.emailFc.setValue('w@x.c');
      expect(controller.email).toBe('w@x.c');
      component.emailFc.setValue('');
      expect(controller.email).toBe('w@x.c');
    });
  });

  describe('submit', () => {
    let auth: any;
    let controller: any;

    beforeEach(() => {
      controller = {
        email: 'foo@bar.com',
        showUnhandledError: jasmine.createSpy(),
      };
      component.controller = controller;

      auth = {
        sendPasswordResetEmail: jasmine.createSpy().and.callFake(() => Promise.resolve()),
      };
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.ngOnInit();
      component.fg.setValue({email: 'a@b.c'});
    });
    it('should set submitting', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call sendPasswordResetEmail', () => {
      component.submit();
      expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith('a@b.c');
    });

    it('should set sent', fakeAsync(() => {
      component.submit();
      tick();
      expect(component.sent).toBe('a@b.c');
    }));
    it('should set submitting to false', fakeAsync(() => {
      component.submit();
      expect(component.submitting).toBe(true);
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should deal with auth/user-not-found error', fakeAsync(() => {
      auth.sendPasswordResetEmail.and.callFake(() => Promise.reject({code: 'auth/user-not-found'}));
      component.submit();
      tick();
      expect(component.emailFc.hasError('auth/user-not-found')).toBe(true);
      component.emailFc.setValue('f@b');
      expect(component.emailFc.hasError('auth/user-not-found')).toBe(false);
    }));

    it('should deal with auth/invalid-email error', fakeAsync(() => {
      auth.sendPasswordResetEmail.and.callFake(() => Promise.reject({code: 'auth/invalid-email'}));
      component.submit();
      tick();
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(true);
      component.emailFc.setValue('f@b');
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(false);
    }));

    it('should deal with unknown error', fakeAsync(() => {
      auth.sendPasswordResetEmail.and.callFake(() => Promise.reject({code: 'auth/foo'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
    }));
  });

});
