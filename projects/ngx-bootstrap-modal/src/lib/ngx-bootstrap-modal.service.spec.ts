import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxBootstrapModalService } from './ngx-bootstrap-modal.service';

describe('NgxBootstrapModalService', () => {
  let service: NgxBootstrapModalService;
  beforeEach(() => {

    TestBed.configureTestingModule({
    });
    service = TestBed.get(NgxBootstrapModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have appRef', () => {
      expect(service.appRef).toBeTruthy();
    });
    it('should have ngZone', () => {
      expect(service.zone).toBeTruthy();
    });
  });

  describe('show()', () => {
    let viewRef: any;
    let templateRef: any;
    let appRef: any;
    let jQuery: any;
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
      jQuery = jasmine.createSpy().and.callFake(() => {
        return {
          on: jasmine.createSpy(),
          modal: jasmine.createSpy()
        };
      });
      (window as any).jQuery = jQuery;
      appRef = {
        attachView: jasmine.createSpy(),
        detachView: jasmine.createSpy()
      };
      spyOnProperty(service, 'appRef').and.returnValue(appRef);
      viewRef = {
        rootNodes: [el],
        destroy: jasmine.createSpy()
      };
      templateRef = {
        createEmbeddedView: jasmine.createSpy().and.returnValue(viewRef)
      };
    });
    it('should work', () => {
      const instance = service.show(templateRef);
      expect(instance.events).toBeTruthy();
      expect(instance.hidden).toBeTruthy();
      expect(instance.shown).toBeTruthy();
      expect(instance.hide).toBeTruthy();
      expect(instance.handleUpdate).toBeTruthy();
    });

    it('should handle events', () => {
      const instance = service.show(templateRef);
      instance.events.subscribe(e => console.log(e));
      el.dispatchEvent(new Event('shown'));
    });
  });
});
