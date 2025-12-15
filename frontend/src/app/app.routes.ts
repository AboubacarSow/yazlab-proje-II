import { Routes } from '@angular/router';
import { LoginComponent } from './public/authentication/login/login.component';
import { RegisterComponent } from './public/authentication/register/register.component';
import { MainLayoutComponent } from './workspace/main-layout/main-layout.component';
import { MainContentComponent } from './workspace/main-content/main-content.component';
import { DashboardComponent } from './workspace/main-content/dashboard/dashboard.component';
import { VisualisationComponent } from './workspace/main-content/visualisation/visualisation.component';
import { GraphlarimComponent } from './workspace/main-content/graphlarim/graphlarim.component';
import { SettingsComponent } from './workspace/main-content/settings/settings.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { HomeComponent } from './public/landing/home/home.component';
import { AboutComponent } from './public/landing/about/about.component';
import { ContactComponent } from './public/landing/contact/contact.component';
import { FeaturesComponent } from './public/landing/features/features.component';

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
  
  // Workspace (Authenticated area)
  {
    path: 'workspace',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'graphlarim', component: GraphlarimComponent },
          { path: 'visualization', component: VisualisationComponent },
          { path: 'settings', component: SettingsComponent },
        ]
      }
    ]
  },
  
  // Fallback
  { path: '**', redirectTo: '' }
];
