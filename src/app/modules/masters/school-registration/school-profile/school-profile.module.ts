import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';
import { SchoolProfileComponent } from './school-profile.component';


@NgModule({
  declarations: [
    SchoolProfileComponent
  ],
  imports: [
    CommonModule,
    SchoolProfileRoutingModule
  ]
})
export class SchoolProfileModule { }
