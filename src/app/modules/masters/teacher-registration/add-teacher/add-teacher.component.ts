import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
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
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {
  teacherRegForm!: FormGroup;
  uploadImg: any;
  uploadImageFlag: boolean = false;
  districtArray = new Array();
  talukaArray = new Array();
  villageArray = new Array();
  centerArray = new Array();
  roleArray = new Array();
  qualificationArray = new Array();
  streamArray = new Array();
  degreeSpeArray = new Array();
  universityArray = new Array();
  schoolArray = new Array();
  classArray = new Array();
  genderArray = new Array();
  checked: boolean = false;
  age: number = 0;
  editObj: any;
  get f() { return this.teacherRegForm.controls }
  get tEdu() { return ((this.teacherRegForm.get('education') as FormGroup).controls) }
  get tExp() { return ((this.teacherRegForm.get('experience') as FormGroup).controls) }

  constructor(private fb: FormBuilder,
    private errorService: ErrorService,
    private commonMethod: CommonMethodService,
    private masterService: MasterService,
    private fileUpload: FileUploadService,
    public webStorage: WebStorageService,
    public validation: ValidationService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-GB"); // DD/MM/YYYY
  }

  ngOnInit() {
    this.formField();
    this.getGender();
    this.getDistrict();
    this.getTeacherRole();
    this.getEducationalQualification();
    this.getEducationalStream();
    this.getDegreeSpecialization();
    this.getUniversity();
  }

  formField() {
    this.teacherRegForm = this.fb.group({
      id: 0,
      teacherCode: [''],
      name: [''],
      m_Name: [''],
      genderId: 0,
      dob: [''],
      mobileNo: [''],
      emailId: [''],
      stateId: 0,
      current_DistrictId: 0,
      current_TalukaId: 0,
      current_VillageId: 0,
      currentAddress: [''],
      permanent_DistrictId: 0,
      permanent_TalukaId: 0,
      permanent_VillageId: 0,
      permanentAddress: [''],
      districtId: 0,
      talukaId: 0,
      centerId: 0,
      villageId: 0,
      schoolId: 0,
      designationId: 0,
      roleId: 0,
      joiningDate: [''],
      isClusterHead: false,
      officerId: 0,  //remain
      isClassTeacher: false,
      profilePhoto: [''],
      localId: 0,
      lan: [''],
      userId: 0,
      designationLevelId: 0,
      bitId: 0,
      kendraMobileNo: [''],
      kendraEmailId: [''],
      // beoMobileNo: [''],
      // beoEmailId: [''],
      isHeadMaster: false,
      teacherId: 0,
      // refId: 0,
      // password: [''],
      // userName: [''],
      ...this.webStorage.createdByProps(),
      education: this.fb.group({
        id: 0,
        teacherId: 0,
        educationQualificationId: 0,
        streamId: 0,
        degreeSpecializationId: 0,
        boardId: 0,
        universityId: 0,
        percentage: 0,
        passingYear: [''],
        ...this.webStorage.createdByProps(),
      }),
      experience: this.fb.group({
        id: 0,
        teacherId: 0,
        districtId: 0,
        talukaId: 0,
        centerId: 0,
        villageId: 0,
        schoolId: 0,
        designitionId: 0,
        joiningDate: new Date(),
        resignDate: new Date(),
        ...this.webStorage.createdByProps(),
      }),
      teacherStandardModel: [
        // {
        //   id: 0,
        //   teacherId: 0,
        //   standardId: 0,
        //   divisionId: 0,
        //   isClassTeacher: true,
        //   createdBy: this.webStorage.createdByProps().createdBy,
        //   modifiedBy: this.webStorage.createdByProps().modifiedBy,
        //   isDeleted: this.webStorage.createdByProps().modifiedBy
        // }
      ],
      standardTeacherModel: [
        // {
        //   id: 0,
        //   teacherId: 0,
        //   standardId: 0,
        //   divisionId: 0,
        //   isClassTeacher: true,
        //   createdBy: this.webStorage.createdByProps().createdBy,
        //   modifiedBy: this.webStorage.createdByProps().modifiedBy,
        //   isDeleted: this.webStorage.createdByProps().modifiedBy
        // }
      ],
      officerCenterSchoolModel: [
        // {
        //   id: 0,
        //   userId: 0,
        //   centerId: 0,
        //   centerSchoolId: 0,
        //   addUpdateBy: 0
        // }
      ]
    })
  }

  //#region ---------------------------------------------------- Dropdown Start here ---------------------------------------------------
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
    let districtId = this.teacherRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        (res.statusCode == "200" && this.teacherRegForm.value.districtId > 0) ? this.talukaArray = res.responseData : this.talukaArray = [];
      }
    });
  }

  getVillageByTalukaId() {
    this.villageArray = [];
    let talukaId = this.teacherRegForm.value.talukaId;
    if (talukaId > 0) {
      this.masterService.getAllVillageByTalukaId('', talukaId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
        }
      });
    }
  }

  getCenter() {
    this.centerArray = [];
    let talukaId = this.teacherRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
      }
    });
  }

  getVillage() {
    this.villageArray = [];
    let centerId = this.teacherRegForm.value.centerId;
    if (centerId > 0) {
      this.masterService.getAllVillage('', centerId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
        }
      });
    }
  }

  getTeacherRole() {
    this.roleArray = [];
    this.masterService.getAllDepenDesignationByLevelId('', '5').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.roleArray = res.responseData : this.roleArray = [];
      }
    });
  }

  getEducationalQualification() {
    this.qualificationArray = [];
    this.masterService.getAllEducationalQualification('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.qualificationArray = res.responseData : this.qualificationArray = [];
      }
    });
  }

  getEducationalStream() {
    this.streamArray = [];
    this.masterService.getAllEducationalStream('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.streamArray = res.responseData : this.streamArray = [];
      }
    });
  }

  getDegreeSpecialization() {
    this.degreeSpeArray = [];
    this.masterService.getAllDegreeSpecialization('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.degreeSpeArray = res.responseData : this.degreeSpeArray = [];
      }
    });
  }

  getUniversity() {
    this.universityArray = [];
    this.masterService.getAllUniversity('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.universityArray = res.responseData : this.universityArray = [];
      }
    });
  }

  getSchoolList() {
    this.schoolArray = [];
    let distId = this.teacherRegForm.value.districtId;
    let talukaId = this.teacherRegForm.value.talukaId;
    let centerId = this.teacherRegForm.value.centerId;
    let villageId = this.teacherRegForm.value.villageId;
    this.masterService.getAllSchool('', distId, talukaId, centerId, villageId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolArray = res.responseData : this.schoolArray = [];
      }
    });
  }

  getSchoolClasses() {
    this.classArray = [];
    let schoolId = this.teacherRegForm.value.schoolId;
    this.masterService.getAllSchoolClasses(schoolId, '').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.classArray = res.responseData : this.classArray = [];
      }
    });
  }

  getGender() {
    this.genderArray = [];
    this.masterService.getAllGender('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.genderArray = res.responseData : this.genderArray = [];
      }
    });
  }
  //#endregion--------------------------------------------------- Dropdown end here ----------------------------------------------------

  //#region ------------------------------------------------ Upload, view and delete Image start here ----------------------------------
  imgUpload(event: any) {
    let type = 'jpg, jpeg, png';
    this.fileUpload.uploadDocuments(event, 'Upload', type).subscribe({
      next: (res: any) => {

        if (res.statusCode == "200") {
          this.uploadImg = res.responseData;
          this.uploadImageFlag = true;

          this.teacherRegForm.value.profilePhoto = this.uploadImg;
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
      let viewImg = this.editObj.profilePhoto;
      this.uploadImg ? window.open(this.uploadImg, 'blank') : window.open(viewImg, 'blank')
    }
    else {
      window.open(this.uploadImg, 'blank');
    }
  }

  clearImg() {
    this.uploadImg = '';
    this.teacherRegForm.value.profilePhoto = '';
    this.f['profilePhoto'].setValue('');
    this.uploadImageFlag = false;
  }
  //#endregion ------------------------------------------------ Upload, view and delete Image end here ----------------------------------------

  //#region ------------------------------------------------ Address, age calculation methods start here --------------------------------------
  clearAddressCheckBox(event: any) {
    if (event.data == null) {
      this.checked = false;
      this.f['permanentAddress'].setValue('');
    }
  }

  setSameAddress(event: any) {
    this.checked = event.checked;
    if (this.checked == true) {
      let sameAddress = this.teacherRegForm.value.currentAddress
      this.f['permanentAddress'].setValue(sameAddress);
    } else {
      this.f['permanentAddress'].setValue('');
    }
  }

  CalculateAge() {
    let birthDate = this.teacherRegForm.value.birthDate
    if (birthDate) {
      var timeDiff = Math.abs(Date.now() - birthDate);
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }
  //#endregion ---------------------------------------------- Address, age calculation methods end here --------------------------------------

  //#region ----------------------------------------- Clear dropdown on change start here--------------------------------------------------
  clearDropdown(dropdown: string) {
    if (dropdown == 'district') {
      this.f['talukaId'].setValue('');
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.f['schoolId'].setValue('');
      this.centerArray = [];
      this.villageArray = [];
      this.schoolArray = [];
    }
    else if (dropdown == 'taluka') {
      this.f['centerId'].setValue('');
      this.f['villageId'].setValue('');
      this.f['schoolId'].setValue('');
      this.villageArray = [];
      this.schoolArray = [];
    }
    else if (dropdown == 'center') {
      this.f['villageId'].setValue('');
      this.f['schoolId'].setValue('');
      this.schoolArray = [];
    }
    else {
      this.f['schoolId'].setValue('');
    }
  }
  //#endregion----------------------------------------- Clear dropdown on change end here--------------------------------------------------

  //#region ---------------------------------------------- Submit start here -----------------------------------------------------------
  onSubmit() {
    let formValue = this.teacherRegForm.value;
    formValue.profilePhoto = this.uploadImg;

    let officerCenterSchoolModelArr: any = [];
    formValue?.officerCenterSchoolModel.forEach((x: any) => {
      let officerObj = {
          id: 0,       // verify with backend
          userId: 0,   // verify with backend
          centerId: x.id,
          centerSchoolId: 0, // verify with backend
          addUpdateBy: 0 // verify with backend
      }
      officerCenterSchoolModelArr.push(officerObj);
    })
    formValue.officerCenterSchoolModel = officerCenterSchoolModelArr;

    let teacherStandardModelArr: any = [];
    formValue?.teacherStandardModel.forEach((x: any) => {
      let teacherStdObj = {
          id: x.id,
          teacherId: 0,
          standardId: x.standardId,
          divisionId: x.divisionId,
          isClassTeacher: true, 
          createdBy: this.webStorage.createdByProps().createdBy,
          modifiedBy: this.webStorage.createdByProps().modifiedBy,
          isDeleted: this.webStorage.createdByProps().isDeleted
      }
      teacherStandardModelArr.push(teacherStdObj);
    })
    formValue.teacherStandardModel = teacherStandardModelArr;

    let standardTeacherModelArr: any = [];
    formValue?.standardTeacherModel.forEach((x: any) => {
      let stdTeacherObj = {
          id: x.id,
          teacherId: 0,
          standardId: x.standardId,
          divisionId: x.divisionId,
          isClassTeacher: true,
          createdBy: this.webStorage.createdByProps().createdBy,
          modifiedBy: this.webStorage.createdByProps().modifiedBy,
          isDeleted: this.webStorage.createdByProps().isDeleted
      }
      standardTeacherModelArr.push(stdTeacherObj);
    })
    formValue.standardTeacherModel = standardTeacherModelArr;

    
    console.log("formValue", formValue);
    // return

    let url = this.editObj ? 'UpdateTeacher' : 'AddTeacher';
    if (!this.teacherRegForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp(this.editObj ? 'put' : 'post', 'ZP-Education/Teacher/' + url, false, formValue, false, 'zp-Education');
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
  //#endregion ------------------------------------------- Submit end here -------------------------------------------------------------

}
