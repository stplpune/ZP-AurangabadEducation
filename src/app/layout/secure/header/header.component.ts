import { Component } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/modules/profile/change-password/change-password.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { RouterModule } from '@angular/router';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalDialogComponent } from 'src/app/shared/global-dialog/global-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectLang!: string;
  language: string = 'English';
  languageArr = ['English', 'Marathi'];

  constructor(public webStorage: WebStorageService,
    public dialog: MatDialog,
    private commonMethodsService: CommonMethodService,
    public translate: TranslateService) {}

  ngOnInit() {
    let language: any = sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'English';
    this.translate.setDefaultLang(language);

    // this.webStorage.language.next(language);
    // this.translate.use(language);
    // this.webStorage.language.subscribe((res: any) => {
    //   this.selectLang = res;
    // })
    this.webStorage.setLanguage(language);
  }

  onClickSidebar() {
    this.webStorage.setSidebarState(!this.webStorage.getSidebarState());
  }

  OnchangePasswordDialog() {
    this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      disableClose: true
    });
  }

  // logOut() {
  //   this.commonMethodsService.redirectToLoginHome('Login')
  // }

  logout() {
    let dialoObj = {
      header: 'Logout',
      title: 'Do You Want To Logout ?',
      cancelButton: 'Cancel',
      okButton: 'Logout'
    }
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '320px',
      data: dialoObj,
      disableClose: true,
      autoFocus: false
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'yes') {
        this.commonMethodsService.redirectToLoginHome('Login')
      }
    });
  }
  onChangeLanguage(lang: any) {
    this.language = lang
    this.translate.use(lang);
    this.webStorage.setLanguage(lang);
    sessionStorage.setItem('language', lang);
  }

}
