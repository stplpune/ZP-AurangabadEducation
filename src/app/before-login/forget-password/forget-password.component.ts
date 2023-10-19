import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { CustomValidatorsService } from 'src/app/core/services/custom-validators.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  hide = true;
  hide1 = true;
  mobileNoForm !: FormGroup;
  optForm !: FormGroup;
  passwordForm !: FormGroup;
  optFlag: boolean = false;
  timerFlag: boolean = false;
  passwordFlag: boolean = false;
  verifyOtpFlag: boolean = false;
  interval: any;
  timeLeft: number = 60;
  otpRes: any;
  @ViewChild('formDirective') formDirective!: NgForm;
  get f() { return this.passwordForm.controls }

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private ngxSpinner: NgxSpinnerService,
    private commonMethod: CommonMethodService,
    public validation: ValidationService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.mobileNumberFormField();
    this.optFormField();
    this.passwordFormField();
  }

  mobileNumberFormField() {
    this.mobileNoForm = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
  }

  optFormField() {
    this.optForm = this.fb.group({
      otpVal1: ['', Validators.required],
      otpVal2: ['', Validators.required],
      otpVal3: ['', Validators.required],
      otpVal4: ['', Validators.required],
      otpVal5: ['', Validators.required]
    });
  }

  passwordFormField() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required,
        Validators.compose([
          // check whether the entered password has a number
          CustomValidatorsService.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidatorsService.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidatorsService.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidatorsService.patternValidator(
            /[ *$@#]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8), Validators.maxLength(10)
        ])]],
      reTypePassword: ['', [Validators.required, Validators.pattern(this.validation.valPassword), Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  sendOpt() {
    let formValue = this.mobileNoForm.value;
    let obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
      "mobileNo": formValue.mobileNo,
      "otp": "",
      "pageName": "",
      "otpExpireDate": new Date(),
      "isUser": true,
      "email": ""
    }

    if (!this.mobileNoForm.valid) {
      return
    }
    else {
      this.ngxSpinner.show();
      this.apiService.setHttp('post', 'ZP-Education/OTPTrans/CreateOTP', false, obj, false, 'zp-Education')
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          if (res.statusCode == "200") {
            this.optFlag = true;
            (res.statusMessage != 'OTP Generated Failed') ? this.startTimer() : '';
            this.commonMethod.matSnackBar(res.statusMessage, 0);
          } else {
            this.commonMethod.matSnackBar('Please Enter Registered Mobile Number.', 1);
          }
        },error: ((err: any) => {
          this.commonMethod.checkDataType(err.statusMessage) == false ? this.errorService.handelError(err.statusCode) : this.commonMethod.matSnackBar(err.statusMessage, 1);
        })
      })
    }
  }

  verifyOtp() {
    let otpFormValue = this.optForm.value;
    let opt = otpFormValue.otpVal1 + otpFormValue.otpVal2 + otpFormValue.otpVal3 + otpFormValue.otpVal4 + otpFormValue.otpVal5;
    let obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
      "mobileNo": this.mobileNoForm.value.mobileNo,
      "otp": opt,
      "pageName": "",
      "otpExpireDate": new Date(),
      "isUser": true,
      "email": ""
    }

    if(!this.optForm.valid){
      return;
    }
    else{
      this.ngxSpinner.show();
      this.apiService.setHttp('post', 'ZP-Education/OTPTrans/VerifyOTP', false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
        this.ngxSpinner.hide();
        if(res.statusCode == "200"){
          this.otpRes = res.responseData;
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.passwordFlag = true;
            clearInterval(this.interval);
            this.timeLeft = 50;
        }
        else{
          this.ngxSpinner.hide();
          this.commonMethod.matSnackBar('Please Enter Valid OTP', 1);
        }
        }
      })
    }
  }

  startTimer() {
    this.timerFlag = false;
    this.interval = setInterval(() => {
      --this.timeLeft;
      if (this.timeLeft == 0) {
        this.timerFlag = true;
        this.optFormField();

        clearInterval(this.interval);
        this.timeLeft = 60;
      }
    }, 1000)
  }

  onSubmit(){
    if(!this.passwordForm.valid){
      return
    }
    else if(this.passwordForm.value.newPassword != this.passwordForm.value.reTypePassword){
      this.commonMethod.matSnackBar('New Password and Confirm Password does not Match', 1);
      return
    }
    else{
      this.ngxSpinner.show();
      let obj = {
        "userId": this.otpRes,
        "newPassword": this.passwordForm.value.newPassword
      }

      this.apiService.setHttp('post', 'ZP-Education/Web-Login/UpdatePassword', false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          if(res.statusCode == "200"){
            this.formDirective.resetForm();
            this.commonMethod.matSnackBar(res.statusMessage, 0);
            this.router.navigate(['/login']);
          }else {
            this.commonMethod.matSnackBar(res.statusMessage, 1);
            this.ngxSpinner.hide();
          }
        }
      })

    }
  }

  getlogin(){
    this.router.navigate(['./login'])
  }

  disablePaste(event: any){
    event.preventDefault();
  }

}
