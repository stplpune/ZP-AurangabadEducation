import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficerReportComponent } from './officer-report.component';

const routes: Routes = [{ path: '', component: OfficerReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerReportRoutingModule { }
