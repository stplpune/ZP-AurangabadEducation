import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import {ThemePalette} from '@angular/material/core';
export interface PeriodicElement {
  srno: any;
  TeacherNum: any;
  Teacher: any;
  Mobile: any;
  Email: any;
  Taluka: any;
  Cluster: any;
  Unblock: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, TeacherNum: 'Teacher', Teacher: 'School', Mobile: 'Head Master', Email:'Anjangaon Bari', Taluka:'Jaoli',Cluster:'AMBI',Unblock: '', Action: 'H'},
  {srno: 2, TeacherNum: 'Head Master', Teacher: 'Kendra', Mobile: 'Cluster Resource Person', Email:'Anjangaon Bari',Taluka:'Jaoli',Cluster:'AMBI',Unblock: '',   Action: 'H'},
  {srno: 3, TeacherNum: 'IED Teacher', Teacher: 'Taluka', Mobile: 'Block Resource Person', Email:'Anjangaon Bari',Taluka:'Jaoli',Cluster:'AMBI',Unblock: '',   Action: 'H'},
];
@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'TeacherNum', 'Teacher', 'Mobile', 'Email', 'Taluka','Cluster','Unblock','Action'];
  dataSource = ELEMENT_DATA;
  AddTeacher(data?: any) {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '800px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
}
