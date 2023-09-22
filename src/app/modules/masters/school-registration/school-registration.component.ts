import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolComponent } from './add-school/add-school.component';
export interface PeriodicElement {
  srno: any;
  School: any;
  Taluka: any;
  Kendra: any;
  Village: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, School: 'Teacher', Taluka: 'School', Kendra: 'Head Master', Village:'Anjangaon Bari', Action: 'H'},
  {srno: 2, School: 'Head Master', Taluka: 'Kendra', Kendra: 'Cluster Resource Person', Village:'Anjangaon Bari',  Action: 'H'},
  {srno: 3, School: 'IED Teacher', Taluka: 'Taluka', Kendra: 'Block Resource Person', Village:'Anjangaon Bari',  Action: 'H'},
];
@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss']
})
export class SchoolRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'School', 'Taluka', 'Kendra', 'Village', 'Action'];
  dataSource = ELEMENT_DATA;
  AddSchool(data?: any) {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      width: '800px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
