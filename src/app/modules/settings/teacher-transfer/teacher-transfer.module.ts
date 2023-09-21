import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherTransferRoutingModule } from './teacher-transfer-routing.module';
import { TeacherTransferComponent } from './teacher-transfer.component';


@NgModule({
  declarations: [
    TeacherTransferComponent
  ],
  imports: [
    CommonModule,
    TeacherTransferRoutingModule
  ]
})
export class TeacherTransferModule { }
