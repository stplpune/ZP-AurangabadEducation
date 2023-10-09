import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessmentCrateriaComponent } from './add-assessment-crateria.component';

describe('AddAssessmentCrateriaComponent', () => {
  let component: AddAssessmentCrateriaComponent;
  let fixture: ComponentFixture<AddAssessmentCrateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssessmentCrateriaComponent]
    });
    fixture = TestBed.createComponent(AddAssessmentCrateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
