import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InwardItemRoutingModule } from './inward-item-routing.module';
import { InwardItemComponent } from './inward-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddInwardItemsComponent } from './add-inward-items/add-inward-items.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    InwardItemComponent,
    AddInwardItemsComponent
  ],
  imports: [
    CommonModule,
    InwardItemRoutingModule,
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
    MatDatepickerModule,
    TranslateModule,
    MatNativeDateModule
  ]
})
export class InwardItemModule { }
