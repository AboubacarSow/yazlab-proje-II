import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activeTab: 'graph' | 'data' = 'graph';
  @Output() tabChange = new EventEmitter<'graph' | 'data'>();
  
  isDropdownOpen = false;

  switchTab(tab: 'graph' | 'data') {
    this.tabChange.emit(tab);
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
