import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocProfileEditComponent } from './doc-profile-edit.component';

describe('DocProfileEditComponent', () => {
  let component: DocProfileEditComponent;
  let fixture: ComponentFixture<DocProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocProfileEditComponent]
    });
    fixture = TestBed.createComponent(DocProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
