import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWalletComponent } from './doctor-wallet.component';

describe('DoctorWalletComponent', () => {
  let component: DoctorWalletComponent;
  let fixture: ComponentFixture<DoctorWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorWalletComponent]
    });
    fixture = TestBed.createComponent(DoctorWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
