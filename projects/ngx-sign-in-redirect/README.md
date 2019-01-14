# @nowzoo/ngx-sign-in-redirect

A service for handling sign in redirects.

[Project & README](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-sign-in-redirect)
|
[Demo](https://nowzoo.github.io/ngx-libs/ngx-sign-in-redirect/)
|
[Demo Source Code](https://github.com/nowzoo/ngx-libs/tree/master/projects/ngx-sign-in-redirect-demo/src/app)
|
[Documentation](https://nowzoo.github.io/ngx-libs/ngx-sign-in-redirect/docs/)


## Quick start

```bash
npm i @nowzoo/ngx-sign-in-redirect --save
```

Import the module...
```typescript
import { NgxSignInRedirectModule } from '@nowzoo/ngx-sign-in-redirect';
@NgModule({
  imports: [
    NgxSignInRedirectModule.forRoot()
  ],
})
export class AppModule { }
```



Use the service in your components...
```typescript
import { NgxSignInRedirectService } from '@nowzoo/ngx-sign-in-redirect';

export class MyGatedComponent implements OnInit {

  constructor(
    private svc: NgxSignInRedirectService,
    private auth: SomeAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (! this.auth.signedIn) {
      this.svc.redirect = '/my/gated/path';
      this.router.navigate(['/sign-in']);
    }
  }

}

export class MySignInComponent implements OnInit {

  constructor(
    private svc: NgxSignInRedirectService,
    private auth: SomeAuthService,
  ) { }

  signIn(creds: any) {
    this.auth.signIn(creds)
      .then(() => {
        this.svc.redirectOnSignIn();
      })
  }

}

```


### Contributing

Clone the main repo and npm install...
```bash
git clone https://github.com/nowzoo/ngx-libs.git
cd ngx-libs
npm i
```

The library files are in `projects/ngx-sign-in-redirect`.

The demo code is in `projects/ngx-sign-in-redirect-demo`.

Building the library...
```bash
ng build ngx-sign-in-redirect
```

Testing the library...
```bash
ng test ngx-sign-in-redirect
```
To test with Wallaby, use the `wallaby.js` config at the root of the project directory.

Serving the demo...
```bash
# make sure you've built the library locally first with ng build ngx-sign-in-redirect
ng serve ngx-sign-in-redirect-demo
```

### Issues
Please submit issues to the main repo [here](https://github.com/nowzoo/ngx-libs/issues).

### License
[MIT](https://github.com/nowzoo/ngx-libs/blob/master/projects/ngx-sign-in-redirect/LICENSE)
