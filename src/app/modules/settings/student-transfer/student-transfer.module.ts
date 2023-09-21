import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentTransferRoutingModule } from './student-transfer-routing.module';
import { StudentTransferComponent } from './student-transfer.component';


@NgModule({
  declarations: [
    StudentTransferComponent
  ],
  imports: [
    CommonModule,
    StudentTransferRoutingModule
  ]
})
export class StudentTransferModule { }
