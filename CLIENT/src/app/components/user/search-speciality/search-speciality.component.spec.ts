import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpecialityComponent } from './search-speciality.component';

describe('SearchSpecialityComponent', () => {
  let component: SearchSpecialityComponent;
  let fixture: ComponentFixture<SearchSpecialityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSpecialityComponent]
    });
    fixture = TestBed.createComponent(SearchSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
