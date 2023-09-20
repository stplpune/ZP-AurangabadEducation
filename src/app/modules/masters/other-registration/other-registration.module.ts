import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherRegistrationRoutingModule } from './other-registration-routing.module';
import { OtherRegistrationComponent } from './other-registration.component';


@NgModule({
  declarations: [
    OtherRegistrationComponent
  ],
  imports: [
    CommonModule,
    OtherRegistrationRoutingModule
  ]
})
export class OtherRegistrationModule { }
