import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';
import { SecureComponent } from './layout/secure/secure.component';
import { AuthGuard } from './core/guards/auth.guard';
import { checkLoggedInGuard } from './core/guards/check-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: PublicComponent,  loadChildren: () => import('./layout/public/public.module').then(m => m.PublicModule) },
  { path: '', component: SecureComponent, loadChildren: () => import('./layout/secure/secure.module').then(m => m.SecureModule) },

  { path: 'home', loadChildren: () => import('../../src/app/before-login/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('../../src/app/before-login/login/login.module').then(m => m.LoginModule), data: { breadcrumb: [{ title: 'Login', active: true }] } },
  { path: 'forgot-password', loadChildren: () => import('../../src/app/before-login/forget-password/forget-password.module').then(m => m.ForgetPasswordModule), data: { breadcrumb: [{ title: 'ForgotPassword', active: true }] } },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
