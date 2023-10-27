import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent {

  schoolRegForm!: FormGroup;
  districtArray = new Array();
  talukaArray = new Array();
  bitArray = new Array();
  centerArray = new Array();
  villageArray = new Array();
  schoolTypeArray = new Array();
  categoryArray = new Array();
  mediumArray = new Array();
  schoolManagementArray = new Array();
  lowestGroupclassArray = new Array();
  highestGroupclassArray = new Array();
  areaArray = new Array();
  docArray = new Array();
  editObj: any;
  uploadImg: any;
  uploadMultipleImg: any;
  uploadImageFlag: boolean = false;
  editFlag: boolean = false;
  editId: any;
  get f() { return this.schoolRegForm?.controls }

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    public webStorage: WebStorageService,
    public validation: ValidationService,
    private commonMethod: CommonMethodService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private errorService: ErrorService,
    private fileUpload: FileUploadService,
    private dialogRef: MatDialogRef<AddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data ? this.onEdit(this.data.id, this.data.flag) : '';
    this.initialDropdown();
  }

  formField() {
    this.schoolRegForm = this.fb.group({
      id: [this.editObj ? this.editObj.id : 0],
      schoolCode: [this.editObj ? this.editObj.schoolCode : '', [Validators.required]],
      schoolName: [this.editObj ? this.editObj.schoolName : '', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,\/()_-]+$')]],
      m_SchoolName: [this.editObj ? this.editObj.m_SchoolName : '', [Validators.required, Validators.pattern(this.validation.marathiAlphanumeric)]],
      stateId: 0,
      districtId: ['', Validators.required],
      talukaId: ['', Validators.required],
      villageId: ['', Validators.required],
      centerId: ['', Validators.required],
      isKendraSchool: [this.editObj ? this.editObj.isKendraSchool : false],
      bitId: [''],
      s_CategoryId: ['', Validators.required],
      s_ManagementId: ['', Validators.required],
      s_TypeId: ['', Validators.required],
      s_MediumId: ['', Validators.required],
      uploadImage: [''],
      lan: this.webStorage.languageFlag,
      // localID: 0,
      lowestClass: ['', Validators.required],
      highestClass: ['', Validators.required],
      S_AreaId: ['', Validators.required],
      timesStamp: new Date(),
      vName: [''],
      schoolDocument: this.fb.array([
        this.fb.group({
          id: 0,
          schoolId: 0,
          documentId: 3,
          docPath: [''],
          ...this.webStorage.createdByProps()
        })
      ]),
      ...this.webStorage.createdByProps()
    });
  }

  get multipleImg(): FormArray {
    return this.schoolRegForm.get('schoolDocument') as FormArray;
  }

  initialDropdown() {
    this.formField();
    this.getDistrict();
    this.getLowestGroupClass();
    this.getSchoolType();
    this.getSchoolManagement();
    this.getCategory();
    this.getMedium();
    this.getAreaArray();
  }

  //#region -------------------------------------------- Dropdown with dependencies start here-------------------------------------------------
  getDistrict() {
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray = res.responseData : this.districtArray = [];
        this.editObj ? (this.f['districtId'].setValue(this.editObj.districtId), this.getTaluka()) : '';
      }
    });
  }

  getTaluka() {
    this.talukaArray = [];
    let districtId = this.schoolRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
        this.editObj ? (this.f['talukaId'].setValue(this.editObj.talukaId), this.getCenter(), this.getBit()) : '';
      }
    });
  }

  getBit() {
    this.bitArray = [];
    let talukaId = this.schoolRegForm.value.talukaId;
    this.masterService.getAllBit('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.bitArray = res.responseData : this.bitArray = [];
        this.editObj ? (this.f['bitId'].setValue(this.editObj.bitId)) : '';
      }
    });
  }

  getCenter() {
    this.centerArray = [];
    let talukaId = this.schoolRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
        this.editObj ? (this.f['centerId'].setValue(this.editObj.centerId), this.getVillage()) : '';
      }
    });
  }

  getVillage() {
    this.villageArray = [];
    let centerId = this.schoolRegForm.value.centerId;
    if (centerId > 0) {
      this.masterService.getAllVillage('', centerId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
          this.editObj ? (this.f['villageId'].setValue(this.editObj.villageId)) : '';
        }
      });
    }
  }

  getSchoolType() {
    this.schoolTypeArray = [];
    this.masterService.getAllSchoolType('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolTypeArray = res.responseData : this.schoolTypeArray = [];
        this.editObj ? this.f['s_TypeId'].setValue(this.editObj.s_TypeId) : '';
      }
    });
  }

  getSchoolManagement() {
    this.schoolManagementArray = [];
    this.masterService.getAllSchoolManagement('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolManagementArray = res.responseData : this.schoolManagementArray = [];
        this.editObj ? this.f['s_ManagementId'].setValue(this.editObj.s_ManagementId) : '';
      }
    });
  }

  getCategory() {
    this.categoryArray = [];
    this.masterService.getAllCategory('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.categoryArray = res.responseData : this.categoryArray = [];
        this.editObj ? this.f['s_CategoryId'].setValue(this.editObj.s_CategoryId) : '';
      }
    });
  }

  getMedium() {
    this.mediumArray = [];
    this.masterService.getAllSchoolMedium('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.mediumArray = res.responseData : this.mediumArray = [];
        this.editObj ? this.f['s_MediumId'].setValue(this.editObj.s_MediumId) : '';
      }
    });
  }

  getLowestGroupClass() {
    this.lowestGroupclassArray = [
      { lowestClass: 1, value: 1 },
      { lowestClass: 2, value: 2 },
      { lowestClass: 3, value: 3 },
      { lowestClass: 4, value: 4 },
      { lowestClass: 5, value: 5 },
      { lowestClass: 6, value: 6 },
      { lowestClass: 7, value: 7 },
      { lowestClass: 8, value: 8 },
    ];
    this.editObj ? (this.f['lowestClass'].setValue(this.editObj.lowestClass), this.getHighestGroupClass()) : '';
  }

  getAreaArray() {
    this.areaArray = [
      { id: 1, area: 'Urban', m_area: 'शहरी' },
      { id: 2, area: 'Rural', m_area: 'ग्रामीण' }
    ];
    this.editObj ? this.f['S_AreaId'].setValue(this.editObj.s_AreaId) : '';
  }

  getHighestGroupClass() {
    this.f['highestClass'].setValue('');
    let lowestClass = this.schoolRegForm.value.lowestClass;

    let findObj = this.lowestGroupclassArray.filter((res: any) => {
      return res.lowestClass >= lowestClass
    })
    this.highestGroupclassArray = findObj;
    this.editObj ? this.f['highestClass'].setValue(this.editObj.highestClass) : '';
  }
  //#endregion------------------------------------------ Dropdown with dependencies end here------------------------------------------------

  //#region --------------------------------- Upload, view, delete img and multiple document start here-------------------------------------
  imgUpload(event: any) {
    let type = 'jpg, jpeg, png';
    this.fileUpload.uploadDocuments(event, 'Upload', type).subscribe({
      next: (res: any) => {

        if (res.statusCode == "200") {
          this.uploadImg = res.responseData;
          this.uploadImageFlag = true;

          this.schoolRegForm.value.uploadImage = this.uploadImg;
          this.commonMethod.matSnackBar(res.statusMessage, 0);
        }
        else {
          return
        }
      },
      error: ((err: any) => { err.statusCode ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err, 1) })
    });
  }

  viewImg() {
    if (this.editObj) {
      let viewImg = this.editObj.uploadImage;
      this.uploadImg ? window.open(this.uploadImg, 'blank') : window.open(viewImg, 'blank')
    }
    else {
      window.open(this.uploadImg, 'blank');
    }
  }

  clearImg() {
    this.uploadImg = '';
    this.schoolRegForm.value.uploadImage = '';
    this.f['uploadImage'].setValue('');
    this.uploadImageFlag = false;
  }

  multipleImgUpload(event: any) {
    this.fileUpload.uploadMultipleDocument(event, 'Upload', 'jpg, jpeg, png').subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.uploadMultipleImg = res.responseData;
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          // multiple image 
          let imgArr = this.uploadMultipleImg.split(',')
          for (let i = 0; i < imgArr.length; i++) {
            let data = {
              id: 0,
              schoolId: 0,
              documentId: 0,
              eventId: 0,
              docPath: imgArr[i],
              ...this.webStorage.createdByProps()
            }
            this.docArray.push(data)
          }
        }
        else {
          return
        }
      },
      //  error: ((err: any) => {  err.statusCode ? this.errors.handelError(err.statusCode):this.commonMethod.showPopup(err, 1) })
    });
  }

  clearMultipleDoc(index: any) {
    this.docArray.splice(index, 1);
  }

  onViewDoc(index: any) {
    window.open(this.docArray[index].docPath, 'blank');
  }
  //#endregion--------------------------------- Upload, view, delete img and multiple document end here-------------------------------------

  //#region -------------------------------------------- Submit and Edit start here-----------------------------------------------------
  onSubmit() {
    let formValue = this.schoolRegForm.value;
    formValue.uploadImage = this.uploadImg;
    formValue.schoolDocument = this.docArray;
    formValue.isKendraSchool == false ? formValue.bitId = 0 : '';

    let url = this.editObj ? 'UpdateSchool' : 'AddSchool';
    if (!this.schoolRegForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp(this.editObj ? 'put' : 'post', 'ZP-Education/School/' + url, false, formValue, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          res.statusCode == "200" ? (this.commonMethod.matSnackBar(res.statusMessage, 0), this.dialogRef.close('yes')) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        },
        error: ((err: any) => {
          this.ngxSpinner.hide();
          this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
        })
      })
    }
  }

  onEdit(id: number, flag: any) {
    flag == 'View' ? this.editFlag = false : this.editFlag = true;
    this.apiService.setHttp('get', 'ZP-Education/School/GetById?Id=' + id + '&lan=' + this.webStorage.languageFlag, false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if(res.statusCode == "200"){
        this.editObj = res.responseData;

        if (flag == 'Edit') {
          this.initialDropdown();
          this.uploadImg = this.editObj?.uploadImage;
          this.uploadImg ? this.uploadImageFlag = true : this.uploadImageFlag = false;
          this.editObj?.schoolDocument.filter((res: any) => {
            let schoolDocumentObj = {
              id: res.id,
              schoolId: res.schoolId,
              documentId: res.documentId,
              docPath: res.docPath,
              ...this.webStorage.createdByProps()
            }
            this.docArray.push(schoolDocumentObj);
          })
        }
        else {
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : '';
        }
        }
      }
    })
  }
  //#endregion-------------------------------------------- Submit and Edit end here-----------------------------------------------------

  //#region ----------------------------------------- Clear dropdown on change start here--------------------------------------------------
  clearDropdown(dropdown: string) {
    if (dropdown == 'district') {
      this.f['talukaId'].setValue('');
      this.f['bitId'].setValue('');
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.bitArray = [];
      this.centerArray = [];
      this.villageArray = [];
    }
    else if (dropdown == 'taluka') {
      this.f['bitId'].setValue('');
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.villageArray = [];
    }
    else if (dropdown == 'kendra') {
      this.f['villageId'].setValue('');
    }
    else {
      this.f['highestClass'].setValue('');
    }
  }
  //#endregion----------------------------------------- Clear dropdown on change end here--------------------------------------------------

  //#region ------------------------------------- Update validation on isKendra School start here-------------------------------------------
  updateValidation() {
    if (this.f['isKendraSchool'].value == true) {
      this.f['bitId'].setValidators(Validators.required);
      this.f['bitId'].setValue('');
      this.editObj.bitId = '';
    }
    else {
      this.f['bitId'].clearValidators();
    }
    this.f['bitId'].updateValueAndValidity();
  }
  //#endregion------------------------------------- Update validation on isKendra School end here-------------------------------------------

}
