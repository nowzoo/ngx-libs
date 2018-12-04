import { TestBed } from '@angular/core/testing';
import { ICrumb } from './shared';

import { NgxCrumbsService } from './ngx-crumbs.service';

describe('NgxCrumbsService', () => {
  let service: NgxCrumbsService;
  let crumbs: ICrumb[];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(NgxCrumbsService);
    service.crumbs$.subscribe(val => crumbs = val);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCrumb()', () => {
    it('should set the crumb', () => {
      const crumb: ICrumb = {
        templateRef: {} as any,
        url: ['foo', 'bar'],
        route: {} as any
      };
      service.setCrumb(crumb);
      expect(crumbs[0]).toEqual(crumb);
    });

    it('should sort the crumbs by url length', () => {
      const crumb1: ICrumb = {
        templateRef: {} as any,
        url: ['foo', 'bar', 'baz'],
        route: {} as any
      };
      const crumb2: ICrumb = {
        templateRef: {} as any,
        url: ['foo', 'bar'],
        route: {} as any
      };
      service.setCrumb(crumb1);
      expect(crumbs[0]).toEqual(crumb1);
      service.setCrumb(crumb2);
      expect(crumbs[0]).toEqual(crumb2);
    });

  });

  describe('removeCrumb()', () => {
    it('should remove the crumb', () => {
      const crumb1: ICrumb = {
        templateRef: {} as any,
        url: ['foo'],
        route: {} as any
      };
      const crumb2: ICrumb = {
        templateRef: {} as any,
        url: ['foo', 'bar'],
        route: {} as any
      };
      service.setCrumb(crumb1);
      expect(crumbs[0]).toEqual(crumb1);
      service.setCrumb(crumb2);
      expect(crumbs[1]).toEqual(crumb2);
      service.removeCrumb(crumb2);
      expect(crumbs[1]).toBeUndefined();
    });
  });
});
