import { NgxCrumbDirective } from './ngx-crumb.directive';

describe('NgxCrumbDirective', () => {
  let route: any;
  let templateRef: any;
  let service: any;
  let ngxCrumb: any;
  let directive: NgxCrumbDirective;
  beforeEach(() => {
    ngxCrumb = ['foo', 'bar'];
    route = {
      snapshot: {}
    };
    templateRef = {};
    service = {setCrumb: jasmine.createSpy(), removeCrumb: jasmine.createSpy()};
    directive = new NgxCrumbDirective(route, templateRef, service);
    directive.ngxCrumb = ngxCrumb;
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('getters', () => {
    it('should have service', () => {
      expect(directive.service).toBe(service);
    });
    it('should have templateRef', () => {
      expect(directive.templateRef).toBe(templateRef);
    });
    it('should have route', () => {
      expect(directive.route).toBe(route.snapshot);
    });
    it('should have url', () => {
      expect(directive.url).toBe(ngxCrumb);
    });
  });

  describe('ngOnInit', () => {
    it('should set crumb', () => {
      directive.ngOnInit();
      expect(service.setCrumb).toHaveBeenCalledWith(directive);
    });
  });

  describe('ngOnInit', () => {
    it('should remove crumb', () => {
      directive.ngOnDestroy();
      expect(service.removeCrumb).toHaveBeenCalledWith(directive);
    });
  });
});
