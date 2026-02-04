import { DialogModule } from '@angular/cdk/dialog';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([DialogModule,JwtModule.forRoot({
      config: {
        tokenGetter:()=> localStorage.getItem('accessToken'),
        allowedDomains:['localhost:7011']
      }
    })]),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
