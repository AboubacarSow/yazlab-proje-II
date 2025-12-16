import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Tüm alanları doldurunuz';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Geçerli bir email adresi girin';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Şifre en az 6 karakter olmalıdır';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Şifreler eşleşmiyor';
      return;
    }

    this.isLoading = true;
    
    setTimeout(() => {
      const success = this.authService.register(this.name, this.email, this.password);
      this.isLoading = false;
      
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Kayıt işlemi başarısız oldu';
      }
    }, 500);
  }
}
