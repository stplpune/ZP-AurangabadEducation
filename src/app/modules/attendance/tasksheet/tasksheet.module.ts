import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksheetRoutingModule } from './tasksheet-routing.module';
import { TasksheetComponent } from './tasksheet.component';


@NgModule({
  declarations: [
    TasksheetComponent
  ],
  imports: [
    CommonModule,
    TasksheetRoutingModule
  ]
})
export class TasksheetModule { }
