import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Category : any;
  SubCategory :any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Category : 'drone', SubCategory:'Camera',Action: 'H'},
  {srno: 2, Category : 'Goldust', SubCategory:'Gram',Action: 'H'},
  {srno: 3, Category : 'Plastic', SubCategory:'Plastic Chair',Action: 'H'},
];
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {
  displayedColumns: string[] = ['srno', 'Category', 'SubCategory','Action'];
  dataSource = ELEMENT_DATA;
}
