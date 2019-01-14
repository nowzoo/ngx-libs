# @nowzoo/ngx-form

Control validity directives and components for Angular forms.

[Project & README](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-form)
|
[Demo](https://nowzoo.github.io/ngx-libs/ngx-form/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-form-demo/src/app)

[Documentation](https://nowzoo.github.io/ngx-libs/ngx-form/docs/)


## Quick start

```bash
npm i @nowzoo/ngx-form --save
```

Import the module...

```typescript
import { NgxFormModule } from '@nowzoo/ngx-form';

@NgModule({
  //...
  imports: [
    //...
    ReactiveFormsModule, // or FormsModule
    NgxFormModule
  ],
  //...
})
export class AppModule { }
```

Use the directives and components...
```html
<!--
The ngxControlValidity directive is the wrapper.
It's required for the other components and directives to work.
Also, it expects to find an NgControl (ngModel or a reactive control) inside.
It will fail silently if no NgControl is found.
-->
<div class="form-group" ngxControlValidity #emailValidity="ngxControlValidity">
  <label for="reactive-demo-email">Email</label>
  <!--
  ngxControlInvalidClass and ngxControlValidClass add
  the Bootstrap 'is-invalid' and 'is-valid' classes
  to the control element.
  Both are optional.
  -->
  <input
    id="reactive-demo-email"
    type="text"
    [formControl]="fcEmail"
    ngxControlInvalidClass
    ngxControlValidClass
    class="form-control form-control-lg">
  <!--
  show the error for a key...
  -->
  <ngx-control-error key="required">Required.</ngx-control-error>
  <ngx-control-error key="email">Invalid email.</ngx-control-error>
  <!--
  show that the control is valid...
  -->
  <ngx-control-success>That's a valid email!</ngx-control-success>
  <!--
  ngxControlValidity exposes a
  validity$ observable that you can use
  elsewhere. This is one of:
  - "hidden" (don't show the validity)
  - "invalid"
  - "valid"
  -->
  <small class="form-text text-muted">
    Validity: {{emailValidity.validity$ | async | json}}
  </small>
</div>

<!--
You can control when validity is shown
with the showValidityOn input for ngxControlValidity.
Valid values are:
- "touched" (when the input has been blurred, the default)
- "dirty" (when the input has been changed)
- "always"
This controls the behavior of all the components
and directives wrapped by the ngxControlValidity
directive.
-->
<div class="form-group"
ngxControlValidity
showValidityOn="dirty" #tosValidity="ngxControlValidity">
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="true"
      id="reactive-demo-check"
      [formControl]="fcTos"
      ngxControlInvalidClass
      ngxControlValidClass>
    <label class="form-check-label" for="reactive-demo-check">
      I agree to your onerous terms of service.
    </label>
  </div>
  <ngx-control-error key="required">You really must agree to send us Junior.</ngx-control-error>
  <ngx-control-success>That's just great! We're sure Junior will enjoy work in the salt mine.</ngx-control-success>
  <small class="form-text text-muted">
    Validity: {{tosValidity.validity$ | async | json}}
  </small>
</div>

```



### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-form`.

The demo code is in `projects/ngx-form-demo`.

Building the library...
```bash
ng build ngx-form
```

Testing the library...
```bash
ng test ngx-form
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-form
ng serve ngx-form-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-form/LICENSE)
