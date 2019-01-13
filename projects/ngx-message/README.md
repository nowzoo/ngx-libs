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

Import the module...
```typescript
import { NgxMessageModule } from '@nowzoo/ngx-message';
@NgModule({
  imports: [
    NgxMessageModule.forRoot()
  ],
})
export class AppModule { }
```

Insert the component at a high level in your app...

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
<ngx-message></ngx-message>
```

Use the service to display messages...
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

### API

#### const NGX_MESSAGE_HIDE_DELAY
```ts
const NGX_MESSAGE_HIDE_DELAY: InjectionToken<number>
```

How long in milliseconds success and warn messages stay visible before being automatically hidden. Default: `3000`. You can provide a different value:

```ts
{provide: NGX_MESSAGE_HIDE_DELAY, useValue: 5000}
```

#### enum NgxMessageContext

```ts
enum NgxMessageContext  {
  warn = 'warn',
  success = 'success',
  wait = 'wait'
}
```

#### interface INgxMessage

```ts
interface INgxMessage {
  message: string;
  context: NgxMessageContext;
}
```

#### NgxMessageService

##### Properties
- `message$: Observable<INgxMessage>`

##### Methods
- `show(message: string, context: NgxMessageContext, hide: boolean)`
- `hide()`
- `wait(message: string)`
- `success(message: string)`
- `warn(message: string)`

#### NgxMessageComponent

### Contributing

See the [repo README](https://github.com/nowzoo/ngx-libs) for how to test and build this library.
