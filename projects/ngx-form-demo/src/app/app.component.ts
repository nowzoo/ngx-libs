import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  fg: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fg = this.fb.group({
      name: ['', Validators.required]
    });
  }

}
