import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionListComponent } from './add-question-list/add-question-list.component';
export interface PeriodicElement {
  srno: any;
  District: any;
  Standard: any;
  Subject:any;
  QuestionType: any;
  MultipleOption: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, District: '12343', Standard: 'Teacher', Subject:'Pune',QuestionType: 'School', MultipleOption: 'Head Master',Action: 'H' },
  { srno: 2, District: '22321', Standard: 'Head Master',Subject:'Pune', QuestionType: 'Kendra', MultipleOption: 'Cluster Resource Person',Action: 'H' },
  { srno: 3, District: '12122', Standard: 'IED Teacher',Subject:'Pune', QuestionType: 'Taluka', MultipleOption: 'Block Resource Person', Action: 'H' },
];
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  constructor(public dialog: MatDialog,) {

  }
  displayedColumns: string[] = ['srno', 'District', 'Standard','Subject', 'QuestionType', 'MultipleOption', 'Action'];
  dataSource = ELEMENT_DATA;
  AddQuestionList(data?: any) {
    const dialogRef = this.dialog.open(AddQuestionListComponent, {
      width: '800px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
  }
}
