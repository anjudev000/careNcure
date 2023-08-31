import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOtpVerifyComponent } from './doctor-otp-verify.component';

describe('DoctorOtpVerifyComponent', () => {
  let component: DoctorOtpVerifyComponent;
  let fixture: ComponentFixture<DoctorOtpVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorOtpVerifyComponent]
    });
    fixture = TestBed.createComponent(DoctorOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
