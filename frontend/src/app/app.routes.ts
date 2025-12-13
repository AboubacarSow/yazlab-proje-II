import { Routes } from '@angular/router';
import { LandingComponent } from './public/landing/landing';
import { LoginComponent } from './public/authentication/login/login';
import { RegisterComponent } from './public/authentication/register/register';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { DashboardComponent } from './workspace/dashboard/dashboard';
import { VisualisationComponent } from './workspace/visualisation/visualisation';

export const routes: Routes = [
  // Public routes (no layout)
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Workspace routes (with main-layout)
  {
    path: 'workspace',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'visualisation', component: VisualisationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Fallback
  { path: '**', redirectTo: '' }
];
