import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-demo',
  templateUrl: './reactive-demo.component.html',
  styleUrls: ['./reactive-demo.component.scss']
})
export class ReactiveDemoComponent implements OnInit {
  fcEmail: FormControl;
  fcTos: FormControl;
  constructor() { }

  ngOnInit() {
    this.fcEmail = new FormControl('', [Validators.required, Validators.email]);
    this.fcTos = new FormControl(false, [Validators.requiredTrue]);
  }

}
