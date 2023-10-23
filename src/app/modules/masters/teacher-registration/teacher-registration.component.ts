import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/core/services/master.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { ValidationService } from 'src/app/core/services/validation.service';
export interface PeriodicElement {
  srno: any;
  TeacherNum: any;
  Teacher: any;
  Mobile: any;
  Email: any;
  District:any;
  Taluka: any;
  Cluster: any;
  Unblock: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, TeacherNum: 'Teacher', Teacher: 'School', Mobile: 'Head Master', Email:'Anjangaon Bari', District:'Pune',Taluka:'Jaoli',Cluster:'AMBI',Unblock: '', Action: 'H'},
  {srno: 2, TeacherNum: 'Head Master', Teacher: 'Kendra', Mobile: 'Cluster Resource Person', Email:'Anjangaon Bari', District:'Pune',Taluka:'Jaoli',Cluster:'AMBI',Unblock: '',   Action: 'H'},
  {srno: 3, TeacherNum: 'IED Teacher', Teacher: 'Taluka', Mobile: 'Block Resource Person', Email:'Anjangaon Bari', District:'Pune',Taluka:'Jaoli',Cluster:'AMBI',Unblock: '',   Action: 'H'},
];
@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent {
  filterForm !: FormGroup;
  displayedheadersEnglish = ['Sr. No.', 'Teacher Name', 'Teacher ID', 'Mobile No.', 'Email ID', 'District', 'Taluka', 'Cluster', 'Unblock/Block','Action'];
  displayedheadersMarathi = ['अनुक्रमांक', 'शिक्षकाचे नाव', 'शिक्षक आयडी', 'मोबाईल क्र.', 'ईमेल आयडी','जिल्हा', 'तालुका', 'क्लस्टर', 'अनब्लॉक/ब्लॉक','कृती'];
  districtArray = new Array();
  talukaArray = new Array();
  centerArray = new Array();
  villageArray = new Array();
  pageNumber: number = 1;
  totalCount!: number;
  tableDatasize!: number;
  tableDataArray = new Array();
  tableData: any;
  langTypeName: any;
  highLightFlag!: boolean;

  get f() { return this.filterForm.controls }


  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    public webStorage: WebStorageService,
    private masterService: MasterService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    public validation: ValidationService){}

  ngOnInit(){
    this.formField();
    this.getDistrict();
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      // this.languageChange();
    });
  }

  formField(){
    this.filterForm = this.fb.group({
      districtId: [''],
      talukaId: [''],
      centerId: [''],
      villageId: [''],
      textSearch: ['']
    })
  }

  //#region ------------------------------------ Table start here -----------------------------------------------------
  getTableData(flag?: string){
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;
    let formValue = this.filterForm?.value;

  }

  // languageChange(){
  //   this.highLightFlag=true;
  //   // let displayedColumnsReadMode = ['srNo', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center'];
  //   this.displayedColumns = ['srNo', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', 'action'];
  //   this.tableData = {
  //     pageNumber: this.pageNumber,
  //     img: '', blink: '', badge: '', isBlock: '', pagination: this.totalCount > 10 ? true : false,
  //     displayedColumns: this.displayedColumns,
  //     tableData: this.tableDataArray,
  //     tableSize: this.tableDatasize,
  //     tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
  //     edit: true, delete: true
  //   };
  //   this.highLightFlag ? this.tableData.highlightedrow = true : this.tableData.highlightedrow = false,
  //   this.apiService.tableData.next(this.tableData);
  // }

  //#endregion -----------------------------------Table end here ------------------------------------------------------

  //#region ------------------------------------ Filter Dropdown start here -----------------------------------------------------

  getDistrict(){
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
    if(districtId > 0){
      this.masterService.getAllTaluka('', districtId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.talukaArray.push({ "id": 0, "taluka": "All Taluka", "m_Taluka": "सर्व तालुका" }, ...res.responseData) : this.talukaArray = [];
          this.f['talukaId'].setValue(0);
        }
      });
    }
  }

  getCenter(){
    this.centerArray = [];
    let talukaId = this.filterForm.value.talukaId;
    if(talukaId > 0){
      this.masterService.getAllCenter('', talukaId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.centerArray.push({ "id": 0, "center": "All Center", "m_Center": "सर्व केंद्र" }, ...res.responseData) : this.centerArray = [];
          this.f['centerId'].setValue(0);
        }
      });
    }
  }

  getVillage(){
    this.villageArray = [];
    let centerId = this.filterForm.value.centerId;
    if(centerId){
      this.masterService.getAllVillage('', centerId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray.push({ "id": 0, "village": "All Village", "m_Village": "सर्व गाव" }, ...res.responseData) : this.villageArray = [];
          this.f['villageId'].setValue(0);
        }
      });
    }
  }
  //#endregion ------------------------------------ Filter Dropdown end here -----------------------------------------------------


  displayedColumns: string[] = ['srno', 'TeacherNum', 'Teacher', 'Mobile', 'Email','District','Taluka','Cluster','Unblock','Action'];
  dataSource = ELEMENT_DATA;

  AddTeacher(data?: any) {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '800px',
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

  clearDropdown(dropdown: string) {
    if (dropdown == 'district') {
      this.f['talukaId'].setValue('');
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.centerArray = [];
      this.villageArray = [];
    }
    else if (dropdown == 'taluka') {
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.villageArray = [];
    }
    else {
      this.f['villageId'].setValue('');
    }
  }
}
