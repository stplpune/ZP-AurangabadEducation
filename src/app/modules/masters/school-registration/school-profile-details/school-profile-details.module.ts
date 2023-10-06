import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileDetailsRoutingModule } from './school-profile-details-routing.module';
import { SchoolProfileDetailsComponent } from './school-profile-details.component';


@NgModule({
  declarations: [
    SchoolProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    SchoolProfileDetailsRoutingModule
  ]
})
export class SchoolProfileDetailsModule { }
