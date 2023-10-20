import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';
import { SchoolProfileComponent } from './school-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    SchoolProfileComponent
  ],
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class SchoolProfileModule { }
