import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Teacher : any;
  TeacherName: any;
  Date: any;
  CheckIn: any;
  CheckOut: any;
  ApprovalStatus: any;
  Remark: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Teacher : '1234', TeacherName: 'Riya Sharma', Date: '21-03-2022',CheckIn:'9:00',CheckOut:'5:22',ApprovalStatus:'Pending',Remark:'Nice',Action:'Yes'},
  {srno: 2, Teacher : '2345', TeacherName: 'Tanavi Mishra', Date: '03-10-2023',CheckIn:'9:30',CheckOut:'7:00',ApprovalStatus:'Rejected',Remark:'yes',Action:'Yes'},
  {srno: 3, Teacher : '3456', TeacherName: 'Ronit Sighna', Date: '23-09-2023',CheckIn:'10:00',CheckOut:'6:00',ApprovalStatus:'Pending',Remark:'test',Action:'Yes'},
];
@Component({
  selector: 'app-attendance-approval',
  templateUrl: './attendance-approval.component.html',
  styleUrls: ['./attendance-approval.component.scss']
})
export class AttendanceApprovalComponent {
  displayedColumns: string[] = ['srno', 'Teacher ', 'TeacherName', 'Date','CheckIn','CheckOut','ApprovalStatus','Remark','Action'];
  dataSource = ELEMENT_DATA;
}
