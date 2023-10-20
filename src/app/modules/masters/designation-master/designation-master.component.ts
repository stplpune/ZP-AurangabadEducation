import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
export interface PeriodicElement {
  srno: any;
  Designation: any;
  DesignationLevel: any;
  Linkedto: any;
  Action: any;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, Designation: 'Teacher', DesignationLevel: 'School', Linkedto: 'Head Master', Action: 'H' },
  { srno: 2, Designation: 'Head Master', DesignationLevel: 'Kendra', Linkedto: 'Cluster Resource Person', Action: 'H' },
  { srno: 3, Designation: 'IED Teacher', DesignationLevel: 'Taluka', Linkedto: 'Block Resource Person', Action: 'H' },
];
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.scss']
})
export class DesignationMasterComponent {
  displayedColumns = new Array();
  desigId = new FormControl(0);
  textSearch = new FormControl('');

  desigNationForm!: FormGroup;
  pageNumber: number = 1
  langTypeName: any;
  totalCount!: number;
  tableDataArray = new Array();
  tableDatasize!: number;
  highLightFlag!: boolean;
  tableData: any;
  // displayedColumns = new Array();
  displayedheadersEnglish = ['Sr. No.', 'Designation Name', 'Designation Level', 'Action'];
  displayedheadersMarathi = ['अनुक्रमांक', 'पदनाम', 'पदनाम स्तर', 'कृती'];
  desigLevelArr = new Array();
  dependDesigArr = new Array();
  desireDesigLevelArr = new Array();
  editFlag: boolean = false;
  linkedDesignationArr = new Array();

  get f() { return this.desigNationForm.controls }
  constructor(public webStorage: WebStorageService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService,
    private masterService: MasterService,
    private fb: FormBuilder,
    public validation: ValidationService,
    private errorService: ErrorService
  ) {

  }

  ngOnInit() {
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.defaultDesignationForm();
    this.getAllDesignationLevel();
    this.getTableData()
  }

  defaultDesignationForm() {
    this.desigNationForm = this.fb.group({
      ...this.webStorage.createdByProps(),
      "id": [0],
      "dependantDesigLevelId": [''], // Not from backend 
      "linkedDesignationModel": [''],
      "designationLevelId": [0],
      "designation": [''],
      "m_Designation": [''],
      "localId": [0],
      "lan": [''],
    })
  }

  //Dependant Designation level dropdown 
  getAllDesignationLevel() {
    this.desigLevelArr = []
    this.masterService.getAllDesignationLevel('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.desigLevelArr.push({ "id": 0, "designationLevel": "All DesignationLevel", "m_DesignationLevel": "सर्व पदनाम स्तर" }, ...res.responseData)) : this.desigLevelArr = [];
      },
      error: () => {
      }
    })
  }

  // Dependant Designation dropdown
  getAllDepenDesignationByLevelId() {
    let dependantDesigLevelId = this.f['dependantDesigLevelId'].value
    this.dependDesigArr = [];
    this.masterService.getAllDepenDesignationByLevelId('', dependantDesigLevelId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.dependDesigArr = res.responseData) : this.dependDesigArr = [];
      }
    })
  }

  //getAllDesireDesignation dropdown
  getAllDesireDesigLevelBylevel() {
    let dependantDesigLevelId = this.f['dependantDesigLevelId'].value
    this.desireDesigLevelArr = [];
    this.masterService.getAllDesireDesignationsByLevelId('', dependantDesigLevelId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.desireDesigLevelArr = res.responseData) : this.desireDesigLevelArr = [];
      }
    })
  }

  selectMultiple(event: any){
    console.log("event: ", event.value);

    let linkedDesignationLevelId: any;

    this.dependDesigArr.filter((res: any) => {
      if(res.id == event.value){
        linkedDesignationLevelId = res.designationLevelId
      }
  });

  let obj = {
    "linkedDesignationLevelId":  linkedDesignationLevelId,  //designationLevelId,
    "linkedDesignationId": event.value,   //send id
    "designationId": 0
  }

  // this.linkedDesignationArr.push(obj);

  // console.log("linkedDesignationArr: ", this.linkedDesignationArr);
  
  }

  submit() {
    let formValue = this.desigNationForm.value;
    
    let obj = {
      ...this.webStorage.createdByProps(),
      "id": 0,
      "designationLevelId": formValue.designationLevelId,
      "designation": formValue.designation,
      "m_Designation": formValue.m_Designation,
      "localId": 0,
      "lan": this.webStorage.languageFlag,
      "linkedDesignationModel": [
        {
          "linkedDesignationLevelId": 0,
          "linkedDesignationId": 0,
          "designationId": 0
        }
      ]
    }
    let url = this.editFlag ? 'UpdateDesignation' : 'AddDesignation';
    if (!this.desigNationForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp('post', 'ZP-Education/Designation/' + url, false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          res.statusCode == "200" ? (this.commonMethod.matSnackBar(res.statusMessage, 0)) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        },
        error: ((err: any) => {
          this.ngxSpinner.hide();
          this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
        })
      })
    }
  }

  getTableData(flag?: string) {
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;

    let str = `DesignationLevelId=${this.desigId.value}&TextSearch=${(this.textSearch.value)?.trim()}&PageNo=${this.pageNumber}&PageSize=10&lan=${this.webStorage.languageFlag}`;
    let reportStr = `DesignationLevelId=${this.desigId.value}&TextSearch=${this.textSearch}&pageno=1&pagesize=${(this.totalCount * 10)}&lan=${this.webStorage.languageFlag}`

    this.apiService.setHttp('get', 'ZP-Education/Designation/GetAll?' + (flag == 'pdfFlag' ? reportStr : str), false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        if (res.statusCode == "200") {
          flag != 'pdfFlag' ? this.tableDataArray = res.responseData?.responseData1 : this.tableDataArray = this.tableDataArray;
          this.totalCount = res.responseData.responseData2.pageCount;
          this.tableDatasize = res.responseData.responseData2.pageCount;
          let data: [] = (flag == 'pdfFlag' || flag == 'excel') ? res.responseData.responseData1 : [];
          (flag == 'pdfFlag' || flag == 'excel') ? this.downloadPdf(data, flag) : '';
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


  languageChange() {
    this.highLightFlag = true;
    this.displayedColumns = ['srNo', this.langTypeName == 'English' ? 'designation' : 'm_Designation', this.langTypeName == 'English' ? 'designationLevel' : 'm_DesignationLevel', 'action'];
    this.tableData = {
      pageNumber: this.pageNumber,
      img: '', blink: '', badge: '', isBlock: '', pagination: true,
      displayedColumns: this.displayedColumns,
      tableData: this.tableDataArray,
      tableSize: this.tableDatasize,
      tableHeaders: this.langTypeName == 'English' ? this.displayedheadersEnglish : this.displayedheadersMarathi,
      edit: true, delete: true
    };
    this.highLightFlag ? this.tableData.highlightedrow = true : this.tableData.highlightedrow = false,
      this.apiService.tableData.next(this.tableData);
  }

  childCompInfo(obj: any) {
    switch (obj.label) {
      case 'Pagination':
        this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
    }
  }

  downloadPdf(data: any, flag?: any) {

  }







}
