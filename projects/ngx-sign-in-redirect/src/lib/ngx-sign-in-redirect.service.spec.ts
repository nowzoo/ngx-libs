import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { INgxSignInRedirectConfig, NGX_SIGN_IN_REDIRECT_CONFIG} from './shared';

import { NgxSignInRedirectService } from './ngx-sign-in-redirect.service';

describe('NgxSignInRedirectService', () => {
  let config: INgxSignInRedirectConfig;
  let service: NgxSignInRedirectService;
  let setItemSpy, removeItemSpy, getItemSpy, navigateByUrlSpy;
  beforeEach(() => {
    setItemSpy = spyOn(window.sessionStorage, 'setItem');
    removeItemSpy = spyOn(window.sessionStorage, 'removeItem');
    getItemSpy = spyOn(window.sessionStorage, 'getItem');
    navigateByUrlSpy = jasmine.createSpy();
    config = {
      defaultRedirect: '/',
      storageKey: 'gsfhsfhgsfgh'
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: {navigateByUrl: navigateByUrlSpy}},
        {provide: NGX_SIGN_IN_REDIRECT_CONFIG, useValue: config},
      ]
    });
    service = TestBed.get(NgxSignInRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have router', () => {
      expect(service.router).toBeTruthy();
    });
    it('should have storage', () => {
      expect(service.storage).toBeTruthy();
    });
    it('should have config', () => {
      expect(service.config).toEqual(config);
    });
    it('should have redirect', () => {
      getItemSpy.and.callFake(() => 'foo');
      expect(service.redirect).toBe('foo');
      getItemSpy.and.callFake(() => null);
      expect(service.redirect).toBe(null);
    });
  });

  describe('redirect setter', () => {
    it('should call setItem if passed a string', () => {
      service.redirect = 'foo';
      expect(setItemSpy).toHaveBeenCalledWith(config.storageKey, 'foo');
    });
    it('should call removeItem if passed null', () => {
      service.redirect = null;
      expect(removeItemSpy).toHaveBeenCalledWith(config.storageKey);
    });
    it('should call removeItem if passed empty string', () => {
      service.redirect = '   ';
      expect(removeItemSpy).toHaveBeenCalledWith(config.storageKey);
    });
    it('should call removeItem if passed undefined', () => {
      service.redirect = undefined;
      expect(removeItemSpy).toHaveBeenCalledWith(config.storageKey);
    });
  });

  describe('redirectOnSignIn()', () => {
    it('should  navigate to the default url if redirect is null', () => {
      spyOnProperty(service, 'redirect').and.returnValue(null);
      service.redirectOnSignIn();
      expect(navigateByUrlSpy).toHaveBeenCalledWith(config.defaultRedirect);
    });
    it('should navigate to the url if redirect has been set', () => {
      spyOnProperty(service, 'redirect').and.returnValue('/foo/bar');
      service.redirectOnSignIn();
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/foo/bar');
    });
  });
});
