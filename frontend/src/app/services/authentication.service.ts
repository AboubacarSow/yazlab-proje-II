import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel, RegisterModel, TokenContainer } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly BASE_URL = `${environment.apiUrl}auth`;

  private readonly LOGIN_ENDPOINT = `${this.BASE_URL}/login`;
  private readonly REGISTER_ENDPOINT = `${this.BASE_URL}/register`

  constructor(private http : HttpClient) { }

  login(command:LoginModel) : Observable<TokenContainer>{
    return this.http.post<TokenContainer>(this.LOGIN_ENDPOINT, {command});
    }
  register(command:RegisterModel) : Observable<string>{
    return this.http.post<string>(this.REGISTER_ENDPOINT, {command});
  }
}
