import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';
import { SchoolProfileComponent } from './school-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AttendanceAnalysisDetailsComponent } from './attendance-analysis-details/attendance-analysis-details.component';


@NgModule({
  declarations: [
    SchoolProfileComponent,
    AttendanceAnalysisDetailsComponent
  ],
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class SchoolProfileModule { }
