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
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AddDocumentComponent } from './add-document/add-document.component';


@NgModule({
  declarations: [
    SchoolProfileComponent,
    AddDocumentComponent,
  ],
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule
  ]
})
export class SchoolProfileModule { }
