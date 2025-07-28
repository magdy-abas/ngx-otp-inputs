import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-ngx-otp-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="otp-wrapper">
      <input
        *ngFor="let value of otpValues; let i = index"
        [(ngModel)]="otpValues[i]"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        maxlength="1"
        type="text"
        class="otp-input"
        [attr.aria-label]="'Digit ' + (i + 1)"
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
        width: 40px;
        height: 48px;
        font-size: 20px;
        text-align: center;
        border: 1px solid #ccc;
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
  @Output() completed = new EventEmitter<string>();

  otpValues: string[] = [];

  ngOnInit() {
    this.otpValues = Array(this.length).fill('');
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }

    if (input.value && index < this.length - 1) {
      const next = input.nextElementSibling as HTMLInputElement;
      next?.focus();
    }

    this.checkCompletion();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prev = input.previousElementSibling as HTMLInputElement;
      prev?.focus();
    }
  }

  private checkCompletion() {
    if (this.otpValues.every((val) => val !== '')) {
      this.completed.emit(this.otpValues.join(''));
    }
  }
}
