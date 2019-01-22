import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(SignInComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(SignInComponent);
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
      expect(component.fg.get('password')).toBe(component.passwordFc);
      expect(component.fg.get('remember')).toBe(component.rememberFc);
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
    let cred: any;
    let controller: any;

    beforeEach(() => {
      controller = {
        email: 'foo@bar.com',
        showUnhandledError: jasmine.createSpy(),
        showSignInSuccess: jasmine.createSpy()
      };
      component.controller = controller;
      cred = {user: {}};
      auth = {
        signInWithEmailAndPassword: jasmine.createSpy().and.callFake(() => Promise.resolve(cred)),
        setPersistence: jasmine.createSpy().and.callFake(() => Promise.resolve()),
      };
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.ngOnInit();
      component.fg.setValue({email: 'a@b.c', password: 'pass', remember: true});
    });
    it('should set submitting', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call signInWithEmailAndPassword', () => {
      component.submit();
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('a@b.c', 'pass');
    });
    it('should call setPersistence with "local" if remember is true', fakeAsync(() => {
      component.submit();
      tick();
      expect(auth.setPersistence).toHaveBeenCalledWith('local');
    }));
    it('should call setPersistence with "session" if remember is false', fakeAsync(() => {
      component.rememberFc.setValue(false);
      component.submit();
      tick();
      expect(auth.setPersistence).toHaveBeenCalledWith('session');
    }));
    it('should call controller.showSignInSuccess', fakeAsync(() => {
      component.submit();
      tick();
      expect(controller.showSignInSuccess).toHaveBeenCalledWith(cred, jasmine.any(String));
    }));
    it('should deal with auth/user-not-found error', fakeAsync(() => {
      auth.signInWithEmailAndPassword.and.callFake(() => Promise.reject({code: 'auth/user-not-found'}));
      component.submit();
      tick();
      expect(component.emailFc.hasError('auth/user-not-found')).toBe(true);
      component.emailFc.setValue('f@b');
      expect(component.emailFc.hasError('auth/user-not-found')).toBe(false);
    }));
    it('should deal with auth/user-disabled error', fakeAsync(() => {
      auth.signInWithEmailAndPassword.and.callFake(() => Promise.reject({code: 'auth/user-disabled'}));
      component.submit();
      tick();
      expect(component.emailFc.hasError('auth/user-disabled')).toBe(true);
      component.emailFc.setValue('f@b');
      expect(component.emailFc.hasError('auth/user-disabled')).toBe(false);
    }));
    it('should deal with auth/invalid-email error', fakeAsync(() => {
      auth.signInWithEmailAndPassword.and.callFake(() => Promise.reject({code: 'auth/invalid-email'}));
      component.submit();
      tick();
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(true);
      component.emailFc.setValue('f@b');
      expect(component.emailFc.hasError('auth/invalid-email')).toBe(false);
    }));
    it('should deal with auth/wrong-password error', fakeAsync(() => {
      auth.signInWithEmailAndPassword.and.callFake(() => Promise.reject({code: 'auth/wrong-password'}));
      component.submit();
      tick();
      expect(component.passwordFc.hasError('auth/wrong-password')).toBe(true);
      component.passwordFc.setValue('');
      expect(component.passwordFc.hasError('auth/wrong-password')).toBe(false);
    }));
    it('should deal with unknown error', fakeAsync(() => {
      auth.signInWithEmailAndPassword.and.callFake(() => Promise.reject({code: 'auth/foo'}));
      component.submit();
      tick();
      expect(controller.showUnhandledError).toHaveBeenCalledWith({code: 'auth/foo'});
    }));
  });
});
