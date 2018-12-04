# @nowzoo/ngx-message

A service and component for displaying app messages.

## Quick start

```bash
npm i @nowzoo/ngx-message
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

[Full Documentation](https://nowzoo.github.io/ngx-libs/ngx-message/)
