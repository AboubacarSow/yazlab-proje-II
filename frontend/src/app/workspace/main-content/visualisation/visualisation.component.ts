import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualisation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualisation.component.html',
  styleUrl: './visualisation.component.css'
})
export class VisualisationComponent {
  selectedAlgorithm = 'bfs';
  
  algorithms = [
    { value: 'bfs', label: 'BFS (Genişlik Öncelikli Arama)' },
    { value: 'dfs', label: 'DFS (Derinlik Öncelikli Arama)' },
    { value: 'dijkstra', label: 'Dijkstra' },
    { value: 'astar', label: 'A* Algoritması' },
    { value: 'centrality', label: 'Merkezilik Analizi' },
    { value: 'coloring', label: 'Welsh-Powell Renklendirme' }
  ];

  runAlgorithm() {
    console.log('Algoritma çalıştırılıyor:', this.selectedAlgorithm);
  }

  clearGraph() {
    console.log('Graf temizleniyor');
  }

  exportGraph() {
    console.log('Graf dışa aktarılıyor');
  }
  importGraph() {
    console.log('Graf içe aktarılıyor');
  }
}
