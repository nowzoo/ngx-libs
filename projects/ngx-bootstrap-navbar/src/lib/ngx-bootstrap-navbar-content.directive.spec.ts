import { NgxBootstrapNavbarContentDirective } from './ngx-bootstrap-navbar-content.directive';
import { NgxBsNavbarContext } from './shared';

describe('NgxBsNavbarContentDirective', () => {
  let service: any;
  let route: any;
  let templateRef: any;
  let directive: NgxBootstrapNavbarContentDirective;
  beforeEach(() => {
    service = {
      setTemplate: jasmine.createSpy(),
      removeTemplate: jasmine.createSpy()
    };
    route = { snapshot: {}};
    templateRef = {};
    directive = new NgxBootstrapNavbarContentDirective(service, route, templateRef);
    directive.ngxBsNavbarContent = NgxBsNavbarContext.brand;
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
    it('should have context', () => {
      expect(directive.context).toBe(directive.ngxBsNavbarContent);
    });
  });

  describe('ngOnInit', () => {
    it('should set the priority if there are two route parents', () => {
      const snap = {parent: {parent: {}}};
      spyOnProperty(directive, 'route').and.returnValue(snap);
      directive.ngOnInit();
      expect(directive.priority).toBe(3);
    });
    it('should set the priority if there are no route parents', () => {
      const snap = {};
      spyOnProperty(directive, 'route').and.returnValue(snap);
      directive.ngOnInit();
      expect(directive.priority).toBe(1);
    });
    it('should set the template', () => {
      directive.ngOnInit();
      expect(service.setTemplate).toHaveBeenCalledWith(directive);
    });
  });
  describe('ngOnDestroy', () => {
    it('should remove the template', () => {
      directive.ngOnDestroy();
      expect(service.removeTemplate).toHaveBeenCalledWith(directive);
    });
  });
});
