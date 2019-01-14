import {  } from '@angular/core/testing';
import { NgxDateTimeService } from './ngx-date-time.service';

import { NgxAbstractInputComponent } from './ngx-abstract-input.component';

class Implemented extends NgxAbstractInputComponent {
  displayFormat = 'YYYY-MM-DD';
  inputId = 'foo-bar';
  inputPlaceholder = 'jsgjgs';
  inputClass = 'jshkhsj';
  handleInputChange() {}
  writeValue() {}
}
describe('AbstractInputComponent', () => {
  let component: Implemented;


  beforeEach(() => {
    component = new Implemented({} as NgxDateTimeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('should have dateService', () => {
      expect(component.dateService).toBeTruthy();
    });
    it('should have date', () => {
      expect(component.date).toBeTruthy();
    });
    it('should have control', () => {
      expect(component.control).toBeTruthy();
    });
  });

  describe('registerOnChange(fn)', () => {
    it('should set propagateChange', () => {
      const fn = jasmine.createSpy();
      component.registerOnChange(fn);
      expect (component.propagateChange).toBe(fn);
    });
  });
  describe('registerOnTouched(fn)', () => {
    it('should set propagateTouched', () => {
      const fn = jasmine.createSpy();
      component.registerOnTouched(fn);
      expect (component.propagateTouched).toBe(fn);
    });
  });

});
