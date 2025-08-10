import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { NgxOtpInputsComponent } from 'ngx-otp-inputs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgxOtpInputsComponent, NgIf, JsonPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly length = 6;

  otpForm = new FormGroup({
    otp: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get otpControl() {
    return this.otpForm.get('otp')!;
  }

  onCompleted = (value: string) => {
    console.log('✅ OTP completed:', value);
  };

  onChanged = (value: string) => {
    console.log('🌀 OTP changed:', value);
  };

  submit() {
    if (this.otpForm.valid) {
      console.log('🎉 Form submitted:', this.otpForm.value);
    } else {
      console.warn('❌ Invalid OTP - Not Submitted');
      this.otpControl.markAsTouched();
    }
  }

  fillDemo() {
    const code = Array.from({ length: this.length }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
    this.otpForm.patchValue({ otp: code });
    console.log('🧪 fillDemo ->', code);
  }

  reset() {
    this.otpForm.reset({ otp: '' });
  }
}
