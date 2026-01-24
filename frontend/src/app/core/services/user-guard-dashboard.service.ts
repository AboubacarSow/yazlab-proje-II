import { GraphStateService } from './graph.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardDashboardService {

  constructor(private authService: AuthService,
    private router: Router,
    private graphStateService: GraphStateService) { }

}
