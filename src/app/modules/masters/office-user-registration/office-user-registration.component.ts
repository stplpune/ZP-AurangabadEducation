import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { MasterService } from 'src/app/core/services/master.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
export interface PeriodicElement {
  srno: any;
  Name: any;
  User: any;
  Level: any;
  Designation: any;
  Contact: any;
  Block: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Name: 'Ngo Demo', User: 'NGO', Level: 'Kendra', Designation:'Kendra Pramukh', Contact:'9878788778', Block:'', Action: ''},
  {srno: 2, Name: 'Ramajogayya Shastry', User: 'Staff', Level: 'School', Designation:'Block Resource Person', Contact:'9878788778', Block:'',  Action: ''},
  {srno: 3, Name: 'Prajapati Naidu', User: 'NGO', Level: 'District', Designation:'CEO', Contact:'9878788778',  Block:'',  Action: ''},
];
@Component({
  selector: 'app-office-user-registration',
  templateUrl: './office-user-registration.component.html',
  styleUrls: ['./office-user-registration.component.scss']
})
export class OfficeUserRegistrationComponent {
  displayedColumns: string[] = ['srno', 'Name', 'User', 'Level', 'Designation', 'Contact', 'Block','Action'];
  dataSource = ELEMENT_DATA;
  filterForm!: FormGroup;
  userTypeArray= new Array();
  districtArray = new Array();
  talukaArray = new Array();
  centerArray = new Array();
  villageArray = new Array(); 
  langTypeName!: string
 
  constructor(public dialog: MatDialog,
              private masterService: MasterService,
              public fb: FormBuilder,
              public webStorage: WebStorageService){ }
  
 
  ngOnInit(){
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.defaultFilterForm();
    this.getTabledata();
    this.getuserTypeDropDwn();
    this.getDistrictDrop();
  }

  defaultFilterForm(){
    this.filterForm = this.fb.group({
      userTypeId: [''],
      districtId: [0],
      talukaId: [''],
      centerId: [''],
      textSearch: ['']
    })
  }

  get f(){ return this.filterForm.controls }
  
  getuserTypeDropDwn(){
    this.userTypeArray = [];
    this.masterService.getUserType().subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.userTypeArray = res.responseData) : this.userTypeArray = [];
      },
    });
  }

  getDistrictDrop(){
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray.push({ "id": 0, "district": "All District", "m_District": "सर्व जिल्हा" }, ...res.responseData) : this.districtArray = [];
        this.f['districtId'].setValue(0);
      }
    });
  }

  getTaluka(){
    this.talukaArray = [];
    let districtId = this.filterForm.value.districtId;
    if (districtId > 0) {
      this.masterService.getAllTaluka('', districtId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.talukaArray.push({ "id": 0, "taluka": "All Taluka", "m_Taluka": "सर्व तालुका" }, ...res.responseData) : this.talukaArray = [];
          this.f['talukaId'].setValue(0);
        }
      });
    }
  }

  getCenter() {
    this.centerArray = [];
    let talukaId = this.filterForm.value.talukaId;
    if (talukaId > 0) {
      this.masterService.getAllCenter('', talukaId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.centerArray.push({ "id": 0, "center": "All Center", "m_Center": "सर्व केंद्र" }, ...res.responseData) : this.centerArray = [];
          this.f['centerId'].setValue(0);
        }
      });
    }
  }

  // getVillage() {
  //   this.villageArray = [];
  //   let centerId = this.filterForm.value.centerId;
  //   if (centerId) {
  //     this.masterService.getAllVillage('', centerId).subscribe({
  //       next: (res: any) => {
  //         res.statusCode == "200" ? this.villageArray.push({ "id": 0, "village": "All Village", "m_Village": "सर्व गाव" }, ...res.responseData) : this.villageArray = [];
  //         this.f['villageId'].setValue(0);
  //       }
  //     });
  //   }
  // }

  getTabledata(flag?: string){

  }

  languageChange(){

  }

  clearDropdown(flag?: string){

  }





  AddUser(data?: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: data,
      disableClose: true
        });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
}
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;




}
