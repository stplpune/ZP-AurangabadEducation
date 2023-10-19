import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-global-dialog',
  standalone: true,
  imports: [CommonModule, 
    MatSlideToggleModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule],
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss']
})
export class GlobalDialogComponent {

  constructor(public dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
