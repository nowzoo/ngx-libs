import { TestBed } from '@angular/core/testing';

import { NgxFireSignInService } from './ngx-fire-sign-in.service';

describe('NgxFireSignInService', () => {
  let service: NgxFireSignInService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service =  TestBed.get(NgxFireSignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get savedSignIn', () => {
    let spy: any;
    beforeEach(() => {
      spy = spyOn(localStorage, 'getItem').and.callFake(() => null);
    });
    it('should return null if the item is not set', () => {
      expect(service.savedSignIn).toBe(null);
    });
    it('should return null if the string is invalid JSON', () => {
      spy.and.callFake(() => '{foo: 8}');
      expect(service.savedSignIn).toBe(null);
    });
    it('should return null if the string does not parse as an object', () => {
      spy.and.callFake(() => '8');
      expect(service.savedSignIn).toBe(null);
    });
    it('should return the object', () => {
      spy.and.callFake(() => '{"email": "foo@bar.com"}');
      expect(service.savedSignIn).toEqual({email: 'foo@bar.com'});
    });
  });
  describe('set savedSignIn', () => {
    let removeSpy: any;
    let setSpy: any;
    beforeEach(() => {
      removeSpy = spyOn(localStorage, 'removeItem').and.callFake(() => null);
      setSpy = spyOn(localStorage, 'setItem').and.callFake(() => null);
    });
    it('should remove the item if passed null', () => {
      service.savedSignIn = null;
      expect(removeSpy).toHaveBeenCalledWith(NgxFireSignInService.signInStorageKey);
    });
    it('should set the JSON string', () => {
      const o = {email: 'a@b.c'};
      service.savedSignIn = o;
      expect(setSpy).toHaveBeenCalledWith(NgxFireSignInService.signInStorageKey, '{"email":"a@b.c"}');
    });

  });
});
