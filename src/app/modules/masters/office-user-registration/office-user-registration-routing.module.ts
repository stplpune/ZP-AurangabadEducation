import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeUserRegistrationComponent } from './office-user-registration.component';

const routes: Routes = [{ path: '', component: OfficeUserRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeUserRegistrationRoutingModule { }
