import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { NgxOtpInputsComponent } from '../../../ngx-otp-inputs/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgxOtpInputsComponent, NgIf, JsonPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get otpControl() {
    return this.otpForm.get('otp')!;
  }

  handleOtp(value: string) {
    console.log('✅ OTP completed (no submit):', value);
    // هنا بس بيكمل القيمة لكن مش بيبعت
    this.otpControl.setValue(value);
  }

  handleChange(value: string) {
    console.log('🌀 OTP changed:', value);
    this.otpControl.setValue(value, { emitEvent: false });
  }

  submit() {
    if (this.otpForm.valid) {
      console.log('🎉 Form submitted manually:', this.otpForm.value);
    } else {
      console.warn('❌ Invalid OTP - Not Submitted');
    }
  }
}
