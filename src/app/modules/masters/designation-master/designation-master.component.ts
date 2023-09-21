import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Designation: any;
  DesignationLevel: any;
  Linkedto: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Designation: 'Teacher', DesignationLevel: 'School', Linkedto: 'Head Master', Action: 'H'},
  {srno: 2, Designation: 'Head Master', DesignationLevel: 'Kendra', Linkedto: 'Cluster Resource Person', Action: 'H'},
  {srno: 3, Designation: 'IED Teacher', DesignationLevel: 'Taluka', Linkedto: 'Block Resource Person', Action: 'H'},
];
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.scss']
})
export class DesignationMasterComponent {
  displayedColumns: string[] = ['srno', 'Designation', 'DesignationLevel', 'Linkedto', 'Action'];
  dataSource = ELEMENT_DATA;
}
