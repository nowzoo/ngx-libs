# @nowzoo/ngx-password-toggle

A password toggle component for Angular.

[Project & README](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-password-toggle)
|
[Demo](https://nowzoo.github.io/ngx-libs/ngx-password-toggle/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-password-toggle-demo/src/app)
|
[Documentation](https://nowzoo.github.io/ngx-libs/ngx-password-toggle/docs/)


## Quick start

```bash
npm i @nowzoo/ngx-password-toggle --save
```

Import the module...
```ts
import { NgxPasswordToggleModule } from '@nowzoo/ngx-password-toggle';

@NgModule({
  imports: [
    NgxPasswordToggleModule
  ],
})
export class AppModule { }
```
Use the component...

```html
<p>
  <input
    type="password"
    name="password"
    value="Super Secret"
    #passwordInput
    class="form-control">
</p>
<p>
  <ngx-password-toggle [input]="passwordInput"></ngx-password-toggle>
</p>

<p>
  Change the labels...
</p>

<p>
  <input
    type="password"
    name="password"
    value="Super Secret Something"
    #passwordInput2
    class="form-control">
</p>
<p>
  <ngx-password-toggle
    [input]="passwordInput2"
    hideLabel="Hide the password"
    showLabel="Show the password"></ngx-password-toggle>
</p>
```



### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-password-toggle`.

The demo code is in `projects/ngx-password-toggle-demo`.

Building the library...
```bash
ng build ngx-password-toggle
```

Testing the library...
```bash
ng test ngx-password-toggle
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-password-toggle
ng serve ngx-password-toggle-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-password-toggle/LICENSE)
