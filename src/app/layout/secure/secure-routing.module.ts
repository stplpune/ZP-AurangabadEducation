import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';

const routes: Routes = [
  { path: '', component: SecureComponent },
  { path: 'dashboard', loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'designation-master', loadChildren: () => import('../../modules/masters/designation-master/designation-master.module').then(m => m.DesignationMasterModule) },
  { path: 'school-registration', loadChildren: () => import('../../modules/masters/school-registration/school-registration.module').then(m => m.SchoolRegistrationModule) },
  { path: 'teacher-registration', loadChildren: () => import('../../modules/masters/teacher-registration/teacher-registration.module').then(m => m.TeacherRegistrationModule) },
  { path: 'student-registration', loadChildren: () => import('../../modules/masters/student-registration/student-registration.module').then(m => m.StudentRegistrationModule) },
  { path: 'office-user-registration', loadChildren: () => import('../../modules/masters/office-user-registration/office-user-registration.module').then(m => m.OfficeUserRegistrationModule) },
  { path: 'other-registration', loadChildren: () => import('../../modules/masters/other-registration/other-registration.module').then(m => m.OtherRegistrationModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
