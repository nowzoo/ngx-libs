import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxMessageService } from './ngx-message.service';
import { INgxMessage, NgxMessageContext} from './shared';

@Component({
  selector: 'ngx-message',
  template: `
  <div class="ngx-message-container-modal" [class.shown]="'wait'===context && shown"></div>
  <div class="ngx-message-container" [class.shown]="shown">
    <div class="alert mb-0"
      [class.alert-secondary]="'wait'===context"
      [class.alert-success]="'success'===context"
      [class.alert-warning]="'warn'===context">
      <div class="d-flex align-items-center">
        <div class="mr-2">
          <i class="fas fa-spinner fa-spin" *ngIf="'wait'===context"></i>
          <i class="fas fa-check" *ngIf="'success'===context"></i>
          <i class="fas fa-exclamation-triangle" *ngIf="'warn'===context"></i>
        </div>
        <div>
          {{message}}
        </div>
      </div>
    </div>
  </div>
  `,
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
