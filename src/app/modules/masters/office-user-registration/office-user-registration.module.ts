import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeUserRegistrationRoutingModule } from './office-user-registration-routing.module';
import { OfficeUserRegistrationComponent } from './office-user-registration.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalTableComponent } from 'src/app/shared/global-table/global-table.component';


@NgModule({
  declarations: [
    OfficeUserRegistrationComponent,

  ],
  imports: [
    CommonModule,
    OfficeUserRegistrationRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatRadioModule,
    TranslateModule,
    GlobalTableComponent
  ]
})
export class OfficeUserRegistrationModule { }
