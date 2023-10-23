import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { DownloadPdfExcelService } from 'src/app/core/services/download-pdf-excel.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';

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
  linkedDesignationArr = new Array();
  linkedDesignationModelArr = new Array();
  editObj: any;
  @ViewChild('formDirective')private formDirective!: NgForm;
  get f() { return this.desigNationForm.controls }
  constructor(public webStorage: WebStorageService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService,
    private masterService: MasterService,
    private fb: FormBuilder,
    public validation: ValidationService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private downloadPdfExcelService: DownloadPdfExcelService,
    private datepipe: DatePipe
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
      "dependantDesigLevelId": ['',[Validators.required]], // Not from backend 
      "linkedDesignationModel": [''],
      "designationLevelId": ['',[Validators.required]],
      "designation": [this.editObj ? this.editObj.designation : '', [Validators.required, Validators.pattern(this.validation.alphaNumericOnly)]],
      "m_Designation": [this.editObj ? this.editObj.m_Designation : '', [Validators.required, Validators.pattern('^[-\u0900-\u096F ]+$')]],
      "localId": [0],
      "depenDesigIds":['', [Validators.required]],
      "lan": this.webStorage.languageFlag,
    })
  }

  //Dependant Designation level dropdown 
  getAllDesignationLevel(arr?: any) {
    this.desigLevelArr = []
    this.masterService.getAllDesignationLevel('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.desigLevelArr.push({ "id": 0, "designationLevel": "All DesignationLevel", "m_DesignationLevel": "सर्व पदनाम स्तर" }, ...res.responseData)) : this.desigLevelArr = [];
        this.editObj ? (this.f['dependantDesigLevelId'].setValue(this.editObj.designationLevelId), this.getAllDepenDesignationByLevelId(arr),this.getAllDesireDesigLevelBylevel()) : '';
      },
      error: () => {
      }
    })
  }

  // Dependant Designation dropdown
  getAllDepenDesignationByLevelId(arr?: any) {
    let dependantDesigLevelId = this.f['dependantDesigLevelId'].value
    this.dependDesigArr = [];
    this.masterService.getAllDepenDesignationByLevelId('', dependantDesigLevelId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.dependDesigArr = res.responseData) : this.dependDesigArr = [];
        this.editObj ? this.f['depenDesigIds'].setValue(arr): ''
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
        this.editObj ? this.f['designationLevelId'].setValue(this.editObj.designationLevelId):'' 
      }
    })
  }

  selectMultiple(event: any){
    console.log("eve nt: ", event.value);
    let arrr = event.value;
    this.linkedDesignationModelArr=[];
    for (let i = 0; i < arrr.length; i++) {
      let obj = {
        "linkedDesignationLevelId": arrr[i]?.designationLevelId,
        "linkedDesignationId": arrr[i]?.id,
        "designationId": 0,
      }
      this.linkedDesignationModelArr.push(obj);
    }    
    }  

  submit() {
    let formValue = this.desigNationForm.value;
    
    let arrr = this.f['depenDesigIds'].value;
    this.linkedDesignationModelArr=[];
    for (let i = 0; i < arrr.length; i++) {
      let objM = {
        "linkedDesignationLevelId": arrr[i]?.designationLevelId,
        "linkedDesignationId": arrr[i]?.id,
        "designationId": 0,
      }
      this.linkedDesignationModelArr.push(objM);
    }    

    let obj = {
      ...this.webStorage.createdByProps(),
      "id": this.editObj? this.editObj.id : 0,
      "designationLevelId": formValue.designationLevelId,
      "designation": formValue.designation,
      "m_Designation": formValue.m_Designation,
      "localId": 0,
      "lan": this.webStorage.languageFlag,
      "linkedDesignationModel": this.linkedDesignationModelArr
    }
    let url = this.editObj ? 'UpdateDesignation' : 'AddDesignation';
    if (!this.desigNationForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp(this.editObj ?'PUT':'post', 'ZP-Education/Designation/' + url, false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          res.statusCode == "200" ? (this.commonMethod.matSnackBar(res.statusMessage, 0),this.formDirective.resetForm(), this.getTableData()) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        },
        error: ((err: any) => {
          this.ngxSpinner.hide();
          this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
        })
      });
    }
  }

  compareFn(object1: any, object2: any) {
    console.log("jdghsdg pass or save time obj and getAll Obj",object1, object2);
    
    return object1 && object2 && object1.linkedDesignationId === object2.linkedDesignationId;
  }


  clearFilerForm(){
    this.desigId.setValue(0);
    this.textSearch.setValue('')
    this.getTableData();
  }

  clearForm(){
    this.formDirective.resetForm();
    this.editObj = null;
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
        case 'Edit':
          this.onEdit(obj);
          break;
          case 'Delete':
            this.globalDialogOpen(obj);
          break;
    }
  }

  downloadPdf(data: any, _flag?: any) {

    let keyHeader = ['Sr. No.', 'Designation Name', 'Designation Level', 'Action'];
    let apiKeys = ['srNo', this.langTypeName == 'English' ? 'designation' : 'm_Designation', this.langTypeName == 'English' ? 'designationLevel' : 'm_DesignationLevel', 'action'];
    // let headerKeySize = ['15', '25', '25', '30', '45', '30', '30'];
    let resultDownloadArr: any = [];

    data.find((res: any, i: any) => {
      let obj = {
        srNo: i + 1,
        "Designation Name": res.designation,
        "Designation Level": res.designationLevel
            }
      resultDownloadArr.push(obj);
    });
    if (resultDownloadArr.length > 0) {
      let keyPDFHeader = ['Sr. No.', 'Designation Name', 'Designation Level'];
      let ValueData =
        resultDownloadArr.reduce(
          (acc: any, obj: any) => [...acc, Object.values(obj).map((value) => value)], []
        );
      let objData: any = {
        'topHedingName': 'Designation List',
        'createdDate': 'Created on:' + this.datepipe.transform(new Date(), 'yyyy-MM-dd, h:mm a')
      }
      ValueData.length > 0 ? this.downloadPdfExcelService.downLoadPdf(keyPDFHeader, ValueData, objData) : ''
    }



  }

  onEdit(obj: any){
    this.editObj = obj;
    console.log("edit obj: ", this.editObj);
    this.defaultDesignationForm();
    // patch multisellect drop
    let arr = new Array;

    let model = this.editObj.linkedDesignationResponseModel
    if(model.length){
      for(let i= 0; i<model.length ;i++){
        let obj ={
          // "linkedDesignationLevelId": model[i]?.linkedDesignationLevelId,
          // "linkedDesignationId": model[i]?.linkedDesignationId,
          // "designationId": 0,     
          "id": model[i]?.linkedDesignationId,
          "designation": "",
          "m_Designation": "",
          "designationLevelId": model[i]?.linkedDesignationLevelId,
          "designationLevel": "",
          "m_DesignationLevel": ""
           }
           arr.push(obj);
      }
      this.getAllDesignationLevel(arr);

    }
  }

  globalDialogOpen(obj: any){
    let dialoObj = {
      title: this.webStorage.languageFlag == 'EN' ? 'Do You Want To Delete Designation Record?' : 'तुम्हाला पदनाम रेकॉर्ड हटवायचा आहे का?',
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
        this.deleteDesignation(obj);
      }
      this.highLightFlag=false;
      this.languageChange();
    });


  }


  deleteDesignation(obj: any){
    let webStorageMethod = this.webStorage.createdByProps();
    let deleteObj = {
      "id": obj.id,
      "deletedBy": webStorageMethod.modifiedBy,
      "modifiedDate": webStorageMethod.modifiedDate,
      "lan": this.webStorage.languageFlag
    }

    this.apiService.setHttp('delete', 'ZP-Education/Designation/DeleteDesignation', false, deleteObj, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if(res.statusCode == "200"){
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.getTableData();
        }
        else{
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1)
        }
      },
      error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorsService.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    });

  }







}
