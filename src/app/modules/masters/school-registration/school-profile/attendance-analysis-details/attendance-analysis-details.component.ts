import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-attendance-analysis-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './attendance-analysis-details.component.html',
  styleUrls: ['./attendance-analysis-details.component.scss']
})
export class AttendanceAnalysisDetailsComponent {

}
