import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Category: any;
  SubCategory: any;
  Item: any;
  TotalInward: any;
  TotalOutward: any;
  AvailableStock: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Category: 'drone', SubCategory: 'Camera', Item: 'fan',TotalInward:'100',TotalOutward:'13-09-2023',AvailableStock:'10'},
  {srno: 2, Category: 'Books', SubCategory: 'history gh', Item: 'Thailand Saturday',TotalInward:'100',TotalOutward:'03-09-2023',AvailableStock:'10'},
  {srno: 3, Category: 'Irons', SubCategory: 'irons table', Item: 'drinkf',TotalInward:'100',TotalOutward:'23-09-2023',AvailableStock:'10'},
];
@Component({
  selector: 'app-store-stock-report',
  templateUrl: './store-stock-report.component.html',
  styleUrls: ['./store-stock-report.component.scss']
})
export class StoreStockReportComponent {
  displayedColumns: string[] = ['srno', 'Category', 'SubCategory', 'Item','TotalInward','TotalOutward','AvailableStock'];
  dataSource = ELEMENT_DATA;
}
