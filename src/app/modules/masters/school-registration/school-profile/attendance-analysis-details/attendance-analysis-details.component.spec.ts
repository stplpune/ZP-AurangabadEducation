import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAnalysisDetailsComponent } from './attendance-analysis-details.component';

describe('AttendanceAnalysisDetailsComponent', () => {
  let component: AttendanceAnalysisDetailsComponent;
  let fixture: ComponentFixture<AttendanceAnalysisDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceAnalysisDetailsComponent]
    });
    fixture = TestBed.createComponent(AttendanceAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
