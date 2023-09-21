import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentCrateriaRoutingModule } from './assessment-crateria-routing.module';
import { AssessmentCrateriaComponent } from './assessment-crateria.component';


@NgModule({
  declarations: [
    AssessmentCrateriaComponent
  ],
  imports: [
    CommonModule,
    AssessmentCrateriaRoutingModule
  ]
})
export class AssessmentCrateriaModule { }
