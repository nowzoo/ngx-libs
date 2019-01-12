import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxCrumbsModule } from '@nowzoo/ngx-crumbs';


import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { ParentRouteComponent } from './parent-route/parent-route.component';
import { ChildRouteComponent } from './child-route/child-route.component';
import { GrandchildRouteComponent } from './grandchild-route/grandchild-route.component';
import { DynamicTitleRouteComponent } from './dynamic-title-route/dynamic-title-route.component';


const routes: Routes = [
  {path: '', component: IndexRouteComponent, children: [
    {path: 'dynamic', component: DynamicTitleRouteComponent},
    {path: 'parent', component: ParentRouteComponent, children: [
      {path: 'child', component: ChildRouteComponent, children: [
        {path: 'grandchild', component: GrandchildRouteComponent}
      ]}
    ]},
  ]},
];
@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent,
    ParentRouteComponent,
    ChildRouteComponent,
    GrandchildRouteComponent,
    DynamicTitleRouteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxCrumbsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
