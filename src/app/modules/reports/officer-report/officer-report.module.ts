import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerReportRoutingModule } from './officer-report-routing.module';
import { OfficerReportComponent } from './officer-report.component';


@NgModule({
  declarations: [
    OfficerReportComponent
  ],
  imports: [
    CommonModule,
    OfficerReportRoutingModule
  ]
})
export class OfficerReportModule { }
