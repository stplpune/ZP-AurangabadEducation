import { NgSwitch } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AesencryptDecryptService } from 'src/app/core/services/aesencrypt-decrypt.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ValidationService } from 'src/app/core/services/validation.service';
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
  talukaArraySecond = new Array();
  centerArraySecond = new Array();
  villageArray = new Array();
  educationQualArr = new Array();
  streamArr = new Array();
  degreeArr = new Array();
  schoolArr = new Array();
  roleArr = new Array();
  genderArr = new Array();
  universityArr = new Array();
  boardArr = new Array();
  schoolClasArr = new Array();
  uploadImg: any;
  uploadImageFlag: boolean = false;
  checked: boolean = false;
  age!: number;
  editObj: any;
  officerId: any
  // ClassTeacherId!: number
  // assignClassId!: number

  get f() { return this.userRegForm.controls }

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    public webStorage: WebStorageService,
    private fileUpload: FileUploadService,
    private errorService: ErrorService,
    private commonMethod: CommonMethodService,
    public validation: ValidationService,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private AESEncryptDecryptService: AesencryptDecryptService ) { }

  ngOnInit() {
    this.formField();
    this.getDataFromUrl()
    this.getDesignationLevel();
    this.getDistrict();
    this.getGender();
  }
  getDataFromUrl(){
    this.route.queryParams.subscribe((queryParams: any) => {
      this.officerId = queryParams['id'];
    });
    let officeId = parseInt(this.AESEncryptDecryptService.decrypt(`${decodeURIComponent(this.officerId)}`));
    officeId > 0 ? this.getUserDatabyId(officeId) :'';
  }

  formField() {
    this.userRegForm = this.fb.group({
      id: [0],
      name: [this.editObj ? this.editObj.name :''],
      m_Name: [this.editObj ? this.editObj.m_Name : ''],
      mobileNo: [this.editObj ? this.editObj.mobileNo : ''],
      emailId: [this.editObj ? this.editObj.emailId :''],
      genderId: [0],
      dob: [this.editObj ? this.editObj.dob : ''],
      address: [this.editObj ? this.editObj.address : ''],
      schoolId: [0], //??
      designationLevelId: [0],
      designationId: [0],
      stateId: [0],
      districtId: 0,
      talukaId: 0,
      kendraMobileNo: [this.editObj ? this.editObj.kendraMobileNo : ''],
      kendraEmailId: [this.editObj ? this.editObj.kendraEmailId : ''],
      beoEmailId: [this.editObj ? this.editObj.beoEmailId : ''],
      beoMobileNo: [this.editObj ? this.editObj.beoMobileNo : ''],
      bitId: [0],
      centerId: [0],
      agencyId: [0],
      o_UserId: [0],
      profilePhoto: [''],
      isHeadMaster: [this.editObj ? this.editObj.isHeadMaster:false],
      teacherId: [0], //??
      currentAddress: [this.editObj ? this.editObj.currentAddress: ''],
      permanentAddress: [this.editObj ? this.editObj.permanentAddress: ''],
      isClassTeacher: [this.editObj ? this.editObj.isClassTeacher :false],
      officerCenterSchoolModel: [],
      teacherCode: [""],
      current_DistrictId: [0],
      current_TalukaId: [0],
      current_VillageId: [0],
      permanent_DistrictId: [0],
      permanent_TalukaId: [0],
      permanent_VillageId: [0],
      t_DistrictId: [0],
      t_TalukaId: [0],
      t_CenterId: [0],
      t_VillageId: [0],
      t_SchoolId: [0],
      t_DesignationLevelId: [0], //??
      t_DesignationId: [0], //??
      t_RoleId: [0], //??
      joiningDate: [],
      isClusterHead: [true], // for is headmaster if true then show this true
      officerId: [0],
      t_UserId: [0], //??
      teacherClassesModel: [],
      educationQualificationId: [0],
      streamId: [0],
      degreeSpecializationId: [0],
      boardId: [0],
      universityId: [0],
      percentage: [""],
      passingYear: [""],
      localId: [0],
      lan: this.webStorage.languageFlag,
      ...this.webStorage.createdByProps(),
      ClassTeacherId: [],
      assignClassId: []
    })
  }


  //#region ----------------------------------------------- Dropdown with dependencies start from here -------------------------------------
  getDesignationLevel() {
    this.levelArray = [];
    this.masterService.getAllDesignationLevel('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.levelArray = res.responseData) : this.levelArray = [];
        this.editObj ? (this.f['designationLevelId'].setValue(this.editObj.designationLevelId), this.getDesignationByLevelId()) : '';

      },
    });
  }

  getGender() {
    this.genderArr = [];
    this.masterService.getAllGender('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? (this.genderArr = res.responseData) : this.genderArr = [];
        this.editObj ? this.f['genderId'].setValue(this.editObj.genderId) : ''
      },
    });
  }

  getDistrict() {
    this.districtArray = [];
    this.masterService.getAllDistrict('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.districtArray = res.responseData : this.districtArray = [];
        this.editObj ? (this.f['districtId'].setValue(this.editObj.districtId), this.f['t_DistrictId'].setValue(this.editObj.t_DistrictId),
        this.getTaluka('Taluka') ): ''
      }
    });
  }

  getTaluka(label?: string) {
    this.talukaArray = [];
    let districtId = label == 'Taluka' ? this.userRegForm.value.t_DistrictId : this.userRegForm.value.districtId;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
        (res.statusCode == "200" && label == 'Taluka') ? this.talukaArraySecond = res.responseData : this.talukaArraySecond = [];
        this.editObj ? (this.f['talukaId'].setValue(this.editObj.talukaId), this.f['t_TalukaId'].setValue(this.editObj.t_TalukaId), this.getCenter('Center'), this.getBit()) :''
      }
    });
  }

  getDesignationByLevelId() {
    this.desigLevelArray = [];
    let desigLevelId = this.userRegForm.value.designationLevelId;
    this.masterService.getAllDepenDesignationByLevelId('', desigLevelId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.desigLevelArray = res.responseData : this.desigLevelArray = [];
        this.editObj ? this.f['designationId'].setValue(this.editObj.designationId) :''
      }
    });
  }

  getCenter(label?: string) {
    this.centerArray = [];
    let talukaId = label == 'Center' ? this.userRegForm.value.t_TalukaId : this.userRegForm.value.talukaId;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
        (res.statusCode == "200" && label == 'Center') ? this.centerArraySecond = res.responseData : this.centerArraySecond = [];
        this.editObj ? (this.f['t_CenterId'].setValue(this.editObj.t_CenterId),this.getVillage()):''
        if(this.editObj){
          let arr = this.editObj.officerCenterSchoolResponseModel
            if (arr.length) {
              arr.forEach((element:any) => {
                let obj = {
                    "id": element.centerId,
                    "talukaId": "",
                    "center": "",
                    "m_Center": "",
                    "centerCode": ""
                  }
                   arr.push(obj);
              });
              this.f['centerId'].setValue(arr);
              }
        }
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

  getVillage() {
    this.villageArray = [];
    let centerId = this.userRegForm.value.t_CenterId;
    this.masterService.getAllVillage('', centerId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
        this.editObj ? (this.f['t_VillageId'].setValue(this.editObj.t_VillageId), this.getAllSchool()) :''
      }
    });
  }

  getAllSchool() {
    let formValue = this.userRegForm.value
    this.schoolArr = [];
    this.masterService.getAllSchool('', formValue.t_DistrictId, formValue.t_TalukaId, formValue.t_CenterId, formValue.t_VillageId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolArr = res.responseData : this.schoolArr = [];
        this.editObj ? (this.f['t_SchoolId'].setValue(this.editObj.t_SchoolId), this.getAllSchoolClasses()) :''

      }
    });
  }


  getEducationQualDrop() {
    this.educationQualArr = [];
    let centerId = this.userRegForm.value.t_CenterId;
    this.masterService.getAllEducationalQualification('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.educationQualArr = res.responseData : this.educationQualArr = [];
      }
    });
  }

  getStream() {
    this.streamArr = [];
    this.masterService.getAllEducationalStream('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.streamArr = res.responseData : this.streamArr = [];
      }
    });
  }

  getDegreeSpecilization() {
    this.degreeArr = [];
    this.masterService.getAllDegreeSpecialization('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.degreeArr = res.responseData : this.degreeArr = [];
      }
    });
  }

  getAllUniversity() {
    this.universityArr = [];
    this.masterService.getAllUniversity('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.universityArr = res.responseData : this.universityArr = [];
      }
    });
  }

  getAllSchoolClasses() {
    let schoolId = this.userRegForm.value.t_SchoolId
    this.schoolClasArr = [];
    this.masterService.getAllSchoolClasses(schoolId, '').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.schoolClasArr = res.responseData : this.schoolClasArr = [];
        if(this.editObj){
          let arr = this.editObj.teacherClassesResponseModel
          if (arr.length) {
            let newArr:any =[]
            arr.forEach((element:any) => {
              let obj = {
                "id": 0,
                "teacherId": 0,
                "standardId": element.standardId,
                "divisionId": element.divisionId,
                "isClassTeacher": true,
                "createdBy": 1,
                "isDeleted": false
                }
                newArr.push(obj);
            });
            this.f['assignClassId'].setValue(newArr);
            console.log("this.f['assignClassId']",this.f['assignClassId'].value);
            
            }
        }
      }
    });
  }

  // getRole(){
  //   this.roleArr = [];
  //     this.masterService.getAllTeacherRole('').subscribe({
  //       next: (res: any) => {
  //         res.statusCode == "200" ? this.roleArr = res.responseData : this.roleArr = [];
  //       }
  //     });
  //   }

  getAllEducationalBoard() {
    this.boardArr = [];
    this.masterService.getAllBoard('').subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.boardArr = res.responseData : this.boardArr = [];
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

          this.userRegForm.value.profilePhoto = this.uploadImg;
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
    this.userRegForm.value.profilePhoto = '';
    this.f['profilePhoto'].setValue('');
    this.uploadImageFlag = false;
  }
  //#end region ---------------------------------------- Image upload, view and delete end here --------------------------------------------

  addSameAddress(event: any) {
    this.checked = event.checked;
    if (this.checked == true) {
      let sameAddress = this.userRegForm.value.currentAddress
      this.f['permentAddress'].setValue(sameAddress);
    } else {
      this.f['permentAddress'].setValue('');
    }
  }

  CalculateAge() {
    console.log("hgd");

    let birthDate = this.userRegForm.value.dob;
    if (birthDate) {
      var timeDiff = Math.abs(Date.now() - birthDate);
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }

  onchangeCheckBox(event: any) {
    (event.checked == true) ? (this.getEducationQualDrop(), this.getStream(), this.getDegreeSpecilization(), this.getAllUniversity(), this.getAllEducationalBoard()) : ''
  }

  onSubmit() {
    let webStorageMethod = this.webStorage.createdByProps();
    let formValue = this.userRegForm.value;
    //  Start if AssignClasses for all teacher slected by user
    let assignClassData = this.userRegForm.value.assignClassId
    let assignClassArr: any = []
    assignClassData?.forEach((element: any) => {
      let obj = {
        "id": 0,
        "teacherId": 0,
        "standardId": element.standardId,
        "divisionId": element.divisionId,
        "isClassTeacher": true,
        "createdBy": webStorageMethod.createdBy,
        "isDeleted": webStorageMethod.isDeleted
      }
      assignClassArr.push(obj)
    });
    //  End AssignClasses  slected by user

    // Start teacherClass selected by user
    let classTeacherArr: any = []
    if(this.f['isClassTeacher'].value == true){
      let classTeacherData = this.userRegForm.value.ClassTeacherId
      classTeacherData?.forEach((element: any) => {
        let obj = {
          "id": element.id,
          "teacherId": element.teacherId,
          "standardId": element.standardId,
          "divisionId": element.divisionId,
          "isClassTeacher": true,
          createdBy: webStorageMethod.createdBy,
          isDeleted: webStorageMethod.isDeleted
        }
        classTeacherArr.push(obj);
      });
    }
    

    // start officerCenterModel
    let centerArr: any = []
    if(this.userRegForm.value.designationId == 17){
      let centerData = this.userRegForm.value.centerId
      console.log("centerData", centerData);
      
      centerData?.forEach((element:any) => {
        let centerObj = {
          "id": 0,
          "userId": 0,
          "centerId": element.id,
          "centerSchoolId": 0,
          "addUpdateBy": webStorageMethod.modifiedBy
        }
        centerArr.push(centerObj);
      });
    }
    let url = this.editObj ? 'UpdateOfficer' : 'AddOfficer';
    if (!this.userRegForm.valid) {
      this.commonMethod.matSnackBar(this.webStorage.languageFlag == 'EN' ? 'Please Enter Mandatory Fields' : 'कृपया अनिवार्य फील्ड प्रविष्ट करा', 1);
      return
    }
    else {
      console.log("hds", formValue);
      // formValue.classTeacherModel = assignClassData.length ?  assignClassArr : [] // patch selected Assignclasses to headmaster
      // formValue.teacherClassesModel = this.userRegForm.value.isClassTeacher == true ? classTeacherArr : [];
      formValue.classTeacherModel =this.userRegForm.value.isClassTeacher == true ? classTeacherArr : []
      formValue.teacherClassesModel =  assignClassData.length ?  assignClassArr : [] // patch selected Assignclasses to headmaster ;

      formValue.officerCenterSchoolModel =  this.userRegForm.value.designationId == 17 ? centerArr : [];
      formValue.centerId = 0;
      this.ngxSpinner.show();
      this.apiService.setHttp(this.editObj ? 'put' : 'post', 'ZP-Education/Officer/' + url, false, formValue, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          res.statusCode == "200" ? (this.commonMethod.matSnackBar(res.statusMessage, 0), this.router.navigate(['/office-user-registration'])) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        },
        error: ((err: any) => {
          this.ngxSpinner.hide();
          this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
        })
      })
    }
  }

  getUserDatabyId(officerId: any){
    this.ngxSpinner.show();
    this.apiService.setHttp('GET', 'ZP-Education/Officer/GetById?Id='+officerId, false, false, false, 'zp-Education');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        this.ngxSpinner.hide();
        res.statusCode == "200" ? (this.editObj = res.responseData ,this.formField(),this.getGender(),
        this.getDesignationLevel()) : this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
      },
      error: ((err: any) => {
        this.ngxSpinner.hide();
        this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
      })
    })
  }

  compareCenterFn(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
  }

  compareAssignClassFn(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
  }

  clearDropdown(flag?: string) {
    switch (flag) {
      case 'designationLevel':
        this.f['designationId'].setValue('')
        break
      case 'district':
        this.f['talukaId'].setValue('');
        this.f['bitId'].setValue(0);
        this.f['centerId'].setValue(0)
        this.centerArray = [];
        this.bitArray = [];
        break;
      case 'taluka':
        this.f['bitId'].setValue(0);
        this.f['centerId'].setValue(0)
        break;
      case 'designation':
        this.f['bitId'].setValue(0);
        this.f['centerId'].setValue(0);
        this.f['beoEmailId'].setValue('');
        this.f['beoMobileNo'].setValue('');
        this.f['kendraMobileNo'].setValue('');
        this.f['kendraEmailId'].setValue('');

        break;
      case 't_DistrictId':
        this.f['t_TalukaId'].setValue('');
        this.f['t_CenterId'].setValue('');
        this.f['t_VillageId'].setValue('');
        this.f['t_SchoolId'].setValue('');
        this.f['assignClassId'].setValue('');
        this.f['ClassTeacherId'].setValue('');

        this.centerArray = [];
        this.villageArray = [];
        this.schoolArr = [];
        this.schoolClasArr = [];
        break;
      case 't_TalukaId':
        this.f['t_CenterId'].setValue('');
        this.f['t_VillageId'].setValue('');
        this.f['t_SchoolId'].setValue('');
        this.f['assignClassId'].setValue('');
        this.f['ClassTeacherId'].setValue('');
        this.villageArray = [];
        this.schoolArr = [];
        this.schoolClasArr = [];
        break;
      case 't_CenterId':
        this.f['t_VillageId'].setValue('')
        this.f['t_SchoolId'].setValue('')
        this.f['assignClassId'].setValue('');
        this.f['ClassTeacherId'].setValue('');
        this.villageArray = [];
        this.schoolArr = [];
        this.schoolClasArr = [];
        break;
      case 't_VillageId':
        this.f['t_SchoolId'].setValue('')
        this.f['assignClassId'].setValue('');
        this.f['ClassTeacherId'].setValue('');
        this.schoolArr = [];
        this.schoolClasArr = [];
        break;
      case 't_SchoolId':
        this.f['assignClassId'].setValue('');
        this.f['ClassTeacherId'].setValue('');
        this.schoolClasArr = [];
        break;
      default:
        break;
    }
  }

}
