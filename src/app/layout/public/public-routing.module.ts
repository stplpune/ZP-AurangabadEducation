import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: PublicComponent },
  { path: 'home', loadChildren: () => import('../../before-login/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('../../before-login/login/login.module').then(m => m.LoginModule), data: { breadcrumb: [{ title: 'Login', active: true }] } },
  { path: 'forget-password', loadChildren: () => import('../../before-login/forget-password/forget-password.module').then(m => m.ForgetPasswordModule),  data: { breadcrumb: [{ title: 'Login', active: true }] }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
