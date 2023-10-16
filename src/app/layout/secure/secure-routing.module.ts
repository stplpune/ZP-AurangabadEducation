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
  { path: 'category', loadChildren: () => import('../../modules/asset-management/category/category.module').then(m => m.CategoryModule) },
  { path: 'sub-category', loadChildren: () => import('../../modules/asset-management/sub-category/sub-category.module').then(m => m.SubCategoryModule) },
  { path: 'item', loadChildren: () => import('../../modules/asset-management/item/item.module').then(m => m.ItemModule) },
  { path: 'inward-item', loadChildren: () => import('../../modules/asset-management/inward-item/inward-item.module').then(m => m.InwardItemModule) },
  { path: 'outward-item', loadChildren: () => import('../../modules/asset-management/outward-item/outward-item.module').then(m => m.OutwardItemModule) },
  { path: 'store-stock-report', loadChildren: () => import('../../modules/asset-management/store-stock-report/store-stock-report.module').then(m => m.StoreStockReportModule) },
  { path: 'tasksheet', loadChildren: () => import('../../modules/attendance/tasksheet/tasksheet.module').then(m => m.TasksheetModule) },
  { path: 'holiday-master', loadChildren: () => import('../../modules/attendance/holiday-master/holiday-master.module').then(m => m.HolidayMasterModule) },
  { path: 'attendance-report', loadChildren: () => import('../../modules/attendance/attendance-report/attendance-report.module').then(m => m.AttendanceReportModule) },
  { path: 'attendance-approval', loadChildren: () => import('../../modules/attendance/attendance-approval/attendance-approval.module').then(m => m.AttendanceApprovalModule) },
  { path: 'teacher-transfer', loadChildren: () => import('../../modules/settings/teacher-transfer/teacher-transfer.module').then(m => m.TeacherTransferModule) },
  { path: 'student-transfer', loadChildren: () => import('../../modules/settings/student-transfer/student-transfer.module').then(m => m.StudentTransferModule) },
  { path: 'assessment-crateria', loadChildren: () => import('../../modules/settings/assessment-crateria/assessment-crateria.module').then(m => m.AssessmentCrateriaModule) },
  { path: 'add-student', loadChildren: () => import('../../modules/masters/student-registration/add-student/add-student.module').then(m => m.AddStudentModule) },
  { path: 'view-stock-report', loadChildren: () => import('../../modules/asset-management/store-stock-report/view-stock-report/view-stock-report.module').then(m => m.ViewStockReportModule) },
  { path: 'my-profile', loadChildren: () => import('../../modules/profile/my-profile/my-profile.module').then(m => m.MyProfileModule) },
  { path: 'school-profile-details', loadChildren: () => import('../../modules/masters/school-registration/school-profile-details/school-profile-details.module').then(m => m.SchoolProfileDetailsModule) },
  { path: 'add-standard-subject', loadChildren: () => import('../../modules/settings/add-standard-subject/add-standard-subject.module').then(m => m.AddStandardSubjectModule) },
  { path: 'add-question', loadChildren: () => import('../../modules/settings/assessment-crateria/add-question/add-question.module').then(m => m.AddQuestionModule) },
  { path: 'registration-approval', loadChildren: () => import('../../modules/settings/registration-approval/registration-approval.module').then(m => m.RegistrationApprovalModule) },
  { path: 'teacher-profile', loadChildren: () => import('../../modules/masters/teacher-registration/teacher-profile/teacher-profile.module').then(m => m.TeacherProfileModule) },
  { path: 'student-profile', loadChildren: () => import('../../modules/masters/student-registration/student-profile/student-profile.module').then(m => m.StudentProfileModule) },
  { path: 'school-profile', loadChildren: () => import('../../modules/masters/school-registration/school-profile/school-profile.module').then(m => m.SchoolProfileModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
