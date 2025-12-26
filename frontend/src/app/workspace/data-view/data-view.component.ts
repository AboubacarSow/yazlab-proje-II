import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {
  dataFormat: 'json' | 'csv' | 'table' = 'json';
  
  sampleData = {
    nodes: [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' }
    ],
    edges: [
      { source: 1, target: 2 },
      { source: 2, target: 3 }
    ]
  };

  csvData = '';

  switchFormat(format: 'json' | 'csv' | 'table') {
    this.dataFormat = format;
  }
}
