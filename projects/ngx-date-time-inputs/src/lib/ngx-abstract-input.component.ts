import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

import { NgxDateTimeService } from './ngx-date-time.service';


export abstract class NgxAbstractInputComponent implements ControlValueAccessor {

  private _control: FormControl = new FormControl('', {updateOn: 'blur'});
  private _date: moment_.Moment = moment();

  abstract displayFormat: string;
  abstract inputPlaceholder: string;
  abstract inputId: string;
  abstract inputClass: string;

  propagateChange: Function = () => {};
  propagateTouched: Function = () => {};

  constructor(
    private _dateService: NgxDateTimeService,
  ) { }


  get dateService(): NgxDateTimeService {
    return this._dateService;
  }

  get control(): FormControl {
    return this._control;
  }

  get date(): moment_.Moment {
    return this._date;
  }



  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  abstract writeValue(dateString: string): void;
  abstract handleInputChange(): void;

}
