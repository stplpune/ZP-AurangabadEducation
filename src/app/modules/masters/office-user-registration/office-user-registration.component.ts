import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
export interface PeriodicElement {
  srno: any;
  Name: any;
  User: any;
  Level: any;
  Designation: any;
  Contact: any;
  Block: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Name: 'Ngo Demo', User: 'NGO', Level: 'Kendra', Designation:'Kendra Pramukh', Contact:'9878788778', Block:'', Action: ''},
  {srno: 2, Name: 'Ramajogayya Shastry', User: 'Staff', Level: 'School', Designation:'Block Resource Person', Contact:'9878788778', Block:'',  Action: ''},
  {srno: 3, Name: 'Prajapati Naidu', User: 'NGO', Level: 'District', Designation:'CEO', Contact:'9878788778',  Block:'',  Action: ''},
];
@Component({
  selector: 'app-office-user-registration',
  templateUrl: './office-user-registration.component.html',
  styleUrls: ['./office-user-registration.component.scss']
})
export class OfficeUserRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Name', 'User', 'Level', 'Designation', 'Contact', 'Block','Action'];
  dataSource = ELEMENT_DATA;
  AddUser(data?: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
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
