import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NgxMessageService } from './ngx-message.service';
import { INgxMessage, NgxMessageContext} from './shared';

import { NgxMessageComponent } from './ngx-message.component';

describe('NgxMessageComponent', () => {
  let component: NgxMessageComponent;
  let fixture: ComponentFixture<NgxMessageComponent>;
  let message$: BehaviorSubject<INgxMessage>;
  beforeEach(() => {
    message$ = new BehaviorSubject(null);
    TestBed.configureTestingModule({
      declarations: [ NgxMessageComponent ],
      providers: [
        {provide: NgxMessageService, useValue: {message$: message$.asObservable()}}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sub and unsub from message$', () => {
    expect(message$.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(message$.observers.length).toBe(0);
  });
  it('should set context', () => {
    message$.next({context: NgxMessageContext.wait, message: 'foo'});
    expect(component.context).toBe('wait');
  });
  it('should set shown', () => {
    message$.next({context: NgxMessageContext.wait, message: 'foo'});
    expect(component.shown).toBe(true);
  });
  it('should set message', () => {
    message$.next({context: NgxMessageContext.wait, message: 'foo'});
    expect(component.message).toBe('foo');
  });
  it('should hide if the message is null', () => {
    message$.next({context: NgxMessageContext.wait, message: 'foo'});
    expect(component.shown).toBe(true);
    message$.next(null);
    expect(component.shown).toBe(false);
  });
});
