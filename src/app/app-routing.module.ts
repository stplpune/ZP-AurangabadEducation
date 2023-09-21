import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';
import { SecureComponent } from './layout/secure/secure.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: PublicComponent, loadChildren: () => import('./layout/public/public.module').then(m => m.PublicModule) },
  { path: '', component: SecureComponent, loadChildren: () => import('./layout/secure/secure.module').then(m => m.SecureModule) },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
