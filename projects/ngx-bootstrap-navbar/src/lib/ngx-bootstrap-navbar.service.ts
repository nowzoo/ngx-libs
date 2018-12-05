import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { INgxBsNavbarContentEntry, NgxBsNavbarContext, INgxBsNavbarContentEntries } from './shared';

@Injectable({
  providedIn: 'root'
})
export class NgxBootstrapNavbarService {

  private _templates: Map<ActivatedRouteSnapshot, INgxBsNavbarContentEntry> = new Map();
  private _templates$: BehaviorSubject<INgxBsNavbarContentEntries> = new BehaviorSubject({brand: null, left: null, right: null});

  constructor() { }

  get templates$(): Observable<INgxBsNavbarContentEntries> {
    return this._templates$.asObservable();
  }

  setTemplate(entry: INgxBsNavbarContentEntry) {
    this._templates.set(entry.route, entry);
    this._update(entry.context);
  }

  removeTemplate(entry: INgxBsNavbarContentEntry) {
    this._templates.delete(entry.route);
    this._update(entry.context);
  }


  private _update(context: NgxBsNavbarContext) {
    const entries: INgxBsNavbarContentEntry[] = [];
    this._templates.forEach((v) => entries.push(v));
    const contextEntries = entries.filter(e => e.context === context);
    contextEntries.sort((a, b) => a.priority - b.priority);
    const newEntries = Object.assign({}, this._templates$.value);
    newEntries[context] = contextEntries[contextEntries.length - 1] || null;
    this._templates$.next(newEntries);
  }
}
