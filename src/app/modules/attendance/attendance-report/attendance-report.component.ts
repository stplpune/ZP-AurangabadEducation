import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Teacher : any;
  TeacherName: any;
  MobileNo: any;
  PresentDays: any;
  AbsentDays: any;
  TotalHoliday: any;
  TotalWeek: any;
  Manual: any;
  Submitted: any;
  ManualApproved: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Teacher : 'drone', TeacherName: 'Camera', MobileNo: 'fan',PresentDays:'100',AbsentDays:'13-09-2023',TotalHoliday:'10',TotalWeek:'javed',Manual:'Yes',Submitted:'-',ManualApproved: '-'},
  {srno: 2, Teacher : 'Books', TeacherName: 'history gh', MobileNo: 'Thailand Saturday',PresentDays:'100',AbsentDays:'03-09-2023',TotalHoliday:'10',TotalWeek:'javed',Manual:'Yes',Submitted:'-',ManualApproved: '-'},
  {srno: 3, Teacher : 'Irons', TeacherName: 'irons table', MobileNo: 'drinkf',PresentDays:'100',AbsentDays:'23-09-2023',TotalHoliday:'10',TotalWeek:'javed',Manual:'Yes',Submitted:'-',ManualApproved: '-'},
];
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent {
  displayedColumns: string[] = ['srno', 'Teacher ', 'TeacherName', 'MobileNo','PresentDays','AbsentDays','TotalHoliday','TotalWeek','Manual','Submitted','ManualApproved'];
  dataSource = ELEMENT_DATA;
}
