import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInwardItemsComponent } from './add-inward-items/add-inward-items.component';
export interface PeriodicElement {
  srno: any;
  Category: any;
  SubCategory: any;
  Item: any;
  Units: any;
  PurchaseDate: any;
  Price: any;
  Remark: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Category: 'drone', SubCategory: 'Camera', Item: 'fan',Units:'100',PurchaseDate:'13-09-2023',Price:'10',Remark:'Yes',Action:''},
  {srno: 2, Category: 'Books', SubCategory: 'history gh', Item: 'Thailand Saturday',Units:'100',PurchaseDate:'03-09-2023',Price:'10',Remark:'Yes',Action:''},
  {srno: 3, Category: 'Irons', SubCategory: 'irons table', Item: 'drinkf',Units:'100',PurchaseDate:'23-09-2023',Price:'10',Remark:'Yes',Action:''},
];
@Component({
  selector: 'app-inward-item',
  templateUrl: './inward-item.component.html',
  styleUrls: ['./inward-item.component.scss']
})
export class InwardItemComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Category', 'SubCategory', 'Item','Units','PurchaseDate','Price','Remark','Action'];
  dataSource = ELEMENT_DATA;
  AddInwardItems(data?: any) {
    const dialogRef = this.dialog.open(AddInwardItemsComponent, {
      width: '650px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
