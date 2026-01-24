import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type GraphItem = {
  title: string;
  description: string;
  nodes: number;
  edges: number;
  updatedAt: string;
  owner: string;
  source: 'import' | 'created';
  tags: string[];
};

@Component({
  selector: 'app-graphlarim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphlarim.component.html',
  styleUrl: './graphlarim.component.css'
})
export class GraphlarimComponent {
  graphs: GraphItem[] = [
    
  ];
}
