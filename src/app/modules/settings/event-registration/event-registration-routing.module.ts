import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRegistrationComponent } from './event-registration.component';

const routes: Routes = [{ path: '', component: EventRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRegistrationRoutingModule { }
