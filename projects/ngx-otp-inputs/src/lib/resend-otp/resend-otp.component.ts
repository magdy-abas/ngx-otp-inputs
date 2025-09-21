import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ngx-resend-otp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [ngClass]="buttonClass"
      [disabled]="isCounting || disabled"
      [attr.aria-disabled]="isCounting || disabled ? 'true' : 'false'"
      (click)="onClick()"
      [title]="isCounting ? countdownTextPrefix + ' ' + counter + 's' : text"
    >
      <ng-container *ngIf="isCounting; else ready">
        {{ countdownTextPrefix }} {{ counter }}s
        <span class="sr-only" aria-live="polite">
          {{ counter }} seconds remaining
        </span>
      </ng-container>
      <ng-template #ready>{{ text }}</ng-template>
    </button>
  `,
  styles: [
    `
      :host {
        --ngx-resend-font-size: 14px;
        --ngx-resend-font-weight: 500;
        --ngx-resend-padding: 0.25rem 0.5rem;
        --ngx-resend-border-radius: 4px;
        --ngx-resend-color: #1976d2;
        --ngx-resend-hover-color: #1256a0;
        --ngx-resend-disabled-color: #9e9e9e;
      }

      .ngx-resend-otp-btn {
        background: transparent;
        border: none;
        font: inherit;
        font-size: var(--ngx-resend-font-size);
        font-weight: var(--ngx-resend-font-weight);
        padding: var(--ngx-resend-padding);
        border-radius: var(--ngx-resend-border-radius);
        color: var(--ngx-resend-color);
        cursor: pointer;
        transition: color 0.2s ease-in-out;
      }

      .ngx-resend-otp-btn:hover:not(:disabled) {
        color: var(--ngx-resend-hover-color);
      }

      .ngx-resend-otp-btn[disabled] {
        color: var(--ngx-resend-disabled-color);
        cursor: not-allowed;
      }

      .sr-only {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `,
  ],
})
export class NgxResendOtpComponent implements OnInit, OnDestroy {
  @Input() duration = 30;
  @Input() text = 'Resend OTP';
  @Input() countdownTextPrefix = 'Resend OTP in';
  @Input() autoStart = true;
  @Input() disabled = false;
  @Input() buttonClass = 'ngx-resend-otp-btn';

  @Output() resend = new EventEmitter<void>();
  @Output() tick = new EventEmitter<number>();
  @Output() finished = new EventEmitter<void>();

  counter = 0;
  isCounting = false;
  private timerId: any;

  ngOnInit() {
    if (this.autoStart) this.start();
  }

  ngOnDestroy() {
    this.clear();
  }

  onClick() {
    this.resend.emit();
    this.start();
  }

  start(): void {
    this.clear();
    this.isCounting = true;
    this.counter = this.duration;
    this.tick.emit(this.counter);
    this.timerId = setInterval(() => {
      this.counter--;
      this.tick.emit(this.counter);
      if (this.counter <= 0) {
        this.clear();
        this.finished.emit();
      }
    }, 1000);
  }

  stop(): void {
    this.clear();
  }

  reset(): void {
    this.stop();
    this.start();
  }

  private clear() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isCounting = false;
  }
}
