import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { NodeAddComponent } from './node-add/node-add.component';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { NodeDeleteComponent } from './node-delete/node-delete.component';
import { GraphStateService } from '../../core/services/graph.service';
import { GraphNode } from '../../models/node.model';
import { Graph } from '../../models/graph.model';
import { Edge } from '../../models/edge.model';

@Component({
  selector: 'app-graph-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements OnInit {
  zoomLevel = 100;
  private dialog = inject(Dialog);
  private graphState = inject(GraphStateService);
  
  currentGraph: Graph | null = null;
  nodes: GraphNode[] = [];
  edges: Edge[] = [];

  ngOnInit() {
    // Subscribe to graph changes
    this.graphState.currentGraph$.subscribe(graph => {
      this.currentGraph = graph;
      this.nodes = graph?.nodes ?? [];
      this.edges = graph?.edges ?? [];
    });
  }

  // Simple circular layout for nodes
  getNodeX(index: number): number {
    const radius = 200;
    const centerX = 400;
    const angle = (index / Math.max(this.nodes.length, 1)) * 2 * Math.PI;
    return centerX + radius * Math.cos(angle);
  }

  getNodeY(index: number): number {
    const radius = 200;
    const centerY = 300;
    const angle = (index / Math.max(this.nodes.length, 1)) * 2 * Math.PI;
    return centerY + radius * Math.sin(angle);
  }

  getNodePosition(nodeId: number): { x: number; y: number } | null {
    const index = this.nodes.findIndex(n => n.id === nodeId);
    if (index === -1) return null;
    return { x: this.getNodeX(index), y: this.getNodeY(index) };
  }

  onZoomChange(level: number) {
    this.zoomLevel = level;
  }

  openAddNode() {
    const current = this.graphState.getCurrentGraph();
    if (!current) {
      console.error('Aktif graph bulunamadı');
      return;
    }
    
    const dialogRef = this.dialog.open(NodeAddComponent, { 
      disableClose: true, 
      panelClass: 'graph-creation-panel'
    });
    
    dialogRef.closed.subscribe((node) => {
      // Node başarıyla eklendi, UI güncellenecek
      console.log('Node ekleme tamamlandı:', node);
    });
  }

  openEditNode(node: GraphNode) {
    const current = this.graphState.getCurrentGraph();
    if (!current) return;
    this.dialog.open(NodeEditComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel',
      data: { node, graphId: current.id }
    });
  }

  openDeleteNode(node: GraphNode) {
    const current = this.graphState.getCurrentGraph();
    if (!current) return;
    this.dialog.open(NodeDeleteComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel',
      data: { node, graphId: current.id }
    });
  }
}
