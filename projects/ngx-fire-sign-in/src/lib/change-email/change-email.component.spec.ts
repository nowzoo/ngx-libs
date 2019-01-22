import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ChangeEmailComponent } from './change-email.component';

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}},
      ]
    })
    .overrideTemplate(ChangeEmailComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(ChangeEmailComponent);
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

  describe('validateEmail', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('');
    });
    it('should return required for empty string', () => {
      fc.setValue('');
      expect(component.validateEmail(fc)).toEqual({required: true});
    });
    it('should return required for a string that is empty when trimmed', () => {
      fc.setValue('    ');
      expect(component.validateEmail(fc)).toEqual({required: true});
    });
    it('should return email for a string that is not an email', () => {
      fc.setValue('  foo@bar.  ');
      expect(component.validateEmail(fc)).toEqual({email: true});
    });
    it('should return same for an email that is the same as the user email', () => {
      component.user = {email: 'a@b.com'} as any;
      fc.setValue('a@b.com');
      expect(component.validateEmail(fc)).toEqual({same: true});
      fc.setValue('A@b.Com');
      expect(component.validateEmail(fc)).toEqual({same: true});
    });
    it('should return null if the value is an email and not the same as the user email', () => {
      component.user = {email: 'a@b.com'} as any;
      fc.setValue('a@b.net');
      expect(component.validateEmail(fc)).toEqual(null);
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
      expect(component.fg.get('email')).toBe(component.emailFc);
    });
    it('should bind the emailFc validation to validateEmail', () => {
      component.ngOnInit();
      component.emailFc.setValue('a@b.c');
      expect(component.emailFc.hasError('same')).toBe(true);
      component.emailFc.setValue('b@b.c');
      expect(component.emailFc.hasError('same')).toBe(false);
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
        updateEmail: jasmine.createSpy().and.callFake(() => Promise.resolve())
      };
      component.user = user;
      controller = {
        showSignIn: jasmine.createSpy(),
        showUnhandledError: jasmine.createSpy()
      };
      component.controller = controller;
      auth = {
        signOut: jasmine.createSpy().and.callFake(() => Promise.resolve())
      };
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.emailFc = new FormControl('foo@bar.com');
    });
    it('should set submitting', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call updateEmail', () => {
      component.submit();
      expect(user.updateEmail).toHaveBeenCalledWith('foo@bar.com');
    });
    it('should call auth signOut', fakeAsync(() => {
      component.submit();
      tick();
      expect(auth.signOut).toHaveBeenCalledWith();
    }));
    it('should set submitting to false', fakeAsync(() => {
      component.submit();
      expect(component.submitting).toBe(true);
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should call controller.showSignIn', fakeAsync(() => {
      component.submit();
      tick();
      expect(controller.showSignIn).toHaveBeenCalledWith();
    }));
    it('should deal with auth/invalid-email', fakeAsync(() => {
      user.updateEmail.and.callFake(() => Promise.reject({code: 'auth/invalid-email'}));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(true);
      component.emailFc.setValue('');
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(false);
    }));
    it('should deal with auth/email-already-in-use', fakeAsync(() => {
      user.updateEmail.and.callFake(() => Promise.reject({code: 'auth/email-already-in-use'}));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.emailFc.hasError('auth/email-already-in-use')).toBe(true);
      component.emailFc.setValue('');
      expect(component.emailFc.hasError('auth/email-already-in-use')).toBe(false);
    }));
    it('should deal with auth/requires-recent-login', fakeAsync(() => {
      user.updateEmail.and.callFake(() => Promise.reject({code: 'auth/requires-recent-login'}));
      expect(component.showReauthenticate).toBe(false);
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(component.showReauthenticate).toBe(true);
    }));
    it('should deal with unknown error', fakeAsync(() => {
      user.updateEmail.and.callFake(() => Promise.reject({code: 'auth/foo'}));
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
