import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


import { NgxDateTimeService } from './ngx-date-time.service';
import { MODEL_TIME_FORMAT } from './shared';
import { NgxAbstractInputComponent } from './ngx-abstract-input.component';


@Component({
  selector: 'ngx-time-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxTimeInputComponent),
      multi: true
    }
  ]
})
export class NgxTimeInputComponent extends NgxAbstractInputComponent {
  @Input() displayFormat = 'LT';
  @Input() inputPlaceholder = 'Enter a time';
  @Input() inputId: string;
  @Input() inputClass: string;

  constructor(
    ds: NgxDateTimeService,
  ) {
    super(ds);
  }

  writeValue(timeString: string) {
    const t = this.dateService.parseTime(timeString);
    this.date.hour(t.hour).minute(t.minute);
    this.control.setValue(this.date.format(this.displayFormat));
  }

  handleInputChange() {
    const t = this.dateService.parseTime(this.control.value);
    this.date.hour(t.hour).minute(t.minute);
    const modelValue = this.date.format(MODEL_TIME_FORMAT);
    this.control.setValue(this.date.format(this.displayFormat));
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }


}
