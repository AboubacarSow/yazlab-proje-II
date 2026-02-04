import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, of, switchMap, take } from 'rxjs';
import { GraphStateService } from './graph.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
  private authService: AuthService,
  private router: Router,
  private graphStateService: GraphStateService
  ) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
      return this.authService.currentUser$.pipe(
        take(1),
        switchMap(user => {
          if (!user) {
            return of(
              this.router.createUrlTree(['/login'], {
                queryParams: { returnUrl: state.url }
              })
            );
          }

          return this.graphStateService.currentGraph$.pipe(
            take(1),
            map((graph => {
              if (!graph) {
                return true;
              }

              const isOwner = graph.ownerId === user.sub;
              return isOwner
                ? true
                : this.router.createUrlTree(['/unauthorized']);
            })
          ));
        })
      );
    }
}


