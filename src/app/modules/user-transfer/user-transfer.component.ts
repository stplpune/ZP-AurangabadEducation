import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-user-transfer',
  standalone: true,
  imports: [MatNativeDateModule, MatInputModule, MatDialogModule, MatIconModule, MatButtonModule, MatRadioModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './user-transfer.component.html',
  styleUrls: ['./user-transfer.component.scss']
})
export class UserTransferComponent {

}
