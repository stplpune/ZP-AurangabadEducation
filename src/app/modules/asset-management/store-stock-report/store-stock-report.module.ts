import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreStockReportRoutingModule } from './store-stock-report-routing.module';
import { StoreStockReportComponent } from './store-stock-report.component';


@NgModule({
  declarations: [
    StoreStockReportComponent
  ],
  imports: [
    CommonModule,
    StoreStockReportRoutingModule
  ]
})
export class StoreStockReportModule { }
