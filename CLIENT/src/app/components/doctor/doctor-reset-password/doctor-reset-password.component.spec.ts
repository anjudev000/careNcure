import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorResetPasswordComponent } from './doctor-reset-password.component';

describe('DoctorResetPasswordComponent', () => {
  let component: DoctorResetPasswordComponent;
  let fixture: ComponentFixture<DoctorResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorResetPasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
