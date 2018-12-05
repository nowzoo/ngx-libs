import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set shown to true if the control is invalid and the control is touched', () => {
    control.markAsTouched();
    control.setValue('');
    expect(component.shown).toBe(true);
    control.setValue('foo');
    expect(component.shown).toBe(false);
  });
});
