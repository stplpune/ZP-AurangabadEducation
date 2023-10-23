import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentCrateriaRoutingModule } from './assessment-crateria-routing.module';
import { AssessmentCrateriaComponent } from './assessment-crateria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddAssessmentCrateriaComponent } from './add-assessment-crateria/add-assessment-crateria.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AssessmentCrateriaComponent,
    AddAssessmentCrateriaComponent
  ],
  imports: [
    CommonModule,
    AssessmentCrateriaRoutingModule,
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
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule
  ]
})
export class AssessmentCrateriaModule { }
