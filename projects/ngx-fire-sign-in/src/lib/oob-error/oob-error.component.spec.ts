import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OobErrorComponent } from './oob-error.component';

describe('OobErrorComponent', () => {
  let component: OobErrorComponent;
  let fixture: ComponentFixture<OobErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OobErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OobErrorComponent);
    component = fixture.componentInstance;
    component.error = {code: 'foo'} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
