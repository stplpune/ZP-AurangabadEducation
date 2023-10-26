import { Component } from '@angular/core';
import { AttendanceAnalysisDetailsComponent } from './attendance-analysis-details/attendance-analysis-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDocumentComponent } from './add-document/add-document.component';

export interface PeriodicElement {
  saralid: string;
  studentname: string;
  class: string;
  gender: string;
  absentdates: string;
  view: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { saralid: '1', studentname: 'Abhijit Rajaram Kambale', class: '2 - (A)', gender: 'Male', absentdates: '1, 2, 5', view: '' },
  { saralid: '2', studentname: 'Shital Rahul Kore', class: '4 - (B)', gender: 'Female', absentdates: '1, 2, 5', view: '' },
  { saralid: '3', studentname: 'Kajal Vijay Rane', class: '2 - (B)', gender: 'Female', absentdates: '1, 2, 5', view: '' },
  { saralid: '4', studentname: 'Shilpa Anil Kanhere', class: '2 - (A)', gender: 'Female', absentdates: '1, 2, 5', view: '' },
  { saralid: '5', studentname: 'Sanket Narayan Kambale', class: '1 - (A)', gender: 'Male', absentdates: '1, 2, 5', view: '' },
  { saralid: '6', studentname: 'Shrutika Sunil Mane', class: '7 - (C)', gender: 'Female', absentdates: '1, 2, 5', view: '' },
  { saralid: '7', studentname: 'Navin Shrinath Bhosale', class: '7 - (B)', gender: 'Male', absentdates: '1, 2, 5', view: '' },
  { saralid: '8', studentname: 'Rahul Vishwanath Mistary', class: '4 - (A)', gender: 'Male', absentdates: '1, 2, 5', view: '' },
  { saralid: '9', studentname: 'Yuvraj Bhimanath Kendre', class: '1 - (A)', gender: 'Male', absentdates: '1, 2, 5', view: '' },
  { saralid: '10', studentname: 'Deepali Ramesh Ghume', class: '2 - (C)', gender: 'Female', absentdates: '1, 2, 5', view: '' },
];
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent {
  displayedColumns: string[] = ['saralid', 'studentname', 'class', 'gender', 'absentdates', 'view'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  openAnalysisDialog() {
    this.dialog.open(AttendanceAnalysisDetailsComponent, {
      width: '450px',
    });
  }

  openAddDocumentDialog() {
    this.dialog.open(AddDocumentComponent);
  }
}
