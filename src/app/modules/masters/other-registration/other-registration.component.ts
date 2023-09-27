import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOtherRegistrationComponent } from './add-other-registration/add-other-registration.component';
export interface PeriodicElement {
  srno: any;
  Name: any;
  Contact: any;
  Email: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Name: 'Ngo Demo', Contact:'9878788778',Email:'test@gmail.com',Action: ''},
  {srno: 2, Name: 'Ramajogayya Shastry',Contact:'9878788778',Email:'ramajogayya@gmail.com',Action: ''},
  {srno: 3, Name: 'Prajapati Naidu',Contact:'9878788778',Email:'parajapti@gmail.com',Action: ''},
];
@Component({
  selector: 'app-other-registration',
  templateUrl: './other-registration.component.html',
  styleUrls: ['./other-registration.component.scss']
})
export class OtherRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Name','Contact','Email','Action'];
  dataSource = ELEMENT_DATA;
  AddOtherRegistration(data?: any) {
    const dialogRef = this.dialog.open(AddOtherRegistrationComponent, {
      width: '800px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
