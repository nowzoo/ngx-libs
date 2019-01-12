import { NgControl } from '@angular/forms';

import { NgxValidityOn, NgxValidity } from './shared';

export class NgxFormHelper {

  static getValidity(ctl: NgControl, on: NgxValidityOn): NgxValidity {
    if (ctl.pending) {
      return NgxValidity.pending;
    }
    switch (on) {
      case NgxValidityOn.always:
        return ctl.valid ? NgxValidity.valid : NgxValidity.invalid;
      case NgxValidityOn.dirty:
        if (! ctl.dirty) {
          return NgxValidity.hidden;
        }
        return ctl.valid ? NgxValidity.valid : NgxValidity.invalid;
      default:
        if (! ctl.touched) {
          return NgxValidity.hidden;
        }
        return ctl.valid ? NgxValidity.valid : NgxValidity.invalid;
    }
  }

  static normalizeValidityOn(
    on: NgxValidityOn | {invalid: NgxValidityOn, valid: NgxValidityOn}
  ): {invalid: NgxValidityOn, valid: NgxValidityOn} {
    switch (on) {
      case NgxValidityOn.always:
      case NgxValidityOn.dirty:
      case NgxValidityOn.touched:
        return {invalid: on as NgxValidityOn, valid: on as NgxValidityOn};
    }
    if (typeof on !== 'object') {
      return {invalid:  NgxValidityOn.touched, valid: NgxValidityOn.touched};
    }
    const ret: any = Object.assign({}, on);
    ret.invalid = on.invalid || NgxValidityOn.touched;
    ret.valid = on.valid || NgxValidityOn.touched;
    return ret;
  }
}
