import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCrateriaComponent } from './assessment-crateria.component';

describe('AssessmentCrateriaComponent', () => {
  let component: AssessmentCrateriaComponent;
  let fixture: ComponentFixture<AssessmentCrateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentCrateriaComponent]
    });
    fixture = TestBed.createComponent(AssessmentCrateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
