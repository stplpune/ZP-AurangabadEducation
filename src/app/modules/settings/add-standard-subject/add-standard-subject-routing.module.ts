import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStandardSubjectComponent } from './add-standard-subject.component';

const routes: Routes = [{ path: '', component: AddStandardSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStandardSubjectRoutingModule { }
