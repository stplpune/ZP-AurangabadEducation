import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
export interface PeriodicElement {
  srno: any;
  Designation: any;
  DesignationLevel: any;
  Linkedto: any;
  Action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, Designation: 'Teacher', DesignationLevel: 'School', Linkedto: 'Head Master', Action: 'H'},
  {srno: 2, Designation: 'Head Master', DesignationLevel: 'Kendra', Linkedto: 'Cluster Resource Person', Action: 'H'},
  {srno: 3, Designation: 'IED Teacher', DesignationLevel: 'Taluka', Linkedto: 'Block Resource Person', Action: 'H'},
];
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.scss']
})
export class DesignationMasterComponent {
  displayedColumns: string[] = ['srno', 'designation', 'designationLevel', 'Action'];
  dataSource = ELEMENT_DATA;
  desigId = new FormControl(0);
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


  constructor(private webStorage: WebStorageService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService,
    private errorsService: ErrorService){

  }

  ngOnInit(){
    this.webStorage.langNameOnChange.subscribe(lang => {
      this.langTypeName = lang;
      this.languageChange();
    });
    this.getTableData()
    
  }

  getTableData(flag?: string){
    this.ngxSpinner.show();
    this.pageNumber = flag == 'filter' ? 1 : this.pageNumber;
    
    let str = `ZP-Education/Designation/GetAll?DesignationLevelId=${this.desigId.value}&PageNo=${this.pageNumber}&PageSize=10&lan=${this.webStorage.languageFlag}`;
    let reportStr = `ZP-Education/Designation/GetAll?DesignationLevelId=${this.desigId.value}pageno=1&pagesize=${(this.totalCount * 10)}&lan=${this.webStorage.languageFlag}`

    this.apiService.setHttp('get', 'ZP-Education/Designation/GetAll?' + (flag == 'pdfFlag' ? reportStr : str), false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        if(res.statusCode == "200"){
          flag != 'pdfFlag' ? this.tableDataArray = res.responseData?.responseData1 : this.tableDataArray = this.tableDataArray;
          this.totalCount = res.responseData.responseData2.pageCount;
          this.tableDatasize = res.responseData.responseData2.pageCount;
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
    this.highLightFlag?this.tableData.highlightedrow=true:this.tableData.highlightedrow=false,
    this.apiService.tableData.next(this.tableData);
  }

  childCompInfo(obj: any){
    switch(obj.label){
      case 'Pagination':
      this.pageNumber = obj.pageNumber;
        this.getTableData();
        break;
    }
  }

  downloadPdf(data: any){

  }







}
