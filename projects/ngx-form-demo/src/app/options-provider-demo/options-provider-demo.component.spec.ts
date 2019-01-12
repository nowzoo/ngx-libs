import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsProviderDemoComponent } from './options-provider-demo.component';

describe('OptionsProviderDemoComponent', () => {
  let component: OptionsProviderDemoComponent;
  let fixture: ComponentFixture<OptionsProviderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsProviderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsProviderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
