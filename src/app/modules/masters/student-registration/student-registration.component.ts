import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  srno: any;
  Student: any;
  Standard: any;
  Mobile: any;
  Gender: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Student: 'Yogi', Standard: '1st', Mobile: '7687856567', Gender:'Male', Action: ''},
  {srno: 2, Student: 'Rihan', Standard: '2nd', Mobile: '9089877665', Gender:'Male', Action: ''},
  {srno: 3, Student: 'Nisha', Standard: '3rd', Mobile: '78899887778', Gender:'Male',  Action: ''},
];
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Student', 'Standard', 'Mobile', 'Gender', 'Action'];
  dataSource = ELEMENT_DATA;
}
