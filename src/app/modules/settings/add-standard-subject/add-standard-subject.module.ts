import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStandardSubjectRoutingModule } from './add-standard-subject-routing.module';
import { AddStandardSubjectComponent } from './add-standard-subject.component';


@NgModule({
  declarations: [
    AddStandardSubjectComponent
  ],
  imports: [
    CommonModule,
    AddStandardSubjectRoutingModule
  ]
})
export class AddStandardSubjectModule { }
