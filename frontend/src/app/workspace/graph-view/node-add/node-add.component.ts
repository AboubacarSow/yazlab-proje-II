import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { GraphStateService } from '../../../core/services/graph.service';
import { NodesService } from '../../../core/services/nodes.service';
import { filter, take } from 'rxjs';
import { Graph } from '../../../models/graph.model';
import { Node } from '../../../models/node.model';

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
    private dialogRef: DialogRef<Node>,
    private graphState: GraphStateService,
    private nodesService: NodesService
  ) {
    this.form = this.fb.group({
      tag: ['', [Validators.required, Validators.minLength(2)]],
      activity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      interaction: [1, [Validators.required, Validators.min(1)]]
    });
  }
  private createNode(): void {
    this.loading = true;

    this.nodesService
      .addNode(
        this.form.value.tag,
        this.form.value.activity,
        this.form.value.interaction
      )
      .subscribe({
        next: (res) => {
          this.loading = false;

          const node =
            (res as any)?.nodeDto as Node ??
            (res as any)?.node as Node;

          if (node) {
            this.dialogRef.close(node);
          }
        },
        error: (err) => {
          this.loading = false;
          this.handleCreateError(err);
        }
      });
  }

  private handleCreateError(err: any): void {
    const detail =
      err?.error?.detail ??
      err?.error?.message ??
      err?.message ??
      '';

    if (
      err?.status === 400 &&
      typeof detail === 'string' &&
      /node already exists/i.test(detail)
    ) {
      this.error = 'Node must be un.';
    } else {
      this.error = detail || 'Node eklenemedi. Lütfen tekrar deneyin.';
    }
  }


  create() {
    this.submitted = true;
    this.error = undefined;

    if (this.form.invalid) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    // Ensure state is hydrated
    this.graphState.loadCurrentGraphFromStorage();

    this.graphState.currentGraph$
      .pipe(
        take(1),
        filter((g): g is Graph => !!g && !!g.id)
      )
      .subscribe({
        next: () => {
          this.createNode();
        },
        error: () => {
          this.error = 'Aktif bir graph yok. Önce graph oluşturun veya içe aktarın.';
        }
      });
  }
  cancel() {
    this.dialogRef.close();
  }
}
