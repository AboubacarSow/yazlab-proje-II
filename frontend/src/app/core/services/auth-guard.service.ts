import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, pipe, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
   return this.authService.isLoggedIn$.pipe(take(1),
   map(isLoggedIn => {
      return isLoggedIn ? true : this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
   }));
  }
    
}
