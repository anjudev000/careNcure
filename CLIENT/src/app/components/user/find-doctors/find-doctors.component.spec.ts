import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDoctorsComponent } from './find-doctors.component';

describe('FindDoctorsComponent', () => {
  let component: FindDoctorsComponent;
  let fixture: ComponentFixture<FindDoctorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindDoctorsComponent]
    });
    fixture = TestBed.createComponent(FindDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
