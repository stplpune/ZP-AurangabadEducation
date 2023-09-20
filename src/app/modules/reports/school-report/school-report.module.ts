import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolReportRoutingModule } from './school-report-routing.module';
import { SchoolReportComponent } from './school-report.component';


@NgModule({
  declarations: [
    SchoolReportComponent
  ],
  imports: [
    CommonModule,
    SchoolReportRoutingModule
  ]
})
export class SchoolReportModule { }
