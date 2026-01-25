import { Routes } from '@angular/router';
import { LoginComponent } from './public/authentication/login/login.component';
import { RegisterComponent } from './public/authentication/register/register.component';
import { MainLayoutComponent } from './User-Interface/main-layout/main-layout.component';
import { MainContentComponent } from './User-Interface/main-content/main-content.component';
import { DashboardComponent } from './User-Interface/main-content/dashboard/dashboard.component';
import { GraphlarimComponent } from './User-Interface/main-content/graphlarim/graphlarim.component';
import { SettingsComponent } from './User-Interface/main-content/settings/settings.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { HomeComponent } from './public/landing/home/home.component';
import { AboutComponent } from './public/landing/about/about.component';
import { ContactComponent } from './public/landing/contact/contact.component';
import { FeaturesComponent } from './public/landing/features/features.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { UnauthorizedComponent } from './public/authentication/unauthorized/unauthorized.component';
import { UserGuardDashboardService } from './core/services/user-guard-dashboard.service';

export const routes: Routes = [
  // Public Landing Pages
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },

  // Auth routes (layout dışında)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // User-Interface (Authenticated area)
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent,canActivate:[UserGuardDashboardService] },
          { path: 'graphs', component: GraphlarimComponent, canActivate: [UserGuardDashboardService] },
          { path: 'settings', component: SettingsComponent, canActivate: [UserGuardDashboardService] },
        ]
      }
    ]
  },

  // Workspace (Graf çalışma alanı)
  { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuardService] },

  // Fallback
  { path: '**', redirectTo: '' }
];
