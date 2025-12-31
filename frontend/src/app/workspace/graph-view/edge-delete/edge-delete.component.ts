import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { EdgesService } from '../../../core/services/edges.service';
import { Edge } from '../../../models/edge.model';
import { Guid } from '../../../models/graph.model';

export interface EdgeDeleteData { edge: Edge; graphId: Guid; }

@Component({
  selector: 'app-edge-delete',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './edge-delete.component.html',
  styleUrls: ['./edge-delete.component.css']
})
export class EdgeDeleteComponent {
  data = inject<EdgeDeleteData>(DIALOG_DATA);
  loading = false;
  error?: string;

  constructor(
    private dialogRef: DialogRef<boolean>,
    private graphState: GraphStateService,
    private edgesService: EdgesService
  ) {}

  confirm() {
    this.loading = true;
    this.error = undefined;
    this.graphState.loadCurrentGraphFromStorage();
    console.log('🗑️ Edge-delete - Deleting edge:', this.data.edge.id);
    
    this.edgesService.deleteEdge(this.data.edge.id).subscribe({
      next: () => {
        console.log('✅ Edge-delete success');
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Edge-delete error:', err);
        this.loading = false;
        this.error = err?.error?.message ?? 'Edge silinemedi';
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
