import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxOtpInputsComponent } from './ngx-otp-inputs.component';
import { By } from '@angular/platform-browser';

describe('NgxOtpInputsComponent', () => {
  let component: NgxOtpInputsComponent;
  let fixture: ComponentFixture<NgxOtpInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxOtpInputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxOtpInputsComponent);
    component = fixture.componentInstance;
    component.length = 4;
    fixture.detectChanges();
  });

  it('should render correct number of inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(4);
  });

  it('should emit completed when all inputs are filled', () => {
    spyOn(component.completed, 'emit');

    component.otpValues = ['1', '2', '3', '4'];
    component.onInput({ target: { value: '4' } } as any, 3);

    expect(component.completed.emit).toHaveBeenCalledWith('1234');
  });

  it('should emit changed on input', () => {
    spyOn(component.changed, 'emit');

    component.onInput({ target: { value: '5' } } as any, 0);

    expect(component.changed.emit).toHaveBeenCalledWith('5');
  });

  it('should apply password type when maskInput is true', () => {
    component.maskInput = true;
    fixture.detectChanges();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs[0].attributes['type']).toBe('password');
  });
});
