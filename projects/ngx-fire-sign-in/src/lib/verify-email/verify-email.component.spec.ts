import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { VerifyEmailComponent } from './verify-email.component';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {authState: {}}},
      ]
    })
    .overrideTemplate(VerifyEmailComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('should have authState', () => {
      expect(component.authState).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    let authState$: BehaviorSubject<any>;
    let controller: any;
    beforeEach(() => {
      authState$ = new BehaviorSubject(null);
      spyOnProperty(component, 'authState').and.returnValue(authState$.asObservable());
      controller = {
        showSignIn: jasmine.createSpy()
      };
      component.controller = controller;
      spyOn(component, 'submit');
    });
    it('should redirect if there is no user at first', () => {
      authState$.next(null);
      component.ngOnInit();
      expect(controller.showSignIn).toHaveBeenCalledWith();
      expect(component.submit).not.toHaveBeenCalled();
    });
    it('should call submit if there is a user', () => {
      authState$.next({});
      component.ngOnInit();
      expect(controller.showSignIn).not.toHaveBeenCalled();
      expect(component.submit).toHaveBeenCalledWith();
    });
    it('should redirect thereafter if the user is signed out', () => {
      authState$.next({});
      component.ngOnInit();
      expect(controller.showSignIn).not.toHaveBeenCalled();
      expect(component.submit).toHaveBeenCalledWith();
      authState$.next(null);
      expect(controller.showSignIn).toHaveBeenCalled();
    });
    it('should sub and unsub to authState', () => {
      authState$.next({});
      component.ngOnInit();
      expect(authState$.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(authState$.observers.length).toBe(0);
    });
  });
  describe('submit()', () => {
    let user: any;
    let controller: any;
    beforeEach(() => {
      user = {
        email: 'foo@bar.com',
        sendEmailVerification: jasmine.createSpy().and.callFake(() => Promise.resolve())
      };
      controller = {
        showUnhandledError: jasmine.createSpy()
      };
      component.user = user;
      component.controller = controller;
    });
    it('should set submitting', () => {
      expect(component.submitting).toBe(false);
      component.submit();
      expect(component.submitting).toBe(true);
    });
    it('should call sendEmailVerification', () => {
      component.submit();
      expect(user.sendEmailVerification).toHaveBeenCalledWith();
    });
    it('should set submitting to false after resolves', fakeAsync(() => {
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
    }));
    it('should handle an error', fakeAsync(() => {
      const err = {};
      user.sendEmailVerification.and.callFake(() => Promise.reject(err));
      component.submit();
      tick();
      expect(component.submitting).toBe(false);
      expect(controller.showUnhandledError).toHaveBeenCalledWith(err);
    }));

  });
});
