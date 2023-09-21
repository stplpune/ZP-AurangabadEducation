import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentCrateriaComponent } from './assessment-crateria.component';

const routes: Routes = [{ path: '', component: AssessmentCrateriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentCrateriaRoutingModule { }
