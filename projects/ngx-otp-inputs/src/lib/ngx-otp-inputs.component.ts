import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  QueryList,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-ngx-otp-inputs',
  standalone: true,
  imports: [CommonModule, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxOtpInputsComponent),
      multi: true,
    },
  ],

  template: `
    <div
      [ngClass]="[
        'otp-wrapper',
        wrapperClass,
        direction === 'rtl' ? 'rtl' : 'ltr'
      ]"
      [style.direction]="direction"
      role="group"
    >
      <input
        #otpInput
        [ngClass]="inputClasses"
        role="textbox"
        aria-multiline="false"
        *ngFor="let i of otpIndexes"
        [readonly]="readonly"
        [value]="otpValues[i]"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        (paste)="onPaste($event)"
        (blur)="onTouched()"
        maxlength="1"
        [attr.type]="maskInput ? 'password' : 'text'"
        [attr.aria-label]="ariaLabels[i] || 'Digit ' + (i + 1)"
        [attr.tabindex]="disabled ? -1 : i + 1"
        [disabled]="disabled"
        [attr.inputmode]="inputMode"
        [attr.autocomplete]="i === 0 ? 'one-time-code' : null"
        aria-required="true"
      />
    </div>
  `,
  styles: [
    `
      :host {
        --ngx-otp-width: 48px;
        --ngx-otp-height: 56px;
        --ngx-otp-border-radius: 8px;
        --ngx-otp-border-color: #ccc;
        --ngx-otp-focus-border-color: #1976d2;
        --ngx-otp-font-size: 18px;
        --ngx-otp-bg: #fff;
        --ngx-otp-text-color: #000;
        --ngx-otp-gap: 8px;
      }
      .otp-input.otp-success {
        border-color: #4caf50 !important;
      }

      .otp-input.otp-failed {
        border-color: #f44336 !important;
      }

      .otp-wrapper {
        display: flex;
        gap: var(--ngx-otp-gap);
        direction: inherit;
        flex-direction: row;
      }
      .otp-wrapper.ltr {
        flex-direction: row;
      }

      .otp-wrapper.rtl {
        flex-direction: row-reverse;
      }

      .otp-input {
        width: var(--ngx-otp-width);
        height: var(--ngx-otp-height);
        font-size: var(--ngx-otp-font-size);
        border-radius: var(--ngx-otp-border-radius);
        background-color: var(--ngx-otp-bg);
        color: var(--ngx-otp-text-color);
        border: 1px solid var(--ngx-otp-border-color);
        text-align: center;
        box-sizing: border-box;
        transition: border-color 0.2s ease-in-out,
          background-color 0.2s ease-in-out;
        caret-color: var(--ngx-otp-text-color);
      }

      .otp-input:focus {
        border-color: var(--ngx-otp-focus-border-color);
        outline: none;
      }

      .otp-input.has-error {
        border-color: var(--ngx-otp-error-border-color, red);
      }

      .otp-input:disabled {
        background-color: #f1f1f1;
        cursor: not-allowed;
        opacity: 0.6;
      }
    `,
  ],
})
export class NgxOtpInputsComponent
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  constructor(private cdr: ChangeDetectorRef) {}
  otpIndexes: number[] = [];
  otpValues: string[] = [];

  // == Inputs ==
  @Input() length = 4;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  @Input() disabled = false;
  @Input() inputType: 'number' | 'text' | 'alphanumeric' = 'number';
  @Input() autoFocus = true;
  @Input() inputClass = 'otp-input';
  @Input() wrapperClass = 'otp-wrapper';
  @Input() readonly = false;
  @Input() status: 'success' | 'failed' | null = null;

  @Input() autoSubmit = false;
  @Input() maskInput = false;
  @Input() inputMode: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' =
    'numeric';
  @Input() autoBlur = false;
  @Input() ariaLabels: string[] = [];

  // == Outputs ==
  @Output() completed = new EventEmitter<string>();
  @Output() changed = new EventEmitter<string>();

  // == Template References ==
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  private pendingValue: string | null = null;

  private onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};
  // == Lifecycle ==

  ngOnInit() {
    this.otpValues = Array(this.length).fill('');
    this.otpIndexes = Array.from({ length: this.length }, (_, i) => i);
  }
  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.focusFirstInput();
    }
    if (this.pendingValue != null) {
      this.setOtpValue(this.pendingValue);
      this.pendingValue = null;
    }
  }

  // == ControlValueAccessor ==

  writeValue(value: string): void {
    if (typeof value === 'string') {
      if (this.inputs && this.inputs.length) {
        this.setOtpValue(value);
        this.pendingValue = null;
      } else {
        this.pendingValue = value;
      }
    } else {
      this.pendingValue = null;
      this.otpValues = Array(this.length).fill('');
    }
  }

  private setOtpValue(value: string) {
    const chars = value.slice(0, this.length).split('');
    this.otpValues = [...chars];

    while (this.otpValues.length < this.length) {
      this.otpValues.push('');
    }

    this.cdr.detectChanges();

    queueMicrotask(() => {
      const inputs = this.inputs.toArray();
      for (let i = 0; i < this.otpValues.length; i++) {
        const inputEl = inputs[i]?.nativeElement;
        if (inputEl) {
          inputEl.value = this.otpValues[i];
        }
      }
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let val = input.value;

    val = val.replace(this.getSanitizeRegex(), '');
    const singleChar = val.charAt(0) || '';

    this.otpValues[index] = singleChar;
    input.value = singleChar;

    this.emitChange();

    if (singleChar) {
      if (this.direction === 'rtl' && index > 0) {
        const prev = input.previousElementSibling as HTMLInputElement;
        prev?.focus();
      } else if (this.direction === 'ltr' && index < this.length - 1) {
        const next = input.nextElementSibling as HTMLInputElement;
        next?.focus();
      }
    }

    this.handleCompletion(input);
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Backspace
    if (event.key === 'Backspace') {
      if (input.value) {
        this.otpValues[index] = '';
        this.emitChange();
      } else {
        const moveIndex = this.direction === 'rtl' ? index + 1 : index - 1;

        if (moveIndex >= 0 && moveIndex < this.length) {
          this.otpValues[moveIndex] = '';
          const targetInput = this.inputs.toArray()[moveIndex]?.nativeElement;
          setTimeout(() => targetInput?.focus(), 0);
          this.emitChange();
        }
      }
    }

    // Enter
    if (event.key === 'Enter') {
      if (this.isCompleted && this.autoSubmit) {
        this.completed.emit(this.otpValue);
      }
    }

    //  Right Arrow
    if (event.key === 'ArrowRight') {
      const next = input.nextElementSibling as HTMLInputElement;
      setTimeout(() => next?.focus(), 0);
    }

    //  Left Arrow
    if (event.key === 'ArrowLeft') {
      const prev = input.previousElementSibling as HTMLInputElement;
      setTimeout(() => prev?.focus(), 0);
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const sanitized = pasted.replace(this.getSanitizeRegex(), '');
    const inputsArray = this.inputs.toArray().map((el) => el.nativeElement);

    if (this.direction === 'rtl') {
      for (let i = 0; i < sanitized.length && i < this.length; i++) {
        const rtlIndex = this.length - 1 - i;
        this.otpValues[rtlIndex] = sanitized[i];
      }

      setTimeout(() => {
        const focusIndex =
          this.length - sanitized.length < 0
            ? 0
            : this.length - sanitized.length;
        inputsArray[focusIndex]?.focus();
        this.handleCompletion(inputsArray[focusIndex]);
      });
    } else {
      for (let i = 0; i < sanitized.length && i < this.length; i++) {
        this.otpValues[i] = sanitized[i];
      }

      setTimeout(() => {
        const focusIndex = Math.min(sanitized.length - 1, this.length - 1);
        inputsArray[focusIndex]?.focus();
        this.handleCompletion(inputsArray[focusIndex]);
      });
    }

    this.emitChange();
  }

  get isCompleted(): boolean {
    return this.otpValues.every((v) => v !== '');
  }

  private checkCompletion() {
    if (this.isCompleted) {
      this.completed.emit(this.otpValue);
    }
  }

  private getSanitizeRegex(): RegExp {
    switch (this.inputType) {
      case 'number':
        return /[^0-9]/g;
      case 'text':
        return /[^a-zA-Z]/g;
      case 'alphanumeric':
        return /[^a-zA-Z0-9]/g;
      default:
        return /[^0-9]/g;
    }
  }

  get otpValue(): string {
    return this.otpValues.join('');
  }

  reset(): void {
    this.otpValues = Array(this.length).fill('');
    this.emitChange();

    setTimeout(() => this.focusFirstInput());
  }

  private handleCompletion(input: HTMLInputElement) {
    if (!this.isCompleted) return;

    if (this.autoSubmit) {
      this.completed.emit(this.otpValue);
    } else {
      this.checkCompletion();
    }

    if (this.autoBlur) {
      input.blur();
    }
  }

  private emitChange() {
    const value = this.otpValue;
    this.onChange(value);
    this.changed.emit(value);
  }

  private focusFirstInput() {
    const inputsArr = this.inputs.toArray();
    const target =
      this.direction === 'rtl' ? inputsArr[inputsArr.length - 1] : inputsArr[0];
    target?.nativeElement?.focus();
  }

  get inputClasses() {
    return [
      this.inputClass,
      this.status === 'success' ? 'otp-success' : '',
      this.status === 'failed' ? 'otp-failed' : '',
    ];
  }
}
