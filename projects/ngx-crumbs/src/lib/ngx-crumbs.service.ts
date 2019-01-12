import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICrumb } from './shared';


@Injectable({
  providedIn: 'root'
})
export class NgxCrumbsService {


  private _componentCrumbs: Map<any, ICrumb> = new Map();
  private _crumbs$: BehaviorSubject<ICrumb[]> = new BehaviorSubject([]);

  constructor(

  ) { }


  get crumbs$(): Observable<ICrumb[]> {
    return this._crumbs$.asObservable();
  }

  setCrumb(crumbDirective: ICrumb) {
    this._componentCrumbs.set(crumbDirective, {
      templateRef: crumbDirective.templateRef,
      route: crumbDirective.route,
      url: crumbDirective.url
    });
    this._update();
  }

  removeCrumb(crumbDirective: ICrumb) {
    this._componentCrumbs.delete(crumbDirective);
    this._update();
  }

  private _update() {
    const crumbs: ICrumb[] = [];
    this._componentCrumbs.forEach(c => crumbs.push(c));
    crumbs.sort((a, b) => {
      return a.url.length - b.url.length;
    });
    this._crumbs$.next(crumbs);
  }


}
