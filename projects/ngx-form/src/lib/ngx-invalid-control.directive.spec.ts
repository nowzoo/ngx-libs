import { NgxInvalidControlDirective } from './ngx-invalid-control.directive';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgxInvalidOn } from './shared';

describe('NgxInvalidControlDirective', () => {
  it('should create an instance', () => {
    const directive = new NgxInvalidControlDirective({} as any, null, {} as any, {} as any);
    expect(directive).toBeTruthy();
  });

  it('should sub and unsub from control.valueChanges', () => {
    const directive = new NgxInvalidControlDirective(null, null, {} as any, {} as any);
    const control = {valueChanges: new Subject()};
    spyOnProperty(directive, 'control').and.returnValue(control);
    expect(control.valueChanges.observers.length).toBe(0);
    directive.ngOnInit();
    expect(control.valueChanges.observers.length).toBe(1);
    directive.ngOnDestroy();
    expect(control.valueChanges.observers.length).toBe(0);
  });

  describe('getters', () => {
    describe('control', () => {
      it('should be null if the directive is not attached to a control directive', () => {
        const directive = new NgxInvalidControlDirective(null, null, {} as any, {} as any);
        expect(directive.control).toBe(null);
      });
      it('should be the FormControlDirective if it exists', () => {
        const control: any = {};
        const d: any = {control: control};
        const directive = new NgxInvalidControlDirective(d, null, {} as any, {} as any);
        expect(directive.control).toBe(control);
      });
      it('should be the FormControlName if it exists', () => {
        const control: any = {};
        const d: any = {control: control};
        const directive = new NgxInvalidControlDirective(null, d, {} as any, {} as any);
        expect(directive.control).toBe(control);
      });
    });
    it('should have renderer', () => {
      const directive = new NgxInvalidControlDirective(null, {} as any, {} as any, {} as any);
      expect(directive.renderer).toBeTruthy();
    });
    it('should have el', () => {
      const directive = new NgxInvalidControlDirective(null, {} as any, {} as any, {nativeElement: {}} as any);
      expect(directive.el).toBeTruthy();
    });
  });

  describe('ngOnInit and ngOnDestroy', () => {
    let control: FormControl;
    let el: any;
    let renderer: any;
    let elementRef: any;
    let directive: NgxInvalidControlDirective;
    beforeEach(() => {
      control = new FormControl('', Validators.required);
      el = {};
      elementRef = {nativeElement: el};
      renderer = {
        addClass: jasmine.createSpy(),
        removeClass: jasmine.createSpy()
      };
      directive = new NgxInvalidControlDirective({control: control} as any, null, renderer, elementRef);
    });
    it('should be ok if there is no control', () => {
      spyOnProperty(directive, 'control').and.returnValue(null);
      directive.ngOnInit();
    });
    it('should set the class if the control is invalid and the control is touched', () => {
      directive.ngOnInit();
      control.markAsTouched();
      control.setValue('');
      expect(renderer.addClass).toHaveBeenCalledWith(el, 'is-invalid');
    });
    it('should remove the class if the control is valid', () => {
      directive.ngOnInit();
      control.markAsTouched();
      control.setValue('sggshg');
      expect(renderer.removeClass).toHaveBeenCalledWith(el, 'is-invalid');
    });
    describe('if invalidOn is "dirty"', () => {
      beforeEach(() => {
        directive.invalidOn = NgxInvalidOn.dirty;
      });
      it('should set the class if the control is invalid and the control is dirty', () => {
        directive.ngOnInit();
        control.markAsDirty();
        control.setValue('');
        expect(renderer.addClass).toHaveBeenCalledWith(el, 'is-invalid');
      });
      it('should remove the class if the control is valid', () => {
        directive.ngOnInit();
        control.markAsDirty();
        control.setValue('sggshg');
        expect(renderer.removeClass).toHaveBeenCalledWith(el, 'is-invalid');
      });
    });

    describe('if invalidOn is "always"', () => {
      beforeEach(() => {
        directive.invalidOn = NgxInvalidOn.always;
      });
      it('should set the class if the control is invalid and the control is dirty', () => {
        directive.ngOnInit();
        control.setValue('');
        expect(renderer.addClass).toHaveBeenCalledWith(el, 'is-invalid');
      });
      it('should remove the class if the control is valid', () => {
        directive.ngOnInit();
        control.setValue('sggshg');
        expect(renderer.removeClass).toHaveBeenCalledWith(el, 'is-invalid');
      });
    });

  });
});
