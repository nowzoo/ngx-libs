import { ActivatedRoute } from '@angular/router';

import { findRouteParam, findRouteData } from './ngx-route-helpers';

describe('NgxRouteHelpers', () => {
  describe('findRouteParam(r, key)', () => {
    it('should return the param if it exists in the route', () => {
      const snapshot: any = {params: {foo: 'bar'}};
      expect(findRouteParam(snapshot, 'foo')).toBe('bar');
    });
    it('should return the param if passed an ActivatedRoute rather than a snapshot', () => {
      const snapshot: any = {params: {foo: 'bar'}};
      const route: ActivatedRoute = new ActivatedRoute(); // {snapshot: snapshot};
      route.snapshot = snapshot;
      expect(findRouteParam(route, 'foo')).toBe('bar');
    });
    it('should return the param if it exists in a parent route', () => {
      const snapshot: any = {params: {}, parent: {params: {foo: 'bar'}}};
      expect(findRouteParam(snapshot, 'foo')).toBe('bar');
    });
    it('should return the first matching param', () => {
      const snapshot: any = {params: {foo: 'foo'}, parent: {params: {foo: 'bar'}}};
      expect(findRouteParam(snapshot, 'foo')).toBe('foo');
    });
  });
  describe('findRouteData(r, key)', () => {
    it('should return  data[key] if it exists in the route', () => {
      const snapshot: any = {data: {foo: 'bar'}};
      expect(findRouteData(snapshot, 'foo')).toBe('bar');
    });
    it('should return the param if passed an ActivatedRoute rather than a snapshot', () => {
      const snapshot: any = {data: {foo: 'bar'}};
      const route: ActivatedRoute = new ActivatedRoute(); // {snapshot: snapshot};
      route.snapshot = snapshot;
      expect(findRouteData(route, 'foo')).toBe('bar');
    });
    it('should return the param if it exists in a parent route', () => {
      const snapshot: any = {data: {}, parent: {data: {foo: 'bar'}}};
      expect(findRouteData(snapshot, 'foo')).toBe('bar');
    });
    it('should return the first matching param', () => {
      const snapshot: any = {data: {foo: 'foo'}, parent: {data: {foo: 'bar'}}};
      expect(findRouteData(snapshot, 'foo')).toBe('foo');
    });
  });


});
