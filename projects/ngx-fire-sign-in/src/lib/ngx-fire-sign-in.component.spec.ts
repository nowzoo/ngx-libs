import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgxFireSignInComponent } from './ngx-fire-sign-in.component';
import { NgxFireSignInScreen } from './shared';

describe('NgxFireSignInComponent', () => {
  let component: NgxFireSignInComponent;
  let fixture: ComponentFixture<NgxFireSignInComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFireSignInComponent ],
      providers: [
        {provide: Router, useValue: {}},
        {provide: ActivatedRoute, useValue: {snapshot: {queryParams: {}}}},
        {provide: AngularFireAuth, useValue: {auth: {}, authState: {}}}
      ]
    })
    .overrideTemplate(NgxFireSignInComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(NgxFireSignInComponent);
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
    it('should have route', () => {
      expect(component.route).toBeTruthy();
    });
    it('should have queryParams', () => {
      expect(component.queryParams).toBeTruthy();
    });
    it('should have router', () => {
      expect(component.router).toBeTruthy();
    });
  });

  describe('ngOnInit()', () => {
    let queryParams: any;
    beforeEach(() => {
      queryParams = {};
      spyOn(component, 'initOob');
      spyOn(component, 'setScreenFromFragment');
    });

    it('should call setScreenFromFragment if no oobCiode is present', () => {
      expect(component.queryParams).toEqual({});
      component.ngOnInit();
      expect(component.setScreenFromFragment).toHaveBeenCalled();
    });
    it('should call initOob if oobCode and mode are present', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({oobCode: 'foo', mode: 'bar'});
      component.ngOnInit();
      expect(component.initOob).toHaveBeenCalled();
    });
  });

  describe('initOob', () => {
    let router: any;
    let auth: any;
    let info: any;
    beforeEach(() => {
      info = {operation: ''};
      router = {navigate: jasmine.createSpy().and.callFake(() => Promise.resolve())};
      spyOnProperty(component, 'router').and.returnValue(router);
      auth = {
        checkActionCode: jasmine.createSpy().and.callFake(() => Promise.resolve(info))
      };
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.oobCode = 'foo';
    });
    it('should navigate to clear the params', () => {
      component.initOob();
      expect(router.navigate).toHaveBeenCalledWith(['.'], {replaceUrl: true});
    });
    it('should call checkActionCode', fakeAsync(() => {
      component.initOob();
      tick();
      expect(auth.checkActionCode).toHaveBeenCalledWith('foo');
    }));
    it('should set oobInfo', fakeAsync(() => {
      component.initOob();
      tick();
      expect(component.oobInfo).toEqual(info);
    }));
    it('should handle PASSWORD_RESET', fakeAsync(() => {
      info.operation = 'PASSWORD_RESET';
      component.initOob();
      tick();
      expect(component.screen).toBe(NgxFireSignInScreen.oobResetPassword);
    }));
    it('should handle VERIFY_EMAIL', fakeAsync(() => {
      info.operation = 'VERIFY_EMAIL';
      component.initOob();
      tick();
      expect(component.screen).toBe(NgxFireSignInScreen.oobVerifyEmail);
    }));
    it('should handle RECOVER_EMAIL', fakeAsync(() => {
      info.operation = 'RECOVER_EMAIL';
      component.initOob();
      tick();
      expect(component.screen).toBe(NgxFireSignInScreen.oobRecoverEmail);
    }));
    it('should handle EMAIL_SIGNIN with an error', fakeAsync(() => {
      info.operation = 'EMAIL_SIGNIN';
      expect(component.oobError).toBe(null);
      component.initOob();
      tick();
      expect(component.screen).toBe(NgxFireSignInScreen.oobError);
      expect(component.oobError).not.toBe(null);
    }));
    it('should handle an error', fakeAsync(() => {
      const error: any = {code: 'gsgsf'};
      auth.checkActionCode.and.callFake(() => Promise.reject(error));
      component.initOob();
      tick();
      expect(component.screen).toBe(NgxFireSignInScreen.oobError);
      expect(component.oobError).not.toBe(null);
    }));
  });

  describe('setScreenFromFragment(fragment)', () => {
    let authState$: BehaviorSubject<any>;
    beforeEach(() => {
      authState$ = new BehaviorSubject(null);
      spyOnProperty(component, 'authState').and.returnValue(authState$.asObservable());
      expect(component.screen).toBe(NgxFireSignInScreen.wait);
    });
    it('should set screen if the fragment is signIn', () => {
      component.setScreenFromFragment('signIn');
      expect(component.screen).toBe(NgxFireSignInScreen.signIn);
    });
    it('should set screen if the fragment is signUp', () => {
      component.setScreenFromFragment('signUp');
      expect(component.screen).toBe(NgxFireSignInScreen.signUp);
    });
    it('should set screen if the fragment is signOut', () => {
      component.setScreenFromFragment('signOut');
      expect(component.screen).toBe(NgxFireSignInScreen.signOut);
    });
    it('should set screen if the fragment is resetPassword', () => {
      component.setScreenFromFragment('resetPassword');
      expect(component.screen).toBe(NgxFireSignInScreen.resetPassword);
    });
    it('should set screen if the fragment is verifyEmail', () => {
      component.setScreenFromFragment('verifyEmail');
      expect(component.screen).toBe(NgxFireSignInScreen.verifyEmail);
    });
    it('should set screen if the fragment is changeEmail', () => {
      component.setScreenFromFragment('changeEmail');
      expect(component.screen).toBe(NgxFireSignInScreen.changeEmail);
    });
    it('should set screen if the fragment is changePassword', () => {
      component.setScreenFromFragment('changePassword');
      expect(component.screen).toBe(NgxFireSignInScreen.changePassword);
    });
    it('should set screen if the fragment is empty and the user is signed out', () => {
      component.setScreenFromFragment(null);
      expect(component.screen).toBe(NgxFireSignInScreen.signUp);
    });
    it('should set screen if the fragment is empty and the user is signed in', () => {
      authState$.next({});
      component.setScreenFromFragment(null);
      expect(component.screen).toBe(NgxFireSignInScreen.home);
    });
  });

});
