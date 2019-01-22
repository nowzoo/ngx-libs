import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-unhandled-error',
  templateUrl: './unhandled-error.component.html',
  styleUrls: ['./unhandled-error.component.css']
})
export class UnhandledErrorComponent {
  @Input() error: any;
}
