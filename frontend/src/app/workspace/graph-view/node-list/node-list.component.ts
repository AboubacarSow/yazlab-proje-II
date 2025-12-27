import { Component, OnInit, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GraphStateService } from '../../../core/services/graph.service';
import { NodesService } from '../../../core/services/nodes.service';
import { GraphNode } from '../../../models/node.model';
import { Graph } from '../../../models/graph.model';

export interface NodeListData { mode: 'add' | 'edit' | 'delete'; }

@Component({
  selector: 'app-node-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  private graphState = inject(GraphStateService);
  private nodesService = inject(NodesService);
  private data = inject<NodeListData>(DIALOG_DATA, { optional: true });
  mode: 'add' | 'edit' | 'delete';
  nodes: GraphNode[] = [];
  currentGraph: Graph | null = null;
  showAddForm = false;
  editingNodeId?: number;
  loading = false;
  error?: string;
  deletingNodeId?: number;

  addForm: FormGroup;
  editForm: FormGroup;

  constructor() {
    // Mode'u data'dan al, yoksa 'add' olarak ayarla
    this.mode = this.data?.mode ?? 'add';
    
    this.addForm = this.fb.group({
      tag: ['', [Validators.required, Validators.minLength(2)]],
      activity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      interaction: [1, [Validators.required, Validators.min(1)]]
    });

    this.editForm = this.fb.group({
      tag: ['', [Validators.required, Validators.minLength(2)]],
      activity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      interaction: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Mode'u tekrar kontrol et (data inject edilmiş olabilir)
    if (this.data) {
      this.mode = this.data.mode;
    }
    this.loadNodes();
    // Add mode için formu otomatik aç
    if (this.mode === 'add') {
      this.showAddForm = true;
    }
  }

  loadNodes(): void {
    this.graphState.loadCurrentGraphFromStorage();
    this.currentGraph = this.graphState.getCurrentGraph();
    
    if (!this.currentGraph) {
      this.error = 'Aktif bir graph yok. Önce graph oluşturun veya içe aktarın.';
      return;
    }

    this.nodes = this.currentGraph.nodes ?? [];
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.error = undefined;
    if (!this.showAddForm) {
      this.addForm.reset({
        tag: '',
        activity: 0,
        interaction: 1
      });
    }
  }

  startEdit(node: GraphNode): void {
    this.editingNodeId = node.id;
    this.error = undefined;
    this.editForm.patchValue({
      tag: node.tag,
      activity: node.activity,
      interaction: node.interaction
    });
  }

  cancelEdit(): void {
    this.editingNodeId = undefined;
    this.editForm.reset();
  }

  addNode(): void {
    if (this.addForm.invalid) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    this.loading = true;
    this.error = undefined;

    this.nodesService.addNode(
      this.addForm.value.tag,
      Number(this.addForm.value.activity),
      Number(this.addForm.value.interaction)
    ).subscribe({
      next: (res) => {
        console.log('✅ Node-add success:', res);
        this.loading = false;
        this.addForm.reset({
          tag: '',
          activity: 0,
          interaction: 1
        });
        this.showAddForm = false;
        this.loadNodes();
        // Add mode'da başarılı ekleme sonrası dialog'u kapat
        if (this.mode === 'add') {
          setTimeout(() => this.close(), 500);
        }
      },
      error: (err) => {
        console.error('❌ Node-add error:', err);
        this.loading = false;
        const detail = err?.error?.detail ?? err?.error?.message ?? err?.message ?? '';
        if (
          err?.status === 400 &&
          typeof detail === 'string' && /node already exists/i.test(detail)
        ) {
          this.error = 'Aynı node oluşturulamaz.';
        } else {
          this.error = detail || 'Node eklenemedi. Lütfen tekrar deneyin.';
        }
      }
    });
  }

  saveEdit(): void {
    if (this.editForm.invalid || !this.editingNodeId) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    this.loading = true;
    this.error = undefined;

    this.nodesService.editNode(
      this.editingNodeId,
      this.editForm.value.tag,
      Number(this.editForm.value.activity),
      Number(this.editForm.value.interaction)
    ).subscribe({
      next: (res) => {
        console.log('✅ Node-edit success:', res);
        this.loading = false;
        this.editingNodeId = undefined;
        this.editForm.reset();
        this.loadNodes();
      },
      error: (err) => {
        console.error('❌ Node-edit error:', err);
        this.loading = false;
        this.error = err?.error?.message ?? err?.message ?? 'Node güncellenemedi';
      }
    });
  }

  deleteNode(nodeId: number): void {
    if (!confirm('Bu node\'u silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    this.deletingNodeId = nodeId;
    this.error = undefined;

    this.nodesService.deleteNode(nodeId).subscribe({
      next: () => {
        console.log('✅ Node-delete success');
        this.deletingNodeId = undefined;
        this.loadNodes();
      },
      error: (err) => {
        console.error('❌ Node-delete error:', err);
        this.deletingNodeId = undefined;
        this.error = err?.error?.message ?? 'Node silinemedi';
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

