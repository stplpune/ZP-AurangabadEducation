import { Component } from '@angular/core';
export interface PeriodicElement {
  photo: string;
  schoolname: string;
  assessment: number;
  percentage: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 1, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 4, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 6, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 9, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 10, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 12, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 14, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 15, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 184, percentage: '100%' },
  { schoolname: 'Bharatratn Atalbihari Vajpeyi International School,Shiradhon', photo: '', assessment: 20, percentage: '100%' },
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['photo', 'schoolname', 'assessment', 'percentage'];
  dataSource = ELEMENT_DATA;

  constructor(){    
  }

}

