import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs/internal/operators/take';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isDropdownOpen = false;
  isLoggedIn = false;
  currentUser: { name: string; email: string } | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.authService.decodeToken();
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      console.log('Current user ', user);
      this.currentUser = user.name;
      console.log('Current user name:', user.name);
    });

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    //this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }
}
