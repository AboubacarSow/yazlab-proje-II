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
    {
      title: 'Organization Network',
      description: 'Employee relations and cross-department interactions.',
      nodes: 142,
      edges: 380,
      updatedAt: 'Today 10:35',
      owner: 'You',
      source: 'created',
      tags: ['HR', 'SNA', 'Internal']
    },
    {
      title: 'Community Map',
      description: 'Imported social media interactions.',
      nodes: 890,
      edges: 2340,
      updatedAt: 'Yesterday 17:20',
      owner: 'External Source',
      source: 'import',
      tags: ['Import', 'Social', 'Analysis']
    },
    {
      title: 'Supply Chain',
      description: 'Supplier and reseller network risk analysis.',
      nodes: 265,
      edges: 612,
      updatedAt: '3 days ago',
      owner: 'You',
      source: 'created',
      tags: ['Logistics', 'Risk']
    }
  ];
}
