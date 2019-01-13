import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxMessageService } from './ngx-message.service';
import { INgxMessage, NgxMessageContext} from './shared';

@Component({
  selector: 'ngx-message',
  templateUrl: './ngx-message.component.html',
  styleUrls: ['./ngx-message.component.scss']
})
export class NgxMessageComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  message: string = null;
  context: NgxMessageContext = null;
  shown = false;
  constructor(
    private _messageService: NgxMessageService
  ) { }

  ngOnInit() {
    this._messageService.message$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((message: INgxMessage) => {
        if (! message) {
          this.shown = false;
          return;
        }
        this.message = message.message;
        this.context = message.context;
        this.shown = true;
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
