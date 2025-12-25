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
import { WorkspaceComponent } from './workspace/workspace/workspace.component';
import { SchemaCreationComponent } from './workspace/schema-creation/schema-creation.component';

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

  // User-Interface (Authenticated area)
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainContentComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'graphlarim', component: GraphlarimComponent },
          { path: 'settings', component: SettingsComponent },
        ]
      }
    ]
  },

  // Workspace (Graf çalışma alanı)
  { path: 'workspace', component: WorkspaceComponent},

  // Fallback
  { path: '**', redirectTo: '' }
];
