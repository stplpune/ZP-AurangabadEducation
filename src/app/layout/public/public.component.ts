import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {

  hideHeaderFooter: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login' || event.url == '/forgot-password') {
          this.hideHeaderFooter = false;
        } else {
          this.hideHeaderFooter = true;
        }
      }
    });
  }
}
