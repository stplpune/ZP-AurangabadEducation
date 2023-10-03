import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
export interface PeriodicElement {
  srno: any;
  Holiday: any;
  HolidayName: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Holiday: '02-09-2023', HolidayName: 'sport Event',Action:''},
  {srno: 2, Holiday: '12-11-2023', HolidayName: 'Diwali', Action:''},
  {srno: 3, Holiday: '22-12-2023', HolidayName: 'Dasara', Action:''},
];
@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.scss']
})
export class HolidayMasterComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Holiday', 'HolidayName','Action'];
  dataSource = ELEMENT_DATA;
  AddHoliday(data?: any) {
    const dialogRef = this.dialog.open(AddHolidayComponent, {
      width: '400px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
