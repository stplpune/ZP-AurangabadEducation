import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStockReportComponent } from './store-stock-report.component';

describe('StoreStockReportComponent', () => {
  let component: StoreStockReportComponent;
  let fixture: ComponentFixture<StoreStockReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreStockReportComponent]
    });
    fixture = TestBed.createComponent(StoreStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
