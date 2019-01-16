import { ComponentFixture, TestBed } from '@angular/core/testing';
import { INgxFormOptions, NGX_FORM_OPTIONS, NgxValidityOn, NgxValidity} from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NgxControlErrorComponent } from './ngx-control-error.component';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

describe('NgxControlErrorComponent', () => {
  let component: NgxControlErrorComponent;
  let fixture: ComponentFixture<NgxControlErrorComponent>;
  let validity$: BehaviorSubject<NgxValidity>;
  let validityDirective: any;
  let control: FormControl;


  beforeEach(() => {
    control = new FormControl('', Validators.required);
    validity$ = new BehaviorSubject(NgxValidity.hidden);
    validityDirective = {validity$: validity$.asObservable(), control: control};
    TestBed.configureTestingModule({
      declarations: [ NgxControlErrorComponent ],
      providers: [
        {provide: NGX_FORM_OPTIONS, useValue: {}},
        {provide: NgxControlValidityDirective, useValue: validityDirective}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxControlErrorComponent);
    component = fixture.componentInstance;
    component.key = 'required';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set shown based on validity', () => {
    component.ngOnInit();
    validity$.next(NgxValidity.invalid);
    expect(component.shown).toBe(true);
    validity$.next(NgxValidity.valid);
    expect(component.shown).toBe(false);
  });
  it('should set shown based on validity if passed an array of keys', () => {
    component.key = ['required', 'email'];
    component.ngOnInit();
    validity$.next(NgxValidity.invalid);
    expect(component.shown).toBe(true);
    validity$.next(NgxValidity.valid);
    expect(component.shown).toBe(false);
  });
});
