import { TestBed } from '@angular/core/testing';
import { NgxValidityOn, NGX_FORM_OPTIONS, INgxFormOptions, NgxValidity } from './shared';
import { FormControl, Validators } from '@angular/forms';

import { NgxControlValidityDirective } from './ngx-control-validity.directive';

describe('NgxControlValidityDirective', () => {

  it('should create an instance', () => {
    const directive = new NgxControlValidityDirective({} as any, {} as any, {} as any);
    expect(directive).toBeTruthy();
  });

  describe('updating validity', () => {
    let renderer: any;
    let unlisten;
    let elementRef: any;
    let element: HTMLElement;
    let inputElement: HTMLElement;
    let fc: FormControl;
    let directive: NgxControlValidityDirective;
    let currentValidity: any;
    beforeEach(() => {
      unlisten = jasmine.createSpy();
      renderer = {
        listen: jasmine.createSpy().and.callFake(() => unlisten),
      };
      element = document.createElement('div');
      inputElement = document.createElement('input');
      element.appendChild(inputElement);
      document.body.appendChild(element);
      elementRef = {nativeElement: element};
      fc = new FormControl('', Validators.required);
      directive = new NgxControlValidityDirective(renderer, elementRef, {} as any);
      (directive as any)._ngControl = fc;
      directive.validity$.subscribe(v => currentValidity = v);
    });
    afterEach(() => {
      document.body.removeChild(element);
    });
    it('should not break if it is not wrapping a control', () => {
      (directive as any)._ngControl = null;
      directive.ngAfterContentInit();
      expect(renderer.listen).not.toHaveBeenCalled();
    });

    it('should listen to focusout, then stop', () => {
      directive.ngAfterContentInit();
      expect(renderer.listen).toHaveBeenCalledWith(element, 'focusout', jasmine.any(Function));
      directive.ngOnDestroy();
      expect(unlisten).toHaveBeenCalled();
    });

    it('should handle the focusout event', () => {
      const updateSpy = spyOn((directive as any), '_update').and.callFake(() => {});
      directive.ngAfterContentInit();
      inputElement.dispatchEvent(new Event('focusout'));
      // expect(updateSpy).toHaveBeenCalled();
    });
    it('should be ok if not passed showValidityOn', () => {
      directive.showValidityOn = null;
      directive.ngAfterContentInit();
      fc.setValue('foo');
    });
    it('should be ok if passed showValidityOn', () => {
      directive.showValidityOn = NgxValidityOn.always;
      directive.ngAfterContentInit();
      fc.setValue('foo');
    });
    describe('updating validity$ when updateOn = "always"', () => {
      beforeEach(() => {
        directive.showValidityOn = NgxValidityOn.always;
        directive.ngAfterContentInit();
        fc.setValue('foo');
      });
      it('should be invalid if the control is invalid and untouched and clean', () => {
        fc.markAsPristine();
        fc.markAsUntouched();
        fc.setValue('');
        expect(currentValidity).toBe(NgxValidity.invalid);
      });
      it('should be valid if the control is valid and untouched and clean', () => {
        fc.markAsPristine();
        fc.markAsUntouched();
        fc.setValue('fsygsyt');
        expect(currentValidity).toBe(NgxValidity.valid);
      });
    });

    describe('updating validity$ when updateOn = "dirty"', () => {
      beforeEach(() => {
        directive.showValidityOn = NgxValidityOn.dirty;
        directive.ngAfterContentInit();
      });
      it('should be hidden if the control is invalid and untouched and clean', () => {
        fc.markAsPristine();
        fc.markAsUntouched();
        fc.setValue('');
        expect(currentValidity).toBe(NgxValidity.hidden);
      });
    });

  });




});
