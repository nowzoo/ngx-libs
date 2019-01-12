import { NgxControlInvalidClassDirective } from './ngx-control-invalid-class.directive';
import { BehaviorSubject } from 'rxjs';
import { NgxValidity } from './shared';

describe('NgxControlInvalidClassDirective', () => {
  let directive: NgxControlInvalidClassDirective;
  let renderer: any;
  let element;
  let elementRef: any;
  let options: any;
  let validity$: BehaviorSubject<NgxValidity>;
  let validityDirective: any;
  beforeEach(() => {
    renderer = {
      addClass: jasmine.createSpy(),
      removeClass: jasmine.createSpy()
    };
    element = document.createElement('input');
    elementRef = {nativeElement: element};
    options = {controlInvalidClass: 'is-invalid'};
    validity$ = new BehaviorSubject(NgxValidity.hidden);
    validityDirective = {validity$: validity$.asObservable()};
    directive = new NgxControlInvalidClassDirective(renderer, elementRef, options, validityDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  describe('ngOnInit and ngOnDestroy', () => {
    it('should subscribe and unsubscribe from the validity$', () => {
      expect(validity$.observers.length).toBe(0);
      directive.ngOnInit();
      expect(validity$.observers.length).toBe(1);
      directive.ngOnDestroy();
      expect(validity$.observers.length).toBe(0);
    });
  });
  describe('adding and removing the class', () => {
    it('should add the class if invalid', () => {
      directive.ngOnInit();
      validity$.next(NgxValidity.invalid);
      expect(renderer.addClass).toHaveBeenCalledWith(element, 'is-invalid');
    });
    it('should remove the class if valid', () => {
      directive.ngOnInit();
      validity$.next(NgxValidity.valid);
      expect(renderer.removeClass).toHaveBeenCalledWith(element, 'is-invalid');
    });
  });
});
