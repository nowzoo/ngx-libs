import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { NgxFirebaseOobService } from './ngx-firebase-oob.service';

describe('NgxFirebaseOobService', () => {
  let service: NgxFirebaseOobService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}}
      ]
    });
    service = TestBed.get(NgxFirebaseOobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have auth', () => {
      expect(service.auth).toBeTruthy();
    });
  });

  describe('applyActionCode', () => {
    let auth: any;
    beforeEach(() => {
      auth = {applyActionCode: jasmine.createSpy().and.callFake(() => Promise.resolve())};
      spyOnProperty(service, 'auth').and.returnValue(auth);
    });
    it('should resolve', fakeAsync(() => {
      let resolved: any;
      const info = {code: 'abc', data: {}, operation: 'foo'};
      service.applyActionCode(info).then(result => resolved = result);
      expect(resolved).toBeUndefined();
      tick();
      expect(resolved).toEqual(info);
    }));
    it('should reject if the underlying api call fails', fakeAsync(() => {
      auth.applyActionCode.and.callFake(() => Promise.reject('foo'));
      let rejected: any;
      const info = {code: 'abc', data: {}, operation: 'foo'};
      service.applyActionCode(info).catch(e => rejected = e);
      expect(rejected).toBeUndefined();
      tick();
      expect(rejected).toEqual('foo');
    }));
  });

  describe('signInWithEmailLink()', () => {
    let auth: any;
    let cred: any;
    beforeEach(() => {
      cred = {user: {}};
      auth = {signInWithEmailLink: jasmine.createSpy().and.callFake(() => Promise.resolve(cred))};
      spyOnProperty(service, 'auth').and.returnValue(auth);
    });
    it('should resolve with cred added to info', fakeAsync(() => {
      let resolved: any;
      const info = {code: 'abc', data: {}, operation: 'foo'};
      service.signInWithEmailLink(info).then(result => resolved = result);
      expect(resolved).toBeUndefined();
      tick();
      expect(resolved.credential).toEqual(cred);
    }));
    it('should reject if the underlying api call fails', fakeAsync(() => {
      auth.signInWithEmailLink.and.callFake(() => Promise.reject('foo'));
      let rejected: any;
      const info = {code: 'abc', data: {}, operation: 'foo'};
      service.signInWithEmailLink(info).catch(e => rejected = e);
      expect(rejected).toBeUndefined();
      tick();
      expect(rejected).toEqual('foo');
    }));
  });

  describe('checkActionCode()', () => {
    let auth: any;
    let info: any;
    beforeEach(() => {
      info = {code: 'abc', data: {}, operation: 'foo'};
      auth = {checkActionCode: jasmine.createSpy().and.callFake(() => Promise.resolve(info))};
      spyOnProperty(service, 'auth').and.returnValue(auth);
    });

    it('should resolve', fakeAsync(() => {
      let resolved: any;
      service.checkActionCode('abc').then(result => resolved = result);
      expect(resolved).toBeUndefined();
      tick();
      expect(resolved.code).toEqual('abc');
      expect(resolved.operation).toEqual('foo');
    }));
    it('should reject if the underlying api call fails', fakeAsync(() => {
      auth.checkActionCode.and.callFake(() => Promise.reject('foo'));
      let rejected: any;
      service.checkActionCode('abc').catch(e => rejected = e);
      expect(rejected).toBeUndefined();
      tick();
      expect(rejected).toEqual('foo');
    }));
  });

  describe('handleOobRequest(code)', () => {
    describe('password resets', () => {
      let info: any;
      let code: any;
      let checkActionCodeSpy: any;
      beforeEach(() => {
        code = 'abc';
        info = { code: code, operation: 'PASSWORD_RESET'};
        checkActionCodeSpy = spyOn(service, 'checkActionCode').and.callFake(() => Promise.resolve(info));
      });
      it('should reject if checkActionCode fails', fakeAsync(() => {
        checkActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should resolve', fakeAsync(() => {
        let resolved: any;
        service.handleOobRequest('abc').then(result => resolved = result);
        expect(resolved).toBeUndefined();
        tick();
        expect(resolved).toEqual(info);
      }));
    });

    describe('verify email', () => {
      let info: any;
      let code: any;
      let checkActionCodeSpy: any;
      let applyActionCodeSpy: any;
      beforeEach(() => {
        code = 'abc';
        info = { code: code, operation: 'VERIFY_EMAIL'};
        checkActionCodeSpy = spyOn(service, 'checkActionCode').and.callFake(() => Promise.resolve(info));
        applyActionCodeSpy = spyOn(service, 'applyActionCode').and.callFake(() => Promise.resolve(info));
      });
      it('should reject if checkActionCode fails', fakeAsync(() => {
        checkActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should reject if applyActionCode fails', fakeAsync(() => {
        applyActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should resolve', fakeAsync(() => {
        let resolved: any;
        service.handleOobRequest('abc').then(result => resolved = result);
        expect(resolved).toBeUndefined();
        tick();
        expect(resolved).toEqual(info);
      }));
    });

    describe('recover email', () => {
      let info: any;
      let code: any;
      let checkActionCodeSpy: any;
      let applyActionCodeSpy: any;
      beforeEach(() => {
        code = 'abc';
        info = { code: code, operation: 'RECOVER_EMAIL'};
        checkActionCodeSpy = spyOn(service, 'checkActionCode').and.callFake(() => Promise.resolve(info));
        applyActionCodeSpy = spyOn(service, 'applyActionCode').and.callFake(() => Promise.resolve(info));
      });
      it('should reject if checkActionCode fails', fakeAsync(() => {
        checkActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should reject if applyActionCode fails', fakeAsync(() => {
        applyActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should resolve', fakeAsync(() => {
        let resolved: any;
        service.handleOobRequest('abc').then(result => resolved = result);
        expect(resolved).toBeUndefined();
        tick();
        expect(resolved).toEqual(info);
      }));
    });

    describe('smail sign in', () => {
      let info: any;
      let code: any;
      let checkActionCodeSpy: any;
      let signInWithEmailLinkSpy: any;
      beforeEach(() => {
        code = 'abc';
        info = { code: code, operation: 'EMAIL_SIGNIN'};
        checkActionCodeSpy = spyOn(service, 'checkActionCode').and.callFake(() => Promise.resolve(info));
        signInWithEmailLinkSpy = spyOn(service, 'signInWithEmailLink').and.callFake(() => Promise.resolve(info));
      });
      it('should reject if checkActionCode fails', fakeAsync(() => {
        checkActionCodeSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should reject if signInWithEmailLink fails', fakeAsync(() => {
        signInWithEmailLinkSpy.and.callFake(() => Promise.reject('foo'));
        let rejected: any;
        service.handleOobRequest(code).catch(e => rejected = e);
        expect(rejected).toBeUndefined();
        tick();
        expect(rejected).toEqual('foo');
      }));
      it('should resolve', fakeAsync(() => {
        let resolved: any;
        service.handleOobRequest('abc').then(result => resolved = result);
        expect(resolved).toBeUndefined();
        tick();
        expect(resolved).toEqual(info);
      }));
    });

  });

});
