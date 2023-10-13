import { Injectable } from '@angular/core';
import { AesencryptDecryptService } from './aesencrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  
  toggled: boolean = false;

  constructor(private AESEncryptDecryptService: AesencryptDecryptService) { }


  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  checkUserIsLoggedIn() { // check user isLoggedIn or not
    if (localStorage.getItem('loggedInData'))
      return true;
    else return false;
  }

  getLoggedInLocalstorageData() { //get all logged in data
    if (this.checkUserIsLoggedIn() == true) {
      var decryptData = JSON.parse(this.AESEncryptDecryptService.decrypt(localStorage['loggedInData']));
      let data = decryptData?.responseData1[0];
      return data;
    }
  }

  getUserId(){
    let data = this.getLoggedInLocalstorageData();
    return data ? data.id : 0;
  }

  getUserTypeId(){
    let data = this.getLoggedInLocalstorageData();
    return data.userTypeId;
  }

  getTaluka(){
    
  }

  getEduYearId(){
    let data = this.getLoggedInLocalstorageData();
    return (data.educationYearId || 0);
  }

  getUserSubTypeId(){
    let data = this.getLoggedInLocalstorageData();
    return data.subUserTypeId;
  }

  getAllPageName(){
    if (this.checkUserIsLoggedIn() == true) {      
      let getAllPageName = this.getLoggedInLocalstorageData();
      return getAllPageName.pageListModels;
    }
  }

  getLogo(){

  }




  createdByProps(): any {
    return {
      "createdBy": this.getUserId() || 0,
      "modifiedBy": this.getUserId() || 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false
    }
  }




}
