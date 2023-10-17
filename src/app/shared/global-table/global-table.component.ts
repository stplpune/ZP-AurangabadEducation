import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DashPipe } from 'src/app/core/pipes/dash.pipe';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfigService } from 'src/app/core/services/config.service';

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

  displayedColumns = new Array();
  tableRecords: any;
  tableSize!: number;
  pageNumber!: number;
  pageIndex!: number;
  tableInfo: any;
  tableHeaders = new Array();
  highlightedRow!: number;
  tableSub!: Subscription;

  constructor(private apiService: ApiService,
    public webStorage: WebStorageService,
    public configService: ConfigService){}

    ngOnInit() {
      this.tableInfo = [];
      this.tableSub = this.apiService.tableData.subscribe((res: any) => {
        this.tableInfo = res;
        if (this.tableInfo) {
          this.highlightedRow = this.tableInfo.highlightedRow || this.highlightedRow;
          this.displayedColumns = this.tableInfo.displayedColumns;
          this.tableSize = this.tableInfo.tableSize;
          this.tableHeaders = this.tableInfo.tableHeaders
          this.pageNumber = this.tableSize != 0 ? this.tableInfo.pageNumber : 1;
          this.tableInfo.tableData ? this.tableRecords = new MatTableDataSource(this.tableInfo.tableData) : this.tableRecords = [];
          this.paginator?._pageIndex != 0 && this.pageIndex != this.pageNumber ? this.paginator?.firstPage() : '';
          this.tableRecords.sort = this.sort;
        }
      })
    }

    action(obj: any, label: string, i?: any, chkLabel?: any) {
      label == 'checkBox' ? (chkLabel == 'readCheck' ? obj.readRight = i.checked : (i.checked == true ? (obj.writeRight = i.checked, obj.readRight = i.checked) : obj.writeRight = i.checked)) : this.highlightedRow = i;
      obj.label = label;
      obj.pageNumber = (label == 'Edit' || label == 'Delete' || label == 'AssetManage' || label == 'Add') ? this.pageNumber : obj.pageIndex + 1;
      this.pageIndex = obj.pageNumber;
      this.recObjToChild.emit(obj);
    }
}
