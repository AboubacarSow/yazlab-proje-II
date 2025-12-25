import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GraphCreationComponent } from './graph-creation/graph-creation.component';
import { Graph, Guid } from '../../models/graph.model';
import { GraphStateService } from '../../core/services/graph.service';
import { ImportGraphComponent } from './import-graph/import-graph.component';
import { ImportGraphSnapshotComponent } from '../modals/graphs/import-graph-snapshot/import-graph-snapshot.component';


@Component({
  selector: 'app-schema-creation',
  standalone: true,
  templateUrl: './schema-creation.component.html',
  styleUrl: './schema-creation.component.css'
})
export class SchemaCreationComponent {
  private dialog = inject(Dialog);
  @Output() graphCreated = new EventEmitter<Guid>();

  constructor( private graphStateService : GraphStateService) {}

  openCreateModal() {
    const dialogRef = this.dialog.open(GraphCreationComponent, {disableClose:true,
    panelClass: 'graph-creation-panel'})

    dialogRef.closed.subscribe(graph => {
      if (!graph || typeof graph !== 'object') return;
      this.graphStateService.setCurrentGraph((graph as Graph));
      this.graphCreated.emit((graph as Graph).id);
    });
  };

  openImportModal() {
    const dialogRef = this.dialog.open(ImportGraphComponent, {
      disableClose : true,
      panelClass : 'import-graph-panel'});
    dialogRef.closed.subscribe(graph => {
      if (!graph || typeof graph !== 'object') return;
      this.graphStateService.setCurrentGraph((graph as Graph));
      this.graphCreated.emit((graph as Graph).id);
    });
  }
  openImportSnapshotModal(){
    const dialogRef = this.dialog.open(ImportGraphSnapshotComponent, {
      disableClose : true,
      panelClass : 'import-graph-snapshoot-panel'});
    dialogRef.closed.subscribe(graph => {
      if (!graph || typeof graph !== 'object') return;
      this.graphStateService.setCurrentGraph((graph as Graph));
      this.graphCreated.emit((graph as Graph).id);
    });
  }
}

