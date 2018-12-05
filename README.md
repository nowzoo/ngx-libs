# NgxLibs

### Create a library
```bash
# set the name of the lib...
LIBNAME=CHANGETHIS

# one liner...
cd projects/${LIBNAME} && \
VERSION="$(npm version patch)" && \
compodoc  -p tsconfig.lib.json  --disableCoverage --output ../../docs/${LIBNAME} -n "@nowzoo/${LIBNAME} - ${VERSION}" && \
cd ../.. && \
ng build ${LIBNAME} && \
ng build ${LIBNAME}-demo --prod --aot && \
cd dist/${LIBNAME} && \
npm publish --access public && \
cd ../.. && \
git add -A &&
git tag ${VERSION} && \
git commit -m "published version ${VERSION}" && \
git push
```


### Build a library

```bash
# set the name of the lib...
LIBNAME=CHANGETHIS

# one liner...
cd projects/${LIBNAME} && \
VERSION="$(npm version patch)" && \
compodoc  -p tsconfig.lib.json  --disableCoverage --output ../../docs/${LIBNAME} -n "@nowzoo/${LIBNAME} - ${VERSION}" && \
cd ../.. && \
ng build ${LIBNAME} && \
ng build ${LIBNAME}-demo --prod --aot && \
cd dist/${LIBNAME} && \
npm publish --access public && \
cd ../.. && \
git add -A &&
git tag ${VERSION} && \
git commit -m "published version ${VERSION}" && \
git push
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
