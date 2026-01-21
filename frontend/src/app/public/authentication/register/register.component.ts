import { ToastService } from './../../../core/utils/toast-service.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs';
import { RegisterModel } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if( this.registerForm.invalid ) {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }

    this.isLoading = true;

    const registerModel : RegisterModel = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };
    this.authService.register(registerModel).pipe(first()).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        this.toastService.success('Registration successful! Please sign in.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
            this.errorMessage = error.error.detail;
            if(error.error) {
              if(error.error.status===500){
                this.errorMessage = 'Server error occurred. Please try again later.';
                return;
              } else{
                this.errorMessage = error.error.message;
              }
            }
            console.log(error.error);
            console.error('Registration failed', error);
            this.isLoading = false;
      }

    });
  }
}
