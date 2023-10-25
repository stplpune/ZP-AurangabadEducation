import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
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
  checked: boolean = false
  editObj: any;
  get f() { return this.teacherRegForm.controls }

  constructor(private fb: FormBuilder,
    private errorService: ErrorService,
    private commonMethod: CommonMethodService,
    private masterService: MasterService,
    private fileUpload: FileUploadService,
    public webStorage: WebStorageService,
    public validation: ValidationService,
    public dateAdapter: DateAdapter<Date>){
      dateAdapter.setLocale("en-GB"); // DD/MM/YYYY
    }

  ngOnInit(){
    this.formField();
    this.getDistrict();
  }

  formField(){
    this.teacherRegForm = this.fb.group({
      teacherName: [''],
      m_TeacherName: [''],
      teacherId: [''],
      genderId: [''],
      mobileNo: [''],
      emailId: [''],
      birthDate: [''],
      uploadImage: [''],

      // Address Details
      districtId: [''],
      talukaId: [''],
      villageId: [''],
      currentAddress: [''],
      permentAddress: [''],

      // Highest Educational Qualification
      educationalQualificationId: [''],
      streamId: [''],
      degreeId: [''],
      boardId: [''],
      degreeUniversityId: [''],
      marks: [''],
      passingYear: [''],

      // Professional Qualification
      udiseCode: [''],
      districtIdPF: [''],
      talukaIdPF: [''],
      kendraId: [''],
      villageIdPF: [''],
      schoolId: [''],
      roleId: [''],
      isKendraHead: [''],
      clusterId: [''],
      isClassTeacher: [''],
      classId: [''],
      division: [''],
      assignedClass: ['']

    });
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
        res.statusCode == "200" ? this.talukaArray = res.responseData : this.talukaArray = [];
      }
    });
  }

  getVillage() {
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
      this.f['permentAddress'].setValue('');
    }
  }

  setSameAddress(event: any) {
    console.log("onClick: ", event);
    
    this.checked = event.checked;
    if (this.checked == true) {
      let sameAddress = this.teacherRegForm.value.currentAddress
      this.f['permentAddress'].setValue(sameAddress);
    } else {
      this.f['permentAddress'].setValue('');
    }
  }






  toppings = new FormControl('');
  toppingList: string[] = ['Pune', 'Satara', 'Kolhapur', 'Sangli', 'Nagar'];
}
