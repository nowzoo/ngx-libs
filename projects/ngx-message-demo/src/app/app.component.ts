import { Component } from '@angular/core';
import { NgxMessageService } from '@nowzoo/ngx-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private msgService: NgxMessageService
  ) {
    this.msgService.message$.subscribe(v => console.log(v));
  }

  showSuccess() {
    this.msgService.success('Hey, you are great!');
  }

  showWarning() {
    this.msgService.warn('Woops!');
  }

  showWait() {
    this.msgService.wait('Waiting...');
    setTimeout(() => {
      this.msgService.hide();
    }, 2000);
  }
}
