import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
export const findRouteParam = (r: ActivatedRoute | ActivatedRouteSnapshot, key: string): any => {
  let route: ActivatedRouteSnapshot = r instanceof ActivatedRoute ? r.snapshot : r;
  let found = null;
  while ((! found) && route) {
    found = route.params[key] || null;
    route = route.parent || null;
  }
  return found;
};

export const findRouteData = (r: ActivatedRoute | ActivatedRouteSnapshot, key: string): any => {
  let route: ActivatedRouteSnapshot = r instanceof ActivatedRoute ? r.snapshot : r;
  let found = null;
  while ((! found) && route) {
    found = route.data[key] || null;
    route = route.parent || null;
  }
  return found;
};
