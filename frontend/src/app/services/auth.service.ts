import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Kullanıcı giriş durumu
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // Mevcut kullanıcı
  private currentUserSubject = new BehaviorSubject<{name: string, email: string} | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // localStorage'dan durumu kontrol et
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  // Login metodu
  login(email: string, password: string) {
    // Demo: gerçek backend kontrolü olurdu
    if (email && password) {
      const user = { name: email.split('@')[0], email };
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  // Register metodu
  register(name: string, email: string, password: string) {
    // Demo: gerçek backend kontrolü olurdu
    if (name && email && password) {
      const user = { name, email };
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  // Logout metodu
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Mevcut kullanıcı al
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // Giriş durumu kontrol
  isLoggedIn() {
    return this.isLoggedInSubject.value;
  }
}
