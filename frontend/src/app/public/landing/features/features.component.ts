import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features = [
    { 
      icon: '🔍', 
      title: 'Gelişmiş Ağ Analizi', 
      desc: 'Merkezilik ölçüleri, topluluk tespiti, yol analizi ve daha fazlası',
      items: ['Derece Merkeziliği', 'Arasında Merkeziliği', 'Yakınlık Merkeziliği', 'PageRank']
    },
    { 
      icon: '📊', 
      title: 'İnteraktif Görselleştirme', 
      desc: 'Kullanıcı dostu araçlarla graflarınızı görselleştirin',
      items: ['Zoom & Pan', 'Düğüm Filtreleme', 'Layout Algoritması', 'Renk Kodlama']
    },
    { 
      icon: '💾', 
      title: 'Veri Yönetimi', 
      desc: 'Farklı formatlardan veri içe/dışa aktarma',
      items: ['CSV Import', 'JSON Export', 'GraphML Desteği', 'Excel Entegrasyonu']
    },
    { 
      icon: '⚡', 
      title: 'Performans', 
      desc: 'Büyük veri setleri için optimize edilmiş işleme',
      items: ['Hızlı Hesaplama', 'Paralel İşleme', 'Bellek Optimizasyonu', 'Gerçek Zamanlı Güncelleme']
    }
  ];
}
