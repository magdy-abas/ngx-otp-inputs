import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'lib-ngx-otp-inputs',
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
    <div class="otp-wrapper" [style.direction]="direction" role="group">
      <input
        *ngFor="let i of otpIndexes"
        [value]="otpValues[i]"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        (paste)="onPaste($event)"
        maxlength="1"
        type="text"
        class="otp-input"
        [attr.aria-label]="'Digit ' + (i + 1)"
        [ngStyle]="{
          width: inputWidth,
          height: inputHeight,
          borderColor: borderColor
        }"
      />
    </div>
  `,
  styles: [
    `
      .otp-wrapper {
        display: flex;
        gap: 8px;
      }

      .otp-input {
        font-size: 20px;
        text-align: center;
        border-radius: 4px;
      }

      .otp-input:focus {
        border-color: #1976d2;
        outline: none;
      }
    `,
  ],
})
export class NgxOtpInputsComponent implements OnInit {
  @Input() length = 6;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  otpIndexes: number[] = [];
  otpValues: string[] = [];
  @Input() inputWidth = '40px';
  @Input() inputHeight = '48px';
  @Input() borderColor = '#ccc';

  @Output() completed = new EventEmitter<string>();

  ngOnInit() {
    this.otpValues = Array(this.length).fill('');
    this.otpIndexes = Array.from({ length: this.length }, (_, i) => i);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let val = input.value;

    console.log(`[${index}] Raw input value:`, val);

    val = val.replace(/\D/g, '');
    const singleChar = val.charAt(0) || '';

    console.log(`[${index}] Cleaned value:`, singleChar);

    this.otpValues[index] = singleChar;

    input.value = singleChar;

    console.log(`[${index}] otpValues now:`, this.otpValues.join(''));

    if (singleChar && index < this.length - 1) {
      const next = input.nextElementSibling as HTMLInputElement;
      next?.focus();
    }

    this.checkCompletion();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value) {
        this.otpValues[index] = '';
      } else if (index > 0) {
        this.otpValues[index - 1] = '';
        const prev = input.previousElementSibling as HTMLInputElement;
        setTimeout(() => prev?.focus(), 0);
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const sanitized = pasted.replace(/\D/g, '').slice(0, this.length);

    for (let i = 0; i < sanitized.length; i++) {
      this.otpValues[i] = sanitized[i];
    }

    setTimeout(() => {
      const inputs = Array.from(
        document.querySelectorAll('.otp-input')
      ) as HTMLInputElement[];
      const nextInput = inputs[sanitized.length] || inputs[this.length - 1];
      nextInput?.focus();
    });

    this.checkCompletion();
  }

  private checkCompletion() {
    console.log('Checking if OTP is complete:', this.otpValues);

    if (this.otpValues.every((val) => val !== '')) {
      console.log('OTP completed! Emitting value:', this.otpValues.join(''));
      this.completed.emit(this.otpValues.join(''));
    }
  }

  onOtpCompleted(value: string) {
    console.log('OTP value is:', value);
  }
}
