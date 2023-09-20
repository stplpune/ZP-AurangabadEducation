import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRegistrationRoutingModule } from './teacher-registration-routing.module';
import { TeacherRegistrationComponent } from './teacher-registration.component';


@NgModule({
  declarations: [
    TeacherRegistrationComponent
  ],
  imports: [
    CommonModule,
    TeacherRegistrationRoutingModule
  ]
})
export class TeacherRegistrationModule { }
