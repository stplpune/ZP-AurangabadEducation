import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStandardSubjectRoutingModule } from './add-standard-subject-routing.module';
import { AddStandardSubjectComponent } from './add-standard-subject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AddStandardSubjectComponent
  ],
  imports: [
    CommonModule,
    AddStandardSubjectRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTooltipModule,
    TranslateModule,
    MatTableModule
  ]
})
export class AddStandardSubjectModule { }
