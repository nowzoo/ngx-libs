# @nowzoo/ngx-bootstrap-modal

Service for creating and showing Bootstrap modals from templates.

[Project & README](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-bootstrap-modal)
|
[Demo](https://nowzoo.github.io/ngx-libs/ngx-bootstrap-modal/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-bootstrap-modal-demo/src/app)
|
[Documentation](https://nowzoo.github.io/ngx-libs/ngx-bootstrap-modal/docs/)


**Important note:** Unlike other Angular/Bootstrap libraries, this library depends on the native Bootstrap js and css. This is by design. You must add Bootstrap and its dependencies into your app's build.


## Quick start

```bash
npm i @nowzoo/ngx-bootstrap-modal jquery popper.js bootstrap --save
```

Add Bootstrap and its dependencies to your build...

```json
// in angular.json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "projects/ngx-bootstrap-modal-demo/src/styles.scss"
],
"scripts": [
  "node_modules/jquery/dist/jquery.slim.js",
  "node_modules/popper.js/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

(Alternately, you can use script tags in your index.html.)

Import the `NgxBootstrapModalModule` and call `forRoot()`.

```ts
import { NgxBootstrapModalModule } from '@nowzoo/ngx-bootstrap-modal';

@NgModule({
  imports: [
    NgxBootstrapModalModule.forRoot()
  ]
})
export class AppModule { }

```

Use the service...

```ts
import { NgxBootstrapModalService } from '@nowzoo/ngx-bootstrap-modal';
export class AppComponent {
  constructor(
    public modalService: NgxBootstrapModalService
  ) {}
}
```
```html
<ng-template #demo1>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</ng-template>
<p>
  <button type="button"
    class="btn btn-primary"
    (click)="modalService.show(demo1)">
    Show Modal
  </button>
</p>

```

All modal options are settable by classes and `data-attributes` in the modal markup. See the [Bootstrap Modal docs](https://getbootstrap.com/docs/4.2/components/modal/) for details.


`NgxBootstrapModalService`'s `show(templateRef)` method accepts a `TemplateRef`. It returns an instance of `INgxBootstrapModalInstance`, which contains various methods and properties to track and manipulate the modal.  See the [documentation](https://nowzoo.github.io/ngx-libs/ngx-bootstrap-modal/docs/) for more details.





### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-bootstrap-modal`.

The demo code is in `projects/ngx-bootstrap-modal-demo`.

Building the library...
```bash
ng build ngx-bootstrap-modal
```

Testing the library...
```bash
ng test ngx-bootstrap-modal
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-bootstrap-modal
ng serve ngx-bootstrap-modal-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-bootstrap-modal/LICENSE)
