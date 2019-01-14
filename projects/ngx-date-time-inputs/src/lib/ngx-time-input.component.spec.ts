import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDateTimeService } from './ngx-date-time.service';

import { NgxTimeInputComponent } from './ngx-time-input.component';

describe('NgxTimeInputComponent', () => {
  let component: NgxTimeInputComponent;
  let fixture: ComponentFixture<NgxTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {provide:  NgxDateTimeService, useValue: {}}
      ],
      declarations: [ NgxTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue', () => {
    let parseTimeSpy;
    let date;
    let setValueSpy;
    beforeEach(() => {
      parseTimeSpy = jasmine.createSpy().and.callFake(() => ({hour: 13, minute: 14}));
      spyOnProperty(component, 'dateService').and.returnValue({
        parseTime: parseTimeSpy
      });
      date = {
        hour: jasmine.createSpy().and.callFake(() => date),
        minute: jasmine.createSpy().and.callFake(() => date),
        format: jasmine.createSpy().and.callFake(() => 'Formatted')
      };
      spyOnProperty(component, 'date').and.returnValue(date);
      setValueSpy = jasmine.createSpy();
      spyOnProperty(component, 'control').and.returnValue({
        setValue: setValueSpy
      });
    });
    it('should call parseTime', () => {
      component.writeValue('foo');
      expect(parseTimeSpy).toHaveBeenCalledWith('foo');
    });
    it('should set the moment with the hour and minute', () => {
      component.writeValue('foo');
      expect(date.hour).toHaveBeenCalledWith(13);
      expect(date.minute).toHaveBeenCalledWith(14);
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
    let parseTimeSpy;
    let date;
    let setValueSpy;
    beforeEach(() => {
      parseTimeSpy = jasmine.createSpy().and.callFake(() => ({hour: 13, minute: 14}));
      spyOnProperty(component, 'dateService').and.returnValue({
        parseTime: parseTimeSpy
      });
      date = {
        hour: jasmine.createSpy().and.callFake(() => date),
        minute: jasmine.createSpy().and.callFake(() => date),
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
    it('should call parseTime', () => {
      component.writeValue('foo');
      expect(parseTimeSpy).toHaveBeenCalledWith('foo');
    });
    it('should set the moment with the hour and minute', () => {
      component.writeValue('foo');
      expect(date.hour).toHaveBeenCalledWith(13);
      expect(date.minute).toHaveBeenCalledWith(14);
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
