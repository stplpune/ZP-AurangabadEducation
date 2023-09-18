import { Component } from '@angular/core';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private webStorage: WebStorageService) {

  }


  onClickSidebar() {
    this.webStorage.setSidebarState(!this.webStorage.getSidebarState());

  }
}
