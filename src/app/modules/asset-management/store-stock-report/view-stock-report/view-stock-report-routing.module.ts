import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStockReportComponent } from './view-stock-report.component';

const routes: Routes = [{ path: '', component: ViewStockReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewStockReportRoutingModule { }
