import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2} from '@angular/core';

import { NgxPasswordToggleComponent } from './ngx-password-toggle.component';

describe('NgxPasswordToggleComponent', () => {
  let component: NgxPasswordToggleComponent;
  let fixture: ComponentFixture<NgxPasswordToggleComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPasswordToggleComponent ],
      providers: [
        {provide: Renderer2, useValue: {}}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxPasswordToggleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('should have renderer', () => {
      expect(component.renderer).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    it('should call update', () => {
      spyOn(component, 'update');
      component.ngOnInit();
      expect(component.update).toHaveBeenCalledWith();
    });
  });

  describe('toggle()', () => {
    let event: any;
    beforeEach(() => {
      event = {preventDefault: jasmine.createSpy()};
      spyOn(component, 'update');
    });
    it('should toggle shown', () => {
      expect(component.shown).toBe(false);
      component.toggle(event);
      expect(component.shown).toBe(true);
      component.toggle(event);
      expect(component.shown).toBe(false);
    });

    it('should call event.preventDefault', () => {
      component.toggle(event);
      expect(event.preventDefault).toHaveBeenCalledWith();
    });
    it('should call update', () => {
      component.toggle(event);
      expect(component.update).toHaveBeenCalledWith();
    });

  });

  describe('update()', () => {
    let renderer: any;
    let input: HTMLInputElement;
    beforeEach(() => {
      input = document.createElement('input');
      renderer = {setAttribute: jasmine.createSpy()};
      component.input = input;
      spyOnProperty(component, 'renderer').and.returnValue(renderer);
    });
    it('should set the type to password if shown is false', () => {
      component.shown = false;
      component.update();
      expect(renderer.setAttribute).toHaveBeenCalledWith(input, 'type', 'password');
    });
    it('should set the type to text if shown is true', () => {
      component.shown = true;
      component.update();
      expect(renderer.setAttribute).toHaveBeenCalledWith(input, 'type', 'text');
    });
  });
});
