import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  hide = true;
  mobileNoForm !: FormGroup;
  optForm !: FormGroup;
  passwordForm !: FormGroup;
  optFlag: boolean = false;
  timerFlag: boolean = false;
  passwordFlag: boolean = false;
  verifyOtpFlag: boolean = false;
  interval: any;
  timeLeft: number = 100;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private ngxSpinner: NgxSpinnerService,
    private commonMethod: CommonMethodService,
    public validation: ValidationService) { }

  ngOnInit() {
    this.mobileNumberFormField();
    this.optFormField();
    this.passwordFormField();
  }

  mobileNumberFormField() {
    this.mobileNoForm = this.fb.group({
      mobileNo: ['', [, Validators.required, Validators.pattern('[6-9]\\d{9}')]]
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
      newPassword: [''],
      reTypePassword: ['']
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

    this.ngxSpinner.show();
    if (!this.mobileNoForm.valid) {
      this.ngxSpinner.hide();
      return
    }
    else {
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
        }
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

    this.ngxSpinner.show();
    if(!this.optForm.valid){
      this.ngxSpinner.hide();
      return;
    }
    else{
      this.apiService.setHttp('post', 'ZP-Education/OTPTrans/VerifyOTP', false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
        this.ngxSpinner.hide();
        if(res.statusCode == "200"){
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.passwordFlag = true;
            clearInterval(this.interval);
            this.timeLeft = 90;
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
        clearInterval(this.interval);
        this.timeLeft = 100;
      }
    }, 1000)
  }





}
