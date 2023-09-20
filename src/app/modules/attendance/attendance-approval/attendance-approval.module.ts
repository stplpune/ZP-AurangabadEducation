import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceApprovalRoutingModule } from './attendance-approval-routing.module';
import { AttendanceApprovalComponent } from './attendance-approval.component';


@NgModule({
  declarations: [
    AttendanceApprovalComponent
  ],
  imports: [
    CommonModule,
    AttendanceApprovalRoutingModule
  ]
})
export class AttendanceApprovalModule { }
