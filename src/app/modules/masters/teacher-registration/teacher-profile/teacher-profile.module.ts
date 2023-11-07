import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProfileRoutingModule } from './teacher-profile-routing.module';
import { TeacherProfileComponent } from './teacher-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TeacherProfileComponent
  ],
  imports: [
    CommonModule,
    TeacherProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule

  ]
})
export class TeacherProfileModule { }
