import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGX_FORM_OPTIONS, NgxValidityOn } from '@nowzoo/ngx-form';

@Component({
  selector: 'app-options-provider-demo',
  templateUrl: './options-provider-demo.component.html',
  styleUrls: ['./options-provider-demo.component.scss'],
  providers: [
    {provide: NGX_FORM_OPTIONS, useValue: {
      controlInvalidClass: 'my-invalid-control',
      controlValidClass: 'my-valid-control',
      errorContainerClass: 'my-error',
      successContainerClass: 'my-error',
      showValidityOn: NgxValidityOn.dirty
    }}
  ]
})
export class OptionsProviderDemoComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.fg = this.fb.group({
      name: ['', Validators.required]
    });
  }

}
