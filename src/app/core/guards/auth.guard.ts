import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private WebStorageService: WebStorageService, private router: Router){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
      if (!this.WebStorageService.checkUserIsLoggedIn()) {
        this.router.navigate(['/login']);
        return false
      } else {
        return true;
      }
  }
  
}
