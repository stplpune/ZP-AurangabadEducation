import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AesencryptDecryptService } from 'src/app/core/services/aesencrypt-decrypt.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { CustomValidatorsService } from 'src/app/core/services/custom-validators.service';
import { ValidationService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm !: FormGroup;
  get f() { return this.loginForm.controls };
  @ViewChild('formDirective') formDirective!: NgForm;

  constructor(private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService, 
    private commonMethod: CommonMethodService, 
    private apiService: ApiService,
    private AESEncryptDecryptService: AesencryptDecryptService,
    private router: Router,
    public validation: ValidationService) { }

  ngOnInit() {
    this.formField();
  }

  ngAfterViewInit(): void {
    this.commonMethod.createCaptchaCarrerPage();
  }

  formField() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, 
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
            /[ @$!%*?&#]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(9)
        ])]],
      captcha: ['', [Validators.required, Validators.pattern('^[0-9A-Z]{6}$')]]
    })
  }

  captcha() {
    this.f['captcha'].setValue('');
    this.commonMethod.createCaptchaCarrerPage();
  }

  onClickLogin() {
    this.ngxSpinner.show();
    let formValue = this.loginForm.value;

    if(!this.loginForm.valid){
      this.ngxSpinner.hide();
      return;
    }else if ((this.f['captcha']?.value).trim()!= this.commonMethod.checkvalidateCaptcha()) {
      this.commonMethod.matSnackBar("Please Enter Valid Captcha ", 1);
      this.f['captcha'].setValue('')
      this.captcha();
      this.commonMethod.createCaptchaCarrerPage();
      this.ngxSpinner.hide();
      return;
    }
    else{
      this.apiService.setHttp('get','ZP-Education/Web-Login/'+ formValue.userName +'/' + formValue.password, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: ( res: any ) => {
          this.ngxSpinner.hide();
          if(res.statusCode == "200"){
            sessionStorage.setItem('loggedIn', 'true');
            let loginData = this.AESEncryptDecryptService.encrypt(JSON.stringify(res?.responseData?.responseData1[0]));
            localStorage.setItem('loggedInData', loginData);
            this.router.navigate(['/dashboard']);
            this.formDirective.resetForm();  
          }
          else{
            this.commonMethod.matSnackBar(res.statusMessage, 1);
            this.ngxSpinner.hide();
          }
        }
      })
    }
  }

  clearSpace(){
    let replaceUserName = this.f['userName'].value.replace(/\s/g, "");
    this.f['userName'].setValue(replaceUserName);

    let replacePassword = this.f['password'].value.replace(/\s/g, "");
    this.f['password'].setValue(replacePassword);
  }

}
