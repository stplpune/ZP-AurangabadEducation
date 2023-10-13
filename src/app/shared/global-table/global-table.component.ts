import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DashPipe } from 'src/app/core/pipes/dash.pipe';

@Component({
  selector: 'app-global-table',
  standalone: true,
  imports: [
          CommonModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatButtonModule,
          MatIconModule,
          MatSlideToggleModule,
          MatCheckboxModule,
          DashPipe,
          MatTooltipModule],
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss']
})
export class GlobalTableComponent {
  @Output() recObjToChild = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort!: MatSort;

}
