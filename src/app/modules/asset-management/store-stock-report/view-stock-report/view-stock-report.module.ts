import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewStockReportRoutingModule } from './view-stock-report-routing.module';
import { ViewStockReportComponent } from './view-stock-report.component';


@NgModule({
  declarations: [
    ViewStockReportComponent
  ],
  imports: [
    CommonModule,
    ViewStockReportRoutingModule
  ]
})
export class ViewStockReportModule { }
