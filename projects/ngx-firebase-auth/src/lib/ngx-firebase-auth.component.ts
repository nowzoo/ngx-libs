import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Component({
  selector: 'ngx-firebase-auth',
  exportAs: 'ngxFirebaseAuth',
  templateUrl: './ngx-firebase-auth.component.html',
  styles: []
})
export class NgxFirebaseAuthComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @Output() signedOut: EventEmitter<void> = new EventEmitter();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }



  get router(): Router {
    return this._router;
  }

  get route(): ActivatedRoute {
    return this._route;
  }

  ngOnInit() {


  }


  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }




}
