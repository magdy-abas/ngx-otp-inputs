import { TestBed } from '@angular/core/testing';

import { NgxOtpInputsService } from './ngx-otp-inputs.service';

describe('NgxOtpInputsService', () => {
  let service: NgxOtpInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOtpInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
