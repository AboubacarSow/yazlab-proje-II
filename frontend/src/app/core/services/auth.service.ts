import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginModel, RegisterModel } from '../../models/auth.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor(private authService: AuthenticationService, private jwtHelper: JwtHelperService) {
    const token = localStorage.getItem('accessToken');
    if(token){
      this.isLoggedInSubject.next(true);
    }
    else{
      this.isLoggedInSubject.next(false);
    }
   }

  login(loginModel : LoginModel) :Observable<string>{
    return this.authService.login(loginModel).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.decodeToken(response.accessToken);
        this.isLoggedInSubject.next(true);
        console.log('Login successful', response);
      }),
      map(response => response.accessToken)
    );
  }
  register(registerModel:RegisterModel) : Observable<string>{
    return this.authService.register(registerModel);
  }

  decodeToken(token: string): any {
    const access_Token=localStorage.getItem('accessToken');
    if (access_Token) {
      const user= this.jwtHelper.decodeToken(access_Token);
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }
}
