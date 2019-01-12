import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dynamic-title-route',
  templateUrl: './dynamic-title-route.component.html',
  styleUrls: ['./dynamic-title-route.component.scss']
})
export class DynamicTitleRouteComponent implements OnInit, OnDestroy {

  timer: any;
  counter = 0;
  constructor() { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.counter ++;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
