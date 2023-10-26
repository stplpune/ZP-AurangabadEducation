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
  imgArray = new Array();
  editObj: any;
  uploadImg: any;
  uploadMultipleImg: any;
  uploadImageFlag: boolean = false;

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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.data ? this.onEdit() : '';
    this.formField();
    this.getDistrict();
    this.getLowestGroupClass();
    this.getSchoolType();
    this.getSchoolManagement();
    this.getCategory();
    this.getMedium();
    this.getAreaArray();
  }

  formField() {
    this.schoolRegForm = this.fb.group({
      id: [this.data ? this.data.id : 0],
      schoolCode: [this.data ? this.data.schoolCode : '', [Validators.required]],
      schoolName: [this.data ? this.data.schoolName : '', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,\/()_-]+$')]],
      m_SchoolName: [this.data ? this.data.m_SchoolName : '', [Validators.required, Validators.pattern(this.validation.marathiAlphanumeric)]],
      stateId: 0,
      districtId: ['', Validators.required],
      talukaId: ['', Validators.required],
      villageId: ['', Validators.required],
      centerId: ['', Validators.required],
      isKendraSchool: [this.data ? this.data.isKendraSchool : false],
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

  getDistrict() {
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray = res.responseData : this.districtArray = [];
        this.data ? (this.f['districtId'].setValue(this.data.districtId), this.getTaluka()) : '';
      }
    });
  }

  getTaluka() {
    this.talukaArray = [];
    let districtId = this.schoolRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
        this.data ? (this.f['talukaId'].setValue(this.data.talukaId), this.getCenter(), this.getBit()) : '';
      }
    });
  }

  getBit() {
    this.bitArray = [];
    let talukaId = this.schoolRegForm.value.talukaId;
    this.masterService.getAllBit('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.bitArray = res.responseData : this.bitArray = [];
        this.data ? (this.f['bitId'].setValue(this.data.bitId)) : '';
      }
    });
  }

  getCenter() {
    this.centerArray = [];
    let talukaId = this.schoolRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
        this.data ? (this.f['centerId'].setValue(this.data.centerId), this.getVillage()) : '';
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
          this.data ? (this.f['villageId'].setValue(this.data.villageId)) : '';
        }
      });
    }
  }

  getSchoolType() {
    this.schoolTypeArray = [];
    this.masterService.getAllSchoolType('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolTypeArray = res.responseData : this.schoolTypeArray = [];
        this.data ? this.f['s_TypeId'].setValue(this.data.s_TypeId) : '';
      }
    });
  }

  getSchoolManagement() {
    this.schoolManagementArray = [];
    this.masterService.getAllSchoolManagement('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolManagementArray = res.responseData : this.schoolManagementArray = [];
        this.data ? this.f['s_ManagementId'].setValue(this.data.s_ManagementId) : '';
      }
    });
  }

  getCategory() {
    this.categoryArray = [];
    this.masterService.getAllCategory('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.categoryArray = res.responseData : this.categoryArray = [];
        this.data ? this.f['s_CategoryId'].setValue(this.data.s_CategoryId) : '';
      }
    });
  }

  getMedium() {
    this.mediumArray = [];
    this.masterService.getAllSchoolMedium('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.mediumArray = res.responseData : this.mediumArray = [];
        this.data ? this.f['s_MediumId'].setValue(this.data.s_MediumId) : '';
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
    this.data ? (this.f['lowestClass'].setValue(this.data.lowestClass), this.getHighestGroupClass()) : '';
  }

  getAreaArray() {
    this.areaArray = [
      { id: 1, area: 'Urban', m_area: 'शहरी' },
      { id: 2, area: 'Rural', m_area: 'ग्रामीण' }
    ];
    this.data ? this.f['S_AreaId'].setValue(this.data.s_AreaId) : '';
  }

  getHighestGroupClass() {
    this.f['highestClass'].setValue('');
    let lowestClass = this.schoolRegForm.value.lowestClass;

    let findObj = this.lowestGroupclassArray.filter((res: any) => {
      return res.lowestClass >= lowestClass
    })
    this.highestGroupclassArray = findObj;
    this.data ? this.f['highestClass'].setValue(this.data.highestClass) : '';
  }

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
    if (this.data) {
      let viewImg = this.data.uploadImage;
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
            this.imgArray.push(data)
          }
        }
        else {
          return
        }
      },
      //  error: ((err: any) => {  err.statusCode ? this.errors.handelError(err.statusCode):this.commonMethod.showPopup(err, 1) })
    });
  }

  clearMultipleImg(index: any) {
    this.imgArray.splice(index, 1);
  }

  onSubmit() {
    let formValue = this.schoolRegForm.value;
    formValue.uploadImage = this.uploadImg;
    formValue.schoolDocument = this.imgArray;
    formValue.isKendraSchool == false ? formValue.bitId = 0 : '';

    let url = this.data ? 'UpdateSchool' : 'AddSchool';
    if (!this.schoolRegForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp(this.data ? 'put' : 'post', 'ZP-Education/School/' + url, false, formValue, false, 'zp-Education');
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

  onEdit() {
    this.formField();
    this.f['uploadImage'].setValue(this.data?.uploadImage);
    this.uploadImg = this.data.uploadImage;
    this.uploadImg ? this.uploadImageFlag = true : this.uploadImageFlag = false;

    this.data.schoolDocument.filter((res: any) => {
      let schoolDocumentObj = {
        id: res.id,
        schoolId: res.schoolId,
        documentId: res.documentId,
        docPath: res.docPath,
        ...this.webStorage.createdByProps()
      }
      this.imgArray.push(schoolDocumentObj);
    })
  }

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

  updateValidation() {
    if (this.f['isKendraSchool'].value == true) {
      this.f['bitId'].setValidators(Validators.required);
    }
    else {
      this.f['bitId'].clearValidators();
    }
    this.f['bitId'].updateValueAndValidity();
  }

}
