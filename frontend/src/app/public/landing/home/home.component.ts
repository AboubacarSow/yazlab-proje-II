import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    { icon: '🔍', title: 'Ağ Analizi', desc: 'Kapsamlı sosyal ağ analizi araçları' },
    { icon: '📊', title: 'Görselleştirme', desc: 'İnteraktif graf görselleri' },
    { icon: '💾', title: 'Veri Yönetimi', desc: 'Kolay içe/dışa aktarma' },
    { icon: '⚡', title: 'Hızlı İşleme', desc: 'Büyük veri setleri için optimize' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  get ctaLink(): string {
    return this.isLoggedIn ? '/User-Interface/dashboard' : '/register';
  }

  get ctaText(): string {
    return 'Hemen Başlayın';
  }
}
