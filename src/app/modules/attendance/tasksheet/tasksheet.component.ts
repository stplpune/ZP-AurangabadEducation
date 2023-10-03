import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Day: any;
  CheckIn: any;
  CheckOut: any;
  Attendance: any;
  Task: any;
  ApprovalRemark: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Day: '01 Oct (Sunday)', CheckIn: '-', CheckOut: '-',Attendance:'Week Off',Task:'-',ApprovalRemark:'-', Action:''},
  {srno: 2, Day: '02 Oct (Monday)', CheckIn: '-', CheckOut: '-',Attendance:'Holiday (gandhi jayanti)',Task:'-',ApprovalRemark:'-', Action:''},
  {srno: 3, Day: '03 Oct (Tuesday)', CheckIn: '-', CheckOut: '-',Attendance:'100',Task:'-',ApprovalRemark:'-', Action:''},
];
@Component({
  selector: 'app-tasksheet',
  templateUrl: './tasksheet.component.html',
  styleUrls: ['./tasksheet.component.scss']
})
export class TasksheetComponent {
  displayedColumns: string[] = ['srno', 'Day', 'CheckIn', 'CheckOut','Attendance','Task','ApprovalRemark','Action'];
  dataSource = ELEMENT_DATA;
}
