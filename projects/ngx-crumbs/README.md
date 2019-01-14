# @nowzoo/ngx-crumbs

Router-based breadcrumb and window title components.

[Project & README](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-crumbs)
|
[Demo](https://nowzoo.github.io/ngx-libs/ngx-crumbs/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-crumbs-demo/src/app)
|
[Documentation](https://nowzoo.github.io/ngx-libs/ngx-crumbs/docs/)


## Quick start

```bash
npm i @nowzoo/ngx-crumbs --save
```

Import the module...
```typescript
import { NgxCrumbsModule } from '@nowzoo/ngx-crumbs';
@NgModule({
  imports: [
    NgxCrumbsModule.forRoot()
  ],
})
export class AppModule { }
```

Add breadcrumbs to your route components using `ng-template` and the `ngxCrumb` directive. The content of the crumb can be dynamic...
```html
<ng-template ngxCrumb>Dynamic: {{counter}}</ng-template>
```

To have the crumbs automatically update the window title, add the `NgxCrumbsWindowTitleComponent` to your app component...

```html
<ngx-crumbs-window-title></ngx-crumbs-window-title>
```

By default the window title component displays breadcrumbs in reverse order and limited to the first and last ones. You can change this with the `showAll` and `reverse` inputs.

```html
<ngx-crumbs-window-title [showAll]="true" [reverse]="false"></ngx-crumbs-window-title>
```

To display Bootstrap-style breadcrumbs, use `NgxCrumbsComponent`...

```html
<ngx-crumbs></ngx-crumbs>
```



### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-crumbs`.

The demo code is in `projects/ngx-crumbs-demo`.

Building the library...
```bash
ng build ngx-crumbs
```

Testing the library...
```bash
ng test ngx-crumbs
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-crumbs
ng serve ngx-crumbs-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-crumbs/LICENSE)
