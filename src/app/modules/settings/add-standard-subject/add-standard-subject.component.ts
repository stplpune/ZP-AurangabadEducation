import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Standard: any;
  Subject: any;               
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Standard: 'Teacher', Subject: 'School',Action: 'H'},
  {srno: 2, Standard: 'Head Master', Subject: 'Kendra', Action: 'H'},
  {srno: 3, Standard: 'IED Teacher', Subject: 'Taluka', Action: 'H'},
];
@Component({
  selector: 'app-add-standard-subject',
  templateUrl: './add-standard-subject.component.html',
  styleUrls: ['./add-standard-subject.component.scss']
})
export class AddStandardSubjectComponent {
  displayedColumns: string[] = ['srno', 'Standard', 'Subject', 'Action'];
  dataSource = ELEMENT_DATA;
}
