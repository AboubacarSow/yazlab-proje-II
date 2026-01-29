import { GraphStateService } from './graph.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardDashboardService {

  constructor(private authService: AuthService,
    private router: Router,
    private graphStateService: GraphStateService) {

     }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
      return this.authService.isLoggedIn$.pipe(take(1),
      map(isLoggedIn=>{
        if(isLoggedIn){
          return true;
        }
        else{
          return this.router.createUrlTree(['/login'])
        }
      }))
    }

}
