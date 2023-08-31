import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOtpVerifyComponent } from './user-otp-verify.component';

describe('UserOtpVerifyComponent', () => {
  let component: UserOtpVerifyComponent;
  let fixture: ComponentFixture<UserOtpVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOtpVerifyComponent]
    });
    fixture = TestBed.createComponent(UserOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
