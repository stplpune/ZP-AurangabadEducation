import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationApprovalComponent } from './registration-approval.component';

const routes: Routes = [{ path: '', component: RegistrationApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationApprovalRoutingModule { }
