import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerReportComponent } from './officer-report.component';

describe('OfficerReportComponent', () => {
  let component: OfficerReportComponent;
  let fixture: ComponentFixture<OfficerReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficerReportComponent]
    });
    fixture = TestBed.createComponent(OfficerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
