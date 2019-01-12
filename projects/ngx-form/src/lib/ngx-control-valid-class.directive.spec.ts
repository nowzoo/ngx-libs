import { NgxControlValidClassDirective } from './ngx-control-valid-class.directive';
import { BehaviorSubject } from 'rxjs';
import { NgxValidity } from './shared';

describe('NgxControlValidClassDirective', () => {
  let renderer: any;
  let element;
  let elementRef: any;
  let options: any;
  let validity$: BehaviorSubject<NgxValidity>;
  let validityDirective: any;
  let directive: NgxControlValidClassDirective;
  beforeEach(() => {
    renderer = {
      addClass: jasmine.createSpy(),
      removeClass: jasmine.createSpy()
    };
    element = document.createElement('input');
    elementRef = {nativeElement: element};
    options = {controlValidClass: 'is-valid'};
    validity$ = new BehaviorSubject(NgxValidity.hidden);
    validityDirective = {validity$: validity$.asObservable()};
    directive = new NgxControlValidClassDirective(renderer, elementRef, options, validityDirective);
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
    it('should add the class if valid', () => {
      directive.ngOnInit();
      validity$.next(NgxValidity.valid);
      expect(renderer.addClass).toHaveBeenCalledWith(element, 'is-valid');
    });
    it('should remove the class if invalid', () => {
      directive.ngOnInit();
      validity$.next(NgxValidity.invalid);
      expect(renderer.removeClass).toHaveBeenCalledWith(element, 'is-valid');
    });
  });
});
