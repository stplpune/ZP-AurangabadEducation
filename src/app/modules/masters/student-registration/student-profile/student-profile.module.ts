import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileRoutingModule } from './student-profile-routing.module';
import { StudentProfileComponent } from './student-profile.component';


@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentProfileRoutingModule
  ]
})
export class StudentProfileModule { }
