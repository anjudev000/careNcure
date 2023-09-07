import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorForgetPasswordComponent } from './doctor-forget-password.component';

describe('DoctorForgetPasswordComponent', () => {
  let component: DoctorForgetPasswordComponent;
  let fixture: ComponentFixture<DoctorForgetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorForgetPasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
