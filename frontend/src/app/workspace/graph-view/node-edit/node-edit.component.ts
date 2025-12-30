import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { NodesService } from '../../../core/services/nodes.service';
import { GraphNode } from '../../../models/node.model';
import { Guid } from '../../../models/graph.model';

export interface NodeEditData { node: GraphNode; graphId: Guid; }

@Component({
  selector: 'app-node-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './node-edit.component.html',
  styleUrls: ['./node-edit.component.css']
})
export class NodeEditComponent {
  data = inject<NodeEditData>(DIALOG_DATA);
  form: FormGroup;
  submitted = false;
  loading = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<GraphNode>,
    private graphState: GraphStateService,
    private nodesService: NodesService
  ) {
    this.form = this.fb.group({
      tag: [this.data.node.tag, [Validators.required, Validators.minLength(2)]],
      activity: [this.data.node.activity, [Validators.required, Validators.min(0), Validators.max(1)]],
      interaction: [this.data.node.interaction, [Validators.required, Validators.min(1)]]
    });
  }

  save() {
    this.submitted = true;
    this.error = undefined;
    if (this.form.invalid) return;

    this.loading = true;
    this.graphState.loadCurrentGraphFromStorage();
    const current = this.graphState.getCurrentGraph();
    console.log('📝 Node-edit - Current graph:', current);
    console.log('📝 Node-edit - Editing node:', this.data.node.id);
    
    this.nodesService.editNode(
      this.data.node.id,
      this.form.value.tag,
      Number(this.form.value.activity),
      Number(this.form.value.interaction)
    ).subscribe({
      next: (res) => {
        console.log('✅ Node-edit success:', res);
        console.log('Response keys:', Object.keys(res));
        const node = (res as any)?.nodeDto as GraphNode ?? (res as any)?.node as GraphNode ?? (res as any)?.Node as GraphNode;
        console.log('Parsed node:', node);
        if (!node) {
          this.loading = false;
          this.error = 'Sunucudan geçersiz yanıt alındı';
          return;
        }
        this.loading = false;
        this.dialogRef.close(node);
      },
      error: (err) => {
        console.error('❌ Node-edit error:', err);
        console.error('Error status:', err?.status);
        console.error('Error message:', err?.error);
        this.loading = false;
        this.error = err?.error?.message ?? err?.message ?? 'Node güncellenemedi';
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
