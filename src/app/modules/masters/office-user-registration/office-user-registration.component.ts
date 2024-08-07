import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/core/services/master.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { DatePipe } from '@angular/common';
import { DownloadPdfExcelService } from 'src/app/core/services/download-pdf-excel.service';
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';
import { Router } from '@angular/router';
import { AesencryptDecryptService } from 'src/app/core/services/aesencrypt-decrypt.service';
export interface PeriodicElement {
  srno: any;
  Name: any;
  Level: any;
  Designation: any;
  Contact: any;
  Email: any;
  Block: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, Name: 'Ngo Demo', Designation: 'Kendra Pramukh', Level: 'Kendra', Contact: '9878788778', Email: 'test.gmail.com', Block: '', Action: '' },
  { srno: 2, Name: 'Ramajogayya Shastry', Designation: 'Block Resource Person', Level: 'School', Contact: '9878788778', Email: 'test.gmail.com', Block: '', Action: '' },
  { srno: 3, Name: 'Prajapati Naidu', Designation: 'CEO', Level: 'District', Contact: '9878788778', Email: 'test.gmail.com', Block: '', Action: '' },
];
@Component({
  selector: 'app-office-user-registration',
  templateUrl: './office-user-registration.component.html',
  styleUrls: ['./office-user-registration.component.scss']
})
export class OfficeUserRegistrationComponent {
  displayedColumns: string[] = ['srno', 'Name', 'Designation', 'Level', 'Contact', 'Email', 'Block', 'Action'];
  dataSource = ELEMENT_DATA;
  filterForm!: FormGroup;
  userTypeArray = new Array();
  districtArray = new Array();
  talukaArray = new Array();
  centerArray = new Array();
  villageArray = new Array();
  langTypeName!: string;
  pageNumber: number = 1;
  totalCount!: number;
  tableDatasize!: number;
  tableDataArray = new Array();
  highLightFlag!: boolean;
  tableData: any;
  get f() { return this.filterForm.controls }
  displayedheadersEnglish = ['Sr. No.', 'Office User Name', 'Designation', 'Taluka', 'Mobile No.', 'Email ID', 'Unblock/Block', 'Action'];
  displayedheadersMarathi = ['अनुक्रमांक', 'ऑफिस वापरकर्ता नाव', 'पदनाम', 'तालुका', 'मोबाईल क्र.', 'ई-मेल आयडी', 'अनब्लॉक/ब्लॉक', 'कृती'];

  constructor(public dialog: MatDialog,
    private masterService: MasterService,
    public fb: FormBuilder,
    public webStorage: WebStorageService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService,
    private datepipe: DatePipe,
    private downloadFileService: DownloadPdfExcelService,
    private router: Router,
    private AESEncryptDecryptService: AesencryptDecryptService) { }

  ngOnInit() {
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.defaultFilterForm();
    this.getTableData();
    // this.getuserTypeDropDwn();
    this.getDistrictDrop();
  }

  defaultFilterForm() {
    this.filterForm = this.fb.group({
      userTypeId: [''],
      districtId: [0],
      talukaId: [''],
      centerId: [''],
      textSearch: ['']
    })
  }

