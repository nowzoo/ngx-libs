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
    this.msgService.wait('Waiting...')
  }

}

```

### Component Styles

The message component styles are based on Bootstrap alerts and Font Awesome. The styles are packaged with the component. So...
 - You do not have to add Bootstrap or Font Awesome styles.
 - If you want different styling, animations, layout or icons, just extend `NgxMessageComponent` with a different template and stylesheet.

### Contributing

See the [repo README](https://github.com/nowzoo/ngx-libs) for how to test and build this library.
