import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { CustomValidatorsService } from 'src/app/core/services/custom-validators.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  hide = true;
  hide1 = true;
  hide2 = true;
  changePasswordForm !: FormGroup;
  get f() { return this.changePasswordForm.controls }
  
  @ViewChild('formDirective') private formDirective!: NgForm;

  constructor(private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    private apiService: ApiService,
    private commonMethod: CommonMethodService, 
    private validation: ValidationService, 
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private errorService: ErrorService,
    private webStorage: WebStorageService) { }

  ngOnInit() {
    this.formField();
  }

  formField() {
    this.changePasswordForm = this.fb.group({
      userId: 1,
      newPassword: ['',
        [Validators.compose([
          Validators.required,
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
      confirmPassword: ['', [Validators.required, Validators.minLength(9), Validators.pattern(this.validation.valPassword)]],
      oldPassword: ['', [Validators.required, Validators.minLength(9), Validators.pattern(this.validation.valPassword)]],
    })
  }

  clearSpace() {
    let replaceOldPassword = this.changePasswordForm.value.oldPassword.replace(/\s/g, "");
    this.changePasswordForm.controls['oldPassword'].setValue(replaceOldPassword);

    let replaceNewPassword = this.changePasswordForm.value.newPassword.replace(/\s/g, "");
    this.changePasswordForm.controls['newPassword'].setValue(replaceNewPassword);

    let replaceConfirmPass = this.changePasswordForm.value.confirmPassword.replace(/\s/g, "");
    this.changePasswordForm.controls['confirmPassword'].setValue(replaceConfirmPass);
  }

  onChangePassword() {
    this.ngxSpinner.show();
    let formValue = this.changePasswordForm.value;
    let obj = {
      "userId": this.webStorage.getUserId(),
      "newPassword": formValue.newPassword,
      "oldPassword": formValue.oldPassword,
      "designationLevelId": 1,
      "designationId": 1
    }

    if (!this.changePasswordForm.valid) {
      this.ngxSpinner.hide();
      return;
    }else if(this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmPassword){
      this.commonMethod.matSnackBar('New Password and Confirm Password does not Match', 1);
      return;
    } else {
      this.apiService.setHttp('post', 'ZP-Education/Web-Login/ChangePassword', false, obj, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          this.ngxSpinner.hide();
          if(res.statusCode == "200"){
            this.commonMethod.matSnackBar('Password Changed Successfully !',0);
            this.dialogRef.close('yes');
            this.formDirective.resetForm();
          }else{
            this.ngxSpinner.hide();
            this.commonMethod.checkDataType(res.statusMessage) == false
              ? this.errorService.handelError(res.statusCode)
              : this.commonMethod.matSnackBar(res.statusMessage,1);
          }
        },
        error: (err: any) => {
          this.errorService.handelError(err.status);
        },
      })
    }
  }


}
