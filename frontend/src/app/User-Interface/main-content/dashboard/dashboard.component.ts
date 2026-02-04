import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Graph } from '../../../models/graph.model';
import { GraphStateService } from '../../../core/services/graph.service';
import { take } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{


  recentActivities = [
    { action: 'Yeni düğüm eklendi', node: 'Node-45', time: '5 dk önce' },
    { action: 'Kenar güncellendi', node: 'Edge-12', time: '12 dk önce' },
    { action: 'Algoritma çalıştırıldı', node: 'BFS', time: '25 dk önce' },
    { action: 'Graf kaydedildi', node: 'Graph-1', time: '1 saat önce' }
  ];

  currentopenedGraph: Graph | null = null;
  recentOpenedGraphs: Graph[] = [];
  stats:any= {
    totalGraphs :12,
    totalNodes: 34,
    totalEdges:23
  };

  constructor(private graphStateService: GraphStateService){

  }
  ngOnInit(): void {
    this.graphStateService.currentGraph$.pipe(take(1)).subscribe(graph=>{
      if(graph){
        this.currentopenedGraph= graph;
        return;
      }
    })
  }
}
