import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GraphCreationComponent } from './graph-creation/graph-creation.component';
import { Graph, Guid } from '../../models/graph.model';
import { GraphStateService } from '../../core/services/graph.service';
import { ImportGraphComponent } from './import-graph/import-graph.component';


@Component({
  selector: 'app-schema-creation',
  standalone: true,
  templateUrl: './schema-creation.component.html',
  styleUrl: './schema-creation.component.css'
})
export class SchemaCreationComponent {
  private dialog = inject(Dialog);
  @Output() graphCreated = new EventEmitter<Guid>();

  constructor(private graphService: GraphStateService) {}

  openCreateModal() {
    console.log('🔨 Opening create graph modal...');
    const dialogRef = this.dialog.open(GraphCreationComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel'
    });

    dialogRef.closed.subscribe(graph => {
      console.log('📦 Graph creation dialog closed with:', graph);
      if (!graph || typeof graph !== 'object') {
        console.log('⚠️ No valid graph returned from dialog');
        return;
      }
      // Graph zaten GraphCreationComponent'te setCurrentGraph() ile kaydedilmiş
      const graphId = (graph as Graph).id;
      console.log('✅ Emitting graphCreated event with ID:', graphId);
      this.graphCreated.emit(graphId);
    });
  }

  openImportModal() {
    console.log('🔨 Opening import graph modal...');
    const dialogRef = this.dialog.open(ImportGraphComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel'
    });

    dialogRef.closed.subscribe(graph => {
      console.log('📦 Graph import dialog closed with:', graph);
      if (!graph || typeof graph !== 'object') {
        console.log('⚠️ No valid graph returned from import dialog');
        return;
      }
      this.graphService.setCurrentGraph((graph as Graph));
      const graphId = (graph as Graph).id;
      console.log('✅ Emitting graphCreated event with ID:', graphId);
      this.graphCreated.emit(graphId);
    });
  }
}

