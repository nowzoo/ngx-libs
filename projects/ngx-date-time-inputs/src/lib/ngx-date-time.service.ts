import { Injectable } from '@angular/core';
import { words } from 'lodash-es';
import * as momentNs from 'moment';

const moment = momentNs;


export class DateParseResult {
  year: number;
  month: number;
  date: number;
}
export class TimeParseResult {
  hour: number;
  minute: number;
}
@Injectable()
export class NgxDateTimeService {

  monthNamesRx: RegExp;
  monthAbbrsRx: RegExp;

  get monthsRx(): RegExp {
    let n;
    let m;
    const monthNames = [];
    for (n = 0; n < 12; n++) {
      m = moment().month(n);
      monthNames.push(m.format('MMMM'));
      monthNames.push(m.format('MMM'));
    }
    return new RegExp(monthNames.join('|'), 'gi');
  }

  get isLocaleMonthFirst(): boolean  {
    const m = moment('1965-12-22');
    const str = m.format('l');
    return str.indexOf('12') < str.indexOf('22');
  }


  parseDate(dateStr: string): DateParseResult {
    const m = moment();
    const dateWords = words(dateStr);
    const result = {year: null, month: null, date: null};
    const unusedNumbers = [];
    dateWords.forEach(word => {
      if (null === result.month) {
        if (this.monthsRx.test(word)) {
          result.month = m.month(word).month();
          return;
        }
      }
      if (null === result.year) {
        if (/^\d{4}$/.test(word)) {
          result.year = parseInt(word, 10);
          return;
        }
      }
      if (/^\d+$/.test(word)) {
        unusedNumbers.push(parseInt(word, 10));
      }
    });

    if (null === result.year) {
      result.year = moment().year();
    }
    if (! this.isLocaleMonthFirst) {
      unusedNumbers.reverse();
    }
    unusedNumbers.forEach((n) => {
     if (n >= 1 && n <= 12 && null === result.month) {
       result.month = n - 1;
     } else {
       if (n >= 1 && n <= 31 && null === result.date) {
         result.date = n;
       }
     }
   });
    if (null === result.month) {
      result.month = moment().month();
    }

    if (null === result.date) {
      result.date = moment().date();
    }

    return result;

  }



  parseTime(timeStr: string): TimeParseResult {
    let rxResult;
    let meridian: string = null;
    if (/am/i.test(timeStr)) {
      meridian = 'am';
    } else {
      if (/pm/i.test(timeStr)) {
        meridian = 'pm';
      }
    }
    const rx = /\d{1,2}/g;
    const results = [];

    while ((rxResult = rx.exec(timeStr)) !== null) {
      results.push(rxResult[0]);
    }
    let hour = results[0] ?  parseInt(results[0], 10) : 0;
    if ('pm' === meridian && hour < 12) {
      hour += 12;
    }
    const minute = results[1] ?  parseInt(results[1], 10) : 0;
    return {
      hour: hour,
      minute: minute
    };
  }

}
