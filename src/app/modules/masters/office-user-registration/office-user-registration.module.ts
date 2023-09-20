import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeUserRegistrationRoutingModule } from './office-user-registration-routing.module';
import { OfficeUserRegistrationComponent } from './office-user-registration.component';


@NgModule({
  declarations: [
    OfficeUserRegistrationComponent
  ],
  imports: [
    CommonModule,
    OfficeUserRegistrationRoutingModule
  ]
})
export class OfficeUserRegistrationModule { }
