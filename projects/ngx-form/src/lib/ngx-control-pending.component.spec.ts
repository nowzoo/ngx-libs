import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { INgxFormOptions, NGX_FORM_OPTIONS, NgxValidityOn, NgxValidity} from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NgxControlPendingComponent } from './ngx-control-pending.component';


import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
describe('NgxControlPendingComponent', () => {
  let component: NgxControlPendingComponent;
  let fixture: ComponentFixture<NgxControlPendingComponent>;

  let validity$: BehaviorSubject<NgxValidity>;
  let validityDirective: any;
  let control: FormControl;
  beforeEach(() => {
    control = new FormControl('', Validators.required);
    validity$ = new BehaviorSubject(NgxValidity.hidden);
    validityDirective = {validity$: validity$.asObservable(), control: control};
    TestBed.configureTestingModule({
      declarations: [ NgxControlPendingComponent ],
      providers: [
        {provide: NGX_FORM_OPTIONS, useValue: {}},
        {provide: NgxControlValidityDirective, useValue: validityDirective}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxControlPendingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set shown based on validity', () => {
    component.ngOnInit();
    validity$.next(NgxValidity.pending);
    expect(component.shown).toBe(true);
    validity$.next(NgxValidity.valid);
    expect(component.shown).toBe(false);
  });
});
