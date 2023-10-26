import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-transfer',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatRadioModule, MatSelectModule],
  templateUrl: './user-transfer.component.html',
  styleUrls: ['./user-transfer.component.scss']
})
export class UserTransferComponent {

}
