import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphStateService } from '../../../core/services/graph.service';
import { Graph } from '../../../models/graph.model';
import { Edge } from '../../../models/edge.model';
import { GraphNode } from '../../../models/node.model';

export interface EdgeSelectData { mode: 'delete'; }

@Component({
  selector: 'app-edge-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './edge-select.component.html',
  styleUrls: ['./edge-select.component.css']
})
export class EdgeSelectComponent {
  private data = inject<EdgeSelectData>(DIALOG_DATA);
  private graphState = inject(GraphStateService);

  edges: { edge: Edge; nodeA?: GraphNode; nodeB?: GraphNode }[] = [];
  selectedId?: number;
  modeLabel = 'Silinecek Edge';

  constructor(private dialogRef: DialogRef<Edge | null>) {
    this.graphState.loadCurrentGraphFromStorage();
    const current: Graph | null = this.graphState.getCurrentGraph();
    const nodes = current?.nodes ?? [];
    const edgeList = current?.edges ?? [];

    // Enrich edges with node information for display
    this.edges = edgeList.map(edge => {
      const nodeA = nodes.find(n => n.id === edge.nodeAId);
      const nodeB = nodes.find(n => n.id === edge.nodeBId);
      return { edge, nodeA, nodeB };
    });
  }

  confirm() {
    const selected = this.edges.find(e => e.edge.id === this.selectedId);
    this.dialogRef.close(selected?.edge ?? null);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
