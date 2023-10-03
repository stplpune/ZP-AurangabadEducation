import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockReportComponent } from './view-stock-report.component';

describe('ViewStockReportComponent', () => {
  let component: ViewStockReportComponent;
  let fixture: ComponentFixture<ViewStockReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStockReportComponent]
    });
    fixture = TestBed.createComponent(ViewStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
