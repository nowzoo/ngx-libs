import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dynamic-route',
  templateUrl: './dynamic-route.component.html',
  styleUrls: ['./dynamic-route.component.css']
})
export class DynamicRouteComponent implements OnInit, OnDestroy {
  interval: any;
  timer = 0;
  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.timer ++;
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
