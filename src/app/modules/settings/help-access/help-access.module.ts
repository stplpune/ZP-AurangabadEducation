import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpAccessRoutingModule } from './help-access-routing.module';
import { HelpAccessComponent } from './help-access.component';


@NgModule({
  declarations: [
    HelpAccessComponent
  ],
  imports: [
    CommonModule,
    HelpAccessRoutingModule
  ]
})
export class HelpAccessModule { }
