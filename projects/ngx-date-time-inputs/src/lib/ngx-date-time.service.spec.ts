import { TestBed, inject } from '@angular/core/testing';
import * as moment from 'moment';

import { NgxDateTimeService } from './ngx-date-time.service';

describe('NgxDateTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxDateTimeService]
    });
  });

  it('should be created', inject([NgxDateTimeService], (service: NgxDateTimeService) => {
    expect(service).toBeTruthy();
  }));

  describe('parseTime(timeStr)', () => {
    let service;
    beforeEach(() => {
      service = TestBed.get(NgxDateTimeService);
    });
    it ('should handle "3 pm"', () => {
      expect(service.parseTime('3 pm')).toEqual({hour: 15, minute: 0});
    });
    it ('should handle "3 PM"', () => {
      expect(service.parseTime('3 PM')).toEqual({hour: 15, minute: 0});
    });
    it ('should handle "3 Am"', () => {
      expect(service.parseTime('3 Am')).toEqual({hour: 3, minute: 0});
    });
    it ('should handle "3:24 Pm"', () => {
      expect(service.parseTime('3:24 Pm')).toEqual({hour: 15, minute: 24});
    });
    it ('should handle "3:24"', () => {
      expect(service.parseTime('3:24')).toEqual({hour: 3, minute: 24});
    });
    it ('should handle ""', () => {
      expect(service.parseTime('')).toEqual({hour: 0, minute: 0});
    });
    it ('should handle "23:11"', () => {
      expect(service.parseTime('23:11')).toEqual({hour: 23, minute: 11});
    });
  });

  describe('splitDateStr(str)', () => {

  });

  describe('parseDate(dataeStr)', () => {
    let service;
    let currYear, currMonth, currDate;
    beforeEach(() => {
      service = TestBed.get(NgxDateTimeService);
      currYear = moment().year();
      currMonth = moment().month();
      currDate = moment().date();

    });
    it('should handle various strings with a us locale', () => {
      expect(service.parseDate('feb 3')).toEqual({year: currYear, month: 1, date: 3});
      expect(service.parseDate('3 feb')).toEqual({year: currYear, month: 1, date: 3});
      expect(service.parseDate('3 feb 2016')).toEqual({year: 2016, month: 1, date: 3});
      expect(service.parseDate('February 22 2016')).toEqual({year: 2016, month: 1, date: 22});
      expect(service.parseDate('February 22, 2016')).toEqual({year: 2016, month: 1, date: 22});
      expect(service.parseDate('12/11/1965')).toEqual({year: 1965, month: 11, date: 11});
      expect(service.parseDate('1965')).toEqual({year: 1965, month: currMonth, date: currDate});
      expect(service.parseDate('1965/12/22')).toEqual({year: 1965, month: 11, date: 22});
    });
    it('should handle various strings with a non-us locale', () => {
      spyOnProperty(service, 'isLocaleMonthFirst').and.returnValue(false);
      expect(service.parseDate('feb 3')).toEqual({year: currYear, month: 1, date: 3});
      expect(service.parseDate('3 feb')).toEqual({year: currYear, month: 1, date: 3});
      expect(service.parseDate('3 feb 2016')).toEqual({year: 2016, month: 1, date: 3});
      expect(service.parseDate('February 22 2016')).toEqual({year: 2016, month: 1, date: 22});
      expect(service.parseDate('February 22, 2016')).toEqual({year: 2016, month: 1, date: 22});
      expect(service.parseDate('12/11/1965')).toEqual({year: 1965, month: 10, date: 12});
      expect(service.parseDate('1965')).toEqual({year: 1965, month: currMonth, date: currDate});
      expect(service.parseDate('1965/12/22')).toEqual({year: 1965, month: 11, date: 22});
    });
  });
});
