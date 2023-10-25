import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RegistrationApprovalRoutingModule } from './registration-approval-routing.module';
import { RegistrationApprovalComponent } from './registration-approval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApprovedRegistrationComponent } from './approved-registration/approved-registration.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RegistrationApprovalComponent,
    ApprovedRegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationApprovalRoutingModule,
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
    TranslateModule,
    MatButtonToggleModule
  ]
})
export class RegistrationApprovalModule { }
