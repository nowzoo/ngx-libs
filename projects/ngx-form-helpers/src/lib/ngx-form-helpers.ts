import { AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';


export class NgxFormHelpers {

  static setErrorUntilChanged(fc: AbstractControl, key: string, value: any = true) {
    const error = {};
    error[key] = value;
    fc.setErrors(error);
    fc.valueChanges.pipe(take(1)).subscribe(() => {
      NgxFormHelpers.clearError(fc, key);
    });

  }

  static clearError(fc: AbstractControl, key: string) {
    const errors = {};
    if (! fc.errors) {
      return;
    }
    Object.keys(fc.errors).forEach((k) => {
      if (k !== key) {
        errors[k] = fc.errors[k];
      }
    });
    if (Object.keys(errors).length === 0) {
      fc.setErrors(null);
    } else {
      fc.setErrors(errors);
    }
  }

}
