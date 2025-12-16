import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Email ve şifre gerekli';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Geçerli bir email adresi girin';
      return;
    }

    this.isLoading = true;
    
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);
      this.isLoading = false;
      
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Email veya şifre hatalı';
      }
    }, 500);
  }
}
