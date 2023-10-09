import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAssessmentCrateriaComponent } from './add-assessment-crateria/add-assessment-crateria.component';
import { Router } from '@angular/router';
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
  selector: 'app-assessment-crateria',
  templateUrl: './assessment-crateria.component.html',
  styleUrls: ['./assessment-crateria.component.scss']
})
export class AssessmentCrateriaComponent {
  activeModal: any;
  success: any
  constructor(public dialog: MatDialog,
    private router: Router,) {

  }
  displayedColumns: string[] = ['srno', 'District', 'Standard','Subject', 'QuestionType', 'MultipleOption', 'Action'];
  dataSource = ELEMENT_DATA;
  AddAssessmentCrateria(data?: any) {
    const dialogRef = this.dialog.open(AddAssessmentCrateriaComponent, {
      width: '800px',
      data: data,
      disableClose:false    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
  }
  closeModal() { this.activeModal.close( this.success ); }
}
