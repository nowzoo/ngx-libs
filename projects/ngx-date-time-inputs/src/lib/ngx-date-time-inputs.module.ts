import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDateInputComponent } from './ngx-date-input.component';
import { NgxTimeInputComponent } from './ngx-time-input.component';
import { NgxDateTimeService } from './ngx-date-time.service';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [NgxDateInputComponent, NgxTimeInputComponent],
  exports: [NgxDateInputComponent, NgxTimeInputComponent],
  providers: [NgxDateTimeService]
})
export class NgxDateTimeInputsModule { }
