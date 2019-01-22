import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhandledErrorComponent } from './unhandled-error.component';

describe('UnhandledErrorComponent', () => {
  let component: UnhandledErrorComponent;
  let fixture: ComponentFixture<UnhandledErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnhandledErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnhandledErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
