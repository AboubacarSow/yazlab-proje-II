import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { NodesService } from '../../../core/services/nodes.service';
import { GraphNode } from '../../../models/node.model';

@Component({
  selector: 'app-node-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './node-add.component.html',
  styleUrls: ['./node-add.component.css']
})
export class NodeAddComponent {
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
      tag: ['', [Validators.required, Validators.minLength(2)]],
      activity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      interaction: [1, [Validators.required, Validators.min(1)]]
    });
  }

  create() {
    this.submitted = true;
    this.error = undefined;

    if (this.form.invalid) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    // Timing sorununun önüne geçmek için localStorage'dan yeniden yükle
    this.graphState.loadCurrentGraphFromStorage();
    const current = this.graphState.getCurrentGraph();
    console.log('📌 Node-add create - Current graph:', current);
    
    if (!current || !current.id) {
      console.error('❌ No active graph', current);
      this.error = 'Aktif bir graph yok. Önce graph oluşturun veya içe aktarın.';
      return;
    }

    this.loading = true;

    try {
      this.nodesService.addNode(
        this.form.value.tag,
        this.form.value.activity,
        this.form.value.interaction
      ).subscribe({
        next: (res) => {
          const node = (res as any)?.nodeDto as GraphNode ?? (res as any)?.node as GraphNode;
          this.loading = false;
          if (node) {
            this.dialogRef.close(node);
          }
        },
        error: (err) => {
          this.loading = false;
          // ASP.NET Core returns ProblemDetails: use 'detail' field
          const detail = err?.error?.detail ?? err?.error?.message ?? err?.message ?? '';
          const title = err?.error?.title ?? '';
          // Duplicate node name mapping (DomainException: "Node already exists in this graph.")
          if (
            err?.status === 400 &&
            typeof detail === 'string' && /node already exists/i.test(detail)
          ) {
            this.error = 'Aynı node oluşturulamaz.';
            console.log(this.error);
          } else {
            this.error = detail || 'Node eklenemedi. Lütfen tekrar deneyin.';
          }
        }
      });
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message ?? 'Hata: Node eklenemedi.';
      console.log(err.message);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
