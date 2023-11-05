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
import { DatePipe } from '@angular/common';
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
  displayedColumns = new Array();

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
    private downloadFileService: DownloadPdfExcelService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.formField();
    this.getDistrict();
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    this.getTableData();
    });
  }

  formField() {
    this.filterForm = this.fb.group({
      districtId: [0],
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

    // ZP-Education/Teacher/GetAllTeacher?DistrictId=0&TalukaId=0&CenterId=0&VillageId=0&textSearch=d&pageno=1&pagesize=10&lan=EN
    let str = `DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&CenterId=${formValue?.centerId || 0}&VillageId=${formValue?.villageId || 0}&textSearch=${formValue?.textSearch.trim() || ''}&pageno=${this.pageNumber}&pagesize=10&lan=${this.webStorage.languageFlag}`;
    let reportStr = `DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&CenterId=${formValue?.centerId || 0}&VillageId=${formValue?.villageId || 0}&textSearch=${formValue?.textSearch.trim() || ''}&pageno=1&pagesize=` + (this.totalCount * 10) + `&lan=${this.webStorage.languageFlag}`

    this.apiService.setHttp('get', 'ZP-Education/Teacher/GetAllTeacher?' + ((flag == 'pdfFlag' || flag == 'excelFlag') ? reportStr : str), false, false, false, 'zp-Education');
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
    this.displayedColumns = ['srNo', this.langTypeName == 'English' ? 'teacherName' : 'm_TeacherName', 'teacherCode', 'mobileNo', 'emailId', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', 'action'];
    this.tableData = {
      pageNumber: this.pageNumber,
      img: '', blink: '', badge: '', isBlock: 'isBlock', pagination: this.totalCount > 10 ? true : false,
      displayedColumns: this.displayedColumns,
      tableData: this.tableDataArray,
      tableSize: this.tableDatasize,
      tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
      edit: false, delete: true, view: true
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
    let apiKeys = [this.langTypeName == 'English' ? 'teacherName' : 'm_TeacherName', 'teacherCode', 'mobileNo', 'emailId', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center'];
    let keyHeader = [this.langTypeName == 'English' ? "Sr.No." : "अनुक्रमांक", this.langTypeName == 'English' ? "Teacher Name" : "शिक्षकाचे नाव", this.langTypeName == 'English' ? "Teacher ID" : "शिक्षक आयडी", this.langTypeName == 'English' ? "Mobile No." : "मोबाईल क्र.", this.langTypeName == 'English' ? "Email ID" : "ई-मेल आयडी", this.langTypeName == 'English' ? "District" : "जिल्हा", this.langTypeName == 'English' ? "Taluka" : "तालुका", this.langTypeName == 'English' ? "Kendra" : "केंद्र"];
    let headerKeySize = [10, 40, 20, 20, 30, 20, 20, 20, 20];
    let keyPDFHeader = ["Sr.No.", "Teacher Name", "Teacher ID", "Mobile No.", "Email ID", "District", "Taluka", "Kendra"];

    if(flag == 'pdfFlag'){
      let objData: any = {
        'topHedingName': 'Teacher Registration',
        'createdDate': 'Created on:' + this.datepipe.transform(new Date(), 'yyyy-MM-dd, h:mm a')
      }
      this.downloadFileService.downLoadPdf(keyPDFHeader, apiKeys, data, objData, headerKeySize);
    }

    else if (flag == 'excelFlag') {
      let apiKeys = ['srNo', this.langTypeName == 'English' ? 'teacherName' : 'm_TeacherName', 'teacherCode', 'mobileNo', 'emailId', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center'];
      let nameArr: any;
      data.map((x:any,i: any)=>{        
        x.srNo = i+1
    });  

      if (data.length > 0) {
        nameArr = [{
          'topHedingName': this.langTypeName == 'English' ? 'Teacher Master' : 'शिक्षक मास्टर',
          'sheet_name': this.langTypeName == 'English' ? 'Teacher List' : 'शिक्षकांची यादी',
          'excel_name': this.langTypeName == 'English' ? 'Teacher List' : 'शिक्षकांची यादी',  
          'languageFlag': this.langTypeName,
        }];
        this.downloadFileService.generateExcel(keyHeader, apiKeys, data, nameArr, headerKeySize);
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
        this.AddTeacher(obj, 'Add');
        break;
      case 'Delete':
        this.globalDialogOpen(obj);
        break;
      case 'Block':
          this.openBlockDialog(obj);
          break;
      case 'View':
          this.AddTeacher(obj, 'View');
          break;
    }
  }

  AddTeacher(obj?: any, flag?: any) {
    let viewObj = {
      id: obj?.id,
      flag: flag
    }
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '800px',
      data: flag == 'View' ? viewObj : '',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 'yes' && obj){
        this.onClear();
        this.tableData();
        this.getDistrict();
      }
      else if(result == 'yes'){
        this.onClear();
        this.tableData();
        this.getDistrict();
      }
      this.highLightFlag = false;
      this.languageChange();
    })
  }
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  //#region ----------------------------------------- Open dialog and delete method start here-------------------------------------------
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

    this.apiService.setHttp('delete', 'ZP-Education/Teacher/DeleteTeacher', false, deleteObj, false, 'zp-Education');
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
  //#endregion ----------------------------------------- Open dialog and delete method end here-------------------------------------------

  //#region ----------------------------------------- Open dialog and block/unblock method start here-------------------------------------------
  openBlockDialog(obj: any) {
    let userEng = obj.isBlock == false ? 'Block' : 'Unblock';
    let userMara = obj.isBlock == false ? 'ब्लॉक' : 'अनब्लॉक';
    let dialoObj = {
      title: this.langTypeName == 'English' ? 'Do You Want To ' + userEng + ' The Teacher?' : 'आपण शिक्षक ' + userMara + ' करू इच्छिता?',
      header: 'Block',
      cancelButton: this.langTypeName == 'English' ? 'Cancel' : 'रद्द करा',
      okButton: this.langTypeName == 'English' ? 'Ok' : 'ओके'
    }
    const deleteDialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '320px',
      data: dialoObj,
      disableClose: true,
      autoFocus: false
    })
    deleteDialogRef.afterClosed().subscribe((result: any) => {
      result == 'yes' ? this.blockTeacher(obj) : this.getTableData();
      this.highLightFlag = false;
      this.languageChange();
    })
  }

  blockTeacher(obj: any) { 
    let blockObj = {
      "id": obj?.id,
      "isBlock": !obj.isBlock,
    }

    this.apiService.setHttp('put', 'ZP-Education/Teacher/BlockUnblockTeacher', false, blockObj, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.commonMethod.matSnackBar(res.statusMessage, 0), this.getTableData()) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorsService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
      },
      error: (error: any) => {
        this.errorsService.handelError(error.status);
        this.commonMethod.checkDataType(error.status) == false ? this.errorsService.handelError(error.status) : this.commonMethod.matSnackBar(error.status, 1);
      }
    })
  }
  //#endregion----------------------------------------- Open dialog and block/unblock method end here-------------------------------------------


  //#region ------------------------------------ onChange Dropdown method start here -----------------------------------------------------
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
  //#endregion ------------------------------------ onChange Dropdown method end here -----------------------------------------------------

  onClear() {
    this.formField();
    this.talukaArray = [];
    this.centerArray = [];
    this.villageArray = [];
    this.getTableData();
  }
}
