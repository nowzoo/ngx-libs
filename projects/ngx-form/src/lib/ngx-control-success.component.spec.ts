import { ComponentFixture, TestBed } from '@angular/core/testing';
import { INgxFormOptions, NGX_FORM_OPTIONS, NgxValidity} from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';

import { NgxControlSuccessComponent } from './ngx-control-success.component';

import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

describe('NgxControlSuccessComponent', () => {
  let component: NgxControlSuccessComponent;
  let fixture: ComponentFixture<NgxControlSuccessComponent>;
  let validity$: BehaviorSubject<NgxValidity>;
  let validityDirective: any;
  let control: FormControl;


  beforeEach(() => {
    control = new FormControl('', Validators.required);
    validity$ = new BehaviorSubject(NgxValidity.hidden);
    validityDirective = {validity$: validity$.asObservable(), control: control};
    TestBed.configureTestingModule({
      declarations: [ NgxControlSuccessComponent ],
      providers: [
        {provide: NGX_FORM_OPTIONS, useValue: {}},
        {provide: NgxControlValidityDirective, useValue: validityDirective}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxControlSuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set shown based on validity', () => {
    component.ngOnInit();
    validity$.next(NgxValidity.valid);
    expect(component.shown).toBe(true);
    validity$.next(NgxValidity.invalid);
    expect(component.shown).toBe(false);
  });
});
