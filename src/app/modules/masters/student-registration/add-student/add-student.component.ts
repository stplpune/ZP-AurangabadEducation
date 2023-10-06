import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  srno: any;
  Name: any;
  Mobile: any;
  Realtion: any;
  IsHead: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Name: 'Yogi', Mobile: '7687856567', Realtion:'Brother', IsHead:'', Action: ''},
  {srno: 2, Name: 'Rihan', Mobile: '9089877665', Realtion:'Friend', IsHead:'',  Action: ''},
  {srno: 3, Name: 'Nisha',  Mobile: '78899887778', Realtion:'Sisiter', IsHead:'',   Action: ''},
];
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Name', 'Mobile', 'Realtion', 'IsHead', 'Action'];
  dataSource = ELEMENT_DATA;
}
