import { NgxInvalidControlDirective } from './ngx-invalid-control.directive';
import { Subject } from 'rxjs';
describe('NgxInvalidControlDirective', () => {
  it('should create an instance', () => {
    const directive = new NgxInvalidControlDirective({} as any, null, {} as any, {} as any);
    expect(directive).toBeTruthy();
  });

  describe('getters', () => {
    describe('control', () => {
      it('should be null if the directive is not attached to a control directive', () => {
        const directive = new NgxInvalidControlDirective(null, null, {} as any, {} as any);
        expect(directive.control).toBe(null);
      });
      it('should be the FormControlDirective if it exists', () => {
        const control = {};
        const d: any = {control: control};
        const directive = new NgxInvalidControlDirective(d, null, {} as any, {} as any);
        expect(directive.control).toBe(control);
      });
      it('should be the FormControlName if it exists', () => {
        const control = {};
        const d: any = {control: control};
        const directive = new NgxInvalidControlDirective(null, d, {} as any, {} as any);
        expect(directive.control).toBe(control);
      });
    });
    it('should have renderer', () => {
      const directive = new NgxInvalidControlDirective(null, {} as any, {} as any, {} as any);
      expect(directive.renderer).toBeTruthy();
    });
    it('should have el', () => {
      const directive = new NgxInvalidControlDirective(null, {} as any, {} as any, {nativeElement: {}} as any);
      expect(directive.el).toBeTruthy();
    });
  });

  describe('ngOnInit and ngOnDestroy', () => {
    let control: any;
    let statusChanges$: Subject<any>;
    let valueChanges$: Subject<any>;
    let el: any;
    let renderer: any;
    let elementRef: any;
    let directive: NgxInvalidControlDirective;
    beforeEach(() => {
      statusChanges$ = new Subject();
      valueChanges$ = new Subject();
      control = {
        valueChanges: valueChanges$.asObservable(),
        statusChanges: statusChanges$.asObservable(),
        touched: false,
        invalid: false
      };
      el = {};
      elementRef = {nativeElement: el};
      renderer = {
        addClass: jasmine.createSpy(),
        removeClass: jasmine.createSpy()
      };
      directive = new NgxInvalidControlDirective({control: control} as any, null, renderer, elementRef);
    });
    it('should be ok if there is no control', () => {
      spyOnProperty(directive, 'control').and.returnValue(null);
      directive.ngOnInit();
      expect(valueChanges$.observers.length).toBe(0);
    });
    it('should sub and unsub from valueChanges', () => {
      expect(valueChanges$.observers.length).toBe(0);
      directive.ngOnInit();
      expect(valueChanges$.observers.length).toBe(1);
      directive.ngOnDestroy();
      expect(valueChanges$.observers.length).toBe(0);
    });
    it('should sub and unsub from statusChanges', () => {
      expect(statusChanges$.observers.length).toBe(0);
      directive.ngOnInit();
      expect(statusChanges$.observers.length).toBe(1);
      directive.ngOnDestroy();
      expect(statusChanges$.observers.length).toBe(0);
    });
    it('should set/remove the class if the control based on touched and invalid', () => {
      directive.ngOnInit();
      expect(renderer.addClass).not.toHaveBeenCalled();
      expect(renderer.removeClass).not.toHaveBeenCalled();
      valueChanges$.next(null);
      statusChanges$.next(null);
      expect(renderer.removeClass).toHaveBeenCalledWith(el, 'is-invalid');
      control.touched = true;
      control.invalid = true;
      statusChanges$.next(null);
      expect(renderer.addClass).toHaveBeenCalledWith(el, 'is-invalid');
    });
  });
});
