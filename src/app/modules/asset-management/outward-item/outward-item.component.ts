import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOutwardComponent } from './add-outward/add-outward.component';
export interface PeriodicElement {
  srno: any;
  Category: any;
  SubCategory: any;
  Item: any;
  Units: any;
  PurchaseDate: any;
  Price: any;
  AssignTo: any;
  Remark: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Category: 'drone', SubCategory: 'Camera', Item: 'fan',Units:'100',PurchaseDate:'13-09-2023',Price:'10',AssignTo:'javed',Remark:'Yes',Action:''},
  {srno: 2, Category: 'Books', SubCategory: 'history gh', Item: 'Thailand Saturday',Units:'100',PurchaseDate:'03-09-2023',Price:'10',AssignTo:'javed',Remark:'Yes',Action:''},
  {srno: 3, Category: 'Irons', SubCategory: 'irons table', Item: 'drinkf',Units:'100',PurchaseDate:'23-09-2023',Price:'10',AssignTo:'javed',Remark:'Yes',Action:''},
];
@Component({
  selector: 'app-outward-item',
  templateUrl: './outward-item.component.html',
  styleUrls: ['./outward-item.component.scss']
})
export class OutwardItemComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Category', 'SubCategory', 'Item','Units','PurchaseDate','Price','AssignTo','Remark','Action'];
  dataSource = ELEMENT_DATA;
  AddOutward(data?: any) {
    const dialogRef = this.dialog.open(AddOutwardComponent, {
      width: '650px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
