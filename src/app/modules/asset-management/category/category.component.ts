import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Category : any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Category : 'Teacher',Action: 'H'},
  {srno: 2, Category : 'Head Master',Action: 'H'},
  {srno: 3, Category : 'IED Teacher',Action: 'H'},
];
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  displayedColumns: string[] = ['srno', 'Category', 'Action'];
  dataSource = ELEMENT_DATA;
}
