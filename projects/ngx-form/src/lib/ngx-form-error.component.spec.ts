import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgxFormErrorComponent } from './ngx-form-error.component';

describe('NgxFormErrorComponent', () => {
  let component: NgxFormErrorComponent;
  let fixture: ComponentFixture<NgxFormErrorComponent>;
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('', Validators.required);
    TestBed.configureTestingModule({
      declarations: [ NgxFormErrorComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxFormErrorComponent);
    component = fixture.componentInstance;
    component.control = control;
    component.key = 'required';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sub and unsub from control.valueChanges', () => {
    const ctl = {valueChanges: new Subject()};
    spyOnProperty(component, 'control').and.returnValue(ctl);
    expect(ctl.valueChanges.observers.length).toBe(0);
    component.ngOnInit();
    expect(ctl.valueChanges.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(ctl.valueChanges.observers.length).toBe(0);
  });

  it('should set shown based on invalidOn and the valid state', () => {
    component.ngOnInit();
    control.markAsTouched();
    control.setValue('');
    expect(component.shown).toBe(true);
    control.setValue('foo');
    expect(component.shown).toBe(false);
  });

  it('should set shown based on invalidOn and the valid state if invalidOn is "dirty"', () => {
    component.invalidOn = 'dirty';
    component.ngOnInit();
    control.markAsDirty();
    control.setValue('');
    expect(component.shown).toBe(true);
    control.setValue('foo');
    expect(component.shown).toBe(false);
  });
});
