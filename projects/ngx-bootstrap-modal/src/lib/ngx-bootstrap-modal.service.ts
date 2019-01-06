import { Injectable, TemplateRef, ApplicationRef, NgZone, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { INgxBootstrapModalInstance } from './shared';
declare const jQuery: any;
@Injectable({
  providedIn: 'root'
})
export class NgxBootstrapModalService {

  constructor(
    private _appRef: ApplicationRef,
    private _zone: NgZone
  ) { }

  get appRef(): ApplicationRef {
    return this._appRef;
  }

  get zone(): NgZone {
    return this._zone;
  }


  show(templateRef: TemplateRef<any>): INgxBootstrapModalInstance {
    const events$: Subject<Event> = new Subject();

    const instance: INgxBootstrapModalInstance = {
      shown: new Promise<void>(resolve => {
        events$
          .pipe(filter(e => 'shown' === e.type))
          .pipe(take(1))
          .subscribe(() => {
            this.zone.run(resolve);
          });
      }),
      hidden: new Promise<void>(resolve => {
        events$
         .pipe(filter(e => 'hidden' === e.type))
         .pipe(take(1))
         .subscribe(() => resolve());
     }),
      events: events$.asObservable(),
      hide: null,
      handleUpdate: null
    };
    const viewRef: EmbeddedViewRef<any> = templateRef.createEmbeddedView({instance: instance});
    this.appRef.attachView(viewRef);
    const el = viewRef.rootNodes[0];
    document.body.appendChild(el);
    const $el = jQuery(el);
    $el.modal({show: false});
    $el.on('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal', (event) => {
      this.zone.run(() => {
        events$.next(event);
      });
    });

    instance.hide = () => {
      $el.modal('hide');
      return instance.hidden;
    };

    instance.handleUpdate = () => {
      $el.modal('handleUpdate');
    };

    instance.hidden.then(() => {
      $el.off('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal');
      $el.modal('dispose');
      document.body.removeChild(el);
      this.appRef.detachView(viewRef);
      viewRef.destroy();
    });
    $el.modal('show');
    return instance;
  }
}
