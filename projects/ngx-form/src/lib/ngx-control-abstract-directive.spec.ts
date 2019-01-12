import { NgxControlAbstractDirective } from './ngx-control-abstract-directive';
import { INgxFormOptions, NGX_FORM_OPTIONS, NgxValidityOn, NgxValidity} from './shared';
import { BehaviorSubject } from 'rxjs';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
class Implemantation extends NgxControlAbstractDirective {
  _update() {}
}
describe('NgxControlAbstractDirective', () => {
  let options: any;
  let directive: any;
  let validitySubj$: BehaviorSubject<NgxValidity>;
  let implementation;
  beforeEach(() => {
    validitySubj$ = new BehaviorSubject(NgxValidity.hidden);
    options = {};
    directive = {
      validity$: validitySubj$.asObservable()
    };
    implementation = new Implemantation(options, directive);
  });
  it('should create an instance', () => {
    expect(implementation).toBeTruthy();
  });
  it('should subscribe and unsubscribe from the parent directive\'s validity$', () => {
    expect(validitySubj$.observers.length).toBe(0);
    implementation.ngOnInit();
    expect(validitySubj$.observers.length).toBe(1);
    implementation.ngOnDestroy();
    expect(validitySubj$.observers.length).toBe(0);
  });
  it('should call _update on the child class', () => {
    spyOn(implementation, '_update').and.callFake(() => {});
    implementation.ngOnInit();
    expect(implementation._update).toHaveBeenCalledTimes(1);
    validitySubj$.next(NgxValidity.invalid);
    expect(implementation._update).toHaveBeenCalledTimes(2);
  });
  it('should be ok if the parent directive is missing', () => {
    implementation = new Implemantation(options, null);
    implementation.ngOnInit();
    expect(validitySubj$.observers.length).toBe(0);
  });
});
