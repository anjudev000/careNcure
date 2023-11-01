import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDocComponent } from './pending-doc.component';

describe('PendingDocComponent', () => {
  let component: PendingDocComponent;
  let fixture: ComponentFixture<PendingDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDocComponent]
    });
    fixture = TestBed.createComponent(PendingDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
