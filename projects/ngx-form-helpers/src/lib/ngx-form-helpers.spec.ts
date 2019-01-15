import { FormControl } from '@angular/forms';
import { NgxFormHelpers } from './ngx-form-helpers';

describe('NgxFirebaseAuthService', () => {
  describe('setErrorUntilChanged', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo');
    });
    it('should set the error for as long as the control remains unchanged', () => {
      NgxFormHelpers.setErrorUntilChanged(fc, 'some-error');
      expect(fc.hasError('some-error')).toBe(true);
      fc.setValue('bar');
      expect(fc.hasError('some-error')).toBe(false);
    });
  });

  describe('clearError', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo');
    });
    it('should clear the key if there are multiple errors', () => {
      fc.setErrors({foo: true, bar: true});
      NgxFormHelpers.clearError(fc, 'foo');
      expect(fc.errors).toEqual({bar: true});
    });
    it('should clear the key if there is one error', () => {
      fc.setErrors({foo: true});
      NgxFormHelpers.clearError(fc, 'foo');
      expect(fc.errors).toEqual(null);
    });
  });


});
