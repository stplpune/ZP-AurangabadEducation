import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProfileRoutingModule } from './teacher-profile-routing.module';
import { TeacherProfileComponent } from './teacher-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TeacherProfileComponent
  ],
  imports: [
    CommonModule,
    TeacherProfileRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TeacherProfileModule { }
