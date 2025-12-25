import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { GraphStateService } from '../../../core/services/graph.service';
import { Graph, ImportGraph } from '../../../models/graph.model';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { validateImportGraph } from '../../../core/validators/graph.import.validator';

@Component({
  selector: 'app-import-graph',
  imports: [NgIf,FormsModule,ReactiveFormsModule],
  templateUrl: './import-graph.component.html',
  styleUrl: './import-graph.component.css'
})
export class ImportGraphComponent {

  private dialogRef = inject(DialogRef<Graph>);
  private graphState = inject(GraphStateService);
   graphImport: FormGroup;
  fileContent?: ImportGraph;
  fileName?: string;

  error?: string;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.graphImport = this.fb.group({});
  }

  onFileSelected(event: Event) {
    this.error = undefined;
    this.fileContent = undefined;

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
        const parsed = JSON.parse(reader.result as string) as ImportGraph;

        if (!parsed.title) {
          this.error = 'Graph title is missing in JSON file';
          return;
        }

        const errors = validateImportGraph(parsed);
        if (errors.length) {
          this.error = errors.join('\n');
          return;
        }

        this.fileContent = parsed;

      } catch {
        this.error = 'Invalid JSON format';
      }
    };

    reader.readAsText(file);
  }

  importGraph() {
    if (!this.fileContent) return;

    this.loading = true;
    this.graphState.importGraph(this.fileContent).subscribe({
      next: graph => {
        this.graphState.setCurrentGraph(graph);
        this.dialogRef.close(graph);
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Import failed';
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
