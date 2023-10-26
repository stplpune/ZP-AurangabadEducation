import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserTransferComponent } from 'src/app/modules/user-transfer/user-transfer.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent {
  constructor(public dialog: MatDialog) { }

  openTransferDialog() {
    this.dialog.open(UserTransferComponent, {
      width: '600px',
    });
  }
}
