import { Component } from '@angular/core';
import { AddItemComponent } from './add-item/add-item.component';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  srno: any;
  Category: any;
  SubCategory: any;
  Item: any;
  Description: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1,Category: 'drone', SubCategory: 'Camera', Item: 'fan',Description:'Mineral',Action:''},
  {srno: 2, Category: 'Books', SubCategory: 'history gh', Item: 'Thailand Saturday',Description:'added derta',Action:''},
  {srno: 3, Category: 'Irons', SubCategory: 'irons table', Item: 'drinkf',Description:'string',Action:''},
];
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  constructor(public dialog: MatDialog,){

  }
  displayedColumns: string[] = ['srno', 'Category', 'SubCategory', 'Item','Description','Action'];
  dataSource = ELEMENT_DATA;
  AddItem(data?: any) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
}
