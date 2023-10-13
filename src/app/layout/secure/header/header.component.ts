import { Component } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/modules/profile/change-password/change-password.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { RouterModule } from '@angular/router';
import { CommonMethodService } from 'src/app/core/services/common-method.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports:[MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private webStorage: WebStorageService, public dialog:MatDialog,
              private commonMethodsService: CommonMethodService) {

  }


  onClickSidebar() {
    this.webStorage.setSidebarState(!this.webStorage.getSidebarState());
  }
  OnchangePasswordDialog(){
    this.dialog.open(ChangePasswordComponent,{
      width:'600px'
        });
}

logOut(){
  this.commonMethodsService.redirectToLoginHome('Login')
}
}
