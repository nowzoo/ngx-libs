import { NgxFormHelper } from './ngx-form-helper';
import { NgxValidityOn, NgxValidity } from './shared';

describe('NgxFormHelper', () => {
  describe('getValidity(ctl, on)', () => {
    let control: any;
    beforeEach(() => {
      control = {
        touched: false,
        dirty: false,
        valid: false,
        pending: false
      };
    });


    it('should return pending if the control is pending in all cases', () => {
      control.pending = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.always)).toBe(NgxValidity.pending);
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.dirty)).toBe(NgxValidity.pending);
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.touched)).toBe(NgxValidity.pending);
    });


    it('should be hidden if control invalid and untouched if on = "touched"', () => {
      control.touched = false;
      control.valid = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.touched)).toBe(NgxValidity.hidden);
    });

    it('should be hidden if control valid and untouched if on = "touched"', () => {
      control.touched = false;
      control.valid = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.touched)).toBe(NgxValidity.hidden);
    });

    it('should be invalid if control invalid and touched if on = "touched"', () => {
      control.touched = true;
      control.valid = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.touched)).toBe(NgxValidity.invalid);
    });

    it('should be valid if control valid and touched if on = "touched"', () => {
      control.touched = true;
      control.valid = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.touched)).toBe(NgxValidity.valid);
    });

    it('should be hidden if control invalid and clean if on = "dirty"', () => {
      control.dirty = false;
      control.valid = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.dirty)).toBe(NgxValidity.hidden);
    });

    it('should be hidden if control valid and clean if on = "dirty"', () => {
      control.dirty = false;
      control.valid = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.dirty)).toBe(NgxValidity.hidden);
    });

    it('should be invalid if control invalid and dirty if on = "dirty"', () => {
      control.dirty = true;
      control.valid = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.dirty)).toBe(NgxValidity.invalid);
    });

    it('should be valid if control valid and dirty if on = "dirty"', () => {
      control.dirty = true;
      control.valid = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.dirty)).toBe(NgxValidity.valid);
    });

    it('should be invalid if control invalid if on = "always" in all cases', () => {
      control.dirty = true;
      control.touched = true;
      control.valid = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.always)).toBe(NgxValidity.invalid);
      control.dirty = false;
      control.touched = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.always)).toBe(NgxValidity.invalid);
    });

    it('should be valid if control valid if on = "always" in all cases', () => {
      control.dirty = true;
      control.touched = true;
      control.valid = true;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.always)).toBe(NgxValidity.valid);
      control.dirty = false;
      control.touched = false;
      expect(NgxFormHelper.getValidity(control, NgxValidityOn.always)).toBe(NgxValidity.valid);
    });

  });

  describe('normalizeValidityOn', () => {
    it('should handle NgxValidityOn.always', () => {
      expect(NgxFormHelper.normalizeValidityOn(NgxValidityOn.always))
        .toEqual({valid: NgxValidityOn.always, invalid: NgxValidityOn.always});
    });
    it('should handle NgxValidityOn.dirty', () => {
      expect(NgxFormHelper.normalizeValidityOn(NgxValidityOn.dirty))
        .toEqual({valid: NgxValidityOn.dirty, invalid: NgxValidityOn.dirty});
    });
    it('should handle NgxValidityOn.touched', () => {
      expect(NgxFormHelper.normalizeValidityOn(NgxValidityOn.touched))
        .toEqual({valid: NgxValidityOn.touched, invalid: NgxValidityOn.touched});
    });

    it('should handle being passed a non-object', () => {
      expect(NgxFormHelper.normalizeValidityOn(8 as any))
        .toEqual({valid: NgxValidityOn.touched, invalid: NgxValidityOn.touched});
    });
    it('should handle being passed an object', () => {
      expect(NgxFormHelper.normalizeValidityOn({valid: NgxValidityOn.dirty, invalid: NgxValidityOn.always}))
        .toEqual({valid: NgxValidityOn.dirty, invalid: NgxValidityOn.always});
    });
    it('should handle being passed an incomplete object', () => {
      expect(NgxFormHelper.normalizeValidityOn({valid: NgxValidityOn.dirty} as any))
        .toEqual({valid: NgxValidityOn.dirty, invalid: NgxValidityOn.touched});
      expect(NgxFormHelper.normalizeValidityOn({invalid: NgxValidityOn.dirty} as any))
        .toEqual({invalid: NgxValidityOn.dirty, valid: NgxValidityOn.touched});
    });
  });

});
