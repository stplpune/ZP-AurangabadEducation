import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
export interface PeriodicElement {
  srno: any;
  Taluka: any;
  Center: any;
  SchoolName: any;
  Standard: any;
  AssessedStudentCount: any;
  TotalStudentCount: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, Taluka: 'Jaoli', Center: 'AMBI', SchoolName: 'New english schools division 1', Standard: '1st', AssessedStudentCount: 'Demo', TotalStudentCount: 'Test' },
  { srno: 2, Taluka: 'Jaoli', Center: 'AMBI', SchoolName: 'New english schools division 1', Standard: '3rd', AssessedStudentCount: 'Test', TotalStudentCount: 'Test' },
  { srno: 3, Taluka: 'Jaoli', Center: 'AMBI', SchoolName: 'New english schools division 1', Standard: '2nd', AssessedStudentCount: 'Demo', TotalStudentCount: 'Test' },
];
@Component({
  selector: 'app-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.scss']
})
export class SchoolReportComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns: string[] = ['srno', 'Taluka', 'Center', 'SchoolName', 'Standard', 'AssessedStudentCount', 'TotalStudentCount'];
  dataSource = ELEMENT_DATA;
}
