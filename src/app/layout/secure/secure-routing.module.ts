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
  { path: 'student-report', loadChildren: () => import('../../modules/reports/student-report/student-report.module').then(m => m.StudentReportModule) },
  { path: 'officer-report', loadChildren: () => import('../../modules/reports/officer-report/officer-report.module').then(m => m.OfficerReportModule) },
  { path: 'school-report', loadChildren: () => import('../../modules/reports/school-report/school-report.module').then(m => m.SchoolReportModule) },
  { path: 'page-right-access', loadChildren: () => import('../../modules/settings/page-right-access/page-right-access.module').then(m => m.PageRightAccessModule) },
  { path: 'help-access', loadChildren: () => import('../../modules/settings/help-access/help-access.module').then(m => m.HelpAccessModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
