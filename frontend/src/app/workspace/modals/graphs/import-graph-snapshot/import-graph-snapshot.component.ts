import { Component } from '@angular/core';
import { validateSnapshot } from '../../../../core/validators/graph.import.validator';
import { GraphStateService } from '../../../../core/services/graph.service';
import { Graph, GraphSnapshot } from '../../../../models/graph.model';
import { ToastService } from '../../../../core/utils/toast-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-import-graph-snapshot',
  imports: [NgIf,FormsModule,ReactiveFormsModule ],
  templateUrl: './import-graph-snapshot.component.html',
  styleUrl: './import-graph-snapshot.component.css'
})
export class ImportGraphSnapshotComponent {
  importForm: FormGroup;
  fileName?: string;
  snapShot?: GraphSnapshot;
  error?: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private graphState: GraphStateService,
    private dialogRef: DialogRef<Graph>,
    private toast: ToastService
  ) {
    this.importForm = this.fb.group({});
  }

  onFileSelected(event: Event) {
    this.error = undefined;
    this.snapShot = undefined;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      this.error = 'Only JSON files are allowed';
      return;
    }

    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as GraphSnapshot;

        const valid = validateSnapshot(parsed);
        if (!valid) {
          this.error = 'Invalid snapshot structure';
          return;
        }

        this.snapShot = parsed;

      } catch {
        this.error = 'Invalid JSON format';
      }
    };

    reader.readAsText(file);
  }

  importSnapshot() {
    if (!this.snapShot) return;
    console.log('data loaded:', this.snapShot);
    this.loading = true;
    this.error = undefined;

    this.graphState.importSnapshot(this.snapShot).subscribe({
      next: (graph) => {
        this.graphState.setCurrentGraph(graph);
        this.toast.success('Graph imported successfully');
        this.loading = false;
        this.dialogRef.close(graph);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Failed to import snapshot';
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
