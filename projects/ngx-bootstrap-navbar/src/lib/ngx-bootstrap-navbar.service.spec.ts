import { TestBed } from '@angular/core/testing';

import { NgxBootstrapNavbarService } from './ngx-bootstrap-navbar.service';
import { INgxBsNavbarContentEntries, INgxBsNavbarContentEntry, NgxBsNavbarContext } from './shared';

describe('NgxBootstrapNavbarService', () => {
  let service: NgxBootstrapNavbarService;
  let entries: INgxBsNavbarContentEntries;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(NgxBootstrapNavbarService);
    service.templates$.subscribe(val => entries = val);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have templates$', () => {
      expect(service.templates$).toBeTruthy();
      expect(service.templates$.subscribe).toBeTruthy();
    });
  });

  describe('setting & removing the brand template', () => {
    it('should set the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.brand
      };
      service.setTemplate(entry);
      expect(entries.brand).toEqual(entry);
    });
    it('should set the template by priority', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.brand
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.brand
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.brand).toEqual(entry2);
    });
    it('should remove the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.brand
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.brand
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.brand).toEqual(entry2);
      service.removeTemplate(entry2);
      expect(entries.brand).toEqual(entry);
      service.removeTemplate(entry);
      expect(entries.brand).toEqual(null);
    });
  });

  describe('setting & removing the left template', () => {
    it('should set the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.left
      };
      service.setTemplate(entry);
      expect(entries.left).toEqual(entry);
    });
    it('should set the template by priority', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.left
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.left
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.left).toEqual(entry2);
    });
    it('should remove the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.left
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.left
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.left).toEqual(entry2);
      service.removeTemplate(entry2);
      expect(entries.left).toEqual(entry);
      service.removeTemplate(entry);
      expect(entries.left).toEqual(null);
    });
  });
  describe('setting & removing the right template', () => {
    it('should set the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.right
      };
      service.setTemplate(entry);
      expect(entries.right).toEqual(entry);
    });
    it('should set the template by priority', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.right
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.right
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.right).toEqual(entry2);
    });
    it('should remove the template', () => {
      const entry: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 1, route: {} as any, context:  NgxBsNavbarContext.right
      };
      const entry2: INgxBsNavbarContentEntry = {
        templateRef: {} as any, priority: 2, route: {} as any, context:  NgxBsNavbarContext.right
      };
      service.setTemplate(entry);
      service.setTemplate(entry2);
      expect(entries.right).toEqual(entry2);
      service.removeTemplate(entry2);
      expect(entries.right).toEqual(entry);
      service.removeTemplate(entry);
      expect(entries.right).toEqual(null);
    });
  });
});
