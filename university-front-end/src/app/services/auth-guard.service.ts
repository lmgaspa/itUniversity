import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authToken = sessionStorage.getItem('auth-token');

  console.log('Next route:', next.url);
  console.log('Full URL:', state.url);

  if (authToken) {
      return true;
  } else {
      router.navigate(['/login']);
      return false;
  }
};

