import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolComponent } from './add-school/add-school.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { MasterService } from 'src/app/core/services/master.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss']
})
export class SchoolRegistrationComponent {
  filterForm !: FormGroup;
  displayedheadersEnglish = ['Sr. No.', 'UDISE Code', 'School Name', 'District', 'Taluka', 'Kendra', 'Village', 'Action'];
  displayedheadersMarathi = ['अनुक्रमांक', 'यूडीआयएसई कोड', 'शाळेचे नाव', 'जिल्हा', 'तालुका', 'केंद्र', 'गाव', 'कृती'];
  pageNumber: number = 1;
  totalCount!: number;
  tableDatasize!: number;
  tableDataArray = new Array();
  resultDownloadArr = new Array();
  highLightFlag!: boolean;
  tableData: any;
  langTypeName: any;
  displayedColumns = new Array();
  districtArray = new Array();
  talukaArray = new Array();
  centerArray = new Array();
  villageArray = new Array();
  get f() { return this.filterForm.controls }

  constructor(public dialog: MatDialog,
    private ngxSpinner: NgxSpinnerService,
    public webStorage: WebStorageService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService,
    private masterService: MasterService,
    private fb: FormBuilder,
    public validation: ValidationService) {}

  ngOnInit(){
    this.getTableData();
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.getDistrict();
    this.formField();
  }

  formField(){
    this.filterForm = this.fb.group({
      districtId: [0],
      talukaId: [''],
      centerId: [''],
      villageId: [''],
      textSearch: ['']
    })
  }

  getTableData(flag?: string){
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;
    
    let str = `pageno=${this.pageNumber}&pagesize=10&DistrictId=8&TalukaId=3&VillageId=132&CenterId=2&TextSearch=school&lan=${this.webStorage.languageFlag}`;
    let reportStr = `pageno=1&pagesize=` + (this.totalCount * 10) + `&DistrictId=8&TalukaId=3&VillageId=132&CenterId=2&TextSearch=school&lan=${this.webStorage.languageFlag}`

    this.apiService.setHttp('get', 'ZP-Education/School/GetAllSchool?' + (flag == 'pdfFlag' ? reportStr : str), false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        if(res.statusCode == "200"){
          flag != 'pdfFlag' ? this.tableDataArray = res.responseData?.responseData1 : this.tableDataArray = this.tableDataArray;
          this.totalCount = res.responseData.responseData2.pageCount;
          this.tableDatasize = res.responseData.responseData2.pageCount;
          this.resultDownloadArr = [];

          let data: [] = flag == 'pdfFlag' ? res.responseData?.responseData1 : [];
          flag == 'pdfFlag' ? this.downloadPdf(data) : ''; 
        }
        else{
          this.ngxSpinner.hide();
          this.tableDataArray = [];
          this.tableDatasize = 0;
          this.tableDatasize == 0 && flag == 'pdfFlag' ? this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'No Record Found' : 'रेकॉर्ड उपलब्ध नाही', 1) : '';
        }
        this.languageChange();
      },
      error: ((err: any) => { this.commonMethod.checkDataType(err.statusText) == false ? this.errorsService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusText, 1); })
    });
  }

  languageChange(){
    this.highLightFlag=true;
    // let displayedColumnsReadMode = ['srNo', 'schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village'];
    this.displayedColumns = ['srNo', 'schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village', 'action'];
    this.tableData = {
      pageNumber: this.pageNumber,
      img: '', blink: '', badge: '', isBlock: '', pagintion: true, 
      displayedColumns: this.displayedColumns,
      tableData: this.tableDataArray,
      tableSize: this.tableDatasize,
      tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
      edit: true, delete: true
    };
    this.highLightFlag?this.tableData.highlightedrow=true:this.tableData.highlightedrow=false,
    this.apiService.tableData.next(this.tableData);
  }

  getDistrict(){
    this.masterService.getAllDistrict(this.webStorage.languageFlag).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray.push({ "id": 0, "district": "All District", "m_District": "सर्व जिल्हा" }, ...res.responseData) : this.districtArray = [];
        this.f['districtId'].setValue(0);
      }
    });
  }

  getTaluka(){
    let districtId = this.filterForm.value.districtId;
    this.masterService.getAllTaluka(this.webStorage.languageFlag, districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray.push({ "id": 0, "taluka": "All Taluka", "m_Taluka": "सर्व तालुका" }, ...res.responseData) : this.talukaArray = [];
        this.f['talukaId'].setValue(0);
      }
    });
  }

  getCenter(){
    let talukaId = this.filterForm.value.talukaId;
    this.masterService.getAllCenter(this.webStorage.languageFlag, talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray.push({ "id": 0, "center": "All Center", "m_Center": "सर्व केंद्र" }, ...res.responseData) : this.centerArray = [];
        this.f['centerId'].setValue(0);
      }
    });
  }

  getVillage(){
    let centerId = this.filterForm.value.centerId;
    this.masterService.getAllVillage(this.webStorage.languageFlag, centerId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.villageArray.push({ "id": 0, "village": "All Village", "m_Village": "सर्व गाव" }, ...res.responseData) : this.villageArray = [];
        this.f['villageId'].setValue(0);
      }
    });
  }

  childCompInfo(obj: any) {
    switch (obj.label) {
      case 'Pagination':
        this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
      // case 'Edit':
      //   this.addUpdateSchool(obj);
      //   break;
      // case 'Delete':
      //   this.globalDialogOpen(obj);
      //   break;
    }
  }

  AddSchool(data?: any) {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      width: '800px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    })
  }

  downloadPdf(data: any){
    console.log("download data: ", data);
  }

  onClear(){
    this.formField();
    this.talukaArray = [];
    this.centerArray = [];
    this.villageArray = [];
  }
}
