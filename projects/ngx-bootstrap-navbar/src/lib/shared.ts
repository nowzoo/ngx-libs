import { TemplateRef } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
export enum NgxBsNavbarContext {
  brand = 'brand',
  left = 'left',
  right = 'right'
}
export interface INgxBsNavbarContentEntry {
  templateRef: TemplateRef<any>;
  route: ActivatedRouteSnapshot;
  context: NgxBsNavbarContext;
  priority: number;
}

export interface INgxBsNavbarContentEntries {
  brand: INgxBsNavbarContentEntry;
  left: INgxBsNavbarContentEntry;
  right: INgxBsNavbarContentEntry;
}
