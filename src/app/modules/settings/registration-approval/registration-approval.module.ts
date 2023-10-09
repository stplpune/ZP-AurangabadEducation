import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationApprovalRoutingModule } from './registration-approval-routing.module';
import { RegistrationApprovalComponent } from './registration-approval.component';


@NgModule({
  declarations: [
    RegistrationApprovalComponent
  ],
  imports: [
    CommonModule,
    RegistrationApprovalRoutingModule
  ]
})
export class RegistrationApprovalModule { }
