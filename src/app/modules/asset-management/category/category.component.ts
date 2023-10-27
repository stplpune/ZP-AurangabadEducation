import { Component } from '@angular/core';
export interface PeriodicElement {
  srno: any;
  Category: any;
  CategoryMarathi: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, Category: 'Teacher', CategoryMarathi: 'मुख्याध्यापक', Action: '' },
  { srno: 2, Category: 'Head Master', CategoryMarathi: 'मुख्याध्यापक', Action: '' },
  { srno: 3, Category: 'IED Teacher', CategoryMarathi: 'मुख्याध्यापक', Action: '' },
];
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  displayedColumns: string[] = ['srno', 'Category', 'CategoryMarathi', 'Action'];
  dataSource = ELEMENT_DATA;
}
