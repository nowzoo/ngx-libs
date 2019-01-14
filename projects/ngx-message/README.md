# @nowzoo/ngx-message

A service and component for displaying app messages.

[Demo](https://nowzoo.github.io/ngx-libs/ngx-message/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-message-demo/src/app)

[Documentation](https://nowzoo.github.io/ngx-libs/ngx-message/docs/)

## Quick start

```bash
npm i @nowzoo/ngx-message --save
```

Import the module, calling `forRoot()`. This should probably be in your main `app` module.
```typescript
import { NgxMessageModule } from '@nowzoo/ngx-message';
@NgModule({
  imports: [
    NgxMessageModule.forRoot()
  ],
})
export class AppModule { }
```

Insert an instance of `NgxMessageComponent` at a high level in your app. This is intended to be a singleton.

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
<ngx-message></ngx-message>
```

Use the service in components to display messages...
```typescript
import { NgxMessageService } from '@nowzoo/ngx-message';

export class MyComponent {

  constructor(
    private msgService: NgxMessageService
  ) { }

  showSuccess() {
    this.msgService.success('Hey, you are great!')
  }

  showWarning() {
    this.msgService.warn('Woops!')
  }

  showWait() {
    this.service.wait('Waiting for a while....');
    setTimeout(() => {
      this.service.success('All done!');
    }, 3000);
  }

}

```

### Component Styles

The message component styles are based on Bootstrap alerts and Font Awesome. The styles are packaged with the component. So...
 - You do not have to add Bootstrap or Font Awesome styles.
 - If you want different styling, animations, layout or icons, just extend `NgxMessageComponent` with a different template and stylesheet.

### Hiding the message

The `success` and `warn` methods automatically hide the message after `NGX_MESSAGE_HIDE_DELAY` milliseconds (by default, 3000ms). The `wait` method does not hide the message: You must hide it yourself using the `success`, `warn` or `hide` methods. You can change the hide delay by providing a different value for `NGX_MESSAGE_HIDE_DELAY`:

```ts
import { NGX_MESSAGE_HIDE_DELAY, NgxMessageModule } from './shared';
@NgModule({
  imports: [
    NgxMessageModule.forRoot()
  ],
  providers: [
    {provide: NGX_MESSAGE_HIDE_DELAY, useValue: 1000}
  ]
})
export class AppModule { }
```

### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-message`.

The demo code is in `projects/ngx-message-demo`.

Building the library...
```bash
ng build ngx-message
```

Testing the library...
```bash
ng test ngx-message
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-message
ng serve ngx-message-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-message/LICENSE)
