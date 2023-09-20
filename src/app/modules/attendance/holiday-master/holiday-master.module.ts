import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayMasterRoutingModule } from './holiday-master-routing.module';
import { HolidayMasterComponent } from './holiday-master.component';


@NgModule({
  declarations: [
    HolidayMasterComponent
  ],
  imports: [
    CommonModule,
    HolidayMasterRoutingModule
  ]
})
export class HolidayMasterModule { }
