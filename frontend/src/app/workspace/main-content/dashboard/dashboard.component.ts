import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Toplam Düğüm', value: 125, icon: '🔵', color: '#3498db' },
    { title: 'Toplam Kenar', value: 243, icon: '🔗', color: '#2ecc71' },
    { title: 'Bağlantı Sayısı', value: 18, icon: '🌐', color: '#e74c3c' },
    { title: 'Ortalama Derece', value: 3.9, icon: '📊', color: '#f39c12' }
  ];

  recentActivities = [
    { action: 'Yeni düğüm eklendi', node: 'Node-45', time: '5 dk önce' },
    { action: 'Kenar güncellendi', node: 'Edge-12', time: '12 dk önce' },
    { action: 'Algoritma çalıştırıldı', node: 'BFS', time: '25 dk önce' },
    { action: 'Graf kaydedildi', node: 'Graph-1', time: '1 saat önce' }
  ];
}
