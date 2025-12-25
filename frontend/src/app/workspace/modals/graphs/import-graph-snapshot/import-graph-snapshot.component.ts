import { Component } from '@angular/core';
import { validateSnapshot } from '../../../../core/validators/graph.import.validator';
import { GraphStateService } from '../../../../core/services/graph.service';
import { Graph, GraphSnapshot } from '../../../../models/graph.model';
import { ToastService } from '../../../../core/utils/toast-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-import-graph-snapshot',
  imports: [NgIf],
  templateUrl: './import-graph-snapshot.component.html',
  styleUrl: './import-graph-snapshot.component.css'
})
export class ImportGraphSnapshotComponent {
  loading = false;
  error? : string = ''
  fileName?: string;
  snapShot? : GraphSnapshot

  constructor(
    private graphStateService: GraphStateService,
    private dialog : DialogRef<Graph>,
    private toast : ToastService
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.fileName =file.name;
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as GraphSnapshot;
        if (!validateSnapshot(parsed)) {
          this.error='Invalid snapshot structure';
          return;
        }
        this.snapShot= parsed;

      }catch {
        this.error='Invalid JSON format';
        return;
      }

    };
    reader.readAsText(file);
  }

  importSnapshot() {
    if(!this.snapShot) return;

    this.loading = true;
    this.graphStateService.importSnapshot(this.snapShot).subscribe({
      next: (graph) => {
        this.toast.success('Graph imported successfully')
        this.loading = false
        this.dialog.close(graph)
      },
      error: () => {
        this.error='Failed to import snapshot';
        this.loading = false;
      }
    });
  }

  cancel(){
    this.dialog.close();
  }
}
