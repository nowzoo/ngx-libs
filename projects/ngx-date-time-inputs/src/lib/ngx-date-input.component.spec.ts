import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDateTimeService } from './ngx-date-time.service';

import { NgxDateInputComponent } from './ngx-date-input.component';

describe('DateInputComponent', () => {
  let component: NgxDateInputComponent;
  let fixture: ComponentFixture<NgxDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {provide:  NgxDateTimeService, useValue: {}}
      ],
      declarations: [ NgxDateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component.date.format());
  });

  describe('writeValue', () => {
    let parseDateSpy;
    let date;
    let setValueSpy;
    beforeEach(() => {
      parseDateSpy = jasmine.createSpy().and.callFake(() => ({year: 1999, month: 2, date: 23}));
      spyOnProperty(component, 'dateService').and.returnValue({
        parseDate: parseDateSpy
      });
      date = {
        year: jasmine.createSpy().and.callFake(() => date),
        month: jasmine.createSpy().and.callFake(() => date),
        date: jasmine.createSpy().and.callFake(() => date),
        format: jasmine.createSpy().and.callFake(() => 'Formatted')
      };
      spyOnProperty(component, 'date').and.returnValue(date);
      setValueSpy = jasmine.createSpy();
      spyOnProperty(component, 'control').and.returnValue({
        setValue: setValueSpy
      });
    });
    it('should call parseDate', () => {
      component.writeValue('foo');
      expect(parseDateSpy).toHaveBeenCalledWith('foo');
    });
    it('should set the moment with the year, month, date', () => {
      component.writeValue('foo');
      expect(date.year).toHaveBeenCalledWith(1999);
      expect(date.month).toHaveBeenCalledWith(2);
      expect(date.date).toHaveBeenCalledWith(23);
    });
    it('should format the date', () => {
      component.handleInputChange();
      expect(date.format).toHaveBeenCalledWith(component.displayFormat);
    });
    it('should set the control value', () => {
      component.writeValue('foo');
      expect(setValueSpy).toHaveBeenCalledWith('Formatted');
    });
  });

  describe('handleInputChange', () => {
    let parseDateSpy;
    let date;
    let setValueSpy;
    beforeEach(() => {
      parseDateSpy = jasmine.createSpy().and.callFake(() => ({year: 1999, month: 2, date: 23}));
      spyOnProperty(component, 'dateService').and.returnValue({
        parseDate: parseDateSpy
      });
      date = {
        year: jasmine.createSpy().and.callFake(() => date),
        month: jasmine.createSpy().and.callFake(() => date),
        date: jasmine.createSpy().and.callFake(() => date),
        format: jasmine.createSpy().and.callFake(() => 'Formatted')
      };
      spyOnProperty(component, 'date').and.returnValue(date);
      setValueSpy = jasmine.createSpy();
      spyOnProperty(component, 'control').and.returnValue({
        setValue: setValueSpy,
        value: 'foo'
      });
      spyOn(component, 'propagateChange').and.callThrough();
      spyOn(component, 'propagateTouched').and.callThrough();
    });
    it('should call parseDate with the control value', () => {
      component.handleInputChange();
      expect(parseDateSpy).toHaveBeenCalledWith('foo');
    });
    it('should set the moment with the year, month, date', () => {
      component.handleInputChange();
      expect(date.year).toHaveBeenCalledWith(1999);
      expect(date.month).toHaveBeenCalledWith(2);
      expect(date.date).toHaveBeenCalledWith(23);
    });
    it('should format the date', () => {
      component.handleInputChange();
      expect(date.format).toHaveBeenCalledWith(component.displayFormat);
    });
    it('should set the control value', () => {
      component.handleInputChange();
      expect(setValueSpy).toHaveBeenCalledWith('Formatted');
    });
    it('should propagate change and touched', () => {
      component.handleInputChange();
      expect(component.propagateChange).toHaveBeenCalledWith('Formatted');
      expect(component.propagateTouched).toHaveBeenCalledWith('Formatted');
    });
  });

});
