import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuestionRoutingModule } from './add-question-routing.module';
import { AddQuestionComponent } from './add-question.component';
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
import { AddQuestionListComponent } from './add-question-list/add-question-list.component';


@NgModule({
  declarations: [
    AddQuestionComponent,
    AddQuestionListComponent
  ],
  imports: [
    CommonModule,
    AddQuestionRoutingModule,
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
    MatRadioModule
  ]
})
export class AddQuestionModule { }
