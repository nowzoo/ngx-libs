import {
  Directive,
  Input,
  OnDestroy,
  AfterContentInit,
  ContentChild,
  Renderer2,
  ElementRef,
  Inject
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxValidityOn, NGX_FORM_OPTIONS, INgxFormOptions, NgxValidity } from './shared';
import { NgxFormHelper } from './ngx-form-helper';

@Directive({
  selector: '[ngxControlValidity]',
  exportAs: 'ngxControlValidity'
})
export class NgxControlValidityDirective implements AfterContentInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  private _validity$: BehaviorSubject<NgxValidity> = new BehaviorSubject(NgxValidity.hidden);
  private _blurUnlisten = null;
  @ContentChild(NgControl) private _ngControl: NgControl;

  @Input() showValidityOn: NgxValidityOn | {valid: NgxValidityOn, invalid: NgxValidityOn};

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Inject(NGX_FORM_OPTIONS) private _options: INgxFormOptions,
  ) { }

  get validity$(): Observable<NgxValidity> {
    return this._validity$.asObservable();
  }

  get control(): NgControl {
    return this._ngControl;
  }


  ngAfterContentInit() {
    if (! this._ngControl) {
      return;
    }
    this._blurUnlisten = this._renderer.listen(this._elementRef.nativeElement, 'focusout', this._update.bind(this));
    combineLatest(this._ngControl.valueChanges, this._ngControl.statusChanges)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(() => this._update());
  }

  ngOnDestroy() {
    if (this._blurUnlisten) {
      this._blurUnlisten();
    }
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  private _update() {

    const showValidityOn = NgxFormHelper.normalizeValidityOn(this.showValidityOn || this._options.showValidityOn);
    let validity: NgxValidity = NgxValidity.hidden;
    if (this.control.invalid) {
      validity = NgxFormHelper.getValidity(this.control, showValidityOn.invalid);
    } else {
      validity = NgxFormHelper.getValidity(this.control, showValidityOn.valid);
    }
    this._validity$.next(validity);
  }

}
