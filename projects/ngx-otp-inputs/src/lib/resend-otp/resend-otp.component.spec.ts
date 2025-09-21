import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxResendOtpComponent } from './resend-otp.component';

describe('ResendOtpComponent', () => {
  let component: NgxResendOtpComponent;
  let fixture: ComponentFixture<NgxResendOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxResendOtpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxResendOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
