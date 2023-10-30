import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MasterService } from 'src/app/core/services/master.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userRegForm!: FormGroup;
  levelArray = new Array();
  districtArray = new Array();
  talukaArray = new Array();
  desigLevelArray = new Array();
  centerArray = new Array();
  bitArray = new Array();
  uploadImg: any;
  uploadImageFlag: boolean = false;
  checked: boolean = false;
  get f() { return this.userRegForm.controls }

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    public webStorage: WebStorageService,
    private fileUpload: FileUploadService,
    private errorService: ErrorService,
    private commonMethod: CommonMethodService) { }

  ngOnInit() {
    this.formField();
    this.getDesignationLevel();
    this.getDistrict();
  }

  formField() {
    this.userRegForm = this.fb.group({
      id: 0,
      name: [''],
      m_Name: [''],
      mobileNo: [''],
      emailId: [''],
      genderId: 0,
      dob: [''],
      address: [''],
      schoolId: 0,
      designationLevelId: 0,
      designationId: 0,
      stateId: 0,
      districtId: 0,
      talukaId: 0,
      kendraMobileNo: [''],
      kendraEmailId: [''],
      beoEmailId: [''],
      beoMobileNo: [''],
      bitId: 0,
      centerId: 0,
      agencyId: 0,
      userId: 0,
      uploadImage: [''],
      isHeadMaster: false,
      teacherId: 0,
      currentAddress: [''], //extra
      permentAddress: [''], //extra
      isClassTeacher: false,//extra
      officerCenterSchoolModel: [
        {
          id: 0,
          userId: 0,
          centerId: 0,
          centerSchoolId: 0,
          addUpdateBy: 0
        }
      ],
      lan: this.webStorage.languageFlag,
      ...this.webStorage.createdByProps()
    })
  }


  //#region ----------------------------------------------- Dropdown with dependencies start from here -------------------------------------
  getDesignationLevel() {
    this.levelArray = [];
    this.masterService.getAllDesignationLevel('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.levelArray = res.responseData) : this.levelArray = [];
      },
    });
  }

  getDistrict() {
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray = res.responseData : this.districtArray = [];
      }
    });
  }

  getTaluka() {
    this.talukaArray = [];
    let districtId = this.userRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
      }
    });
  }

  getDesignationByLevelId() {
    this.desigLevelArray = [];
    let desigLevelId = this.userRegForm.value.designationLevelId;
    this.masterService.getAllDepenDesignationByLevelId('', desigLevelId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.desigLevelArray = res.responseData : this.desigLevelArray = [];
      }
    });
  }

  getCenter() {
    this.centerArray = [];
    let talukaId = this.userRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
      }
    });
  }

  getBit() {
    this.bitArray = [];
    let talukaId = this.userRegForm.value.talukaId;
    this.masterService.getAllBit('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.bitArray = res.responseData : this.bitArray = [];
      }
    });
  }
  //#endregion ------------------------------------------ Dropdown with dependencies end from here ----------------------------------------

  //#region ------------------------------------------- Image upload, view and delete start here ------------------------------------------
  imgUpload(event: any) {
    let type = 'jpg, jpeg, png';
    this.fileUpload.uploadDocuments(event, 'Upload', type).subscribe({
      next: (res: any) => {

        if (res.statusCode == "200") {
          this.uploadImg = res.responseData;
          this.uploadImageFlag = true;

          this.userRegForm.value.uploadImage = this.uploadImg;
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
    // if (this.editObj) {
    //   let viewImg = this.editObj.uploadImage;
    //   this.uploadImg ? window.open(this.uploadImg, 'blank') : window.open(viewImg, 'blank')
    // }
    // else {
      window.open(this.uploadImg, 'blank');
    // }
  }

  clearImg() {
    this.uploadImg = '';
    this.userRegForm.value.uploadImage = '';
    this.f['uploadImage'].setValue('');
    this.uploadImageFlag = false;
  }
  //#endregion ---------------------------------------- Image upload, view and delete end here --------------------------------------------

  addSameAddress(event: any) {
    this.checked = event.checked;
    if (this.checked == true) {
      let sameAddress = this.userRegForm.value.currentAddress
      this.f['permentAddress'].setValue(sameAddress);
    } else {
      this.f['permentAddress'].setValue('');
    }
  }

}
