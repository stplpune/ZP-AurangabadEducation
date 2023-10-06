import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolProfileDetailsComponent } from './school-profile-details.component';

const routes: Routes = [{ path: '', component: SchoolProfileDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolProfileDetailsRoutingModule { }
