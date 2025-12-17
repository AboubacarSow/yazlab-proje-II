import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  values = [
    { icon: '🎯', title: 'Misyonumuz', desc: 'Sosyal ağ analizini herkes için erişilebilir kılmak' },
    { icon: '🚀', title: 'Vizyonumuz', desc: 'Ağ analizi alanında lider platform olmak' },
    { icon: '🤝', title: 'Değerlerimiz', desc: 'Şeffaflık, inovasyon ve kullanıcı odaklılık' }
  ];
}
