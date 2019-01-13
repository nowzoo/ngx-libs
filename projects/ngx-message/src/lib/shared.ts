import { InjectionToken } from '@angular/core';
export enum NgxMessageContext  {
  warn = 'warn',
  success = 'success',
  wait = 'wait'
}
export interface INgxMessage {
  message: string;
  context: NgxMessageContext;
}
export const NGX_MESSAGE_HIDE_DELAY: InjectionToken<number> =
  new InjectionToken(`The delay in ms before hiding warning and success messsages.`);