  //#region ----------------------------------------------- Dropdown with dependencies start from here -------------------------------------
  getuserTypeDropDwn() {
    this.userTypeArray = [];
    this.masterService.getUserType().subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.userTypeArray = res.responseData) : this.userTypeArray = [];
      },
    });
  }

  getDistrictDrop() {
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
  //#endregion----------------------------------------------- Dropdown with dependencies start end here -------------------------------------

  getTableData(flag?: string) {
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;
    let formValue = this.filterForm.value;
    let str = `DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&CenterId=${formValue?.centerId || 0}&TextSearch=${formValue?.textSearch.trim()}&PageNo=${this.pageNumber}&PageSize=10&lan=${this.webStorage.languageFlag}`;
    let reportStr = `DistrictId=${formValue?.districtId || 0}&TalukaId=${formValue?.talukaId || 0}&CenterId=${formValue?.centerId || 0}&TextSearch=${formValue?.textSearch.trim()}&PageNo=1&PageSize=` + (this.totalCount * 10) + `&lan=${this.webStorage.languageFlag}`;

    this.apiService.setHttp('get', 'ZP-Education/Officer/GetAll?' + ((flag == 'pdfFlag' || flag == 'excelFlag') ? reportStr : str), false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        if (res.statusCode == "200") {
          flag != 'pdfFlag' ? this.tableDataArray = res.responseData?.responseData1 : this.tableDataArray = this.tableDataArray;
          this.totalCount = res.responseData.responseData2.pageCount;
          this.tableDatasize = res.responseData.responseData2.pageCount;
          let data: [] = (flag == 'pdfFlag' || flag == 'excelFlag') ? res.responseData.responseData1 : [];
          ((flag == 'pdfFlag' || flag == 'excelFlag')) ? this.downloadExcelPDF(data, flag) : '';
        }
        else {
          this.ngxSpinner.hide();
          this.tableDataArray = [];
          this.tableDatasize = 0;
          this.tableDatasize == 0 && (flag == 'pdfFlag' || flag == 'excel') ? this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'No Record Found' : 'रेकॉर्ड उपलब्ध नाही', 1) : '';
        }
        this.languageChange();
      },
      error: ((err: any) => { this.commonMethod.checkDataType(err.statusText) == false ? this.errorsService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusText, 1); })
    });
  }

  languageChange() {
    this.highLightFlag = true;
    this.displayedColumns = ['srNo', this.langTypeName == 'English' ? 'name' : 'm_Name', this.langTypeName == 'English' ? 'designation' : 'm_Designation', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', 'mobileNo', 'emailId', 'isBlock', 'action'];
    this.tableData = {
      pageNumber: this.pageNumber,
      img: '', blink: '', badge: '', isBlock: 'isBlock', pagination: true,
      displayedColumns: this.displayedColumns,
      tableData: this.tableDataArray,
      tableSize: this.tableDatasize,
      tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
      edit: false, delete: true, view: true
    };
    this.highLightFlag ? this.tableData.highlightedrow = true : this.tableData.highlightedrow = false,
      this.apiService.tableData.next(this.tableData);
  }

  //#region ------------------------------------------------ Download excel pdf start here-----------------------------------------------
  downloadExcelPDF(data?: any, flag?: any) {
    let apiKeys = ['name', 'designation', 'taluka', 'mobileNo', 'emailId'];
    let keyHeader = [this.langTypeName == 'English' ? "Sr.No." : "अनुक्रमांक", this.langTypeName == 'English' ? "Office User Name" : "ऑफिस वापरकर्ता नाव", this.langTypeName == 'English' ? "Designation" : "पदनाम", this.langTypeName == 'English' ? "Taluka" : "तालुका", this.langTypeName == 'English' ? "Mobile No." : "मोबाईल क्र.", this.langTypeName == 'English' ? "Email ID" : "ई-मेल आयडी"];
    let headerKeySize = [10, 20, 50, 30, 20, 20, 20, 20, 20];
    let keyPDFHeader = ['Sr. No.', 'Office User Name', 'Designation', 'Taluka', 'Mobile No.', 'Email ID'];

    if (flag == 'pdfFlag') {
      let objData: any = {
        'topHedingName': 'Office User Registration',
        'createdDate': 'Created on:' + this.datepipe.transform(new Date(), 'yyyy-MM-dd, h:mm a')
      }
      this.downloadFileService.downLoadPdf(keyPDFHeader, apiKeys, data, objData, headerKeySize);
    }

    else if (flag == 'excelFlag') {
      let apiKeys = ['srNo', this.langTypeName == 'English' ? 'name' : 'm_Name', this.langTypeName == 'English' ? 'designation' : 'm_Designation', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', 'mobileNo', 'emailId'];

      let nameArr: any;
      data.map((x: any, i: any) => {
        x.srNo = i + 1
      });

      if (data.length > 0) {
        nameArr = [{
          'topHedingName': this.langTypeName == 'English' ? 'Office User Master' : 'ऑफिस यूजर मास्टर',
          'sheet_name': this.langTypeName == 'English' ? 'Office User List' : 'ऑफिस यूजर यादी',
          'excel_name': this.langTypeName == 'English' ? 'Office User List' : 'ऑफिस यूजर यादी',
          'languageFlag': this.langTypeName,
        }];
        this.downloadFileService.generateExcel(keyHeader, apiKeys, data, nameArr, headerKeySize);
      }
    }
  }
  //#endregion ------------------------------------------------ Download excel pdf end here-----------------------------------------------


  clearDropdown(flag?: string) { }

  onClear() {
    this.defaultFilterForm();
    this.getTableData();
    this.centerArray = [];
    this.talukaArray = [];
  }

  childCompInfo(obj: any) {
    switch (obj.label) {
      case 'Pagination':
        this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
      case 'Block':
        this.openBlockDialog(obj);
        break;
      case 'Edit':
        this.AddUser(obj, 'Edit');
        break;
        case 'View':
        this.AddUser(obj,'View');
        break;
      case 'Delete':
        this.globalDialogOpen(obj);
        break;
      //   case 'View':
      //     this.AddUser(obj, 'View');
      //     break;
    }
  }

  // edit and view user
  AddUser(obj: any, flag: string){
    console.log(obj, flag);
    let officerId: any = this.AESEncryptDecryptService.encrypt(`${obj?.id}`);
    this.router.navigate(['/add-office-user'], {
      queryParams: {
        id: officerId
      },
    })
  }

  //#region ------------------------------------------ Open dialog and delete method start here-----------------------------------------------
  globalDialogOpen(obj?: any) {
    let dialoObj = {
      title: this.webStorage.languageFlag == 'EN' ? 'Do You Want To Delete Officer Record?' : 'तुम्हाला ऑफिसरचा रेकॉर्ड हटवायचा आहे का?',
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
      this.highLightFlag = false;
      this.languageChange();
    })
  }

  onClickDelete(obj?: any) {
    let deleteObj = {
      "id": obj?.id,
      "designationLevelId": obj?.designationLevelId,
      "designationId": obj?.designationId,
      "deletedBy": this.webStorage.getUserId(),
      "lan": this.webStorage.languageFlag
    }

    this.apiService.setHttp('delete', 'ZP-Education/Officer/DeleteOfficer', false, deleteObj, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.getTableData();
        }
      },
      error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorsService.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    });
  }
  //#endregion ------------------------------------------ Open dialog and delete method end here-----------------------------------------------

  //#region ----------------------------------------- Open dialog and block/unblock method start here-------------------------------------------
  openBlockDialog(obj: any) {
    let userEng = obj.isBlock == false ? 'Block' : 'Unblock';
    let userMara = obj.isBlock == false ? 'ब्लॉक' : 'अनब्लॉक';
    let dialoObj = {
      title: this.langTypeName == 'English' ? 'Do You Want To ' + userEng + ' The Officer?' : 'आपण ऑफिसर ' + userMara + ' करू इच्छिता?',
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
      result == 'yes' ? this.blockOfficer(obj) : this.getTableData();
      this.highLightFlag = false;
      this.languageChange();
    })
  }

  blockOfficer(obj: any) { 
    let blockObj = {
      "userId": obj?.userId,
      "blockBy": this.webStorage.getUserId(),
      "isBlock": !obj.isBlock,
      "lan": this.webStorage.languageFlag
    }

    this.apiService.setHttp('put', 'ZP-Education/User-Registration/BlockUnblockUser', false, blockObj, false, 'zp-Education');
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

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;




}
