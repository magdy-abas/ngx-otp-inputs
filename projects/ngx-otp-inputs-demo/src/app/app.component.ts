import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxOtpInputsComponent } from '../../../ngx-otp-inputs/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxOtpInputsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-otp-inputs-demo';
  handleOtp(value: string) {
    console.log('OTP value is:', value);
  }
}
