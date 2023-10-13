import { CanActivateFn } from '@angular/router';

export const checkLoggedInGuard: CanActivateFn = (route, state) => {
  return true;
};
