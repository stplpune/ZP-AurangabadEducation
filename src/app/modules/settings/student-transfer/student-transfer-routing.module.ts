import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTransferComponent } from './student-transfer.component';

const routes: Routes = [{ path: '', component: StudentTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentTransferRoutingModule { }
