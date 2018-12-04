import { InjectionToken, TemplateRef } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
export interface INgxCrumbsConfig {
  handleWindowTitle: boolean;
  windowTitleSeparator: string;
}

export const NGX_CRUMBS_CONFIG: InjectionToken<INgxCrumbsConfig> = new InjectionToken<boolean>(
  'Config for NgxCrumbsModule. Specify whether or not to update the window title and the window title separator.'
);

export interface ICrumb {
  templateRef: TemplateRef<any>;
  url: string[];
  route: ActivatedRouteSnapshot;
}
