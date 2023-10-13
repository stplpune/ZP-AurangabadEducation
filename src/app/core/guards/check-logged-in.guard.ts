import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';
import { Observable } from 'rxjs';

// export const checkLoggedInGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class checkLoggedInGuard implements CanActivate {
  
  constructor(private WebStorageService: WebStorageService, private router: Router){
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree|any {
    if (this.WebStorageService.checkUserIsLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }
}
}
