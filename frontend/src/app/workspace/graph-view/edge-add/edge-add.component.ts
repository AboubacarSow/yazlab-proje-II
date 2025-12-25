import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { EdgesService } from '../../../core/services/edges.service';
import { Edge } from '../../../models/edge.model';
import { Graph } from '../../../models/graph.model';
import { GraphNode } from '../../../models/node.model';

@Component({
  selector: 'app-edge-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edge-add.component.html',
  styleUrls: ['./edge-add.component.css']
})
export class EdgeAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  error?: string;
  nodes: GraphNode[] = [];
  currentGraph: Graph | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<Edge>,
    private graphState: GraphStateService,
    private edgesService: EdgesService
  ) {
    this.form = this.fb.group({
      nodeAId: [null, [Validators.required]],
      nodeBId: [null, [Validators.required]],
    });

    this.currentGraph = this.graphState.getCurrentGraph();
    this.nodes = this.currentGraph?.nodes ?? [];
  }

  ngOnInit(): void {
    // Ensure current graph is loaded and nodes are available
    this.graphState.loadCurrentGraphFromStorage();
    const current = this.graphState.getCurrentGraph();
    this.currentGraph = current;
    this.nodes = current?.nodes ?? [];
  }

  create() {
    this.submitted = true;
    this.error = undefined;

    if (this.form.invalid) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    this.graphState.loadCurrentGraphFromStorage();
    const current = this.graphState.getCurrentGraph();
    console.log('🔗 Edge-add - Current graph:', current);
    
    if (!current || !current.id) {
      this.error = 'Aktif bir graph yok. Önce graph oluşturun veya içe aktarın.';
      return;
    }

    const nodeAId = Number(this.form.value.nodeAId);
    const nodeBId = Number(this.form.value.nodeBId);

    if (nodeAId === nodeBId) {
      this.error = 'Aynı node arasında edge oluşturulamaz.';
      return;
    }

    this.loading = true;
    try {
      this.edgesService.addEdge(nodeAId, nodeBId).subscribe({
        next: (res) => {
          console.log('✅ Edge-add success:', res);
          const edge = (res as any)?.edge as Edge ?? (res as any)?.Edge as Edge;
          this.loading = false;
          if (edge) {
            this.dialogRef.close(edge);
          }
        },
        error: (err) => {
          console.error('❌ Edge-add error:', err);
          this.loading = false;
          this.error = err?.error?.message ?? err?.message ?? 'Edge eklenemedi';
        }
      });
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message ?? 'Hata: Edge eklenemedi.';
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
