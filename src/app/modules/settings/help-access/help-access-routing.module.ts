import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpAccessComponent } from './help-access.component';

const routes: Routes = [{ path: '', component: HelpAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpAccessRoutingModule { }
