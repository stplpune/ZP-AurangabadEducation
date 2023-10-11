import { Component } from '@angular/core';
import { ApprovedRegistrationComponent } from './approved-registration/approved-registration.component';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  srno: any;
  Approved : any;
  Designation: any;
  Rejected: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Approved : 'Gangaram Sudama Patil',Designation:'Teacher',Rejected:'Dattayatra Ramdas Patil',Action: 'H'},
  {srno: 2, Approved : 'Sachin Rajaram Kadam',Designation:'Teacher',Rejected:'Aakash Madhusudam Joshi',Action: 'H'},
  {srno: 3, Approved : 'Yuvraj Shivaji Shinde',Designation:'Teacher',Rejected:'Riya Rajveer Kadam',Action: 'H'},
];
@Component({
  selector: 'app-registration-approval',
  templateUrl: './registration-approval.component.html',
  styleUrls: ['./registration-approval.component.scss']
})
export class RegistrationApprovalComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Approved','Designation','Rejected', 'Action'];
  dataSource = ELEMENT_DATA;
  ApprovedRegistration(data?: any) {
    const dialogRef = this.dialog.open(ApprovedRegistrationComponent, {
      width: '700px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
