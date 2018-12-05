import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxCrumbsModule } from '@nowzoo/ngx-crumbs';
import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { AnotherRouteComponent } from './another-route/another-route.component';
import { FooRouteComponent } from './foo-route/foo-route.component';
import { BarRouteComponent } from './bar-route/bar-route.component';
import { BazRouteComponent } from './baz-route/baz-route.component';
import { DynamicRouteComponent } from './dynamic-route/dynamic-route.component';

const routes: Routes = [
  {path: 'foo', component: FooRouteComponent, children: [
    {path: 'bar', component: BarRouteComponent, children: [
      {path: 'baz', component: BazRouteComponent}
    ]}
  ]},
  {path: 'another', component: AnotherRouteComponent},
  {path: 'dynamic', component: DynamicRouteComponent},
  {path: '', component: IndexRouteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooRouteComponent,
    BarRouteComponent,
    BazRouteComponent,
    IndexRouteComponent,
    AnotherRouteComponent,
    DynamicRouteComponent
  ],
  imports: [
    BrowserModule,
    NgxCrumbsModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
