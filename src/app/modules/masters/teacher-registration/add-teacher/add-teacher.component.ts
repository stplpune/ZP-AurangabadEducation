import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  talukaArrayPQ = new Array();
  villageArray = new Array();
  centerArray = new Array();
  checked: boolean = false;
  age: number = 0;
  editObj: any;
  get f() { return this.teacherRegForm.controls }

  constructor(private fb: FormBuilder,
    private errorService: ErrorService,
    private commonMethod: CommonMethodService,
    private masterService: MasterService,
    private fileUpload: FileUploadService,
    public webStorage: WebStorageService,
    public validation: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-GB"); // DD/MM/YYYY
  }

  ngOnInit() {
    this.formField();
    this.getDistrict();
  }

  // formField(){
  //   this.teacherRegForm = this.fb.group({
  //     name: [''],
  //     m_Name: [''],
  //     teacherCode: [''],
  //     genderId: [''],
  //     mobileNo: [''],
  //     emailId: [''],
  //     dob: [''],
  //     uploadImage: [''],

  //     // Address Details
  //     districtId: [''],
  //     talukaId: [''],
  //     villageId: [''],
  //     currentAddress: [''],
  //     permanentAddress: [''],

  //     // Highest Educational Qualification
  //     educationalQualificationId: [''],
  //     streamId: [''],
  //     degreeId: [''],
  //     boardId: [''],
  //     degreeUniversityId: [''],
  //     marks: [''],
  //     passingYear: [''],

  //     // Professional Qualification
  //     udiseCode: [''],
  //     districtIdPQ: [''],
  //     talukaIdPQ: [''],
  //     kendraId: [''],
  //     villageIdPQ: [''],
  //     schoolId: [''],
  //     roleId: [''],
  //     isKendraHead: [''],
  //     clusterId: [''],
  //     isClassTeacher: [''],
  //     classId: [''],
  //     divisionId: [''],
  //     assignedClass: ['']

  //   });
  // }

  formField() {
    this.teacherRegForm = this.fb.group({
      id: 0,
      userId: 0,
      userType: 0,
      name: [''],
      m_Name: [''],
      teacherCode: [''],
      genderId: 0,
      mobileNo: [''],
      emailId: [''],
      dob: new Date(),
      uploadImage: [''],
      stateId: 0,
      current_DistrictId: 0,
      current_TalukaId: 0,
      current_VillageId: 0,
      currentAddress: [''],
      permanent_DistrictId: 0,
      permanent_TalukaId: 0,
      permanent_VillageId: 0,
      permanentAddress: [''],
      isClusterHead: true,
      officerId: 0,
      isClassTeacher: true,
      isHeadMaster: true,
      designationId: 0,
      centerId: 0,
      lan: [''],
      localID: 0,
      createdBy: 0,
      createdDate: new Date(),
      modifiedBy: 0,
      modifiedDate: new Date(),
      isDeleted: true,
      timestamp: new Date(),
      education: {
        id: 0,
        teacherId: 0,
        educationQualificationId: 0,
        streamId: 0,
        degreeSpecializationId: 0,
        boardId: 0,
        universityId: 0,
        percentage: 0,
        passingYear: [''],
        createdBy: 0,
        createdDate: new Date(),
        modifiedBy: 0,
        modifiedDate: new Date(),
        isDeleted: true,
        timeStamp: new Date()
      },
      experience: {
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
        createdBy: 0,
        createdDate: new Date(),
        modifiedBy: 0,
        modifiedDate: new Date(),
        isDeleted: true,
        timeStamp: new Date()
      },
      teacherDetails: {
        id: 0,
        teacherId: 0,
        schoolId: 0,
        clusterId: 0,
        designationId: 0,
        designationLevelId: 0,
        roleId: 0,
        isClusterHead: true,
        isHeadMaster: true,
        officerId: 0,
        graduate_SubjectId: 0,
        isGraduate_PayScale: true,
        castId: 0,
        castCategoryId: 0,
        castCertificateNo: [''],
        castCertificateOffice: [''],
        isCastVarificationDone: true,
        castValidityNoDate: 0,
        castverificationCommitteeName: [''],
        dateOfFirstAppoinmentService: new Date(),
        currentSchoolJoiningDate: new Date(),
        currentTalukaPresentDate: new Date(),
        retirementDate: new Date(),
        educationalQualificationId: 0,
        branchId12th: 0,
        degreeOptionalSubjectsId: 0,
        degreeUniversityId: 0,
        professionalQualificationId: 0,
        bEdPercentages: 0,
        bEdUniversityId: 0,
        husbandWife_Both_Service: true,
        husbandWife_OfficeName: [''],
        isDisabled: true,
        interDistrictTransferred: true,
        dateOFPresenceInterDistrictTransfer: new Date(),
        interDistrictTransferType: [''],
        theOriginalDistrictInterDistrictTransfer: [''],
        dateOfSeniority: new Date(),
        haveYouPassedComputerExam: true,
        namesAndTalukasAllSchoolsWorkedEarlier: [''],
        createdBy: 0,
        createdDate: new Date(),
        modifiedBy: 0,
        modifiedDate: new Date(),
        isDeleted: true,
        timestamp: new Date()
      },
      teacherStandards: [
        {
          id: 0,
          teacherId: 0,
          standardId: 0,
          createdBy: 0,
          modifiedBy: 0
        }
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
    let districtId = this.teacherRegForm.value.districtId || this.teacherRegForm.value.districtIdPQ;
    this.masterService.getAllTaluka('', districtId).subscribe({
      next: (res: any) => {
        (res.statusCode == "200" && this.teacherRegForm.value.districtId > 0) ? this.talukaArray = res.responseData : this.talukaArray = [];
        (res.statusCode == "200" && this.teacherRegForm.value.districtIdPQ > 0) ? this.talukaArrayPQ = res.responseData : this.talukaArrayPQ = [];
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
    let talukaId = this.teacherRegForm.value.talukaIdPQ;
    this.masterService.getAllCenter('', talukaId).subscribe({
      next: (res: any) => {
        res.statusCode == "200" ? this.centerArray = res.responseData : this.centerArray = [];
      }
    });
  }

  getVillage() {
    this.villageArray = [];
    let kendraId = this.teacherRegForm.value.kendraId;
    if (kendraId > 0) {
      this.masterService.getAllVillage('', kendraId).subscribe({
        next: (res: any) => {
          res.statusCode == "200" ? this.villageArray = res.responseData : this.villageArray = [];
        }
      });
    }
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

          this.teacherRegForm.value.uploadImage = this.uploadImg;
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
    this.teacherRegForm.value.uploadImage = '';
    this.f['uploadImage'].setValue('');
    this.uploadImageFlag = false;
  }

  //#endregion ------------------------------------------------ Upload, view and delete Image end here ----------------------------------------


  clearAddressCheckBox(event: any) {
    if (event.data == null) {
      this.checked = false;
      this.f['permanentAddress'].setValue('');
    }
  }

  setSameAddress(event: any) {
    console.log("onClick: ", event);

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






  toppings = new FormControl('');
  toppingList: string[] = ['Pune', 'Satara', 'Kolhapur', 'Sangli', 'Nagar'];
}
