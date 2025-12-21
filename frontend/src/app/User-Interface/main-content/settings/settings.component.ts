import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }
}
