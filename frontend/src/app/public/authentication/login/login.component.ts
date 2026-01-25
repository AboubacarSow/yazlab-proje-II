import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../../models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : FormGroup
  errormessage: string = ''
  isloading: boolean = false

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(isloggedIn =>{
      if(isloggedIn)
        return this.route.navigate(['/'])
      return;
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginModel:LoginModel = {
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.isloading=true;
      this.authService.login(loginModel).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          if(this.route.routerState.snapshot.root.queryParams['returnUrl']){
            this.route.navigateByUrl(this.route.routerState.snapshot.root.queryParams['returnUrl']);
            return;
          }
          this.route.navigate(['/']);
        },
        error: (error) => {

          this.errormessage = 'Login failed. Please check your credentials and try again.';
          console.error('Login failed', error);
          this.isloading = false;
        }
      });
    }
  }
}
