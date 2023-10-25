import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebStorageService } from './web-storage.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apibaseURL: string = environment.apibaseURL;
  tokanExpiredFlag: boolean = false;
  tableData = new Subject<any>();
  profileData = new Subject<any>();
  httpObj: any = {
    type: '',
    url: '',
    options: Object
  };

  constructor(
    private http: HttpClient,
    private webStorageService: WebStorageService,
  ) { }

  getBaseurl(url: string) {
    switch (url) {
      //Demo Url
      case 'zp-Education': return this.apibaseURL; break;
      default: return ''; break;
    }
  }

  getHttp(): any {
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any) {
    let checkLOginData: any = localStorage.getItem('loggedInData');
    if (checkLOginData && this.tokanExpiredFlag == false && isHeader) {
      let tokenExp = JSON.parse(checkLOginData);
      let expireAccessToken: any = (Math.round(new Date(tokenExp.responseData1.expireAccessToken).getTime() / 1000));
      let tokenExpireDateTime: any = (Math.round(new Date(tokenExp.responseData1.refreshToken.expireAt).getTime() / 1000));
      let currentDateTime: any = (Math.round(new Date().getTime() / 1000));
      if (currentDateTime >= expireAccessToken) {
        if (currentDateTime <= tokenExpireDateTime) {
          this.tokanExpiredFlag = true
          let obj = {
            // userId: this.webStorageService.getUserId(),
            // refreshToken: this.webStorageService.tokenExpireRefreshString()
          }
          this.tokenExpiredAndRefresh(obj);
        } else {
          localStorage.clear();
          // this.commonService.routerLinkRedirect('login');
          // this.commonService.matSnackBar("Your Session Has Expired. Please Re-Login Again.", 1);
          return;
        }

      }
    }
    try {
    } catch (e) { }
    this.clearHttp();
    this.httpObj.type = type;
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
    if (isHeader) {
      let tempObj: any = {
      };
      this.httpObj.options.headers = new HttpHeaders(tempObj);
    }

    obj !== false ? this.httpObj.options.body = obj : this.httpObj.options.body = false;
    params !== false ? this.httpObj.options.params = params : this.httpObj.options.params = false;
  }

  clearHttp() {
    this.httpObj.type = '';
    this.httpObj.url = '';
    this.httpObj.options = {};
  }

  tokenExpiredAndRefresh(obj: any) {
    let callRefreshTokenAPI = this.http.post('', obj);
    callRefreshTokenAPI.subscribe((res: any) => {
      if (res.statusCode === "200") {
        let loginObj: any = localStorage.getItem('loggedInData');
        loginObj = JSON.parse(loginObj);
        loginObj.responseData3 = res.responseData;
        localStorage.setItem('loggedInData', JSON.stringify(loginObj));
        this.tokanExpiredFlag = false;
      }
      else if (res.statusCode === "409") {
        // this.commonService.matSnackBar(res.statusMessage, 1);
      }
      else {
        localStorage.clear();
        // this.commonService.routerLinkRedirect('login');
        // this.commonService.matSnackBar("Your Session Has Expired. Please Re-Login Again.", 1);
      }
    })
  }



}
