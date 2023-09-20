import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentReportRoutingModule } from './student-report-routing.module';
import { StudentReportComponent } from './student-report.component';


@NgModule({
  declarations: [
    StudentReportComponent
  ],
  imports: [
    CommonModule,
    StudentReportRoutingModule
  ]
})
export class StudentReportModule { }
