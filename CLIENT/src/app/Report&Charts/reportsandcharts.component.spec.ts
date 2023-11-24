import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsandchartsComponent } from './reportsandcharts.component';

describe('ReportsandchartsComponent', () => {
  let component: ReportsandchartsComponent;
  let fixture: ComponentFixture<ReportsandchartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsandchartsComponent]
    });
    fixture = TestBed.createComponent(ReportsandchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
