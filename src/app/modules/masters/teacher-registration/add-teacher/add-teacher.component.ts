import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  boardArray = new Array();
  universityArray = new Array();
  schoolArray = new Array();
  classArray = new Array();
  genderArray = new Array();
  checked: boolean = false;
  age: number = 0;
  editObj: any;
  editFlag: boolean = false;
  date = new Date();
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
    this.initialDropdown();
    this.data ? this.onEdit(this.data.id, this.data.flag) : '';
    console.log("onEdit : ", this.data);
  }

  formField() {
    this.teacherRegForm = this.fb.group({
      id: [this.editObj ? this.editObj.id : 0],
      teacherCode: [this.editObj ? this.editObj.teacherCode : '', Validators.required],
      name: [this.editObj ? this.editObj.name : '', Validators.required],
      m_Name: [this.editObj ? this.editObj.m_Name : '', Validators.required],
      genderId: ['', Validators.required],
      dob: [this.editObj ? this.editObj.dob : '', Validators.required],
      mobileNo: [this.editObj ? this.editObj.mobileNo : '', [Validators.required, Validators.pattern(this.validation.mobile_No)]],
      emailId: [this.editObj ? this.editObj.emailId : ''],
      stateId: 0,
      current_DistrictId: 0,
      current_TalukaId: 0,
      current_VillageId: 0,
      currentAddress: [this.editObj ? this.editObj.currentAddress : ''],
      permanent_DistrictId: 0,
      permanent_TalukaId: 0,
      permanent_VillageId: 0,
      permanentAddress: [this.editObj ? this.editObj.permanentAddress : ''],
      districtId: 0,
      talukaId: 0,
      centerId: 0,
      villageId: 0,
      schoolId: [this.editObj ? this.editObj.schoolId : 0],
      designationId: 0,
      roleId: 0,
      joiningDate: [this.editObj ? this.editObj.joiningDate : ''],
      isClusterHead: [this.editObj ? this.editObj.isClusterHead : false],
      officerId: 0,  //remain
      isClassTeacher: [this.editObj ? this.editObj.isClassTeacher : false],
      profilePhoto: [''],
      localId: 0,
      lan: [''],
      userId: 0,
      designationLevelId: 0,
      bitId: 0,
      kendraMobileNo: [this.editObj ? this.editObj.kendraMobileNo : '', [Validators.pattern(this.validation.mobile_No)]],
      kendraEmailId: [this.editObj ? this.editObj.kendraEmailId : ''],
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
        percentage: [this.editObj ? this.editObj?.educationres?.percentage : ''],
        passingYear: [this.editObj ? this.editObj?.educationres?.passingYear : ''],
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
      classTeacherModel: [
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

  initialDropdown() {
    this.formField();
    this.getDistrict();
    this.getGender();
    this.getTeacherRole();
    this.getEducationalQualification();
    this.getEducationalStream();
    this.getDegreeSpecialization();
    this.getBoard();
    this.getUniversity();
  }

  //#region ---------------------------------------------------- Dropdown Start here ---------------------------------------------------
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
    let districtId = this.teacherRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
        this.editObj ? (this.f['talukaId'].setValue(this.editObj.talukaId), this.getCenter()) : '';
      }
    });
  }

  getCenter(obj?: any) {
    this.centerArray = [];
    let talukaId = this.teacherRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
        this.editObj ? (this.f['centerId'].setValue(this.editObj.centerId), this.getVillage()) : '';
        obj ? this.f['officerCenterSchoolModel'].setValue(obj) : '';
      }
    });
  }

  getVillage() {
    this.villageArray = [];
    let centerId = this.teacherRegForm.value.centerId;
    this.masterService.getAllVillage('', centerId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
        this.editObj ? (this.f['villageId'].setValue(this.editObj.villageId), this.getSchoolList()) : '';
      }
    });
  }

  getTeacherRole() {
    this.roleArray = [];
    this.masterService.getAllDepenDesignationByLevelId('', '5').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.roleArray = res.responseData : this.roleArray = [];
        this.editObj ? (this.f['roleId'].setValue(this.editObj.roleId)) : '';
      }
    });
  }

  getEducationalQualification() {
    this.qualificationArray = [];
    this.masterService.getAllEducationalQualification('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.qualificationArray = res.responseData : this.qualificationArray = [];
        this.editObj ? (this.tEdu['educationQualificationId'].setValue(this.editObj?.educationres?.educationQualificationId)) : '';
      }
    });
  }

  getEducationalStream() {
    this.streamArray = [];
    this.masterService.getAllEducationalStream('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.streamArray = res.responseData : this.streamArray = [];
        this.editObj ? (this.tEdu['streamId'].setValue(this.editObj?.educationres?.streamId)) : '';
      }
    });
  }

  getDegreeSpecialization() {
    this.degreeSpeArray = [];
    this.masterService.getAllDegreeSpecialization('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.degreeSpeArray = res.responseData : this.degreeSpeArray = [];
        this.editObj ? (this.tEdu['degreeSpecializationId'].setValue(this.editObj?.educationres?.degreeSpecializationId)) : '';
      }
    });
  }

  getBoard() {
    this.boardArray = [];
    this.masterService.getAllBoard('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.boardArray = res.responseData : this.boardArray = [];
        this.editObj ? (this.tEdu['boardId'].setValue(this.editObj?.educationres?.boardId)) : '';
      }
    });
  }

  getUniversity() {
    this.universityArray = [];
    this.masterService.getAllUniversity('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.universityArray = res.responseData : this.universityArray = [];
        // this.editObj ? (this.tEdu['DegreeUniversity'].setValue(this.editObj?.educationres?.universityId)) : '';
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
        this.editObj ? (this.f['schoolId'].setValue(this.editObj.schoolId)) : '';
      }
    });
  }

  getSchoolClasses(obj?: any, flag?: string) {
    console.log("schoolId: ", this.teacherRegForm.value.schoolId);
    console.log("getSchoolClasses obj: ", obj);

    this.classArray = [];
    let schoolId = this.teacherRegForm.value.schoolId;
    this.masterService.getAllSchoolClasses(schoolId, '').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.classArray = res.responseData : this.classArray = [];
        (obj && flag == 'assignClass') ? (console.log("value: ", this.f['teacherStandardModel'].value, obj),this.f['teacherStandardModel'].setValue(obj)) : '';
        (obj && flag == 'classTeacher') ? (console.log("value: ", this.f['classTeacherModel'].value, obj),this.f['classTeacherModel'].setValue(obj)) : '';
      }
    });
  }

  getGender() {
    this.genderArray = [];
    this.masterService.getAllGender('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.genderArray = res.responseData : this.genderArray = [];
        this.editObj ? (this.f['genderId'].setValue(this.editObj.genderId)) : '';
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

  //#region ---------------------------------------------- Submit and Edit start here ------------------------------------------------------
  onSubmit() {
    let formValue = this.teacherRegForm.value;
    console.log("formValue", formValue);
    // return
    
    formValue.profilePhoto = this.uploadImg;

    let officerCenterSchoolModelArr: any = [];
    formValue?.officerCenterSchoolModel?.forEach((x: any) => {
      let officerObj = {
        id: 0,       // verify with backend
        userId: 0,   // verify with backend
        centerId: x.id,
        centerSchoolId: this.teacherRegForm.value.schoolId, // verify with backend
        addUpdateBy: 0 // verify with backend
      }
      officerCenterSchoolModelArr.push(officerObj);
    })
    formValue.officerCenterSchoolModel = officerCenterSchoolModelArr;

    let classTeacherModelArr: any = [];
    formValue?.classTeacherModel?.forEach((x: any) => {
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
      classTeacherModelArr.push(teacherStdObj);
    })
    formValue.classTeacherModel = classTeacherModelArr;

    let teacherStandardModelArr: any = [];
    formValue?.teacherStandardModel?.forEach((x: any) => {
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
      teacherStandardModelArr.push(stdTeacherObj);
    })
    formValue.teacherStandardModel = teacherStandardModelArr;

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

  onEdit(id: number, flag: any) {
    flag == 'View' ? this.editFlag = false : this.editFlag = true;
    this.apiService.setHttp('get', 'ZP-Education/Teacher/GetTeacherById?Id=' + id, false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.editObj = res.responseData;
          console.log("editObj: ", this.editObj);

          if (flag == 'Edit') {
            this.initialDropdown();
            this.uploadImg = this.editObj?.profilePhoto;
            this.uploadImg ? this.uploadImageFlag = true : this.uploadImageFlag = false;
            this.editObj?.currentAddress == this.editObj?.permanentAddress ? this.checked = true : this.checked = false;

            let teacherStdModel = this.editObj?.teacherStandardsres;
            
            let teacherStdArr = new Array();
            if (teacherStdModel?.length) {
              for (let i = 0; i < teacherStdModel.length; i++) {
                let obj = {
                  // id: teacherStdModel[i].id,
                  // teacherId: teacherStdModel[i].teacherId,
                  // standardId: teacherStdModel[i].standardId,
                  // divisionId: teacherStdModel[i].divisionId,
                  // isClassTeacher: teacherStdModel[i].isClassTeacher,
                  // createdBy: this.webStorage.createdByProps().createdBy,
                  // modifiedBy: this.webStorage.createdByProps().modifiedBy,
                  // isDeleted: this.webStorage.createdByProps().modifiedBy

                  id: teacherStdModel[i].id,
                  schoolId: this.teacherRegForm.value.schoolId,
                  standardId: teacherStdModel[i].standardId,
                  divisionId: teacherStdModel[i].divisionId,
                  // classDivision: Second (A),
                  // m_ClassDivision: दुसरी (अ)

                  
                }
                teacherStdArr.push(obj);
                console.log("teacherStdArr", teacherStdArr);
              }
              this.getSchoolClasses(teacherStdArr, 'assignClass');
            }

            let classStdModel = this.editObj?.classTeacherres;
            let classStdArr = new Array();
            if(classStdModel?.length){
              for(let i = 0; i < classStdModel.length; i++){
                let obj = {
                  // id: classStdModel[i].id,
                  // teacherId: classStdModel[i].teacherId,
                  // standardId: classStdModel[i].standardId,
                  // divisionId: classStdModel[i].divisionId,
                  // isClassTeacher: true,
                  // createdBy: this.webStorage.createdByProps().createdBy,
                  // modifiedBy: this.webStorage.createdByProps().modifiedBy,
                  // isDeleted: this.webStorage.createdByProps().modifiedBy

                  id: classStdModel[i].id,
                  schoolId: this.teacherRegForm.value.schoolId,
                  standardId: classStdModel[i].standardId,
                  divisionId: classStdModel[i].divisionId,
                }
                classStdArr.push(obj);
              }
              console.log("classStdArr", classStdArr);              
              this.getSchoolClasses(classStdArr, 'classTeacher');
            }

            let officerCenterModel = this.editObj?.centerSchoolModelRes;
            let officerCenterArr = new Array();
            if (officerCenterModel?.length) {
              for (let i = 0; i < officerCenterModel.length; i++) {
                let obj = {
                  id: officerCenterModel[i].id,
                  userId: officerCenterModel[i].userId,
                  centerId: officerCenterModel[i].centerId,
                  centerSchoolId: officerCenterModel[i].centerSchoolId,
                  addUpdateBy: 0
                }
                officerCenterArr.push(obj);
              }
              this.getCenter(officerCenterArr);
            }
          }
        }
      }
    })
  }

  compareFn(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
  }

  //#endregion ------------------------------------------- Submit and Edit end here -------------------------------------------------------------



}
