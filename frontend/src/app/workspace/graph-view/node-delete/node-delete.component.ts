import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { NodesService } from '../../../core/services/nodes.service';
import { GraphNode } from '../../../models/node.model';
import { Guid } from '../../../models/graph.model';

export interface NodeDeleteData { node: GraphNode; graphId: Guid; }

@Component({
  selector: 'app-node-delete',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './node-delete.component.html',
  styleUrls: ['./node-delete.component.css']
})
export class NodeDeleteComponent {
  data = inject<NodeDeleteData>(DIALOG_DATA);
  loading = false;
  error?: string;

  constructor(
    private dialogRef: DialogRef<boolean>,
    private graphState: GraphStateService,
    private nodesService: NodesService
  ) {}

  confirm() {
    this.loading = true;
    this.error = undefined;
    this.graphState.loadCurrentGraphFromStorage();
    const current = this.graphState.getCurrentGraph();
    console.log('🗑️ Node-delete - Current graph:', current);
    console.log('🗑️ Node-delete - Deleting node:', this.data.node.id);
    
    this.nodesService.deleteNode(this.data.node.id).subscribe({
      next: () => {
        console.log('✅ Node-delete success');
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Node-delete error:', err);
        console.error('Status:', err?.status);
        console.error('URL:', err?.url);
        console.error('Error message:', err?.error);
        this.loading = false;
        this.error = err?.error?.message ?? err?.message ?? 'Node silinemedi';
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
