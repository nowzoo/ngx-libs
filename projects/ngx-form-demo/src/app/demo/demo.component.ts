import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxInvalidOn } from '@nowzoo/ngx-form';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  fg: FormGroup;
  invalidOnControl: FormControl;
  options = [NgxInvalidOn.touched , NgxInvalidOn.dirty, NgxInvalidOn.always];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fg = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.invalidOnControl = new FormControl('touched');
    this.invalidOnControl.valueChanges.subscribe(() => this.reset());
  }

  reset() {
    setTimeout(() => {
      this.fg.setValue({name: '', email: ''});
      this.fg.get('name').markAsUntouched();
      this.fg.get('name').markAsPristine();
      this.fg.get('email').markAsUntouched();
      this.fg.get('email').markAsPristine();
    });
  }
}
