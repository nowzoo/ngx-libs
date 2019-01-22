import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { NgxFirebaseAuthComponent } from './ngx-firebase-auth.component';
describe('NgxFirebaseAuthComponent', () => {
  let component: NgxFirebaseAuthComponent;
  let fixture: ComponentFixture<NgxFirebaseAuthComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFirebaseAuthComponent ],
      providers: [
        {provide: Router, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
      ]
    })
    .overrideTemplate(NgxFirebaseAuthComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(NgxFirebaseAuthComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
