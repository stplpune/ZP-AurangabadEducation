import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherTransferComponent } from './teacher-transfer.component';

const routes: Routes = [{ path: '', component: TeacherTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherTransferRoutingModule { }
