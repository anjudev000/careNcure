import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgetPassComponent } from './user-forget-pass.component';

describe('UserForgetPassComponent', () => {
  let component: UserForgetPassComponent;
  let fixture: ComponentFixture<UserForgetPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserForgetPassComponent]
    });
    fixture = TestBed.createComponent(UserForgetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
