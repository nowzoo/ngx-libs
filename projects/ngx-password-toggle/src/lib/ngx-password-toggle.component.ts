import { Component, OnInit, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'ngx-password-toggle',
  template: `
  <a href="#" class="ngx-password-toggle" (click)="toggle($event)">{{shown ? hideLabel : showLabel}}</a>
  `,
  styles: []
})
export class NgxPasswordToggleComponent implements OnInit {
  @Input() input: HTMLInputElement;
  @Input() hideLabel = 'Hide';
  @Input() showLabel = 'Show';

  shown = false;
  constructor(
    private _renderer: Renderer2
  ) { }

  get renderer(): Renderer2 {
    return this._renderer;
  }

  ngOnInit() {
    this.update();
  }


  toggle(event: Event) {
    event.preventDefault();
    this.shown = ! this.shown;
    this.update();
  }

  update() {
    if (this.shown) {
      this.renderer.setAttribute(this.input, 'type', 'text');
    } else {
      this.renderer.setAttribute(this.input, 'type', 'password');
    }
  }

}
