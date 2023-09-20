import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreStockReportComponent } from './store-stock-report.component';

const routes: Routes = [{ path: '', component: StoreStockReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreStockReportRoutingModule { }
