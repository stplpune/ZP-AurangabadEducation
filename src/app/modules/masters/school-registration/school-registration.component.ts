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
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';
import { DownloadPdfExcelService } from 'src/app/core/services/download-pdf-excel.service';
import { DatePipe } from '@angular/common';

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
    public validation: ValidationService,
    private downloadFileService: DownloadPdfExcelService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.getTableData();
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.getDistrict();
    this.formField();
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
    });
  }

  downloadExcelPDF(data?: any, flag?: any) {
    let apiKeys = ['schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village'];
    let keyHeader = [this.langTypeName == 'English' ? "Sr.No." : "अनुक्रमांक", this.langTypeName == 'English' ? "UDISE Code" : "यूडीआयएसई कोड", this.langTypeName == 'English' ? "School Name" : "शाळेचे नाव", this.langTypeName == 'English' ? "District" : "जिल्हा", this.langTypeName == 'English' ? "Taluka" : "तालुका", this.langTypeName == 'English' ? "Kendra" : "केंद्र", this.langTypeName == 'English' ? "Village" : "गाव"];
    let headerKeySize = [10, 20, 50, 30, 20, 20, 20, 20, 20];
    let keyPDFHeader = ["Sr.No.", "UDISE Code", "School Name", "District", "Taluka", "Kendra", "Village"];

    if(flag == 'pdfFlag'){
      let objData: any = {
        'topHedingName': 'School Registration',
        'createdDate': 'Created on:' + this.datepipe.transform(new Date(), 'yyyy-MM-dd, h:mm a')
      }
      this.downloadFileService.downLoadPdf(keyPDFHeader, apiKeys, data, objData, headerKeySize);
    }

    else if (flag == 'excelFlag') {
      
      let nameArr: any;
      data.map((x:any,i: any)=>{        
        x.srNo = i+1
    });  

      if (data.length > 0) {
        nameArr = [{
          'topHedingName': this.langTypeName == 'English' ? 'School Master' : 'शाळा मास्टर',
          'sheet_name': this.langTypeName == 'English' ? 'School List' : 'शाळेची यादी',
          'excel_name': this.langTypeName == 'English' ? 'School List' : 'शाळेची यादी',  
          'languageFlag': this.langTypeName,
        }];
        this.downloadFileService.generateExcel(keyHeader, apiKeys, data, nameArr, headerKeySize);
      } 
    }
  }

  languageChange() {
    this.highLightFlag = true;
    // let displayedColumnsReadMode = ['srNo', 'schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village'];
    this.displayedColumns = ['srNo', 'schoolCode', this.langTypeName == 'English' ? 'schoolName' : 'm_SchoolName', this.langTypeName == 'English' ? 'district' : 'm_District', this.langTypeName == 'English' ? 'taluka' : 'm_Taluka', this.langTypeName == 'English' ? 'center' : 'm_Center', this.langTypeName == 'English' ? 'village' : 'm_Village', 'action'];
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

  childCompInfo(obj: any) {
    switch (obj.label) {
      case 'Pagination':
        this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
      case 'Edit':
        this.AddSchool(obj);
        break;
      case 'Delete':
        this.globalDialogOpen(obj);
        break;
    }
  }

  AddSchool(data?: any) {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      width: '800px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'yes' && data) {
        this.onClear();
        this.getTableData();
        this.getDistrict();
        this.pageNumber = data.pageNumber;
      }
      else if (result == 'yes') {
        this.getDistrict();
        this.getTableData();
        this.onClear();
      }
      this.highLightFlag = false;
      this.languageChange();
    })
  }

  onClear() {
    this.formField();
    this.talukaArray = [];
    this.centerArray = [];
    this.villageArray = [];
    this.getTableData();
  }

  globalDialogOpen(obj?: any) {
    let dialoObj = {
      title: this.webStorage.languageFlag == 'EN' ? 'Do You Want To Delete School Record?' : 'तुम्हाला शाळेचा रेकॉर्ड हटवायचा आहे का?',
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
