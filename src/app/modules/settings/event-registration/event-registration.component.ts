import { Component } from '@angular/core';
import { AddEventComponent } from './add-event/add-event.component';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  srno: any;
  eventNum: any;
  eventNumMar: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, eventNum: 'WDWD', eventNumMar:'टेस्ट', Action: 'H'},
  {srno: 2, eventNum: 'Trial One',eventNumMar:'डेमो ', Action: 'H'},
  {srno: 3, eventNum: 'Test',eventNumMar:'इवेंट', Action: 'H'},
];
@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.scss']
})
export class EventRegistrationComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'eventNum','eventNumMar','Action'];
  dataSource = ELEMENT_DATA;
  AddTeacher(data?: any) {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
