import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRegistrationRoutingModule } from './event-registration-routing.module';
import { EventRegistrationComponent } from './event-registration.component';
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
import { TranslateModule } from '@ngx-translate/core';
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';
import { GlobalTableComponent } from 'src/app/shared/global-table/global-table.component';
import { AddEventComponent } from './add-event/add-event.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    EventRegistrationComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    EventRegistrationRoutingModule,
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
    GlobalTableComponent,
    TranslateModule,
    GlobalDialogComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EventRegistrationModule { }
