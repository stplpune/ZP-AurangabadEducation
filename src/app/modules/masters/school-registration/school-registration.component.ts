import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolComponent } from './add-school/add-school.component';
export interface PeriodicElement {
  srno: any;
  UDISE: any;
  School: any;
  District:any;
  Taluka: any;
  Kendra: any;
  Village: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, UDISE: '12343', School: 'Teacher', District:'Pune',Taluka: 'School', Kendra: 'Head Master', Village: 'Anjangaon Bari', Action: 'H' },
  { srno: 2, UDISE: '22321', School: 'Head Master',District:'Pune', Taluka: 'Kendra', Kendra: 'Cluster Resource Person', Village: 'Anjangaon Bari', Action: 'H' },
  { srno: 3, UDISE: '12122', School: 'IED Teacher',District:'Pune', Taluka: 'Taluka', Kendra: 'Block Resource Person', Village: 'Anjangaon Bari', Action: 'H' },
];
@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss']
})
export class SchoolRegistrationComponent {
  constructor(public dialog: MatDialog,) {

  }
  displayedColumns: string[] = ['srno', 'UDISE', 'School','District', 'Taluka', 'Kendra', 'Village', 'Action'];
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
