import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { take } from 'rxjs';
import { local } from 'd3';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  features = [
    { icon: '🔍', title: 'Network Analysis', desc: 'Network Analysis' },
    { icon: '📊', title: 'Visualization', desc: 'Interactive graph visualizations' },
    { icon: '💾', title: 'Data Management', desc: 'Easy import/export functionality' },
    { icon: '⚡', title: 'Fast Processing', desc: 'Optimized for large datasets' }
  ];

  constructor(private authService: AuthService) {
    this.authService.decodeToken(); // Decode token on component init
  }

  ngOnInit() {
    this.authService.isLoggedIn$
    .pipe(take(1))
    .subscribe(status => { this.isLoggedIn = status; });
      console.log('User logged in status:', this.isLoggedIn);
      this.authService.decodeToken(); // Test decodeToken method
  }

  get ctaLink(): string {
    return this.isLoggedIn ? '/user/dashboard' : '/login';
  }

  get ctaText(): string {
    return this.isLoggedIn ? '🚀 Manage  ' : '🚀 Get Started';
  }
}
