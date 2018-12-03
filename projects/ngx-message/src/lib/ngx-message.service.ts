import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INgxMessage, NgxMessageContext, NGX_MESSAGE_HIDE_DELAY} from './shared';

@Injectable({
  providedIn: 'root'
})
export class NgxMessageService {

  private _message$: BehaviorSubject<INgxMessage> = new BehaviorSubject(null);
  private _hideTimeout: any = null;
  constructor(
    @Inject(NGX_MESSAGE_HIDE_DELAY) private _hideDelay: number
  ) { }

  get message$(): Observable<INgxMessage> {
    return this._message$.asObservable();
  }

  show(message: string, context: NgxMessageContext, hide: boolean) {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._message$.next({message: message, context: context});
    if (hide) {
      this._hideTimeout = setTimeout(() => {
        this._message$.next(null);
      }, this._hideDelay);
    }
  }

  hide() {
    this._message$.next(null);
  }

  wait(message: string) {
    this.show(message, NgxMessageContext.wait, false);
  }

  success(message: string) {
    this.show(message, NgxMessageContext.success, true);
  }

  warn(message: string) {
    this.show(message, NgxMessageContext.warn, true);
  }
}
