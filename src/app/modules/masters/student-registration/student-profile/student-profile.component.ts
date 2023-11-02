import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserTransferComponent } from 'src/app/modules/user-transfer/user-transfer.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent {
  constructor(public dialog: MatDialog) { }
  openTransferDialog() {
    this.dialog.open(UserTransferComponent, {
      width: '650px'
    });
  }
}
