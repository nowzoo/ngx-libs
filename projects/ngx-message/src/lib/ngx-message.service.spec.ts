import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxMessageService } from './ngx-message.service';
import { NGX_MESSAGE_HIDE_DELAY } from './shared';


describe('NgxMessageService', () => {
  let service: NgxMessageService;
  let value;
  let hideDelay: number;
  beforeEach(() => {
    hideDelay = 3000;
    TestBed.configureTestingModule({
      providers: [
        {provide: NGX_MESSAGE_HIDE_DELAY, useValue: hideDelay}
      ]
    });
    service = TestBed.get(NgxMessageService);
    service.message$.subscribe(val => value = val);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have messages$', () => {
      expect(service.message$).toBeTruthy();
    });
  });

  describe('hide()', () => {
    it('should set value to null', () => {
      service.success('foo');
      expect(value).not.toBe(null);
      service.hide();
      expect(value).toBe(null);
    });
  });

  describe('success()', () => {
    it('should set the value correctly', () => {
      service.success('foo');
      expect(value.context).toBe('success');
      expect(value.message).toBe('foo');
    });
  });
  describe('warn()', () => {
    it('should set the value correctly', () => {
      service.warn('foo');
      expect(value.context).toBe('warn');
      expect(value.message).toBe('foo');
    });
    it('should should hide the message after a delay', fakeAsync(() => {
      service.warn('foo');
      expect(value).not.toBe(null);
      tick(hideDelay - 1);
      expect(value).not.toBe(null);
      tick(1);
      expect(value).toBe(null);
    }));
    it('should should not hide the message after a delay if another message comes', fakeAsync(() => {
      service.warn('foo');
      expect(value).not.toBe(null);
      tick(hideDelay - 1);
      expect(value).not.toBe(null);
      service.warn('bar');
      tick(1);
      expect(value).not.toBe(null);
      tick(hideDelay);
      expect(value).toBe(null);
    }));
  });
  describe('wait()', () => {
    it('should set the value correctly', () => {
      service.wait('foo');
      expect(value.context).toBe('wait');
      expect(value.message).toBe('foo');
    });
    it('should not hide after a delay', fakeAsync(() => {
      service.wait('foo');
      tick(hideDelay + 1000);
      expect(value).not.toBe(null);
    }));

  });
});
