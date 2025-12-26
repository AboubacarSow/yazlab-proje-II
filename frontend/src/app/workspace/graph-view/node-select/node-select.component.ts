import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphStateService } from '../../../core/services/graph.service';
import { Graph } from '../../../models/graph.model';
import { GraphNode } from '../../../models/node.model';

export interface NodeSelectData { mode: 'edit' | 'delete'; }

@Component({
  selector: 'app-node-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './node-select.component.html',
  styleUrls: ['./node-select.component.css']
})
export class NodeSelectComponent {
  private data = inject<NodeSelectData>(DIALOG_DATA);
  private graphState = inject(GraphStateService);

  nodes: GraphNode[] = [];
  selectedId?: number;
  modeLabel = this.data.mode === 'edit' ? 'Düzenlenecek' : 'Silinecek';

  constructor(private dialogRef: DialogRef<GraphNode | null>) {
    const current: Graph | null = this.graphState.getCurrentGraph();
    this.nodes = current?.nodes ?? [];
  }

  confirm() {
    const node = this.nodes.find(n => n.id === this.selectedId);
    this.dialogRef.close(node ?? null);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
