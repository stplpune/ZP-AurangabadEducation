import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  District: any;
  Taluka: any;
  Center: any;
  SchoolCode: any;
  SchoolName: any;
  FullName: any;
  StudentGender: any;
  Standard: any;
  Exam: any;
  Assessment: any;
  Management: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, District: 'Satara', Taluka: 'Jaoli', Center: 'AMBI', SchoolCode:'1234', SchoolName: 'New english schools division 1', FullName: 'Ronit Sharma', StudentGender: 'Male', Standard: '1st', Exam: 'Primary Test', Assessment: 'Demo', Management: 'Test'},
  {srno: 2, District: 'Satara', Taluka: 'Jaoli', Center: 'AMBI', SchoolCode:'2345', SchoolName: 'New english schools division 1', FullName: 'Gunjan Maheshwaree', StudentGender: 'Female', Standard: '3rd', Exam: 'Base Line', Assessment: 'Test', Management: 'Test'},
  {srno: 3, District: 'Satara', Taluka: 'Jaoli', Center: 'AMBI', SchoolCode:'5456', SchoolName: 'New english schools division 1', FullName: 'Vidya Singh ', StudentGender: 'Female', Standard: '2nd', Exam: 'Mid Line', Assessment: 'Demo', Management: 'Test'},
];
@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent {
  Exam: any;
  displayedColumns: string[] = ['srno', 'District', 'Taluka', 'Center', 'SchoolCode', 'SchoolName','FullName','StudentGender','Standard','Exam','Assessment','Management'];
  dataSource = ELEMENT_DATA;
}
