// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAGSSNfQGGoD6OjWFyo_W7FHuj7UsfZjqk',
    authDomain: 'nowzoo-ngx-firebase-auth-demo.firebaseapp.com',
    databaseURL: 'https://nowzoo-ngx-firebase-auth-demo.firebaseio.com',
    projectId: 'nowzoo-ngx-firebase-auth-demo',
    storageBucket: 'nowzoo-ngx-firebase-auth-demo.appspot.com',
    messagingSenderId: '469695606100'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
