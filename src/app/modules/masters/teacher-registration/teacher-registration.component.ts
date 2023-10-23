import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/core/services/master.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { DownloadPdfExcelService } from 'src/app/core/services/download-pdf-excel.service';
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';
export interface PeriodicElement {
  srno: any;
  TeacherNum: any;
  Teacher: any;
  Mobile: any;
  Email: any;
  District: any;
  Taluka: any;
  Cluster: any;
  Unblock: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, TeacherNum: 'Teacher', Teacher: 'School', Mobile: 'Head Master', Email: 'Anjangaon Bari', District: 'Pune', Taluka: 'Jaoli', Cluster: 'AMBI', Unblock: '', Action: 'H' },
  { srno: 2, TeacherNum: 'Head Master', Teacher: 'Kendra', Mobile: 'Cluster Resource Person', Email: 'Anjangaon Bari', District: 'Pune', Taluka: 'Jaoli', Cluster: 'AMBI', Unblock: '', Action: 'H' },
  { srno: 3, TeacherNum: 'IED Teacher', Teacher: 'Taluka', Mobile: 'Block Resource Person', Email: 'Anjangaon Bari', District: 'Pune', Taluka: 'Jaoli', Cluster: 'AMBI', Unblock: '', Action: 'H' },
];
@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent {
  filterForm !: FormGroup;
  displayedheadersEnglish = ['Sr. No.', 'Teacher Name', 'Teacher ID', 'Mobile No.', 'Email ID', 'District', 'Taluka', 'Kendra', 'Unblock/Block', 'Action'];
  displayedheadersMarathi = ['अनुक्रमांक', 'शिक्षकाचे नाव', 'शिक्षक आयडी', 'मोबाईल क्र.', 'ईमेल आयडी', 'जिल्हा', 'तालुका', 'केंद्र', 'अनब्लॉक/ब्लॉक', 'कृती'];
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
    public validation: ValidationService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService,
    private downloadFileService: DownloadPdfExcelService) { }

  ngOnInit() {
    this.formField();
    this.getDistrict();
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      // this.languageChange();
    });
  }

  formField() {
    this.filterForm = this.fb.group({
      districtId: [''],
      talukaId: [''],
      centerId: [''],
      villageId: [''],
      textSearch: ['']
    })
  }

  //#region ------------------------------------ Table start here -----------------------------------------------------
  getTableData(flag?: string) {
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;
    let formValue = this.filterForm?.value;

    let str = `pageno=${this.pageNumber}&pagesize=10&DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&VillageId=${formValue?.villageId || 0}&CenterId=${formValue?.centerId || 0}&TextSearch=${formValue?.textSearch.trim() || ''}&lan=${this.webStorage.languageFlag}`;
    let reportStr = `pageno=1&pagesize=` + (this.totalCount * 10) + `&DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&VillageId=${formValue?.villageId || 0}&CenterId=${formValue?.centerId || 0}&TextSearch=${formValue?.textSearch.trim() || ''}&lan=${this.webStorage.languageFlag}`

    this.apiService.setHttp('get', 'ZP-Education/School/GetAllSchool?' + ((flag == 'pdfFlag' || flag == 'excelFlag') ? reportStr : str), false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        if (res.statusCode == "200") {
          flag != 'pdfFlag' && flag != 'excelFlag' ? this.tableDataArray = res.responseData?.responseData1 : this.tableDataArray = this.tableDataArray;
          this.totalCount = res.responseData.responseData2.pageCount;
          this.tableDatasize = res.responseData.responseData2.pageCount;

          let data: [] = (flag == 'pdfFlag' || flag == 'excelFlag') ? res.responseData?.responseData1 : [];
          flag == 'pdfFlag' ? this.downloadExcelPDF(data, 'pdfFlag') : flag == 'excelFlag' ? this.downloadExcelPDF(data, 'excelFlag') : '';
        }
        else {
          this.ngxSpinner.hide();
          this.tableDataArray = [];
          this.tableDatasize = 0;
          this.tableDatasize == 0 && flag == 'pdfFlag' ? this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'No Record Found' : 'रेकॉर्ड उपलब्ध नाही', 1) : '';
        }
        this.languageChange();
      },
      error: ((err: any) => { this.commonMethod.checkDataType(err.statusText) == false ? this.errorsService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusText, 1); })
    })
  }

  languageChange() {
    this.highLightFlag = true;
    // let displayedColumnsReadMode = ['srNo', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center'];
    this.displayedColumns = ['srNo', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', 'action'];
    this.tableData = {
      pageNumber: this.pageNumber,
      img: '', blink: '', badge: '', isBlock: '', pagination: this.totalCount > 10 ? true : false,
      displayedColumns: this.displayedColumns,
      tableData: this.tableDataArray,
      tableSize: this.tableDatasize,
      tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
      edit: true, delete: true
    };
    this.highLightFlag ? this.tableData.highlightedrow = true : this.tableData.highlightedrow = false,
      this.apiService.tableData.next(this.tableData);
  }

  //#endregion -----------------------------------Table end here ------------------------------------------------------

  //#region ------------------------------------ Filter Dropdown start here -----------------------------------------------------

  getDistrict() {
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray.push({ "id": 0, "district": "All District", "m_District": "सर्व जिल्हा" }, ...res.responseData) : this.districtArray = [];
        this.f['districtId'].setValue(0);
      }
    });
  }

  getTaluka() {
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

  getVillage() {
    this.villageArray = [];
    let centerId = this.filterForm.value.centerId;
    if (centerId) {
      this.masterService.getAllVillage('', centerId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray.push({ "id": 0, "village": "All Village", "m_Village": "सर्व गाव" }, ...res.responseData) : this.villageArray = [];
          this.f['villageId'].setValue(0);
        }
      });
    }
  }
  //#endregion ------------------------------------ Filter Dropdown end here -----------------------------------------------------

  //#region ------------------------------------ Download Excel PDF start here -----------------------------------------------------
  downloadExcelPDF(data?: any, flag?: any) {

    let apiKeys = ['srNo', 'schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village'];
    let keyHeader = [this.langTypeName == 'English' ? "Sr.No." : "अनुक्रमांक", this.langTypeName == 'English' ? "Teacher Name" : "शिक्षकाचे नाव", this.langTypeName == 'English' ? "Teacher ID" : "शिक्षक आयडी", this.langTypeName == 'English' ? "Mobile No." : "मोबाईल क्र.", this.langTypeName == 'English' ? "Email ID" : "ईमेल आयडी", this.langTypeName == 'English' ? "District" : "जिल्हा", this.langTypeName == 'English' ? "Taluka" : "तालुका", this.langTypeName == 'English' ? "Cluster" : "केंद्र", this.langTypeName == 'English' ? "Unblock/Block" : "अनब्लॉक/ब्लॉक"];
    let resultDownloadArr: any = [];

    data.find((res: any, i: any) => {
      let obj = {
        srNo: (i + 1),
        "Teacher Name": flag == 'excelFlag' ? this.langTypeName == 'English' ? res.teacherName : res.m_TeacherName : res.teacherName,
        "Teacher ID": res.teacherId,
        "Mobile No.": res.mobileNo,
        "Email ID": res.emailId,
        "District": flag == 'excelFlag' ? this.langTypeName == 'English' ? res.district : res.m_District : res.district,
        "Taluka": flag == 'excelFlag' ? this.langTypeName == 'English' ? res.taluka : res.m_Taluka : res.taluka,
        "Kendra": flag == 'excelFlag' ? this.langTypeName == 'English' ? res.center : res.m_Center : res.center,
      }
      resultDownloadArr.push(obj);
    })

    if (resultDownloadArr.length > 0) {
      let keyPDFHeader = ["Sr.No.", "Teacher Name", "Teacher ID", "Mobile No.", "Email ID", "District", "Taluka", "Kendra"];
      let ValueData =
      resultDownloadArr.reduce(
          (acc: any, obj: any) => [...acc, Object.values(obj).map((value) => value)], []
        );
      
      let objData: any = [{
        'topHedingName': 'Teacher Registration',
      }]
      ValueData.length > 0 ? this.downloadFileService.downLoadPdf(keyPDFHeader, ValueData, objData) : '';
    }

    if(flag == 'excelFlag'){
      let headerKeySize = [10, 50, 20, 20, 50, 20, 20, 20, 20];
      let nameArr: any;

      if (data.length > 0) {
        nameArr = [{
          'sheet_name': 'Teacher Master',
          'excel_name': 'Teacher Master',
          'languageFlag': this.langTypeName,
          'status':'Master'
        }];
        this.downloadFileService.generateExcel(keyHeader, apiKeys, data, nameArr, headerKeySize);
      } else {
        this.commonMethod.matSnackBar('No Data Found !!', 1);
      }
    }
  }
  //#endregion ------------------------------------ Download Excel PDF end here -----------------------------------------------------

  childCompInfo(obj: any) {
    switch (obj.label) {
      case 'Pagination':
        this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
      case 'Edit':
        this.AddTeacher(obj);
        break;
      case 'Delete':
        this.globalDialogOpen(obj);
        break;
    }
  }


  displayedColumns: string[] = ['srno', 'TeacherNum', 'Teacher', 'Mobile', 'Email', 'District', 'Taluka', 'Cluster', 'Unblock', 'Action'];
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

  globalDialogOpen(obj?: any){
    let dialoObj = {
      title: this.webStorage.languageFlag == 'EN' ? 'Do You Want To Delete Teacher Record?' : 'तुम्हाला शिक्षकाचे रेकॉर्ड हटवायचे आहे का?',
      header: 'Delete',
      cancelButton: this.webStorage.languageFlag == 'EN' ? 'Cancel' : 'रद्द करा',
      okButton: this.webStorage.languageFlag == 'EN' ? 'Ok' : 'ओके'
    }
    const deleteDialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '320px',
      data: dialoObj,
      disableClose: true,
      autoFocus: false
    })
    deleteDialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'yes') {
        this.onClickDelete(obj);
      }
      this.highLightFlag=false;
      this.languageChange();
    })
  }

  onClickDelete(obj?: any){
    let webStorageMethod = this.webStorage.createdByProps();
    let deleteObj = {
      "id": obj.id,
      "modifiedBy": webStorageMethod.modifiedBy,
      "modifiedDate": webStorageMethod.modifiedDate,
      "lan": this.webStorage.languageFlag
    }

    this.apiService.setHttp('delete', 'ZP-Education/School/DeleteSchool?lan=' + this.webStorage.languageFlag, false, deleteObj, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if(res.statusCode == "200"){
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.getTableData();
        }
      },
      error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorsService.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    });
  }

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

  onClear() {
    this.formField();
    this.talukaArray = [];
    this.centerArray = [];
    this.villageArray = [];
    this.getTableData();
  }
}
